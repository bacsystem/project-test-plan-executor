package com.bacsystem.auth.rbac;

public class RoleVersionConflictException extends RuntimeException {
    public RoleVersionConflictException() {
        super("Role was modified by another writer — reread and retry");
    }
}
