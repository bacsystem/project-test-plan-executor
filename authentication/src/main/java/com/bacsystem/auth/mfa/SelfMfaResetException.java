package com.bacsystem.auth.mfa;

public class SelfMfaResetException extends RuntimeException {
    public SelfMfaResetException() {
        super("An administrator cannot reset their own MFA");
    }
}
