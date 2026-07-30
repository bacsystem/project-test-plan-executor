package com.bacsystem.auth.rbac;

import java.util.UUID;

public class RoleAlreadyAssignedException extends RuntimeException {
    public RoleAlreadyAssignedException(UUID userId, UUID roleId) {
        super("Role " + roleId + " is already assigned to user " + userId);
    }
}
