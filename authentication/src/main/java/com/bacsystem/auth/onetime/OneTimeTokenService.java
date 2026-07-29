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
     */
    @Transactional
    public String requestPasswordReset(UUID tenantId, String email) {
        Optional<User> user = userService.findByTenantAndEmail(tenantId, email);
        if (user.isEmpty()) {
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
