package com.bacsystem.auth.support;

import java.util.Arrays;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Serializes/deserializes the {@code (userId, applicationClientId, scopes)}
 * payload shared by every short-lived "partial auth, more steps required"
 * challenge ticket — {@code com.bacsystem.auth.mfa.MfaChallengeContext} and
 * {@code com.bacsystem.auth.identity.PasswordChangeChallengeContext} — to/from
 * the pipe-delimited string stored as the Redis value.
 */
public final class ChallengeContextCodec {

    private ChallengeContextCodec() {}

    public record Decoded(UUID userId, String applicationClientId, Set<String> scopes) {}

    public static String encode(UUID userId, String applicationClientId, Set<String> scopes) {
        return userId + "|" + applicationClientId + "|" + String.join(",", scopes);
    }

    public static Decoded decode(String value) {
        String[] parts = value.split("\\|", 3);
        Set<String> scopes = parts.length > 2 && !parts[2].isEmpty()
                ? Arrays.stream(parts[2].split(",")).collect(Collectors.toUnmodifiableSet())
                : Set.of();
        return new Decoded(UUID.fromString(parts[0]), parts[1], scopes);
    }
}
