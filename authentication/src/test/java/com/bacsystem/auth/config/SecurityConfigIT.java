package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.rbac.RoleService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Map;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

class SecurityConfigIT extends PostgresRedisTestBase {

    @Autowired private TestRestTemplate restTemplate;
    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private RoleService roleService;

    @Test
    void protectedEndpointRejectsUnauthenticatedRequest() {
        ResponseEntity<String> response = restTemplate.getForEntity("/v1/users/" + java.util.UUID.randomUUID(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Item 2 regression guard: {@code POST /v1/users/{id}/roles} is
     * {@code @PreAuthorize("hasAuthority('SCOPE_roles:assign')")} in
     * UserController, but that enforcement was previously verified nowhere —
     * UserControllerTest's {@code @WebMvcTest} slice doesn't load
     * {@code @EnableMethodSecurity} (confirmed empirically there: omitting the
     * authority still returned 204), so a caller with a validly-signed token that
     * simply lacks the scope had never actually been proven to get a 403 through
     * the real filter chain. This drives a real access token — issued via the
     * actual {@code /oauth2/token} password grant, exactly as PasswordGrantIT
     * does — through the actual HTTP stack (TestRestTemplate, not MockMvc) at a
     * real mutating role-assignment endpoint, deliberately requesting a token
     * `scope` that omits `roles:assign` (PasswordGrantAuthenticationConverter
     * takes the requested scope verbatim, unvalidated against the client's
     * registered scopes, so any scope string is obtainable here).
     */
    @Test
    void roleAssignmentEndpointRejectsCallerWithoutRequiredScope() {
        Tenant tenant = new Tenant();
        tenant.setSlug("security-scope-" + System.nanoTime());
        tenant.setName("Security Scope Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        var actor = userService.createUser(tenant.getId(), "scope-caller@test.com", "ValidPassw0rd!123", null);
        userService.changePassword(
                userService.findByTenantAndEmail(tenant.getId(), "scope-caller@test.com").orElseThrow(),
                "ValidPassw0rd!123Changed");
        var target = userService.createUser(tenant.getId(), "scope-target@test.com", "ValidPassw0rd!123", null);
        var role = roleService.createRole(tenant.getId(), "security-scope-role", false, actor.getId());

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "scope-caller@test.com");
        form.add("password", "ValidPassw0rd!123Changed");
        // deliberately NOT "roles:assign" — the caller authenticates fine but must
        // still be rejected by @PreAuthorize on the mutating endpoint below.
        form.add("scope", "profile");

        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        tokenHeaders.setBasicAuth("example-app", "example-secret");

        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, tokenHeaders), Map.class);
        assertThat(tokenResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        String accessToken = (String) tokenResponse.getBody().get("access_token");
        assertThat(accessToken).isNotBlank();

        HttpHeaders apiHeaders = new HttpHeaders();
        apiHeaders.setContentType(MediaType.APPLICATION_JSON);
        apiHeaders.setBearerAuth(accessToken);
        Map<String, String> body = Map.of("roleId", role.getId().toString());

        ResponseEntity<String> response = restTemplate.exchange(
                "/v1/users/" + target.getId() + "/roles",
                HttpMethod.POST,
                new HttpEntity<>(body, apiHeaders),
                String.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    void passwordResetRequestIsPubliclyReachable() {
        ResponseEntity<String> response = restTemplate.postForEntity(
                "/v1/auth/password/reset-request",
                new org.springframework.http.HttpEntity<>(java.util.Map.of("tenant", "x", "email", "a@b.com")),
                String.class);
        // reachable without auth — may be 202 or 400 depending on body validation, never 401/403
        assertThat(response.getStatusCode()).isNotIn(HttpStatus.UNAUTHORIZED, HttpStatus.FORBIDDEN);
    }
}
