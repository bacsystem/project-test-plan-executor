package com.bacsystem.auth.mfa;

public class MfaChallengeExpiredException extends RuntimeException {
    public MfaChallengeExpiredException() {
        super("MFA challenge expired, invalid, or already used — restart login from the password step");
    }
}
