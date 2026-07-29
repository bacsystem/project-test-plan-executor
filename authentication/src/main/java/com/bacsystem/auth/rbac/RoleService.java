package com.bacsystem.auth.rbac;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.tenancy.Tenant;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditLogService;

    public RoleService(RoleRepository roleRepository, PermissionRepository permissionRepository,
                        RolePermissionRepository rolePermissionRepository, UserRoleRepository userRoleRepository,
                        UserRepository userRepository, AuditLogService auditLogService) {
        this.roleRepository = roleRepository;
        this.permissionRepository = permissionRepository;
        this.rolePermissionRepository = rolePermissionRepository;
        this.userRoleRepository = userRoleRepository;
        this.userRepository = userRepository;
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

    // Batch variant of getPermissions — fetches every role's permissions in a single
    // query (RolePermissionRepository.findByRoleIdIn) and groups them in memory,
    // instead of the N+1 query pattern of calling getPermissions once per role
    // (RoleController.list() used to do exactly that).
    public Map<UUID, List<UUID>> getPermissionsByRoleIds(Collection<UUID> roleIds) {
        return rolePermissionRepository.findByRoleIdIn(roleIds).stream()
                .collect(Collectors.groupingBy(rp -> rp.getRole().getId(),
                        Collectors.mapping(rp -> rp.getPermission().getId(), Collectors.toList())));
    }

    // Includes null-tenant, is_template=true roles alongside the tenant's own roles
    // (§6, §9.3 — shared template roles) via RoleRepository.findByTenantIdOrTemplate;
    // see requireReadableRole in RoleController for the matching single-role read path.
    public List<Role> listByTenant(UUID tenantId) {
        return roleRepository.findByTenantIdOrTemplate(tenantId);
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

    /**
     * Grants {@code roleId} to {@code userId}. Both the target user and the target
     * role must belong to {@code tenantId} (multi-tenancy — mirrors the discipline
     * {@code RoleController.requireOwnedRole}/{@code UserService.getById(tenant, id)}
     * already apply individually; this is the same check on both sides of the
     * assignment at once). Idempotent: re-assigning an already-assigned pair is a
     * no-op success rather than a constraint-violation throw, relying on UserRole's
     * {@code Persistable} fix (Item 2) only to guarantee the underlying PK is safe —
     * the idempotency check itself happens here, before any write is attempted.
     */
    @Transactional
    public void assignRole(UUID tenantId, UUID userId, UUID roleId, UUID actorUserId) {
        User user = requireTenantOwnedUser(tenantId, userId);
        Role role = requireTenantOwnedRole(tenantId, roleId);

        UserRole.Key key = new UserRole.Key(userId, roleId);
        if (userRoleRepository.existsById(key)) {
            return;
        }

        User actorRef = new User();
        actorRef.setId(actorUserId);

        UserRole assignment = new UserRole();
        assignment.setUser(user);
        assignment.setRole(role);
        assignment.setAssignedBy(actorRef);
        userRoleRepository.save(assignment);

        auditLogService.record(actorUserId, AuditAction.ROLE_ASSIGNED, "UserRole",
                userId + ":" + roleId, "{\"userId\":\"" + userId + "\",\"roleId\":\"" + roleId + "\"}");
    }

    /**
     * Revokes {@code roleId} from {@code userId}, with the same tenant-ownership
     * checks as {@link #assignRole}. Idempotent in the same spirit: revoking a pair
     * that was never assigned is a no-op success, not a throw (Spring Data's default
     * {@code deleteById} throws {@code EmptyResultDataAccessException} on a missing
     * row, which would otherwise turn a harmless "already revoked" retry into a 500).
     */
    @Transactional
    public void revokeRole(UUID tenantId, UUID userId, UUID roleId, UUID actorUserId) {
        requireTenantOwnedUser(tenantId, userId);
        requireTenantOwnedRole(tenantId, roleId);

        UserRole.Key key = new UserRole.Key(userId, roleId);
        if (!userRoleRepository.existsById(key)) {
            return;
        }
        userRoleRepository.deleteById(key);

        auditLogService.record(actorUserId, AuditAction.ROLE_REVOKED, "UserRole",
                userId + ":" + roleId, "{\"userId\":\"" + userId + "\",\"roleId\":\"" + roleId + "\"}");
    }

    /**
     * Lists the roles currently assigned to {@code userId}, tenant-scoped the same
     * way as {@link #assignRole}/{@link #revokeRole}. Returns {@link RoleSummary}
     * (id + name only) rather than the {@link Role} entity, both to avoid leaking
     * internal fields and to sidestep the lazy-association-outside-transaction
     * hazard {@code UserRoleRepository.findRoleNamesByUserId} already documents.
     */
    public List<RoleSummary> listRolesForUser(UUID tenantId, UUID userId) {
        requireTenantOwnedUser(tenantId, userId);
        return userRoleRepository.findRoleSummariesByUserId(userId).stream()
                .map(v -> new RoleSummary(v.getId(), v.getName()))
                .toList();
    }

    private User requireTenantOwnedUser(UUID tenantId, UUID userId) {
        return userRepository.findByIdAndTenantId(userId, tenantId)
                .orElseThrow(() -> new UserNotFoundException(userId));
    }

    /**
     * Same ownership discipline as {@code RoleController.requireOwnedRole}: a role
     * genuinely owned by another tenant, OR a null-tenant shared template role
     * (read-only from a tenant's perspective — see Item 3 / requireReadableRole),
     * must be treated as not found here. Role assignment is a mutation, so a
     * template role is out of scope for it just like it is for
     * replacePermissions/deleteRole.
     */
    private Role requireTenantOwnedRole(UUID tenantId, UUID roleId) {
        Role role = getRole(roleId);
        if (role.getTenant() == null || !tenantId.equals(role.getTenant().getId())) {
            throw new RoleNotFoundException(roleId);
        }
        return role;
    }
}
