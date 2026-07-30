package com.bacsystem.auth.rbac;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
public class PermissionCatalogService {

    private final PermissionRepository permissionRepository;
    private final AuditLogService auditLogService;

    public PermissionCatalogService(PermissionRepository permissionRepository, AuditLogService auditLogService) {
        this.permissionRepository = permissionRepository;
        this.auditLogService = auditLogService;
    }

    /**
     * Idempotent, atomic sync of one application's full permission list
     * (§9.2). Safe against concurrent replicas of the same app calling this
     * simultaneously: each upsert is its own `ON CONFLICT` statement, not a
     * read-then-write, and the "added" count comes straight out of that same
     * atomic statement (via Postgres's `xmax = 0` RETURNING idiom — see
     * PermissionRepository.upsertActive) rather than a separate pre-read of
     * "already active" names. A separate read-then-count would leave a window
     * where two concurrent syncs of the same app both read a brand-new name as
     * "not yet active" and both claim it as their own "added", double-counting
     * it in the audit log even though the actual row is upserted exactly once.
     * <p>
     * A permission being resynced after it was previously deprecated also
     * counts as "added" — it's a real, user-facing reactivation, not a no-op.
     * That case is an UPDATE at the row level (xmax != 0), so upsertActive's
     * own result can't see it. PermissionRepository.lockAndCheckWasDeprecated
     * is called first, in the same transaction, to lock and read that row's
     * prior deprecated_at with `SELECT ... FOR UPDATE` before the upsert
     * applies; that row lock is what keeps two concurrent reactivations of the
     * SAME name from both claiming "added" (the second call's lock wait means
     * it always re-reads the first call's already-committed, no-longer-
     * deprecated row) — see the Javadoc on lockAndCheckWasDeprecated for why a
     * single-statement CTE couldn't be used instead.
     */
    @Transactional
    public PermissionSyncResult sync(String applicationName, Set<String> permissionNames) {
        int added = 0;
        for (String name : permissionNames) {
            List<Boolean> existing = permissionRepository.lockAndCheckWasDeprecated(applicationName, name);
            boolean wasDeprecated = !existing.isEmpty() && Boolean.TRUE.equals(existing.get(0));
            boolean inserted = permissionRepository.upsertActive(applicationName, name);
            if (inserted || wasDeprecated) {
                added++;
            }
        }
        // JPQL "NOT IN :names" is undefined for an empty collection, so an empty
        // sync (deprecate everything) needs a placeholder no real name can match.
        Set<String> namesOrPlaceholder = permissionNames.isEmpty() ? Set.of("__none__") : permissionNames;
        int deprecated = permissionRepository.deprecateMissing(applicationName, namesOrPlaceholder);

        auditLogService.record(null, AuditAction.PERMISSION_CATALOG_SYNCED, "Application", applicationName,
                "{\"added\":" + added + ",\"deprecated\":" + deprecated + "}");
        return new PermissionSyncResult(added, deprecated);
    }
}
