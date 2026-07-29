package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.UserService;
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
}
