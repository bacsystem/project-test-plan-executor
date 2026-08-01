package com.bacsystem.auth.rbac;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "applications")
@Getter
@Setter
public class ApplicationClient {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "client_id", nullable = false, unique = true)
    private String clientId;

    @Column(name = "client_secret_hash", nullable = false)
    private String clientSecretHash;

    @Column(name = "client_name", nullable = false)
    private String clientName;

    @Column(nullable = false, length = 500)
    private String scopes;

    @Column(name = "authorization_grant_types", nullable = false)
    private String authorizationGrantTypes;

    @Column(name = "client_authentication_methods", nullable = false)
    private String clientAuthenticationMethods;

    @Column(name = "access_token_ttl_seconds", nullable = false)
    private Integer accessTokenTtlSeconds = 900;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
