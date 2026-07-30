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

    // Returns true only when this call performed a genuine INSERT (a brand-new
    // row, or a row created by a concurrent racer that beat us to the
    // ON CONFLICT) — false when it updated an already-existing row. Postgres
    // system column `xmax` is 0 on a row's own freshly-inserted version and
    // non-zero once any UPDATE has touched it, so `xmax = 0` on the RETURNING
    // row is the standard idiom for "was this row just inserted". This makes
    // PermissionCatalogService.sync's "added" count come straight out of the
    // atomic upsert itself instead of a separate read-then-count step, so two
    // concurrent syncs racing on the same new name can never both claim it.
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
