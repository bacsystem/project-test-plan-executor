package com.bacsystem.auth.identity;

/**
 * Mirrors {@code com.bacsystem.auth.mfa.MfaChallengeExpiredException}: the
 * single-use Redis ticket behind {@code POST /v1/auth/password/change-required}
 * was missing, expired, or already consumed — restart login from the password
 * step to get a fresh one.
 */
public class PasswordChangeChallengeExpiredException extends RuntimeException {
    public PasswordChangeChallengeExpiredException() {
        super("Password-change challenge expired, invalid, or already used — restart login from the password step");
    }
}
