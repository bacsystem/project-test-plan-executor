package com.bacsystem.auth.rbac;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;
import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;

class PermissionCatalogServiceConcurrencyIT extends PostgresRedisTestBase {

    @Autowired private PermissionCatalogService permissionCatalogService;
    @Autowired private PermissionRepository permissionRepository;

    // Regression for the read-then-write race in sync(): reading "already
    // active" names BEFORE the upsert loop let two concurrent syncs of the
    // same brand-new name both observe it as "not yet active" and both claim
    // it in their own `added` count, double-counting it in the audit log even
    // though the `permissions` table itself only ever ends up with one row
    // (the upsert's `ON CONFLICT` makes the actual data race-safe; only the
    // reported count wasn't). The fix derives `added` from what each upsert
    // itself did (Postgres `xmax = 0` on the RETURNING row = genuine INSERT),
    // so the sum across every concurrent caller must be exactly 1, matching
    // the single row that ends up in the table.
    @Test
    void concurrentSyncsOfTheSameNewPermissionReportExactlyOneAddedTotal() throws Exception {
        String applicationName = "concurrency-catalog-app-" + System.nanoTime();
        String newPermissionName = "reports:export";
        int writers = 20;

        ExecutorService pool = Executors.newFixedThreadPool(writers);
        AtomicInteger totalAdded = new AtomicInteger();
        List<Callable<Void>> tasks = new java.util.ArrayList<>();
        for (int i = 0; i < writers; i++) {
            tasks.add(() -> {
                PermissionSyncResult result = permissionCatalogService.sync(
                        applicationName, Set.of(newPermissionName));
                totalAdded.addAndGet(result.added());
                return null;
            });
        }
        List<Future<Void>> futures = pool.invokeAll(tasks);
        for (Future<Void> f : futures) f.get(); // propagate any unexpected exception
        pool.shutdown();

        assertThat(totalAdded.get()).isEqualTo(1);

        List<Permission> stored = permissionRepository.findByApplicationName(applicationName).stream()
                .filter(p -> p.getName().equals(newPermissionName))
                .toList();
        assertThat(stored).hasSize(1);
        assertThat(stored.get(0).getDeprecatedAt()).isNull();
    }
}
