package com.bacsystem.auth.identity;

import com.bacsystem.auth.support.ChallengeContextCodec;
import java.util.Set;
import java.util.UUID;

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
 * field-for-field: this is the same "partial auth, more steps required" shape,
 * just gated on {@code User.isMustChangePassword()} instead of MFA enrollment.
 * Both share their Redis-value serialization via {@link ChallengeContextCodec}.
 */
public record PasswordChangeChallengeContext(UUID userId, String applicationClientId, Set<String> scopes) {

    String toRedisValue() {
        return ChallengeContextCodec.encode(userId, applicationClientId, scopes);
    }

    static PasswordChangeChallengeContext fromRedisValue(String value) {
        ChallengeContextCodec.Decoded decoded = ChallengeContextCodec.decode(value);
        return new PasswordChangeChallengeContext(decoded.userId(), decoded.applicationClientId(), decoded.scopes());
    }
}
