package com.bacsystem.auth.rbac;

import java.util.UUID;

/**
 * Minimal role representation returned by {@link RoleService#listRolesForUser}
 * — deliberately not the {@link Role} entity itself, so a caller-facing
 * listing never leaks internal fields (tenant, version, template flag, ...).
 */
public record RoleSummary(UUID id, String name) {
}
