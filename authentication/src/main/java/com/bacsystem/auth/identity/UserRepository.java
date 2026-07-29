package com.bacsystem.auth.identity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByTenantIdAndEmail(UUID tenantId, String email);
    Optional<User> findByIdAndTenantId(UUID id, UUID tenantId);
    Page<User> findByTenantId(UUID tenantId, Pageable pageable);

    List<User> findByTenantIdAndCreatedAtGreaterThanOrderByCreatedAtAsc(
            UUID tenantId, Instant after, Pageable limit);
}
