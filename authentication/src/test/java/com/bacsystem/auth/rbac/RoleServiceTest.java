package com.bacsystem.auth.rbac;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.tenancy.Tenant;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoleServiceTest {

    @Mock private RoleRepository roleRepository;
    @Mock private PermissionRepository permissionRepository;
    @Mock private RolePermissionRepository rolePermissionRepository;
    @Mock private UserRoleRepository userRoleRepository;
    @Mock private UserRepository userRepository;
    @Mock private AuditLogService auditLogService;

    private RoleService newService() {
        return new RoleService(roleRepository, permissionRepository, rolePermissionRepository,
                userRoleRepository, userRepository, auditLogService);
    }

    @Test
    void staleVersionThrowsBeforeTouchingRolePermissions() {
        UUID roleId = UUID.randomUUID();
        when(roleRepository.touchVersion(roleId, 3L)).thenReturn(0);

        RoleService service = newService();

        assertThrows(RoleVersionConflictException.class,
                () -> service.replacePermissions(roleId, 3L, Set.of(UUID.randomUUID()), UUID.randomUUID()));

        verify(rolePermissionRepository, never()).deleteByRoleId(any());
        verify(rolePermissionRepository, never()).save(any());
    }

    @Test
    void matchingVersionReplacesPermissions() {
        UUID roleId = UUID.randomUUID();
        UUID permissionId = UUID.randomUUID();
        when(roleRepository.touchVersion(roleId, 3L)).thenReturn(1);
        when(roleRepository.findById(roleId)).thenReturn(java.util.Optional.of(new Role()));
        Permission permission = new Permission();
        permission.setId(permissionId);
        when(permissionRepository.findById(permissionId)).thenReturn(java.util.Optional.of(permission));

        RoleService service = newService();
        service.replacePermissions(roleId, 3L, Set.of(permissionId), UUID.randomUUID());

        verify(rolePermissionRepository).deleteByRoleId(roleId);
        verify(rolePermissionRepository, times(1)).save(any());
    }

    @Test
    void deleteRejectedWhenReferencedByUserRoles() {
        UUID roleId = UUID.randomUUID();
        when(userRoleRepository.countByRoleId(roleId)).thenReturn(1L);

        RoleService service = newService();

        assertThrows(RoleInUseException.class, () -> service.deleteRole(roleId, UUID.randomUUID()));
    }

    // ---- Item 1: role assignment / revocation / listing ----

    private User userOf(UUID id, UUID tenantId) {
        User u = new User();
        u.setId(id);
        Tenant t = new Tenant();
        t.setId(tenantId);
        u.setTenant(t);
        return u;
    }

    private Role roleOf(UUID id, UUID tenantId) {
        Role r = new Role();
        r.setId(id);
        if (tenantId != null) {
            Tenant t = new Tenant();
            t.setId(tenantId);
            r.setTenant(t);
        }
        return r;
    }

    @Test
    void assignRoleRejectsWhenUserBelongsToAnotherTenant() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.empty());

        RoleService service = newService();

        assertThrows(UserNotFoundException.class,
                () -> service.assignRole(tenantId, userId, roleId, UUID.randomUUID()));

        verify(userRoleRepository, never()).save(any());
        verify(roleRepository, never()).findById(any());
    }

    @Test
    void assignRoleRejectsWhenRoleBelongsToAnotherTenant() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(roleOf(roleId, UUID.randomUUID())));

        RoleService service = newService();

        assertThrows(RoleNotFoundException.class,
                () -> service.assignRole(tenantId, userId, roleId, UUID.randomUUID()));

        verify(userRoleRepository, never()).save(any());
    }

    @Test
    void assignRoleRejectsNullTenantTemplateRole() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        Role templateRole = roleOf(roleId, null);
        templateRole.setTemplate(true);
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(templateRole));

        RoleService service = newService();

        assertThrows(RoleNotFoundException.class,
                () -> service.assignRole(tenantId, userId, roleId, UUID.randomUUID()));
    }

    @Test
    void assignRoleCreatesAssignmentAndAudits() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        UUID actorId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(roleOf(roleId, tenantId)));
        when(userRoleRepository.existsById(new UserRole.Key(userId, roleId))).thenReturn(false);

        RoleService service = newService();
        service.assignRole(tenantId, userId, roleId, actorId);

        verify(userRoleRepository, times(1)).save(any(UserRole.class));
        verify(auditLogService).record(eq(actorId), eq(AuditAction.ROLE_ASSIGNED), eq("UserRole"), any(), any());
    }

    @Test
    void assignRoleIsIdempotentWhenAlreadyAssigned() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(roleOf(roleId, tenantId)));
        when(userRoleRepository.existsById(new UserRole.Key(userId, roleId))).thenReturn(true);

        RoleService service = newService();
        service.assignRole(tenantId, userId, roleId, UUID.randomUUID());

        verify(userRoleRepository, never()).save(any());
        verify(auditLogService, never()).record(any(), eq(AuditAction.ROLE_ASSIGNED), any(), any(), any());
    }

    @Test
    void revokeRoleRejectsWhenUserBelongsToAnotherTenant() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.empty());

        RoleService service = newService();

        assertThrows(UserNotFoundException.class,
                () -> service.revokeRole(tenantId, userId, roleId, UUID.randomUUID()));

        verify(userRoleRepository, never()).deleteById(any());
    }

    @Test
    void revokeRoleRejectsWhenRoleBelongsToAnotherTenant() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(roleOf(roleId, UUID.randomUUID())));

        RoleService service = newService();

        assertThrows(RoleNotFoundException.class,
                () -> service.revokeRole(tenantId, userId, roleId, UUID.randomUUID()));

        verify(userRoleRepository, never()).deleteById(any());
    }

    @Test
    void revokeRoleDeletesAssignmentAndAudits() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        UUID actorId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(roleOf(roleId, tenantId)));
        when(userRoleRepository.existsById(new UserRole.Key(userId, roleId))).thenReturn(true);

        RoleService service = newService();
        service.revokeRole(tenantId, userId, roleId, actorId);

        verify(userRoleRepository).deleteById(new UserRole.Key(userId, roleId));
        verify(auditLogService).record(eq(actorId), eq(AuditAction.ROLE_REVOKED), eq("UserRole"), any(), any());
    }

    @Test
    void revokeRoleIsIdempotentWhenNotAssigned() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        when(roleRepository.findById(roleId)).thenReturn(Optional.of(roleOf(roleId, tenantId)));
        when(userRoleRepository.existsById(new UserRole.Key(userId, roleId))).thenReturn(false);

        RoleService service = newService();
        service.revokeRole(tenantId, userId, roleId, UUID.randomUUID());

        verify(userRoleRepository, never()).deleteById(any());
        verify(auditLogService, never()).record(any(), eq(AuditAction.ROLE_REVOKED), any(), any(), any());
    }

    @Test
    void listRolesForUserRejectsWhenUserBelongsToAnotherTenant() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.empty());

        RoleService service = newService();

        assertThrows(UserNotFoundException.class, () -> service.listRolesForUser(tenantId, userId));
    }

    @Test
    void listRolesForUserReturnsSummaries() {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(userRepository.findByIdAndTenantId(userId, tenantId)).thenReturn(Optional.of(userOf(userId, tenantId)));
        UserRoleRepository.RoleSummaryView view = mock(UserRoleRepository.RoleSummaryView.class);
        when(view.getId()).thenReturn(roleId);
        when(view.getName()).thenReturn("editor");
        when(userRoleRepository.findRoleSummariesByUserId(userId)).thenReturn(List.of(view));

        RoleService service = newService();
        List<RoleSummary> result = service.listRolesForUser(tenantId, userId);

        assertThat(result).containsExactly(new RoleSummary(roleId, "editor"));
    }

    // ---- Item 3: template roles visible in listByTenant ----

    @Test
    void listByTenantIncludesTenantOwnedAndTemplateRoles() {
        UUID tenantId = UUID.randomUUID();
        Role tenantRole = roleOf(UUID.randomUUID(), tenantId);
        Role templateRole = roleOf(UUID.randomUUID(), null);
        templateRole.setTemplate(true);
        when(roleRepository.findByTenantIdOrTemplate(tenantId)).thenReturn(List.of(tenantRole, templateRole));

        RoleService service = newService();
        List<Role> result = service.listByTenant(tenantId);

        assertThat(result).containsExactly(tenantRole, templateRole);
    }

    // ---- Item 4: N+1 fix for permission lookups on list ----

    @Test
    void getPermissionsByRoleIdsFetchesAllRolesInOneQuery() {
        UUID roleId1 = UUID.randomUUID();
        UUID roleId2 = UUID.randomUUID();
        Role r1 = roleOf(roleId1, UUID.randomUUID());
        Role r2 = roleOf(roleId2, UUID.randomUUID());
        Permission p1 = new Permission();
        p1.setId(UUID.randomUUID());
        Permission p2 = new Permission();
        p2.setId(UUID.randomUUID());

        RolePermission rp1 = new RolePermission();
        rp1.setRole(r1);
        rp1.setPermission(p1);
        RolePermission rp2 = new RolePermission();
        rp2.setRole(r2);
        rp2.setPermission(p2);

        when(rolePermissionRepository.findByRoleIdIn(List.of(roleId1, roleId2))).thenReturn(List.of(rp1, rp2));

        RoleService service = newService();
        Map<UUID, List<UUID>> result = service.getPermissionsByRoleIds(List.of(roleId1, roleId2));

        assertThat(result.get(roleId1)).containsExactly(p1.getId());
        assertThat(result.get(roleId2)).containsExactly(p2.getId());
        verify(rolePermissionRepository, times(1)).findByRoleIdIn(any());
        verify(rolePermissionRepository, never()).findByRoleId(any());
    }
}
