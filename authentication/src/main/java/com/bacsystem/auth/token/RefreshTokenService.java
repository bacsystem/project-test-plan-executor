package com.bacsystem.auth.token;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.identity.User;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private static final long REFRESH_TOKEN_TTL_DAYS = 30;

    private final RefreshTokenRepository refreshTokenRepository;
    private final AuditLogService auditLogService;
    private final MeterRegistry meterRegistry;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, AuditLogService auditLogService,
                                MeterRegistry meterRegistry) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.auditLogService = auditLogService;
        this.meterRegistry = meterRegistry;
    }

    @Transactional
    public String issue(User user, String applicationClientId) {
        String raw = TokenHasher.generateRawToken();
        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setTokenHash(TokenHasher.sha256Hex(raw));
        token.setApplicationClientId(applicationClientId);
        token.setExpiresAt(Instant.now().plus(REFRESH_TOKEN_TTL_DAYS, ChronoUnit.DAYS));
        refreshTokenRepository.save(token);
        return raw;
    }

    /**
     * Rotates a presented refresh token. If the stored row already has
     * {@code replacedBy} set, the presented token was already used once —
     * that is reuse by definition (§8.3), and the entire chain for that
     * user+application is revoked, not just this token.
     *
     * <p>{@code requestingClientId} must match the {@code applicationClientId}
     * the token was originally issued under (§8.2: "one token per
     * application... never a global token valid everywhere"). Without this
     * check, any registered client that gets hold of another application's
     * raw opaque refresh token — however it leaked — could mint itself a
     * valid access token for that user. A mismatch is treated the same as
     * reuse: the whole chain is revoked, since presentation by the wrong
     * client is itself evidence the token isn't where it should be.
     *
     * <p>{@code noRollbackFor} is required here: without it, Spring rolls
     * back the whole transaction — including the chain revocation this
     * same method just wrote — because {@link RefreshTokenReuseException}
     * is a RuntimeException thrown by the very method that started the
     * transaction, which would silently undo the revocation it exists to
     * perform.
     */
    @Transactional(noRollbackFor = RefreshTokenReuseException.class)
    public RefreshTokenRotationResult rotate(String presentedRaw, String requestingClientId) {
        RefreshToken current = refreshTokenRepository.findByTokenHash(TokenHasher.sha256Hex(presentedRaw))
                .orElseThrow(RefreshTokenReuseException::new);

        boolean alreadyUsed = current.getReplacedBy() != null || current.getRevokedAt() != null
                || current.getExpiresAt().isBefore(Instant.now());
        boolean clientMismatch = !current.getApplicationClientId().equals(requestingClientId);
        if (alreadyUsed || clientMismatch) {
            revokeAllForUser(current.getUser().getId());
            String event = clientMismatch ? "client_mismatch" : "reuse_detected";
            AuditAction action = clientMismatch
                    ? AuditAction.REFRESH_TOKEN_CLIENT_MISMATCH
                    : AuditAction.REFRESH_TOKEN_REUSE_DETECTED;
            auditLogService.record(current.getUser().getId(), action,
                    "RefreshToken", current.getId().toString(), "{\"event\":\"" + event + "\"}");
            // §16: security alert distinct from generic ops metrics — lets an external
            // dashboard/alert fire on reuse-detected / client-mismatch without parsing audit logs.
            meterRegistry.counter("refresh_token_security_event", "event", event).increment();
            throw new RefreshTokenReuseException();
        }

        String newRaw = issue(current.getUser(), current.getApplicationClientId());
        RefreshToken newest = refreshTokenRepository
                .findByTokenHash(TokenHasher.sha256Hex(newRaw)).orElseThrow();
        current.setReplacedBy(newest);
        refreshTokenRepository.save(current);
        return new RefreshTokenRotationResult(current.getUser(), newRaw);
    }

    /** Revokes every token in the user's chain — used on reuse detection (above) and on MFA reset (Task 23). */
    @Transactional
    public void revokeAllForUser(UUID userId) {
        List<RefreshToken> chain = refreshTokenRepository.findByUserId(userId);
        Instant now = Instant.now();
        for (RefreshToken token : chain) {
            if (token.getRevokedAt() == null) {
                token.setRevokedAt(now);
                refreshTokenRepository.save(token);
            }
        }
    }
}
