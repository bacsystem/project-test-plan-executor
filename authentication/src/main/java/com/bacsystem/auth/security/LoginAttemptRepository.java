package com.bacsystem.auth.security;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, UUID> {
    List<LoginAttempt> findByIpAddressAndSuccessFalseAndAttemptedAtAfter(String ipAddress, Instant after);
    List<LoginAttempt> findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(String email, Instant after);

    // Used to reset the failure window on a successful login (§13): failures
    // recorded before the most recent success no longer count toward lockout.
    Optional<LoginAttempt> findTopByEmailAttemptedAndSuccessTrueOrderByAttemptedAtDesc(String email);
    Optional<LoginAttempt> findTopByIpAddressAndSuccessTrueOrderByAttemptedAtDesc(String ipAddress);
}
