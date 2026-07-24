package com.bacsystem.auth.rbac;

import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Arrays;
import java.util.UUID;

/**
 * Adapts {@link ApplicationClient} rows to Spring Authorization Server's
 * {@link RegisteredClientRepository} contract. The {@code applications} table
 * is the single source of truth (§6) — this class is the only place
 * {@link RegisteredClient} objects get built.
 */
@Component
public class JpaRegisteredClientRepository implements RegisteredClientRepository {

    private final ApplicationClientRepository repository;

    public JpaRegisteredClientRepository(ApplicationClientRepository repository) {
        this.repository = repository;
    }

    @Override
    public void save(RegisteredClient registeredClient) {
        throw new UnsupportedOperationException(
                "Applications are provisioned by Flyway migration only (§6) — no dynamic client registration");
    }

    @Override
    public RegisteredClient findById(String id) {
        return repository.findById(UUID.fromString(id)).map(this::toRegisteredClient).orElse(null);
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        return repository.findByClientId(clientId).map(this::toRegisteredClient).orElse(null);
    }

    private RegisteredClient toRegisteredClient(ApplicationClient app) {
        RegisteredClient.Builder builder = RegisteredClient.withId(app.getId().toString())
                .clientId(app.getClientId())
                .clientSecret(app.getClientSecretHash())
                .clientName(app.getClientName())
                .tokenSettings(TokenSettings.builder()
                        .accessTokenTimeToLive(Duration.ofSeconds(app.getAccessTokenTtlSeconds()))
                        .build());

        Arrays.stream(app.getClientAuthenticationMethods().split(","))
                .map(String::trim)
                .forEach(m -> builder.clientAuthenticationMethod(new ClientAuthenticationMethod(m)));
        Arrays.stream(app.getAuthorizationGrantTypes().split(","))
                .map(String::trim)
                .forEach(g -> builder.authorizationGrantType(new AuthorizationGrantType(g)));
        Arrays.stream(app.getScopes().split(","))
                .map(String::trim)
                .forEach(builder::scope);

        return builder.build();
    }
}
