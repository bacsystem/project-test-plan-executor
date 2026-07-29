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

    @Modifying
    @Query(value = """
            INSERT INTO permissions (application_name, name)
            VALUES (:applicationName, :name)
            ON CONFLICT (application_name, name) DO UPDATE SET deprecated_at = NULL
            """, nativeQuery = true)
    void upsertActive(@Param("applicationName") String applicationName, @Param("name") String name);

    @Modifying
    @Query("UPDATE Permission p SET p.deprecatedAt = CURRENT_TIMESTAMP " +
           "WHERE p.applicationName = :applicationName AND p.name NOT IN :names AND p.deprecatedAt IS NULL")
    int deprecateMissing(@Param("applicationName") String applicationName, @Param("names") Set<String> names);
}
