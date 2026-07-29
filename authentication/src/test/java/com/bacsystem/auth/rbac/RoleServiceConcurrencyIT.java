package com.bacsystem.auth.rbac;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

class RoleServiceConcurrencyIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PermissionRepository permissionRepository;
    @Autowired private RolePermissionRepository rolePermissionRepository;
    @Autowired private RoleService roleService;

    @Test
    void twentyConcurrentWritersNeverProduceAUnion() throws Exception {
        Tenant tenant = new Tenant();
        tenant.setSlug("concurrency-" + System.nanoTime());
        tenant.setName("Concurrency Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        // audit_log.actor_user_id carries a real FK to users(id); a plain
        // UUID.randomUUID() here would fail the audit write inside the same
        // transaction as the version-checked update, not the race itself.
        User actor = new User();
        actor.setTenant(tenant);
        actor.setEmail("concurrency-actor-" + System.nanoTime() + "@example.com");
        actor.setPasswordHash("unused");
        actor = userRepository.saveAndFlush(actor);
        UUID actorId = actor.getId();

        Role role = new Role();
        role.setTenant(tenant);
        role.setName("concurrency-role");
        role = roleRepository.saveAndFlush(role);
        long startingVersion = role.getVersion();
        UUID roleId = role.getId();

        List<Permission> permissions = new java.util.ArrayList<>();
        for (int i = 0; i < 20; i++) {
            Permission p = new Permission();
            p.setApplicationName("example-app");
            p.setName("perm-" + i);
            permissions.add(permissionRepository.saveAndFlush(p));
        }

        ExecutorService pool = Executors.newFixedThreadPool(20);
        AtomicInteger okCount = new AtomicInteger();
        AtomicInteger conflictCount = new AtomicInteger();
        List<Set<UUID>> submittedSets = new CopyOnWriteArrayList<>();

        List<Callable<Void>> tasks = new java.util.ArrayList<>();
        for (int writer = 0; writer < 20; writer++) {
            Set<UUID> permsForThisWriter = Set.of(permissions.get(writer).getId());
            tasks.add(() -> {
                try {
                    roleService.replacePermissions(roleId, startingVersion, permsForThisWriter, actorId);
                    okCount.incrementAndGet();
                    submittedSets.add(permsForThisWriter);
                } catch (RoleVersionConflictException e) {
                    conflictCount.incrementAndGet();
                }
                return null;
            });
        }
        List<Future<Void>> futures = pool.invokeAll(tasks);
        for (Future<Void> f : futures) f.get(); // propagate any unexpected exception (would show as a non-2xx/409 in k6)
        pool.shutdown();

        // exactly one writer's conditional UPDATE succeeds against the shared starting version
        assertThat(okCount.get()).isEqualTo(1);
        assertThat(conflictCount.get()).isEqualTo(19);

        List<RolePermission> finalState = rolePermissionRepository.findByRoleId(roleId);
        assertThat(finalState).hasSize(1);
        assertThat(submittedSets).hasSize(1);
        assertThat(finalState.get(0).getPermission().getId()).isEqualTo(submittedSets.get(0).iterator().next());
    }
}
