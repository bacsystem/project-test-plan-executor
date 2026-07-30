package com.bacsystem.auth.onetime;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.email.EmailNotificationService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.token.TokenHasher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
public class OneTimeTokenService {

    private static final long RESET_TOKEN_TTL_MINUTES = 30;

    private final OneTimeTokenRepository oneTimeTokenRepository;
    private final UserService userService;
    private final EmailNotificationService emailNotificationService;
    private final AuditLogService auditLogService;

    public OneTimeTokenService(OneTimeTokenRepository oneTimeTokenRepository, UserService userService,
                                EmailNotificationService emailNotificationService, AuditLogService auditLogService) {
        this.oneTimeTokenRepository = oneTimeTokenRepository;
        this.userService = userService;
        this.emailNotificationService = emailNotificationService;
        this.auditLogService = auditLogService;
    }

    /**
     * Always "succeeds" from the caller's point of view (§10.2, §12) — an
     * unknown tenant/email results in no row, no email, and no thrown
     * exception, exactly like a hit. Returns the raw token only for this
     * plan's own tests to exercise the full cycle without reading email;
     * the real HTTP layer (Task 32) discards the return value and always
     * responds 202.
     * <p>
     * Best-effort timing/DB-load side-channel mitigation: a miss used to do a
     * single SELECT and return, while a hit did that SELECT plus two INSERTs
     * (token + email-outbox row) — a measurably different DB round-trip
     * count/shape for an external observer, undermining the "never reveals
     * whether the email exists" guarantee at that level even though the HTTP
     * status code is uniform. The miss branch below now performs the same
     * number of round-trips via {@link #probeForTimingParity()} — see that
     * method's javadoc for why the probes live here rather than reaching
     * into {@code EmailNotificationService}. This is deliberately not a
     * perfect mitigation: network jitter dwarfs microsecond-scale DB timing
     * differences in most real deployments, and a same-process resource-cost
     * observer isn't the threat model here — only the round-trip *count* was
     * cheap to close, so that's what this does.
     */
    @Transactional
    public String requestPasswordReset(UUID tenantId, String email) {
        Optional<User> user = userService.findByTenantAndEmail(tenantId, email);
        if (user.isEmpty()) {
            probeForTimingParity();
            return null;
        }

        String raw = TokenHasher.generateRawToken();
        OneTimeToken token = new OneTimeToken();
        token.setUser(user.get());
        token.setPurpose(OneTimeTokenPurpose.PASSWORD_RESET);
        token.setTokenHash(TokenHasher.sha256Hex(raw));
        token.setExpiresAt(Instant.now().plus(RESET_TOKEN_TTL_MINUTES, ChronoUnit.MINUTES));
        oneTimeTokenRepository.save(token);

        emailNotificationService.queue(email, "password-reset",
                "Reset your password: https://example.test/reset?token=" + raw);
        return raw;
    }

    /**
     * Performs the same two no-op, non-mutating DB round-trips the "unknown
     * email" branch of {@link #requestPasswordReset} performs (mirroring
     * that branch's token-save and email-queue round-trips against this
     * service's own {@link OneTimeTokenRepository} via cheap, always-false
     * {@code existsById} lookups on random ids) without needing a tenant id
     * or email at all — nothing is ever persisted or made redeemable.
     * <p>
     * This used to be split across two collaborators (one probe here, one on
     * {@code EmailNotificationService}), which pulled a timing-parity-only
     * method into an unrelated service's public API just to keep the total
     * round-trip *count* matched. Since only the count matters for this
     * best-effort mitigation — not which collaborator absorbs it — both
     * probes now live here, where the rest of this timing-parity logic
     * already does, and {@code EmailNotificationService} is left with only
     * its actual job (queuing/sending email).
     * <p>
     * Also called directly by {@code PasswordController#resetRequest} when
     * {@code tenantRepository.findBySlug} itself comes back empty: an
     * unknown tenant slug would otherwise short-circuit to a single DB
     * lookup with no further round-trips, which is measurably cheaper than
     * either a real-tenant hit or a real-tenant miss and reopens the same
     * class of side channel one level up the tenant-resolution chain.
     */
    @Transactional
    public void probeForTimingParity() {
        oneTimeTokenRepository.existsById(UUID.randomUUID());
        oneTimeTokenRepository.existsById(UUID.randomUUID());
    }

    @Transactional
    public void confirmPasswordReset(String rawToken, String newPassword) {
        OneTimeToken token = oneTimeTokenRepository
                .findByTokenHashAndRedeemedAtIsNull(TokenHasher.sha256Hex(rawToken))
                .filter(t -> t.getExpiresAt().isAfter(Instant.now()))
                .orElseThrow(OneTimeTokenInvalidException::new);

        token.setRedeemedAt(Instant.now());
        oneTimeTokenRepository.save(token);

        userService.changePassword(token.getUser(), newPassword);
        auditLogService.record(token.getUser().getId(), AuditAction.USER_PASSWORD_CHANGED,
                "User", token.getUser().getId().toString(), "{\"via\":\"password_reset\"}");
    }
}
