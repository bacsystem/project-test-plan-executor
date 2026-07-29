package com.bacsystem.auth.identity;

import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * What a must-change-password challenge ticket resolves to once redeemed:
 * the user who passed the first login factor with a temporary password, which
 * application they're logging into — {@code POST /v1/auth/password/change-required}
 * needs this to issue tokens for the right {@code RegisteredClient}, exactly as
 * {@code MfaController.verify} does for the {@code mfa_required} branch — and the
 * scopes originally requested on the password-grant step, so the token pair
 * issued after the forced change carries the same scopes it would have without
 * this gate instead of silently dropping them.
 *
 * <p>Deliberately mirrors {@code com.bacsystem.auth.mfa.MfaChallengeContext}
 * field-for-field and serialization-for-serialization: this is the same
 * "partial auth, more steps required" shape, just gated on
 * {@code User.isMustChangePassword()} instead of MFA enrollment.
 */
public record PasswordChangeChallengeContext(UUID userId, String applicationClientId, Set<String> scopes) {

    String toRedisValue() {
        return userId + "|" + applicationClientId + "|" + String.join(",", scopes);
    }

    static PasswordChangeChallengeContext fromRedisValue(String value) {
        String[] parts = value.split("\\|", 3);
        Set<String> scopes = parts.length > 2 && !parts[2].isEmpty()
                ? Arrays.stream(parts[2].split(",")).collect(Collectors.toUnmodifiableSet())
                : Set.of();
        return new PasswordChangeChallengeContext(UUID.fromString(parts[0]), parts[1], scopes);
    }
}
