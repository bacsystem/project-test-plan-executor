package com.bacsystem.auth.rbac;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ApplicationClientRepository extends JpaRepository<ApplicationClient, UUID> {
    Optional<ApplicationClient> findByClientId(String clientId);
}
