package com.bacsystem.auth.onetime;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface OneTimeTokenRepository extends JpaRepository<OneTimeToken, UUID> {
    Optional<OneTimeToken> findByTokenHashAndRedeemedAtIsNull(String tokenHash);
}
