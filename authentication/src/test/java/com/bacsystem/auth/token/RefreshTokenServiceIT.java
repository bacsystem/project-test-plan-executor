package com.bacsystem.auth.token;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLog;
import com.bacsystem.auth.audit.AuditLogRepository;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;

class RefreshTokenServiceIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RefreshTokenRepository refreshTokenRepository;
    @Autowired private RefreshTokenService refreshTokenService;
    @Autowired private AuditLogRepository auditLogRepository;
    @Autowired private MeterRegistry meterRegistry;
    @SpyBean private AuditLogService auditLogService;

    @AfterEach
    void resetAuditLogSpy() {
        // Other tests in this class rely on the real AuditLogService behavior; undo any
        // per-test stubbing so it doesn't leak across test methods sharing this context.
        Mockito.reset(auditLogService);
    }

    private User newUser() {
        Tenant tenant = new Tenant();
        tenant.setSlug("rt-" + System.nanoTime());
        tenant.setName("RT Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        User user = new User();
        user.setTenant(tenant);
        user.setEmail("rt@test.test");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        return userRepository.saveAndFlush(user);
    }

    @Test
    void rotatingAValidTokenIssuesANewOneAndRevokesTheOld() {
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");

        String rotatedRaw = refreshTokenService.rotate(raw, "example-app").newRawRefreshToken();

        assertThat(rotatedRaw).isNotEqualTo(raw);
        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "example-app"));
    }

    @Test
    void reusingAnAlreadyRotatedTokenRevokesTheWholeChain() {
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");
        String rotatedOnce = refreshTokenService.rotate(raw, "example-app").newRawRefreshToken();

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "example-app"));

        // the chain is fully revoked — even the legitimately-rotated token no longer works
        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(rotatedOnce, "example-app"));
    }

    @Test
    void reuseDetectedIsAuditedUnderItsOwnActionNotPasswordChanged() {
        // §16: a reuse-detected/compromised-token event is "high severity, immediate" and must
        // be distinguishable from generic account activity like a password change — filing it
        // under USER_PASSWORD_CHANGED would hide it from anyone reviewing security alerts.
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");
        RefreshToken original = refreshTokenRepository.findByTokenHash(TokenHasher.sha256Hex(raw)).orElseThrow();
        refreshTokenService.rotate(raw, "example-app");

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "example-app"));

        List<AuditLog> entries = auditLogRepository.findByTargetTypeAndTargetId(
                "RefreshToken", original.getId().toString());
        assertThat(entries).extracting(AuditLog::getAction)
                .contains(AuditAction.REFRESH_TOKEN_REUSE_DETECTED)
                .doesNotContain(AuditAction.USER_PASSWORD_CHANGED);
    }

    @Test
    void reuseDetectedIncrementsTheReuseDetectedSecurityCounter() {
        // §16: a security-relevant alert distinct from generic ops metrics — an external
        // dashboard/alert must be able to see reuse-detected events without parsing audit logs.
        double before = counterCount("refresh_token_security_event", "reuse_detected");
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");
        refreshTokenService.rotate(raw, "example-app");

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "example-app"));

        assertThat(counterCount("refresh_token_security_event", "reuse_detected")).isEqualTo(before + 1);
    }

    @Test
    void clientMismatchIncrementsTheClientMismatchSecurityCounterNotTheReuseOne() {
        double reuseBefore = counterCount("refresh_token_security_event", "reuse_detected");
        double mismatchBefore = counterCount("refresh_token_security_event", "client_mismatch");
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "some-other-app"));

        assertThat(counterCount("refresh_token_security_event", "client_mismatch")).isEqualTo(mismatchBefore + 1);
        assertThat(counterCount("refresh_token_security_event", "reuse_detected")).isEqualTo(reuseBefore);
    }

    private double counterCount(String name, String eventTag) {
        var counter = meterRegistry.find(name).tag("event", eventTag).counter();
        return counter == null ? 0.0 : counter.count();
    }

    @Test
    void rotatingWithAnotherClientsCredentialsIsRejectedAndRevokesTheChain() {
        // §8.2: "one token per application... never a global token valid everywhere". A
        // token issued to "example-app" must not be redeemable by a different registered
        // client, even one presenting otherwise-valid Basic-Auth credentials of its own.
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "some-other-app"));

        // the mismatch is treated as suspicious reuse — the chain is revoked, so even the
        // legitimate client can no longer redeem the original token afterwards.
        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "example-app"));
    }

    @Test
    void chainRevocationSurvivesAnAuditLogWriteFailureDuringReuseDetection() {
        // Regression for the bug where rotate()'s @Transactional(noRollbackFor =
        // RefreshTokenReuseException.class) only protects against that one exception type.
        // If auditLogService.record() itself throws (e.g. a transient DB hiccup, per its
        // documented contract of rethrowing on any DB failure), that's a *different*
        // exception, so Spring would roll back the whole transaction - silently undoing the
        // revokeAllForUser(...) writes that already executed - and the caller would see the
        // audit failure instead of the intended reuse signal. Revoking a potentially
        // compromised token chain must survive an audit write failure; failing to log it is
        // the lesser problem.
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");
        String rotatedOnce = refreshTokenService.rotate(raw, "example-app").newRawRefreshToken();

        doThrow(new RuntimeException("simulated transient audit DB failure"))
                .when(auditLogService).record(any(), any(), any(), any(), any());

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "example-app"));

        // Query the DB directly (a fresh read, outside the failed rotate() call) to confirm
        // the revocation actually committed despite the audit write throwing mid-transaction.
        List<RefreshToken> chain = refreshTokenRepository.findByUserId(user.getId());
        assertThat(chain).hasSize(2);
        assertThat(chain).allSatisfy(token -> assertThat(token.getRevokedAt()).isNotNull());

        // and the chain being revoked really did stick - the legitimately-rotated token is
        // unusable too, same as the non-audit-failure reuse path already guarantees.
        Mockito.reset(auditLogService);
        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(rotatedOnce, "example-app"));
    }

    @Test
    void clientMismatchIsAuditedUnderItsOwnActionNotPasswordChanged() {
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");
        RefreshToken original = refreshTokenRepository.findByTokenHash(TokenHasher.sha256Hex(raw)).orElseThrow();

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw, "some-other-app"));

        List<AuditLog> entries = auditLogRepository.findByTargetTypeAndTargetId(
                "RefreshToken", original.getId().toString());
        assertThat(entries).extracting(AuditLog::getAction)
                .contains(AuditAction.REFRESH_TOKEN_CLIENT_MISMATCH)
                .doesNotContain(AuditAction.USER_PASSWORD_CHANGED);
    }
}
