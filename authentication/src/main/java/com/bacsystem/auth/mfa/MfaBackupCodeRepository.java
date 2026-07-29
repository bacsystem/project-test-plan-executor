package com.bacsystem.auth.mfa;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MfaBackupCodeRepository extends JpaRepository<MfaBackupCode, UUID> {
    List<MfaBackupCode> findByUserIdAndUsedAtIsNull(UUID userId);
}
