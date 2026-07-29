package com.bacsystem.auth.mfa;

import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * What an MFA challenge ticket resolves to once verified: the user who
 * passed the first login factor, which application they're logging into —
 * {@code /v1/auth/mfa/verify} needs this to issue tokens for the right
 * {@code RegisteredClient} (Task 31) — and the scopes originally requested
 * on the password-grant step, so the token pair issued after MFA carries
 * the same scopes it would have without MFA instead of silently dropping
 * them.
 */
public record MfaChallengeContext(UUID userId, String applicationClientId, Set<String> scopes) {

    String toRedisValue() {
        return userId + "|" + applicationClientId + "|" + String.join(",", scopes);
    }

    static MfaChallengeContext fromRedisValue(String value) {
        String[] parts = value.split("\\|", 3);
        Set<String> scopes = parts.length > 2 && !parts[2].isEmpty()
                ? Arrays.stream(parts[2].split(",")).collect(Collectors.toUnmodifiableSet())
                : Set.of();
        return new MfaChallengeContext(UUID.fromString(parts[0]), parts[1], scopes);
    }
}
