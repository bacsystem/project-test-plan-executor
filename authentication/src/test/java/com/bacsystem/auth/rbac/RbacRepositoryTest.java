package com.bacsystem.auth.rbac;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class RbacRepositoryTest extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PermissionRepository permissionRepository;
    @Autowired private RolePermissionRepository rolePermissionRepository;

    @Test
    void roleVersionIncrementsOnUpdate() {
        Tenant tenant = tenantRepository.saveAndFlush(newTenant());
        Role role = new Role();
        role.setTenant(tenant);
        role.setName("editor");
        role.setTemplate(false);
        Role saved = roleRepository.saveAndFlush(role);
        assertThat(saved.getVersion()).isEqualTo(0L);

        saved.setName("editor-renamed");
        Role updated = roleRepository.saveAndFlush(saved);
        assertThat(updated.getVersion()).isEqualTo(1L);
    }

    @Test
    void concurrentUpdateWithStaleVersionThrows() {
        Tenant tenant = tenantRepository.saveAndFlush(newTenant());
        Role role = new Role();
        role.setTenant(tenant);
        role.setName("stale-test");
        role.setTemplate(false);
        Role saved = roleRepository.saveAndFlush(role);

        Role copy1 = roleRepository.findById(saved.getId()).orElseThrow();
        Role copy2 = roleRepository.findById(saved.getId()).orElseThrow();

        copy1.setName("first-writer");
        roleRepository.saveAndFlush(copy1);

        copy2.setName("second-writer");
        assertThrows(ObjectOptimisticLockingFailureException.class,
                () -> roleRepository.saveAndFlush(copy2));
    }

    // @Transactional keeps role/permission attached to one persistence context,
    // mirroring how a real @Transactional service method would call this —
    // Hibernate requires the associations backing an @IdClass key to be
    // managed (not detached) when persisting the owning row.
    @Test
    @Transactional
    void rolePermissionCompositeKeyPreventsDuplicateAssignment() {
        Tenant tenant = tenantRepository.saveAndFlush(newTenant());
        Role role = new Role();
        role.setTenant(tenant);
        role.setName("dup-perm-test");
        role.setTemplate(false);
        role = roleRepository.saveAndFlush(role);

        Permission permission = new Permission();
        permission.setApplicationName("example-app");
        permission.setName("invoices:read");
        permission = permissionRepository.saveAndFlush(permission);

        RolePermission rp = new RolePermission();
        rp.setRole(role);
        rp.setPermission(permission);
        rolePermissionRepository.saveAndFlush(rp);

        RolePermission dup = new RolePermission();
        dup.setRole(role);
        dup.setPermission(permission);

        assertThrows(org.springframework.dao.DataIntegrityViolationException.class,
                () -> rolePermissionRepository.saveAndFlush(dup));
    }

    private Tenant newTenant() {
        Tenant t = new Tenant();
        t.setSlug("rbac-" + System.nanoTime());
        t.setName("RBAC Test Tenant");
        return t;
    }
}
