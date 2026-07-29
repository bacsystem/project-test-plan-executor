package com.bacsystem.auth.mfa;

import java.util.UUID;

/**
 * What an MFA challenge ticket resolves to once verified: the user who
 * passed the first login factor, and which application they're logging
 * into — {@code /v1/auth/mfa/verify} needs the latter to issue tokens for
 * the right {@code RegisteredClient} (Task 31).
 */
public record MfaChallengeContext(UUID userId, String applicationClientId) {

    String toRedisValue() {
        return userId + "|" + applicationClientId;
    }

    static MfaChallengeContext fromRedisValue(String value) {
        String[] parts = value.split("\\|", 2);
        return new MfaChallengeContext(UUID.fromString(parts[0]), parts[1]);
    }
}
