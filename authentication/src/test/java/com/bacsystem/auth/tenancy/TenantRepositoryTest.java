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
        Tenant tenant = new Tenant();
        tenant.setSlug("acme");
        tenant.setName("Acme Corp");
        Tenant saved = tenantRepository.save(tenant);

        assertThat(saved.getId()).isNotNull();

        Optional<Tenant> found = tenantRepository.findBySlug("acme");
        assertThat(found).isPresent();
        assertThat(found.get().getName()).isEqualTo("Acme Corp");
    }

    @Test
    void slugIsUnique() {
        Tenant first = new Tenant();
        first.setSlug("dup");
        first.setName("First");
        tenantRepository.saveAndFlush(first);

        Tenant second = new Tenant();
        second.setSlug("dup");
        second.setName("Second");

        org.junit.jupiter.api.Assertions.assertThrows(
                org.springframework.dao.DataIntegrityViolationException.class,
                () -> tenantRepository.saveAndFlush(second));
    }
}
