package com.bacsystem.auth.onetime;

import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.email.EmailNotificationService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import org.junit.jupiter.api.Test;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.clearInvocations;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.mockingDetails;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

/**
 * Unit-level coverage for the timing/DB-load side-channel fix in
 * {@link OneTimeTokenService#requestPasswordReset}: §10.2/§12 require that an
 * unknown email never be distinguishable from a known one. The HTTP layer
 * already always answers 202 (see {@code PasswordControllerIT}), but before
 * this fix the miss branch did a single SELECT and returned, while the hit
 * branch did that SELECT plus two INSERTs — a measurably different DB
 * round-trip count/shape. Verified here via mocked-collaborator invocation
 * counts, not wall-clock timing (which would be flaky).
 * <p>
 * The miss-branch probes used to be split across {@code oneTimeTokenRepository}
 * and {@code emailNotificationService} (one call each, mirroring the hit
 * branch's save-then-queue shape one-for-one per collaborator). They now both
 * live on {@code oneTimeTokenRepository} via the extracted
 * {@link OneTimeTokenService#probeForTimingParity()}, so the *total*
 * round-trip count across both collaborators is what's asserted equal below,
 * not a per-collaborator match — {@code emailNotificationService} is no
 * longer touched by a miss at all, which is the point of that extraction
 * (see its javadoc).
 */
class OneTimeTokenServiceTest {

    private final OneTimeTokenRepository oneTimeTokenRepository = mock(OneTimeTokenRepository.class);
    private final UserService userService = mock(UserService.class);
    private final EmailNotificationService emailNotificationService = mock(EmailNotificationService.class);
    private final AuditLogService auditLogService = mock(AuditLogService.class);

    private final OneTimeTokenService service = new OneTimeTokenService(
            oneTimeTokenRepository, userService, emailNotificationService, auditLogService);

    @Test
    void hitAndMissBranchesMakeTheSameTotalNumberOfCallsAcrossTheDbFacingCollaborators() {
        UUID tenantId = UUID.randomUUID();
        User user = new User();
        user.setId(UUID.randomUUID());
        when(userService.findByTenantAndEmail(tenantId, "known@test.com")).thenReturn(Optional.of(user));
        when(userService.findByTenantAndEmail(tenantId, "unknown@test.com")).thenReturn(Optional.empty());

        service.requestPasswordReset(tenantId, "known@test.com");
        int hitTokenRepoCalls = mockingDetails(oneTimeTokenRepository).getInvocations().size();
        int hitEmailServiceCalls = mockingDetails(emailNotificationService).getInvocations().size();
        int hitTotalCalls = hitTokenRepoCalls + hitEmailServiceCalls;

        clearInvocations(oneTimeTokenRepository, emailNotificationService);

        service.requestPasswordReset(tenantId, "unknown@test.com");
        int missTokenRepoCalls = mockingDetails(oneTimeTokenRepository).getInvocations().size();
        int missEmailServiceCalls = mockingDetails(emailNotificationService).getInvocations().size();
        int missTotalCalls = missTokenRepoCalls + missEmailServiceCalls;

        // Sanity: the hit branch actually does touch both collaborators, so an
        // "equal because both are zero" false pass is ruled out.
        assertThat(hitTokenRepoCalls).isGreaterThan(0);
        assertThat(hitEmailServiceCalls).isGreaterThan(0);

        assertThat(missTotalCalls).isEqualTo(hitTotalCalls);
        // The miss branch's probes are now both against oneTimeTokenRepository,
        // not split across collaborators — this is the "misplaced responsibility"
        // fix, made explicit here so a regression back to touching
        // emailNotificationService from the miss branch fails this test.
        assertThat(missEmailServiceCalls).isZero();
        verifyNoInteractions(emailNotificationService);
    }

    @Test
    void missBranchNeverPersistsARedeemableToken() {
        UUID tenantId = UUID.randomUUID();
        when(userService.findByTenantAndEmail(tenantId, "unknown@test.com")).thenReturn(Optional.empty());

        String result = service.requestPasswordReset(tenantId, "unknown@test.com");

        assertThat(result).isNull();
        verify(oneTimeTokenRepository, never()).save(any());
    }

    @Test
    void probeForTimingParityPerformsTheSameShapeOfRoundTripsAsTheInternalMissBranch() {
        UUID tenantId = UUID.randomUUID();
        when(userService.findByTenantAndEmail(tenantId, "unknown@test.com")).thenReturn(Optional.empty());

        service.requestPasswordReset(tenantId, "unknown@test.com");
        int internalMissTokenRepoCalls = mockingDetails(oneTimeTokenRepository).getInvocations().size();

        clearInvocations(oneTimeTokenRepository, userService, emailNotificationService);

        // This is the exact call PasswordController makes directly when
        // tenantRepository.findBySlug itself comes back empty (fake-tenant case) —
        // it must reproduce the same round-trip shape as a real-tenant miss above.
        service.probeForTimingParity();

        assertThat(mockingDetails(oneTimeTokenRepository).getInvocations().size())
                .isEqualTo(internalMissTokenRepoCalls);
        verify(oneTimeTokenRepository, never()).save(any());
        verifyNoInteractions(userService);
        verifyNoInteractions(emailNotificationService);
    }
}
