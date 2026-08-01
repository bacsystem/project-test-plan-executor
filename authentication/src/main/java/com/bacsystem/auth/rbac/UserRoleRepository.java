package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface UserRoleRepository extends JpaRepository<UserRole, UserRole.Key> {
    List<UserRole> findByUserId(UUID userId);
    long countByRoleId(UUID roleId);

    // Projects the role name directly instead of returning UserRole and letting a
    // caller dereference its lazy `role` association outside the loading session
    // (e.g. from a JWT customizer, which runs outside any @Transactional boundary
    // and previously threw LazyInitializationException here).
    @Query("SELECT r.name FROM UserRole ur JOIN ur.role r WHERE ur.user.id = :userId")
    List<String> findRoleNamesByUserId(UUID userId);

    // Same lazy-association hazard as findRoleNamesByUserId above, but for the
    // GET /v1/users/{userId}/roles listing (RoleService.listRolesForUser), which
    // needs both the role id and name — an interface projection avoids handing a
    // caller-visible `role` association back for dereference outside this
    // repository's (transaction-bound) call.
    @Query("SELECT r.id AS id, r.name AS name FROM UserRole ur JOIN ur.role r WHERE ur.user.id = :userId")
    List<RoleSummaryView> findRoleSummariesByUserId(UUID userId);

    interface RoleSummaryView {
        UUID getId();
        String getName();
    }
}
