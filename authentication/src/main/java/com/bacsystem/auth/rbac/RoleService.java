package com.bacsystem.auth.rbac;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.tenancy.Tenant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final UserRoleRepository userRoleRepository;
    private final AuditLogService auditLogService;

    public RoleService(RoleRepository roleRepository, PermissionRepository permissionRepository,
                        RolePermissionRepository rolePermissionRepository, UserRoleRepository userRoleRepository,
                        AuditLogService auditLogService) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.auditLogService = auditLogService;
    }

    @Transactional
    public Role createRole(UUID tenantId, String name, boolean isTemplate, UUID actorUserId) {
        if (roleRepository.findByTenantIdAndName(tenantId, name).isPresent()) {
            throw new DuplicateRoleNameException(name);
        }
        Role role = new Role();
        Tenant tenantRef = new Tenant();
        tenantRef.setId(tenantId);
        role.setTenant(tenantRef);
        role.setName(name);
        role.setTemplate(isTemplate);
        Role saved = roleRepository.save(role);
        auditLogService.record(actorUserId, AuditAction.ROLE_CREATED, "Role", saved.getId().toString(),
                "{\"name\":\"" + name + "\"}");
        return saved;
    }

    public Role getRole(UUID roleId) {
        return roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
    }

    public List<RolePermission> getPermissions(UUID roleId) {
        return rolePermissionRepository.findByRoleId(roleId);
    }

    public List<Role> listByTenant(UUID tenantId) {
        return roleRepository.findByTenantId(tenantId);
    }

    /**
     * §9.4's concurrency-critical replace. The version check happens via a
     * single atomic conditional UPDATE (touchVersion) BEFORE any
     * role_permissions row is touched — a stale version never reaches the
     * delete/insert below.
     */
    @Transactional
    public Role replacePermissions(UUID roleId, long expectedVersion, Set<UUID> permissionIds, UUID actorUserId) {
        int updated = roleRepository.touchVersion(roleId, expectedVersion);
        if (updated == 0) {
            throw new RoleVersionConflictException();
        }

        rolePermissionRepository.deleteByRoleId(roleId);
        Role role = roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
        for (UUID permissionId : permissionIds) {
            Permission permission = permissionRepository.findById(permissionId)
                    .orElseThrow(() -> new IllegalArgumentException("Unknown permission: " + permissionId));
            RolePermission rp = new RolePermission();
            rp.setRole(role);
            rp.setPermission(permission);
            rolePermissionRepository.save(rp);
        }

        auditLogService.record(actorUserId, AuditAction.ROLE_PERMISSIONS_REPLACED, "Role", roleId.toString(),
                "{\"permissionCount\":" + permissionIds.size() + "}");
        return roleRepository.findById(roleId).orElseThrow(() -> new RoleNotFoundException(roleId));
    }

    @Transactional
    public void deleteRole(UUID roleId, UUID actorUserId) {
        if (userRoleRepository.countByRoleId(roleId) > 0) {
            throw new RoleInUseException(roleId);
        }
        rolePermissionRepository.deleteByRoleId(roleId);
        roleRepository.deleteById(roleId);
        auditLogService.record(actorUserId, AuditAction.ROLE_DELETED, "Role", roleId.toString(), "{}");
    }
}
