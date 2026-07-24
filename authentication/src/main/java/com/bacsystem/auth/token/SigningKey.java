package com.bacsystem.auth.token;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "signing_keys")
@Getter
@Setter
public class SigningKey {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, unique = true, length = 64)
    private String kid;

    @Column(nullable = false, length = 10)
    private String algorithm;

    @Column(name = "private_key_pem", nullable = false, columnDefinition = "TEXT")
    private String privateKeyPem;

    @Column(name = "public_key_pem", nullable = false, columnDefinition = "TEXT")
    private String publicKeyPem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SigningKeyStatus status;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "retire_at")
    private Instant retireAt;

    @Column(name = "retired_at")
    private Instant retiredAt;
}
