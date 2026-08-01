package com.bacsystem.auth.rbac;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;

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

    /**
     * Item 1's genuine race: many threads all attempting a FIRST-time
     * {@code assignRole} of the exact same (user, role) pair concurrently. Each
     * thread's {@code existsById} pre-check can observe "not yet assigned" before
     * any of the others commits, so more than one can reach the {@code save()}
     * call — at that point {@code user_roles}' PK constraint (enforced via
     * {@code UserRole}'s {@code Persistable} implementation, which forces a real
     * INSERT rather than a silent UPSERT) is the actual arbiter, and every loser
     * surfaces a {@code DataIntegrityViolationException} out of {@code assignRole}
     * rather than the pre-check's own {@link RoleAlreadyAssignedException}. This
     * proves that race is safe at the service/DB layer — exactly one writer wins,
     * every other writer fails with one of the two expected, already-mapped-to-409
     * exceptions, and nothing escapes as an unmapped exception (which is what
     * would eventually surface as a raw 500 through ProblemDetailAdvice if this
     * regressed). The end-to-end HTTP-level mapping of
     * DataIntegrityViolationException to 409 itself is covered separately by
     * UserControllerTest.assignRoleRaceThatSurfacesAsDataIntegrityViolationMapsTo409NotRaw500
     * (a real race isn't reliably forceable through the full HTTP stack) and by
     * ProblemDetailAdviceTest.dataIntegrityViolationMapsTo409WithGenericConflictCode.
     */
    @Test
    void concurrentFirstTimeAssignsOfTheSameUserRolePairNeverProduceAnUnmappedFailure() throws Exception {
        Tenant tenant = new Tenant();
        tenant.setSlug("concurrency-assign-" + System.nanoTime());
        tenant.setName("Concurrency Assign Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        UUID tenantId = tenant.getId();

        User actor = new User();
        actor.setTenant(tenant);
        actor.setEmail("concurrency-assign-actor-" + System.nanoTime() + "@example.com");
        actor.setPasswordHash("unused");
        actor = userRepository.saveAndFlush(actor);
        UUID actorId = actor.getId();

        User target = new User();
        target.setTenant(tenant);
        target.setEmail("concurrency-assign-target-" + System.nanoTime() + "@example.com");
        target.setPasswordHash("unused");
        target = userRepository.saveAndFlush(target);
        UUID targetUserId = target.getId();

        Role role = new Role();
        role.setTenant(tenant);
        role.setName("concurrency-assign-role");
        role = roleRepository.saveAndFlush(role);
        UUID roleId = role.getId();

        int writerCount = 20;
        ExecutorService pool = Executors.newFixedThreadPool(writerCount);
        AtomicInteger okCount = new AtomicInteger();
        AtomicInteger conflictCount = new AtomicInteger();
        List<Throwable> unexpected = new CopyOnWriteArrayList<>();

        List<Callable<Void>> tasks = new java.util.ArrayList<>();
        for (int writer = 0; writer < writerCount; writer++) {
            tasks.add(() -> {
                try {
                    roleService.assignRole(tenantId, targetUserId, roleId, actorId);
                    okCount.incrementAndGet();
                } catch (RoleAlreadyAssignedException | DataIntegrityViolationException expected) {
                    // both are the already-mapped-to-409 outcomes for the losing side of the race
                    // (see the Javadoc above) — either is an acceptable "lost the race" result.
                    conflictCount.incrementAndGet();
                } catch (Throwable t) {
                    unexpected.add(t);
                }
                return null;
            });
        }
        List<Future<Void>> futures = pool.invokeAll(tasks);
        for (Future<Void> f : futures) f.get();
        pool.shutdown();

        assertThat(unexpected).isEmpty();
        assertThat(okCount.get()).isEqualTo(1);
        assertThat(conflictCount.get()).isEqualTo(writerCount - 1);
    }
}
