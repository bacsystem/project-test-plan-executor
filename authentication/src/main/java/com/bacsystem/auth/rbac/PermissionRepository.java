package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    Optional<Permission> findByApplicationNameAndName(String applicationName, String name);
    List<Permission> findByApplicationName(String applicationName);
}
