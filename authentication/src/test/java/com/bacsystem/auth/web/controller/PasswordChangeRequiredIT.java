package com.bacsystem.auth.web.controller;

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
 * §7/§5: the ticket-exchange half of the must-change-password flow, mirroring
 * {@code MfaVerifyIT}'s shape for the {@code mfa_required} branch. The
 * challenge ticket returned by the password grant (see
 * {@code MustChangePasswordLoginIT}) is redeemed here — but only once the
 * password has actually changed — for a real token pair via
 * {@code TokenIssuer}, the same class the password grant, refresh grant, and
 * MFA verify all share.
 */
class PasswordChangeRequiredIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private TestRestTemplate restTemplate;

    private String obtainChallenge(Tenant tenant, String email, String tempPassword) {
        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", email);
        form.add("password", tempPassword);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), Map.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("password_change_required");
        return (String) response.getBody().get("error_description");
    }

    @Test
    void changingThePasswordViaTheChallengeIssuesATokenPairAndClearsTheFlag() {
        Tenant tenant = new Tenant();
        tenant.setSlug("pwchange-required-" + System.nanoTime());
        tenant.setName("Password Change Required Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        User user = userService.createUser(tenant.getId(), "forced@test.com", "TempPassw0rd!123", null);

        String challenge = obtainChallenge(tenant, "forced@test.com", "TempPassw0rd!123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<Map> changeResponse = restTemplate.postForEntity("/v1/auth/password/change-required",
                new HttpEntity<>(Map.of("challenge", challenge, "newPassword", "BrandNewPassw0rd!456"), headers),
                Map.class);

        assertThat(changeResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(changeResponse.getBody()).containsKeys("access_token", "refresh_token");

        User reloaded = userService.getById(user.getId());
        assertThat(reloaded.isMustChangePassword()).isFalse();

        // A subsequent login with the NEW password now succeeds normally — a full token
        // pair, no password_change_required this time.
        MultiValueMap<String, String> loginForm = new LinkedMultiValueMap<>();
        loginForm.add("grant_type", "password");
        loginForm.add("tenant", tenant.getSlug());
        loginForm.add("username", "forced@test.com");
        loginForm.add("password", "BrandNewPassw0rd!456");

        HttpHeaders loginHeaders = new HttpHeaders();
        loginHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        loginHeaders.setBasicAuth("example-app", "example-secret");

        ResponseEntity<Map> loginResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(loginForm, loginHeaders), Map.class);
        assertThat(loginResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(loginResponse.getBody()).containsKeys("access_token", "refresh_token");
    }

    @Test
    void expiredOrUnknownChallengeIsRejectedGenerically() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        ResponseEntity<Map> response = restTemplate.postForEntity("/v1/auth/password/change-required",
                new HttpEntity<>(Map.of("challenge", "not-a-real-ticket", "newPassword", "BrandNewPassw0rd!456"),
                        headers),
                Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("code")).isEqualTo("authentication_failed");
    }
}
