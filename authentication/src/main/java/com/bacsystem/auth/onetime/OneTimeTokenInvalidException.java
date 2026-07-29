package com.bacsystem.auth.onetime;

public class OneTimeTokenInvalidException extends RuntimeException {
    public OneTimeTokenInvalidException() {
        super("One-time token is invalid, expired, or already redeemed");
    }
}
