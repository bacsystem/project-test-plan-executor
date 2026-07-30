package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    Optional<Permission> findByApplicationNameAndName(String applicationName, String name);
    List<Permission> findByApplicationName(String applicationName);

    // Locks and reads the pre-existing row for (applicationName, name), if
    // any, BEFORE the upsert in upsertActive() runs. Must be called first,
    // in the same transaction, immediately before upsertActive() for the
    // same key — see PermissionCatalogService.sync().
    //
    // This is the concurrency control for classifying a reactivated
    // (previously-deprecated) permission as "added": the `FOR UPDATE` lock
    // on the specific (application_name, name) key means two concurrent
    // upserts of the SAME name serialize against each other — the second
    // caller's SELECT ... FOR UPDATE blocks until the first caller's
    // transaction commits, and then it re-reads the row's *new*, already-
    // committed state (Postgres always re-fetches the latest committed
    // version once a FOR UPDATE wait is released), so only the first, true
    // reactivation can ever observe "was previously deprecated". A row that
    // doesn't exist yet simply can't be locked (0 rows, no wait) — that's
    // fine, because a brand-new name's "added" classification is decided
    // entirely by upsertActive()'s own xmax=0 check, not by this method.
    //
    // (An earlier attempt folded this into a single `WITH existing AS
    // MATERIALIZED (... FOR UPDATE) INSERT ... RETURNING` statement, on the
    // theory that a materialized CTE runs to completion before the main
    // statement. Verified empirically against Postgres 16 that this does
    // NOT hold here: since "existing" is only referenced from the lazily-
    // evaluated RETURNING subquery, its FOR UPDATE scan is deferred until
    // after the INSERT/ON CONFLICT has already applied, so it silently sees
    // the post-upsert row instead of the pre-upsert one. Two real,
    // sequential statements — sharing the same transaction/connection via
    // @Transactional — is what actually gives the ordering guarantee.)
    @Query(value = "SELECT (deprecated_at IS NOT NULL) FROM permissions " +
            "WHERE application_name = :applicationName AND name = :name FOR UPDATE",
            nativeQuery = true)
    List<Boolean> lockAndCheckWasDeprecated(@Param("applicationName") String applicationName,
                                             @Param("name") String name);

    // Returns true only when this call performed a genuine INSERT (a brand-new
    // row, or a row created by a concurrent racer that beat us to the
    // ON CONFLICT) — false when it updated an already-existing row. Postgres
    // system column `xmax` is 0 on a row's own freshly-inserted version and
    // non-zero once any UPDATE has touched it, so `xmax = 0` on the RETURNING
    // row is the standard idiom for "was this row just inserted". This makes
    // PermissionCatalogService.sync's "added" count come straight out of the
    // atomic upsert itself instead of a separate read-then-count step, so two
    // concurrent syncs racing on the same new name can never both claim it.
    // (Reactivation of an existing, previously-deprecated row is an UPDATE —
    // xmax != 0 — so it is NOT reflected here; see lockAndCheckWasDeprecated
    // and PermissionCatalogService.sync for how that case is still counted
    // as "added".)
    @Query(value = """
            INSERT INTO permissions (application_name, name)
            VALUES (:applicationName, :name)
            ON CONFLICT (application_name, name) DO UPDATE SET deprecated_at = NULL
            RETURNING (xmax = 0) AS inserted
            """, nativeQuery = true)
    boolean upsertActive(@Param("applicationName") String applicationName, @Param("name") String name);

    @Modifying
    @Query("UPDATE Permission p SET p.deprecatedAt = CURRENT_TIMESTAMP " +
           "WHERE p.applicationName = :applicationName AND p.name NOT IN :names AND p.deprecatedAt IS NULL")
    int deprecateMissing(@Param("applicationName") String applicationName, @Param("names") Set<String> names);
}
