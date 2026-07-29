package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface RolePermissionRepository extends JpaRepository<RolePermission, RolePermission.Key> {
    List<RolePermission> findByRoleId(UUID roleId);

    // Batch variant backing RoleService.getPermissionsByRoleIds — RoleController.list()
    // used to call findByRoleId once per role (N+1 queries for N roles); this fetches
    // every role's permissions in a single query, grouped by role id in memory instead.
    List<RolePermission> findByRoleIdIn(Collection<UUID> roleIds);

    long countByPermissionId(UUID permissionId);
    void deleteByRoleId(UUID roleId);
}
