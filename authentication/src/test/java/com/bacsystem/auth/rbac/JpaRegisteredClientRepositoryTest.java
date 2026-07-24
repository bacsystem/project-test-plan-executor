package com.bacsystem.auth.rbac;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

import static org.assertj.core.api.Assertions.assertThat;

class JpaRegisteredClientRepositoryTest extends PostgresRedisTestBase {

    @Autowired
    private JpaRegisteredClientRepository repository;

    @Test
    void findsSeededExampleApp() {
        RegisteredClient client = repository.findByClientId("example-app");

        assertThat(client).isNotNull();
        assertThat(client.getAuthorizationGrantTypes())
                .contains(AuthorizationGrantType.REFRESH_TOKEN);
        assertThat(client.getClientAuthenticationMethods())
                .contains(ClientAuthenticationMethod.CLIENT_SECRET_BASIC);
    }

    @Test
    void findsById() {
        RegisteredClient byClientId = repository.findByClientId("example-app");
        RegisteredClient byId = repository.findById(byClientId.getId());

        assertThat(byId.getClientId()).isEqualTo("example-app");
    }
}
