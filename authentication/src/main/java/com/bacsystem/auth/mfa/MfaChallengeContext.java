package com.bacsystem.auth.mfa;

import com.bacsystem.auth.support.ChallengeContextCodec;
import java.util.Set;
import java.util.UUID;

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
        return ChallengeContextCodec.encode(userId, applicationClientId, scopes);
    }

    static MfaChallengeContext fromRedisValue(String value) {
        ChallengeContextCodec.Decoded decoded = ChallengeContextCodec.decode(value);
        return new MfaChallengeContext(decoded.userId(), decoded.applicationClientId(), decoded.scopes());
    }
}
