package com.bacsystem.auth.mfa;

public class MfaVerificationFailedException extends RuntimeException {
    public MfaVerificationFailedException() {
        super("authentication_failed");
    }
}
