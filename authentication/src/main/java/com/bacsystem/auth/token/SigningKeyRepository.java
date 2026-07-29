package com.bacsystem.auth.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SigningKeyRepository extends JpaRepository<SigningKey, UUID> {
    List<SigningKey> findByStatusIn(List<SigningKeyStatus> statuses);
    Optional<SigningKey> findByStatus(SigningKeyStatus status);
    Optional<SigningKey> findByKid(String kid);

    /**
     * Inserts a new ACTIVE signing key only if no ACTIVE key currently exists, relying on the
     * partial unique index {@code signing_keys_one_active_idx} (status = 'ACTIVE') as the
     * database-level backstop for the single-active-key invariant. Returns the number of rows
     * inserted (0 or 1) instead of throwing on conflict, so callers can fall back to reading the
     * row a concurrent winner just inserted rather than crashing on a constraint violation.
     */
    @Modifying
    @Query(value = """
            INSERT INTO signing_keys (kid, algorithm, private_key_pem, public_key_pem, status)
            VALUES (:kid, :algorithm, :privateKeyPem, :publicKeyPem, 'ACTIVE')
            ON CONFLICT (status) WHERE status = 'ACTIVE' DO NOTHING
            """, nativeQuery = true)
    int insertActiveKeyIfAbsent(@Param("kid") String kid, @Param("algorithm") String algorithm,
                                 @Param("privateKeyPem") String privateKeyPem, @Param("publicKeyPem") String publicKeyPem);
}
