package com.bacsystem.auth.security;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, UUID> {
    List<LoginAttempt> findByIpAddressAndSuccessFalseAndAttemptedAtAfter(String ipAddress, Instant after);
    List<LoginAttempt> findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(String email, Instant after);
}
