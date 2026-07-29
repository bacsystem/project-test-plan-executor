package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.rbac.ApplicationClient;
import com.bacsystem.auth.rbac.ApplicationClientRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.assertj.core.api.Assertions.assertThat;

class RefreshGrantIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private TestRestTemplate restTemplate;
    @Autowired private ApplicationClientRepository applicationClientRepository;

    @Test
    void refreshTokenGrantRotatesAndIssuesANewAccessToken() {
        Tenant tenant = new Tenant();
        tenant.setSlug("refresh-" + System.nanoTime());
        tenant.setName("Refresh Grant Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "refresh@test.com", "ValidPassw0rd!123", null);
        userService.changePassword(
                userService.findByTenantAndEmail(tenant.getId(), "refresh@test.com").orElseThrow(),
                "ValidPassw0rd!123Changed");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        MultiValueMap<String, String> passwordForm = new LinkedMultiValueMap<>();
        passwordForm.add("grant_type", "password");
        passwordForm.add("tenant", tenant.getSlug());
        passwordForm.add("username", "refresh@test.com");
        passwordForm.add("password", "ValidPassw0rd!123Changed");

        ResponseEntity<java.util.Map> loginResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(passwordForm, headers), java.util.Map.class);
        String refreshToken = (String) loginResponse.getBody().get("refresh_token");

        MultiValueMap<String, String> refreshForm = new LinkedMultiValueMap<>();
        refreshForm.add("grant_type", "refresh_token");
        refreshForm.add("refresh_token", refreshToken);

        ResponseEntity<java.util.Map> refreshResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(refreshForm, headers), java.util.Map.class);

        assertThat(refreshResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(refreshResponse.getBody().get("refresh_token")).isNotEqualTo(refreshToken);

        // the original refresh token is now rotated — reusing it must fail (§8.3 reuse detection)
        ResponseEntity<java.util.Map> reuseResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(refreshForm, headers), java.util.Map.class);
        assertThat(reuseResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }

    @Test
    void missingRefreshTokenParameterReturnsACleanErrorNotAServerError() {
        // Regression for an uncontrolled NPE: a null refresh_token used to propagate all the
        // way to TokenHasher.sha256Hex(null) instead of a clean 400 invalid_request response.
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        MultiValueMap<String, String> refreshForm = new LinkedMultiValueMap<>();
        refreshForm.add("grant_type", "refresh_token");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(refreshForm, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("invalid_request");
    }

    @Test
    void refreshTokenIsRejectedWhenRedeemedByADifferentRegisteredClient() {
        // §8.2: "one token per application... never a global token valid everywhere". A
        // second, legitimately-registered client presenting its OWN valid Basic-Auth
        // credentials must not be able to redeem a refresh token that was issued to a
        // DIFFERENT client for the same user (e.g. via that other client's own leak).
        ApplicationClient otherClient = new ApplicationClient();
        otherClient.setClientId("other-app-" + System.nanoTime());
        // same bcrypt hash the V3 seed migration uses for "example-secret" — reused here
        // purely so this second client authenticates with a known plaintext secret.
        otherClient.setClientSecretHash("{bcrypt}$2a$12$xzIPjB40faGFLYG0nryQ6OaDg/AVJGnKwEQGvrv16.t6HK0K3MKqW");
        otherClient.setClientName("Other App");
        otherClient.setScopes("permissions:sync");
        otherClient.setAuthorizationGrantTypes("password,refresh_token");
        otherClient.setClientAuthenticationMethods("client_secret_basic");
        otherClient = applicationClientRepository.saveAndFlush(otherClient);

        Tenant tenant = new Tenant();
        tenant.setSlug("refresh-xclient-" + System.nanoTime());
        tenant.setName("Refresh Cross-Client Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "xclient@test.com", "ValidPassw0rd!123", null);
        userService.changePassword(
                userService.findByTenantAndEmail(tenant.getId(), "xclient@test.com").orElseThrow(),
                "ValidPassw0rd!123Changed");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        MultiValueMap<String, String> passwordForm = new LinkedMultiValueMap<>();
        passwordForm.add("grant_type", "password");
        passwordForm.add("tenant", tenant.getSlug());
        passwordForm.add("username", "xclient@test.com");
        passwordForm.add("password", "ValidPassw0rd!123Changed");

        ResponseEntity<java.util.Map> loginResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(passwordForm, headers), java.util.Map.class);
        String refreshToken = (String) loginResponse.getBody().get("refresh_token");

        HttpHeaders otherClientHeaders = new HttpHeaders();
        otherClientHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        otherClientHeaders.setBasicAuth(otherClient.getClientId(), "example-secret");

        MultiValueMap<String, String> refreshForm = new LinkedMultiValueMap<>();
        refreshForm.add("grant_type", "refresh_token");
        refreshForm.add("refresh_token", refreshToken);

        ResponseEntity<java.util.Map> crossClientResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(refreshForm, otherClientHeaders), java.util.Map.class);
        assertThat(crossClientResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);

        // the mismatch revokes the whole chain — even the rightful client can no longer use it
        ResponseEntity<java.util.Map> rightfulClientResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(refreshForm, headers), java.util.Map.class);
        assertThat(rightfulClientResponse.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}
