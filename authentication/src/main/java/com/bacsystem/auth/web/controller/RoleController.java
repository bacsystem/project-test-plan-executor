package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.rbac.Role;
import com.bacsystem.auth.rbac.RoleNotFoundException;
import com.bacsystem.auth.rbac.RoleService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return roleService.listByTenant(tenantIdOf(auth)).stream()
                .map(r -> toResponse(r, permissionIdsOf(r.getId())))
                .toList();
    }

    @GetMapping("/{id}")
    public RoleResponse get(@PathVariable UUID id, JwtAuthenticationToken auth) {
        Role role = requireOwnedRole(id, auth);
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
     * Loads the role and enforces the multi-tenancy boundary: a role that
     * belongs to another tenant must 404, not leak its existence/contents to
     * a caller who merely guessed or observed its id (cross-tenant IDOR).
     */
    private Role requireOwnedRole(UUID id, JwtAuthenticationToken auth) {
        Role role = roleService.getRole(id);
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
