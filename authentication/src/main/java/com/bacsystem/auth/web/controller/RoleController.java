package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.rbac.Role;
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
                .map(r -> toResponse(r, roleService.getPermissions(r.getId()).stream()
                        .map(rp -> rp.getPermission().getId()).toList()))
                .toList();
    }

    @GetMapping("/{id}")
    public RoleResponse get(@PathVariable UUID id) {
        Role role = roleService.getRole(id);
        List<UUID> permissionIds = roleService.getPermissions(id).stream()
                .map(rp -> rp.getPermission().getId()).toList();
        return toResponse(role, permissionIds);
    }

    @PutMapping("/{id}/permissions")
    public RoleResponse replacePermissions(@PathVariable UUID id, @RequestBody ReplacePermissionsRequest request,
                                            JwtAuthenticationToken auth) {
        Role role = roleService.replacePermissions(id, request.version(), request.permissionIds(), actorIdOf(auth));
        List<UUID> permissionIds = roleService.getPermissions(id).stream()
                .map(rp -> rp.getPermission().getId()).toList();
        return toResponse(role, permissionIds);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id, JwtAuthenticationToken auth) {
        roleService.deleteRole(id, actorIdOf(auth));
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
