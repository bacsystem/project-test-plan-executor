package com.bacsystem.auth.rbac;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Exercises RoleService.assignRole/revokeRole/listRolesForUser (Item 1) against a
 * real database — UserControllerTest is Mockito-only (RoleService itself mocked
 * out), so it proves request wiring but not the actual persistence path, the
 * UserRole.Persistable idempotency guard (Item 2), or a real cross-tenant IDOR
 * rejection the way RoleControllerTest's own role-scoping regression tests do.
 */
class RoleAssignmentIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private UserRoleRepository userRoleRepository;
    @Autowired private RoleService roleService;

    private Tenant newTenant() {
        Tenant t = new Tenant();
        t.setSlug("assign-it-" + System.nanoTime());
        t.setName("Assignment IT Tenant");
        return tenantRepository.saveAndFlush(t);
    }

    private User newUser(Tenant tenant) {
        User u = new User();
        u.setTenant(tenant);
        u.setEmail("user-" + System.nanoTime() + "@example.com");
        u.setPasswordHash("unused");
        return userRepository.saveAndFlush(u);
    }

    private Role newRole(Tenant tenant) {
        Role r = new Role();
        r.setTenant(tenant);
        r.setName("role-" + System.nanoTime());
        return roleRepository.saveAndFlush(r);
    }

    @Test
    @Transactional
    void assignThenListThenRevokeRoundTripsAgainstRealDatabase() {
        Tenant tenant = newTenant();
        User target = newUser(tenant);
        User actor = newUser(tenant);
        Role role = newRole(tenant);

        roleService.assignRole(tenant.getId(), target.getId(), role.getId(), actor.getId());

        List<RoleSummary> afterAssign = roleService.listRolesForUser(tenant.getId(), target.getId());
        assertThat(afterAssign).containsExactly(new RoleSummary(role.getId(), role.getName()));

        // re-assignment now matches spec §11 (409 already-assigned), not silent idempotency
        assertThrows(RoleAlreadyAssignedException.class,
                () -> roleService.assignRole(tenant.getId(), target.getId(), role.getId(), actor.getId()));
        assertThat(userRoleRepository.findByUserId(target.getId())).hasSize(1);

        roleService.revokeRole(tenant.getId(), target.getId(), role.getId(), actor.getId());
        assertThat(roleService.listRolesForUser(tenant.getId(), target.getId())).isEmpty();

        // revoking a non-existent assignment now matches spec §11 (404), not silent idempotency
        assertThrows(RoleAssignmentNotFoundException.class,
                () -> roleService.revokeRole(tenant.getId(), target.getId(), role.getId(), actor.getId()));
    }

    @Test
    @Transactional
    void assignRejectsRealCrossTenantUser() {
        Tenant tenantA = newTenant();
        Tenant tenantB = newTenant();
        User userInTenantB = newUser(tenantB);
        User actor = newUser(tenantA);
        Role roleInTenantA = newRole(tenantA);

        assertThrows(UserNotFoundException.class,
                () -> roleService.assignRole(tenantA.getId(), userInTenantB.getId(), roleInTenantA.getId(), actor.getId()));

        assertThat(userRoleRepository.findByUserId(userInTenantB.getId())).isEmpty();
    }

    @Test
    @Transactional
    void assignRejectsRealCrossTenantRole() {
        Tenant tenantA = newTenant();
        Tenant tenantB = newTenant();
        User userInTenantA = newUser(tenantA);
        User actor = newUser(tenantA);
        Role roleInTenantB = newRole(tenantB);

        assertThrows(RoleNotFoundException.class,
                () -> roleService.assignRole(tenantA.getId(), userInTenantA.getId(), roleInTenantB.getId(), actor.getId()));

        assertThat(userRoleRepository.findByUserId(userInTenantA.getId())).isEmpty();
    }
}
