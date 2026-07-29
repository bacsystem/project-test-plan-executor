package com.bacsystem.auth.token;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.identity.User;
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

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository, AuditLogService auditLogService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.auditLogService = auditLogService;
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
     * <p>{@code noRollbackFor} is required here: without it, Spring rolls
     * back the whole transaction — including the chain revocation this
     * same method just wrote — because {@link RefreshTokenReuseException}
     * is a RuntimeException thrown by the very method that started the
     * transaction, which would silently undo the revocation it exists to
     * perform.
     */
    @Transactional(noRollbackFor = RefreshTokenReuseException.class)
    public String rotate(String presentedRaw) {
        RefreshToken current = refreshTokenRepository.findByTokenHash(TokenHasher.sha256Hex(presentedRaw))
                .orElseThrow(RefreshTokenReuseException::new);

        if (current.getReplacedBy() != null || current.getRevokedAt() != null
                || current.getExpiresAt().isBefore(Instant.now())) {
            revokeAllForUser(current.getUser().getId());
            auditLogService.record(current.getUser().getId(), AuditAction.USER_PASSWORD_CHANGED,
                    "RefreshToken", current.getId().toString(), "{\"event\":\"reuse_detected\"}");
            throw new RefreshTokenReuseException();
        }

        String newRaw = issue(current.getUser(), current.getApplicationClientId());
        RefreshToken newest = refreshTokenRepository
                .findByTokenHash(TokenHasher.sha256Hex(newRaw)).orElseThrow();
        current.setReplacedBy(newest);
        refreshTokenRepository.save(current);
        return newRaw;
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
