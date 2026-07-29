package com.bacsystem.auth.security;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

// The database's real primary key is (id, attempted_at) — required by
// PostgreSQL for a partitioned table (see V9 migration) — but this entity is
// insert-only and never looked up by id alone, so JPA only needs id as the
// session-identity column.
@Entity
@Table(name = "login_attempts")
@Getter
@Setter
public class LoginAttempt {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "email_attempted", nullable = false)
    private String emailAttempted;

    @Column(name = "ip_address", nullable = false, length = 45)
    private String ipAddress;

    @Column(nullable = false)
    private boolean success;

    @Column(name = "attempted_at", nullable = false)
    private Instant attemptedAt = Instant.now();
}
