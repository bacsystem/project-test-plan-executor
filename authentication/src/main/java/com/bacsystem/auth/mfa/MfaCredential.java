package com.bacsystem.auth.mfa;

import com.bacsystem.auth.identity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "mfa_credentials")
@Getter
@Setter
public class MfaCredential {

    @Id
    @GeneratedValue
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "encrypted_secret", nullable = false)
    private String encryptedSecret;

    @Column(nullable = false)
    private boolean active = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
