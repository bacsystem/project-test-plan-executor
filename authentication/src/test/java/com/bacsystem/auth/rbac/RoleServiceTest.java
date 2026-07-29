package com.bacsystem.auth.rbac;

import com.bacsystem.auth.audit.AuditLogService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Set;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RoleServiceTest {

    @Mock private RoleRepository roleRepository;
    @Mock private PermissionRepository permissionRepository;
    @Mock private RolePermissionRepository rolePermissionRepository;
    @Mock private UserRoleRepository userRoleRepository;
    @Mock private AuditLogService auditLogService;

    private RoleService newService() {
        return new RoleService(roleRepository, permissionRepository, rolePermissionRepository,
                userRoleRepository, auditLogService);
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
}
