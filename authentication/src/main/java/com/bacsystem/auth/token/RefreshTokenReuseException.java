package com.bacsystem.auth.token;

public class RefreshTokenReuseException extends RuntimeException {
    public RefreshTokenReuseException() {
        super("Refresh token reuse detected — chain revoked");
    }
}
