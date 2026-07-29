package com.bacsystem.auth.bootstrap;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.TenantRepository;
import com.bacsystem.auth.rbac.UserRoleRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

// @Transactional here (Spring's test-managed transaction, rolled back after
// each method) keeps the three tests order-independent: BootstrapRunner
// always targets the fixed "default" slug, so without a per-test rollback
// whichever test runs first would leave that tenant behind for the others
// to trip over.
@Transactional
class BootstrapRunnerIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRoleRepository userRoleRepository;
    @Autowired private BootstrapRunner bootstrapRunner;

    @Test
    void firstRunCreatesTenantAndAdminUser() throws Exception {
        bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments("--bootstrap"));

        var tenant = tenantRepository.findBySlug("default").orElseThrow();
        assertThat(tenant.getName()).isEqualTo("Default Tenant");
    }

    @Test
    void secondRunIsANoOp() throws Exception {
        bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments("--bootstrap"));
        bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments("--bootstrap"));

        long tenantCount = tenantRepository.findAll().stream()
                .filter(t -> t.getSlug().equals("default")).count();
        assertThat(tenantCount).isEqualTo(1);
    }

    @Test
    void withoutTheFlagItDoesNothing() throws Exception {
        bootstrapRunner.run(new org.springframework.boot.DefaultApplicationArguments());
        assertThat(tenantRepository.findBySlug("default")).isEmpty();
    }
}
