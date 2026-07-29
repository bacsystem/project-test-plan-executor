package com.bacsystem.auth.rbac;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class PermissionCatalogServiceIT extends PostgresRedisTestBase {

    @Autowired private PermissionCatalogService permissionCatalogService;
    @Autowired private PermissionRepository permissionRepository;

    @Test
    void firstSyncAddsAllPermissions() {
        PermissionSyncResult result = permissionCatalogService.sync(
                "catalog-app", Set.of("invoices:read", "invoices:write"));

        assertThat(result.added()).isEqualTo(2);
        assertThat(result.deprecated()).isEqualTo(0);
    }

    @Test
    void secondSyncWithFewerNamesDeprecatesTheMissingOne() {
        permissionCatalogService.sync("catalog-app-2", Set.of("a:read", "a:write"));

        PermissionSyncResult result = permissionCatalogService.sync("catalog-app-2", Set.of("a:read"));

        assertThat(result.deprecated()).isEqualTo(1);
        List<Permission> all = permissionRepository.findByApplicationName("catalog-app-2");
        Permission writePermission = all.stream().filter(p -> p.getName().equals("a:write")).findFirst().orElseThrow();
        assertThat(writePermission.getDeprecatedAt()).isNotNull();
    }

    @Test
    void resubmittingADeprecatedPermissionUndeprecatesIt() {
        permissionCatalogService.sync("catalog-app-3", Set.of("x:read", "x:write"));
        permissionCatalogService.sync("catalog-app-3", Set.of("x:read"));

        permissionCatalogService.sync("catalog-app-3", Set.of("x:read", "x:write"));

        Permission writePermission = permissionRepository.findByApplicationName("catalog-app-3").stream()
                .filter(p -> p.getName().equals("x:write")).findFirst().orElseThrow();
        assertThat(writePermission.getDeprecatedAt()).isNull();
    }

    @Test
    void resyncingTheSameUnchangedSetReportsZeroAdded() {
        // Regression: `added` used to echo the submitted count on every call, so an
        // unchanged catalog of 2 permissions reported added:2 forever, not added:0.
        permissionCatalogService.sync("catalog-app-4", Set.of("b:read", "b:write"));

        PermissionSyncResult result = permissionCatalogService.sync("catalog-app-4", Set.of("b:read", "b:write"));

        assertThat(result.added()).isEqualTo(0);
        assertThat(result.deprecated()).isEqualTo(0);
    }

    @Test
    void syncWithSomeNewAndSomeExistingNamesReportsOnlyTheTrulyNewCount() {
        permissionCatalogService.sync("catalog-app-5", Set.of("c:read"));

        PermissionSyncResult result = permissionCatalogService.sync(
                "catalog-app-5", Set.of("c:read", "c:write", "c:delete"));

        assertThat(result.added()).isEqualTo(2);
        assertThat(result.deprecated()).isEqualTo(0);
    }
}
