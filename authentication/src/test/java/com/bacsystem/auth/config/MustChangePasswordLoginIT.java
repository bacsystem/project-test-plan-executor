package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * §7/§5: an admin-created (bootstrap) user with a temporary password must be
 * forced to change it before receiving a usable token. Mirrors the
 * {@code mfa_required} branch already in {@link PasswordGrantAuthenticationProvider}:
 * on success, no token is issued — instead an {@code OAuth2Error} carrying a
 * single-use challenge ticket is returned, to be redeemed at
 * {@code POST /v1/auth/password/change-required}.
 */
class MustChangePasswordLoginIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private TestRestTemplate restTemplate;

    @Test
    void loginWithTemporaryPasswordReturnsPasswordChangeRequiredNotATokenPair() {
        Tenant tenant = new Tenant();
        tenant.setSlug("mustchange-" + System.nanoTime());
        tenant.setName("Must Change Password Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        User user = userService.createUser(tenant.getId(), "bootstrap@test.com", "TempPassw0rd!123", null);
        assertThat(user.isMustChangePassword()).isTrue();

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "bootstrap@test.com");
        form.add("password", "TempPassw0rd!123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("password_change_required");
        // The challenge ticket travels in error_description, same convention as mfa_required.
        assertThat((String) response.getBody().get("error_description")).isNotBlank();
        assertThat(response.getBody()).doesNotContainKeys("access_token", "refresh_token");
    }

    @Test
    void mustChangePasswordTakesPrecedenceOverWrongPasswordGenericFailure() {
        // Sanity: the new branch must only trigger on a CORRECT password match, not
        // short-circuit the existing generic-failure path for a wrong one.
        Tenant tenant = new Tenant();
        tenant.setSlug("mustchange-wrong-" + System.nanoTime());
        tenant.setName("Must Change Password Wrong Password Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "bootstrap-wrong@test.com", "TempPassw0rd!123", null);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "bootstrap-wrong@test.com");
        form.add("password", "NotTheRightPassword!1");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("authentication_failed");
    }
}
