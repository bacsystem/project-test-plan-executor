package com.bacsystem.auth.identity;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String email) {
        super("Email already registered in this tenant: " + email);
    }
}
