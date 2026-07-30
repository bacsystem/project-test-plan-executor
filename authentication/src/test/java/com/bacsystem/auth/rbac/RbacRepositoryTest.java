package com.bacsystem.auth.rbac;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class RbacRepositoryTest extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PermissionRepository permissionRepository;
    @Autowired private RolePermissionRepository rolePermissionRepository;
    @Autowired private UserRoleRepository userRoleRepository;

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

    // Mirrors rolePermissionCompositeKeyPreventsDuplicateAssignment above: user_roles
    // has the same @IdClass-from-two-non-generated-@ManyToOne shape, which made
    // save() route through merge() (silent UPSERT) instead of persist() (real INSERT)
    // — see UserRole's Persistable<Key> implementation for the fix this proves.
    @Test
    @Transactional
    void userRoleCompositeKeyPreventsDuplicateAssignment() {
        Tenant tenant = tenantRepository.saveAndFlush(newTenant());

        User assignee = new User();
        assignee.setTenant(tenant);
        assignee.setEmail("assignee-" + System.nanoTime() + "@example.com");
        assignee.setPasswordHash("unused");
        assignee = userRepository.saveAndFlush(assignee);

        User assigner = new User();
        assigner.setTenant(tenant);
        assigner.setEmail("assigner-" + System.nanoTime() + "@example.com");
        assigner.setPasswordHash("unused");
        assigner = userRepository.saveAndFlush(assigner);

        Role role = new Role();
        role.setTenant(tenant);
        role.setName("dup-user-role-test");
        role.setTemplate(false);
        role = roleRepository.saveAndFlush(role);

        UserRole assignment = new UserRole();
        assignment.setUser(assignee);
        assignment.setRole(role);
        assignment.setAssignedBy(assigner);
        userRoleRepository.saveAndFlush(assignment);

        UserRole dup = new UserRole();
        dup.setUser(assignee);
        dup.setRole(role);
        dup.setAssignedBy(assigner);

        assertThrows(org.springframework.dao.DataIntegrityViolationException.class,
                () -> userRoleRepository.saveAndFlush(dup));
    }

    // Item 3: findByTenantIdOrTemplate must surface the tenant's own roles AND
    // every shared (null-tenant, is_template=true) role — but never another
    // tenant's own role, nor a stray null-tenant/non-template row (shouldn't
    // occur in practice, but the query's OR clause must not accidentally admit it).
    @Test
    void findByTenantIdOrTemplateIncludesOwnRolesAndTemplatesOnly() {
        long marker = System.nanoTime();
        Tenant tenantA = tenantRepository.saveAndFlush(newTenant());
        Tenant tenantB = tenantRepository.saveAndFlush(newTenant());

        Role ownRole = new Role();
        ownRole.setTenant(tenantA);
        ownRole.setName("own-role-" + marker);
        ownRole = roleRepository.saveAndFlush(ownRole);

        Role otherTenantsRole = new Role();
        otherTenantsRole.setTenant(tenantB);
        otherTenantsRole.setName("other-tenant-role-" + marker);
        otherTenantsRole = roleRepository.saveAndFlush(otherTenantsRole);

        Role template = new Role();
        template.setTenant(null);
        template.setTemplate(true);
        template.setName("shared-template-" + marker);
        template = roleRepository.saveAndFlush(template);

        Role strayNullNonTemplate = new Role();
        strayNullNonTemplate.setTenant(null);
        strayNullNonTemplate.setTemplate(false);
        strayNullNonTemplate.setName("stray-null-non-template-" + marker);
        strayNullNonTemplate = roleRepository.saveAndFlush(strayNullNonTemplate);

        // The shared DB model means findByTenantIdOrTemplate's null-tenant/template
        // branch can also surface template roles created by other test classes, so
        // the result set is scoped down to only the role IDs this test created
        // before asserting on it (own role, other tenant's role, the shared
        // template, and the stray null-tenant/non-template row).
        List<java.util.UUID> ownIds = List.of(
                ownRole.getId(), otherTenantsRole.getId(), template.getId(), strayNullNonTemplate.getId());

        List<Role> result = roleRepository.findByTenantIdOrTemplate(tenantA.getId()).stream()
                .filter(r -> ownIds.contains(r.getId()))
                .toList();

        assertThat(result).extracting(Role::getId)
                .containsExactlyInAnyOrder(ownRole.getId(), template.getId());
    }

    private Tenant newTenant() {
        Tenant t = new Tenant();
        t.setSlug("rbac-" + System.nanoTime());
        t.setName("RBAC Test Tenant");
        return t;
    }
}
