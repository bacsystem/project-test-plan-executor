package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Optional<Role> findByTenantIdAndName(UUID tenantId, String name);
    List<Role> findByTenantId(UUID tenantId);
}
