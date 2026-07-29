package com.bacsystem.auth.security;

public class AccountLockedException extends RuntimeException {
    public AccountLockedException() {
        super("locked");
    }
}
