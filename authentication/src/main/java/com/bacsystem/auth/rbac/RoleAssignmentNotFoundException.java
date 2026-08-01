package com.bacsystem.auth.rbac;

import java.util.UUID;

public class RoleAssignmentNotFoundException extends RuntimeException {
    public RoleAssignmentNotFoundException(UUID userId, UUID roleId) {
        super("Role " + roleId + " is not assigned to user " + userId);
    }
}
