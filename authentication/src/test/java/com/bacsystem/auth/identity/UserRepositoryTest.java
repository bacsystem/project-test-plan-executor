package com.bacsystem.auth.identity;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class UserRepositoryTest extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;

    private Tenant tenant() {
        Tenant t = new Tenant();
        t.setSlug("acme-" + System.nanoTime());
        t.setName("Acme");
        return tenantRepository.saveAndFlush(t);
    }

    @Test
    void savesAndFindsByTenantAndEmail() {
        Tenant tenant = tenant();
        User user = new User();
        user.setTenant(tenant);
        user.setEmail("admin@acme.test");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        user.setMustChangePassword(true);
        User saved = userRepository.saveAndFlush(user);

        assertThat(saved.getId()).isNotNull();

        Optional<User> found = userRepository.findByTenantIdAndEmail(tenant.getId(), "admin@acme.test");
        assertThat(found).isPresent();
        assertThat(found.get().isMustChangePassword()).isTrue();
    }

    @Test
    void sameEmailAllowedAcrossDifferentTenants() {
        Tenant tenantA = tenant();
        Tenant tenantB = tenant();

        User userA = new User();
        userA.setTenant(tenantA);
        userA.setEmail("shared@example.test");
        userA.setPasswordHash("{argon2}hash");
        userA.setStatus(UserStatus.ACTIVE);
        userRepository.saveAndFlush(userA);

        User userB = new User();
        userB.setTenant(tenantB);
        userB.setEmail("shared@example.test");
        userB.setPasswordHash("{argon2}hash");
        userB.setStatus(UserStatus.ACTIVE);

        // must not throw — composite uniqueness is (tenant_id, email), not global (spec §5)
        userRepository.saveAndFlush(userB);
    }

    @Test
    void duplicateEmailWithinSameTenantRejected() {
        Tenant tenant = tenant();
        User first = new User();
        first.setTenant(tenant);
        first.setEmail("dup@acme.test");
        first.setPasswordHash("{argon2}hash");
        first.setStatus(UserStatus.ACTIVE);
        userRepository.saveAndFlush(first);

        User second = new User();
        second.setTenant(tenant);
        second.setEmail("dup@acme.test");
        second.setPasswordHash("{argon2}hash");
        second.setStatus(UserStatus.ACTIVE);

        org.junit.jupiter.api.Assertions.assertThrows(
                org.springframework.dao.DataIntegrityViolationException.class,
                () -> userRepository.saveAndFlush(second));
    }
}
