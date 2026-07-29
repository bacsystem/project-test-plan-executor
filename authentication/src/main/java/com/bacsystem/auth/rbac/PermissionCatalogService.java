package com.bacsystem.auth.rbac;

import com.bacsystem.auth.audit.AuditAction;
import com.bacsystem.auth.audit.AuditLogService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
     * read-then-write.
     */
    @Transactional
    public PermissionSyncResult sync(String applicationName, Set<String> permissionNames) {
        // Read the "already active" set BEFORE the upsert loop below changes it —
        // whatever isn't in it is genuinely newly-added by this call (§9.2's
        // "added" is the newly-added count, not the submitted count).
        int alreadyActiveCount = permissionNames.isEmpty() ? 0
                : permissionRepository.findActiveNames(applicationName, permissionNames).size();
        int added = permissionNames.size() - alreadyActiveCount;

        for (String name : permissionNames) {
            permissionRepository.upsertActive(applicationName, name);
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
