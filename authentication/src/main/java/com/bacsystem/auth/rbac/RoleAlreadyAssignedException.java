package com.bacsystem.auth.rbac;

import java.util.UUID;

public class RoleAlreadyAssignedException extends RuntimeException {
    public RoleAlreadyAssignedException(UUID userId, UUID roleId) {
        super("Role " + roleId + " is already assigned to user " + userId);
    }

    /**
     * Used when the {@code user_roles} PK violation is observed only as a raw
     * {@code DataIntegrityViolationException} (e.g. {@code ProblemDetailAdvice}'s
     * DB-layer backstop), where the specific user/role pair is not available.
     */
    public RoleAlreadyAssignedException() {
        super("Role is already assigned to user");
    }
}
