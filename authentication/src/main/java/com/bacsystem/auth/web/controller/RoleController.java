package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.rbac.Role;
import com.bacsystem.auth.rbac.RoleNotFoundException;
import com.bacsystem.auth.rbac.RoleService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/v1/roles")
public class RoleController {

    public record CreateRoleRequest(String name, boolean isTemplate) {}
    public record ReplacePermissionsRequest(long version, Set<UUID> permissionIds) {}
    public record RoleResponse(UUID id, String name, long version, List<UUID> permissions) {}

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @PostMapping
    public RoleResponse create(@RequestBody CreateRoleRequest request, JwtAuthenticationToken auth) {
        Role role = roleService.createRole(tenantIdOf(auth), request.name(), request.isTemplate(), actorIdOf(auth));
        return toResponse(role, List.of());
    }

    @GetMapping
    public List<RoleResponse> list(JwtAuthenticationToken auth) {
        List<Role> roles = roleService.listByTenant(tenantIdOf(auth));
        // Batch-fetch every role's permissions in one query instead of calling
        // permissionIdsOf(r.getId()) — i.e. roleService.getPermissions — once per
        // role (N+1: previously one query per role in this stream).
        Map<UUID, List<UUID>> permissionsByRole =
                roleService.getPermissionsByRoleIds(roles.stream().map(Role::getId).toList());
        return roles.stream()
                .map(r -> toResponse(r, permissionsByRole.getOrDefault(r.getId(), List.of())))
                .toList();
    }

    @GetMapping("/{id}")
    public RoleResponse get(@PathVariable UUID id, JwtAuthenticationToken auth) {
        Role role = requireReadableRole(id, auth);
        return toResponse(role, permissionIdsOf(id));
    }

    @PutMapping("/{id}/permissions")
    public RoleResponse replacePermissions(@PathVariable UUID id, @RequestBody ReplacePermissionsRequest request,
                                            JwtAuthenticationToken auth) {
        requireOwnedRole(id, auth);
        Role role = roleService.replacePermissions(id, request.version(), request.permissionIds(), actorIdOf(auth));
        return toResponse(role, permissionIdsOf(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id, JwtAuthenticationToken auth) {
        requireOwnedRole(id, auth);
        roleService.deleteRole(id, actorIdOf(auth));
    }

    /**
     * Loads the role and enforces the multi-tenancy boundary for MUTATIONS
     * (replacePermissions, delete): a role that belongs to another tenant must
     * 404, not leak its existence/contents to a caller who merely guessed or
     * observed its id (cross-tenant IDOR). A null-tenant shared template role
     * (roles.tenant_id is nullable by design, see V5__create_rbac_tables.sql)
     * is deliberately 404'd here too — templates are read-only from every
     * tenant's perspective (see requireReadableRole below for the read path;
     * §6/§9.3 minimal scope decision), never owned/mutable by any one tenant.
     */
    private Role requireOwnedRole(UUID id, JwtAuthenticationToken auth) {
        Role role = roleService.getRole(id);
        if (role.getTenant() == null || !tenantIdOf(auth).equals(role.getTenant().getId())) {
            throw new RoleNotFoundException(id);
        }
        return role;
    }

    /**
     * Same boundary as {@link #requireOwnedRole}, but for the single-role READ
     * path (GET /v1/roles/{id}) only: a null-tenant, is_template=true role is a
     * shared template meant to be readable by every tenant (§6, §9.3 — see
     * RoleService.listByTenant's companion change for the list-endpoint side of
     * this), so it is NOT 404'd here the way it is for mutations. A role that is
     * genuinely owned by a different tenant still 404s, same as always.
     */
    private Role requireReadableRole(UUID id, JwtAuthenticationToken auth) {
        Role role = roleService.getRole(id);
        if (role.getTenant() == null) {
            if (role.isTemplate()) {
                return role;
            }
            throw new RoleNotFoundException(id);
        }
        if (!tenantIdOf(auth).equals(role.getTenant().getId())) {
            throw new RoleNotFoundException(id);
        }
        return role;
    }

    private List<UUID> permissionIdsOf(UUID roleId) {
        return roleService.getPermissions(roleId).stream()
                .map(rp -> rp.getPermission().getId()).toList();
    }

    private UUID tenantIdOf(JwtAuthenticationToken auth) {
        return UUID.fromString(((Jwt) auth.getPrincipal()).getClaimAsString("tenant"));
    }

    private UUID actorIdOf(JwtAuthenticationToken auth) {
        return UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
    }

    private RoleResponse toResponse(Role role, List<UUID> permissionIds) {
        return new RoleResponse(role.getId(), role.getName(), role.getVersion(), permissionIds);
    }
}
