package com.bacsystem.auth.token;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

class TokenIssuerIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private JpaRegisteredClientRepository registeredClientRepository;
    @Autowired private TokenIssuer tokenIssuer;
    @Autowired private RefreshTokenService refreshTokenService;

    @Test
    void issuesAJwtAccessTokenAndARotatableOpaqueRefreshToken() {
        Tenant tenant = new Tenant();
        tenant.setSlug("issuer-" + System.nanoTime());
        tenant.setName("Issuer Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        User user = new User();
        user.setTenant(tenant);
        user.setEmail("issuer@test.com");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        user = userRepository.saveAndFlush(user);

        RegisteredClient client = registeredClientRepository.findByClientId("example-app");

        IssuedTokens issued = tokenIssuer.issue(client, user, Set.of());

        assertThat(issued.accessToken()).isNotBlank();
        assertThat(issued.refreshToken()).isNotBlank();
        // the refresh token this returns is a real row `RefreshTokenService` can rotate —
        // proves the two components share one representation, not two incompatible ones.
        String rotated = refreshTokenService.rotate(issued.refreshToken()).newRawRefreshToken();
        assertThat(rotated).isNotBlank();
    }
}
