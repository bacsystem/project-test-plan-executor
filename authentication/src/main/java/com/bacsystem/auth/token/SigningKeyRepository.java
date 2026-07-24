package com.bacsystem.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SigningKeyRepository extends JpaRepository<SigningKey, UUID> {
    List<SigningKey> findByStatusIn(List<SigningKeyStatus> statuses);
    Optional<SigningKey> findByStatus(SigningKeyStatus status);
    Optional<SigningKey> findByKid(String kid);
}
