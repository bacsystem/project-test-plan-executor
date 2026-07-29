package com.bacsystem.auth.mfa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface MfaCredentialRepository extends JpaRepository<MfaCredential, UUID> {
    Optional<MfaCredential> findByUserIdAndActiveTrue(UUID userId);
    Optional<MfaCredential> findFirstByUserIdAndActiveFalseOrderByCreatedAtDesc(UUID userId);
}
