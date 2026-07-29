package com.bacsystem.auth.identity;

public class WeakPasswordException extends RuntimeException {
    public WeakPasswordException(String reason) {
        super(reason);
    }
}
