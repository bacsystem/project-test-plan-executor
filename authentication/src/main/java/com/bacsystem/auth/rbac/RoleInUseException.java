package com.bacsystem.auth.rbac;

import java.util.UUID;

public class RoleInUseException extends RuntimeException {
    public RoleInUseException(UUID roleId) {
        super("Role is still assigned to users: " + roleId);
    }
}
