package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByTenantIdAndName(UUID tenantId, String name);
    List<Role> findByTenantId(UUID tenantId);

    /**
     * Atomically bumps the version only if it still matches what the caller
     * read — returns 0 (no row updated) on a stale version, 1 on success.
     * Postgres row-level locking makes this safe under real concurrency:
     * two transactions racing on the same WHERE clause serialize on the
     * row lock, and only the first to commit sees its predicate still hold.
     * {@code clearAutomatically}: without it, the persistence context keeps
     * serving the pre-update (stale-version) {@code Role} instance to the
     * {@code findById} calls later in {@code replacePermissions} — not a
     * concurrency-safety issue (the UPDATE itself is still atomic), but it
     * would hand the client back a `version` that's already one behind,
     * producing a spurious 409 on their very next legitimate request.
     */
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE Role r SET r.version = r.version + 1 WHERE r.id = :id AND r.version = :expectedVersion")
    int touchVersion(@Param("id") UUID id, @Param("expectedVersion") long expectedVersion);
}
