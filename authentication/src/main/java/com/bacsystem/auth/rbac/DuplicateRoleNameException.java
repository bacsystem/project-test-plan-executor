package com.bacsystem.auth.rbac;

public class DuplicateRoleNameException extends RuntimeException {
    public DuplicateRoleNameException(String name) {
        super("Role name already exists in this tenant: " + name);
    }
}
