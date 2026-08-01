package com.bacsystem.auth.tenancy;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class TenantRepositoryTest extends PostgresRedisTestBase {

    @Autowired
    private TenantRepository tenantRepository;

    @Test
    void savesAndFindsBySlug() {
        // The tenants table is shared across the whole test JVM (singleton container pattern in
        // PostgresRedisTestBase), and slug has a UNIQUE constraint, so a hardcoded literal here
        // would collide with any other test/class using the same slug. Use a nanoTime-suffixed
        // value, matching the convention used elsewhere (e.g. PasswordGrantIT, UserRepositoryTest).
        String slug = "acme-" + System.nanoTime();
        Tenant tenant = new Tenant();
        tenant.setSlug(slug);
        tenant.setName("Acme Corp");
        Tenant saved = tenantRepository.save(tenant);

        assertThat(saved.getId()).isNotNull();

        Optional<Tenant> found = tenantRepository.findBySlug(slug);
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Acme Corp");
    }

    @Test
    void slugIsUnique() {
        String slug = "dup-" + System.nanoTime();
        Tenant first = new Tenant();
        first.setSlug(slug);
        first.setName("First");
        tenantRepository.saveAndFlush(first);

        Tenant second = new Tenant();
        second.setSlug(slug);
        second.setName("Second");

        org.junit.jupiter.api.Assertions.assertThrows(
                org.springframework.dao.DataIntegrityViolationException.class,
                () -> tenantRepository.saveAndFlush(second));
    }
}
