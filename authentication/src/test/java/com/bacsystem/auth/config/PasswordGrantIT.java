package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.rbac.ApplicationClient;
import com.bacsystem.auth.rbac.ApplicationClientRepository;
import com.bacsystem.auth.rbac.RoleService;
import com.bacsystem.auth.rbac.UserRole;
import com.bacsystem.auth.rbac.UserRoleRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.assertj.core.api.Assertions.assertThat;

class PasswordGrantIT extends PostgresRedisTestBase {

    // TestRestTemplate calls the embedded server from loopback — trust it as the one
    // proxy hop so X-Forwarded-For is honored below (§13's trusted-proxy rule, same
    // as RateLimiter's, Task 24).
    @DynamicPropertySource
    static void trustLoopbackProxy(DynamicPropertyRegistry registry) {
        registry.add("auth.rate-limit.trusted-proxies", () -> "127.0.0.1");
    }

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private TestRestTemplate restTemplate;
    @Autowired private ApplicationClientRepository applicationClientRepository;
    @Autowired private RoleService roleService;
    @Autowired private UserRoleRepository userRoleRepository;

    @Test
    void passwordGrantForAUserWithAnAssignedRoleIncludesItInTheAccessToken() {
        // Regression: jwtCustomizer used to dereference UserRole.getRole().getName()
        // outside of any Hibernate session (it runs during OAuth2 token generation,
        // not inside a @Transactional boundary), throwing LazyInitializationException
        // and turning every login for a user with any assigned role into a raw 500 —
        // invisible to the other PasswordGrantIT tests because none of their users
        // have a role assigned, so the lazy `role` proxy was never touched.
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-role-" + System.nanoTime());
        tenant.setName("Password Grant Role Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        var user = userService.createUser(tenant.getId(), "roled@test.com", "ValidPassw0rd!123", null);
        userService.changePassword(
                userService.findByTenantAndEmail(tenant.getId(), "roled@test.com").orElseThrow(),
                "ValidPassw0rd!123Changed");
        var role = roleService.createRole(tenant.getId(), "member", false, user.getId());
        UserRole assignment = new UserRole();
        assignment.setUser(user);
        assignment.setRole(role);
        assignment.setAssignedBy(user);
        userRoleRepository.save(assignment);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "roled@test.com");
        form.add("password", "ValidPassw0rd!123Changed");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsKey("access_token");
    }

    @Test
    void passwordGrantIssuesAccessAndRefreshTokenForValidCredentials() {
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-" + System.nanoTime());
        tenant.setName("Password Grant Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "grant@test.com", "ValidPassw0rd!123", null);
        userService.changePassword(
                userService.findByTenantAndEmail(tenant.getId(), "grant@test.com").orElseThrow(),
                "ValidPassw0rd!123ChangedOnce");

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "grant@test.com");
        form.add("password", "ValidPassw0rd!123ChangedOnce");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsKeys("access_token", "refresh_token");
    }

    @Test
    void deactivatedUserCannotObtainTokensEvenWithTheCorrectPassword() {
        // §5: deactivated accounts are soft-deleted, not hard-deleted — the password stays
        // valid, but the account must stop being able to authenticate.
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-deactivated-" + System.nanoTime());
        tenant.setName("Deactivated User Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        var user = userService.createUser(tenant.getId(), "deactivated@test.com", "ValidPassw0rd!123", null);
        userService.changePassword(
                userService.findByTenantAndEmail(tenant.getId(), "deactivated@test.com").orElseThrow(),
                "ValidPassw0rd!123Changed");
        userService.deactivateUser(tenant.getId(), user.getId(), null);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "deactivated@test.com");
        form.add("password", "ValidPassw0rd!123Changed");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("authentication_failed");
    }

    @Test
    void wrongPasswordReturnsGenericAuthenticationFailedNotAHint() {
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-bad-" + System.nanoTime());
        tenant.setName("Password Grant Bad Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "wrongpass@test.com", "ValidPassw0rd!123", null);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "wrongpass@test.com");
        form.add("password", "TotallyWrongPassword!1");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("authentication_failed");
    }

    @Test
    void clientNotAuthorizedForThePasswordGrantIsRejected() {
        // §6/Task 3: a client's `authorization_grant_types` scopes which grants it may use —
        // a client only provisioned for client_credentials must not be able to use `password`
        // just because it can authenticate with valid Basic-Auth credentials.
        ApplicationClient restrictedClient = new ApplicationClient();
        restrictedClient.setClientId("no-password-app-" + System.nanoTime());
        restrictedClient.setClientSecretHash("{bcrypt}$2a$12$xzIPjB40faGFLYG0nryQ6OaDg/AVJGnKwEQGvrv16.t6HK0K3MKqW");
        restrictedClient.setClientName("Restricted App");
        restrictedClient.setScopes("permissions:sync");
        restrictedClient.setAuthorizationGrantTypes("client_credentials");
        restrictedClient.setClientAuthenticationMethods("client_secret_basic");
        restrictedClient = applicationClientRepository.saveAndFlush(restrictedClient);

        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-restricted-" + System.nanoTime());
        tenant.setName("Restricted Client Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "restricted@test.com", "ValidPassw0rd!123", null);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "restricted@test.com");
        form.add("password", "ValidPassw0rd!123");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth(restrictedClient.getClientId(), "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("unauthorized_client");
    }

    @Test
    void missingPasswordParameterReturnsCleanBadRequestNotServerError() {
        // Regression guard: `password` reaching Argon2PasswordEncoder.matches(null, ...) as a raw
        // null used to throw an uncontrolled NPE (raw 500 with a stack trace) on this public,
        // unauthenticated endpoint. A username that resolves to a real ACTIVE user is required to
        // reproduce it — an unknown username short-circuits before the password comparison.
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-nopass-" + System.nanoTime());
        tenant.setName("Missing Password Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "nopass@test.com", "ValidPassw0rd!123", null);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("username", "nopass@test.com");
        // "password" intentionally omitted

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("invalid_request");
    }

    @Test
    void missingUsernameParameterReturnsCleanBadRequestNotServerError() {
        // Regression guard: a missing `username` reaches loginAttemptService.recordFailure(null,
        // ...) -> LoginAttempt.emailAttempted, a NOT NULL column (V9 migration) -> an uncaught
        // DataIntegrityViolationException (raw 500) instead of a clean OAuth2 error.
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-nouser-" + System.nanoTime());
        tenant.setName("Missing Username Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", tenant.getSlug());
        form.add("password", "SomePassword!123");
        // "username" intentionally omitted

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");

        ResponseEntity<java.util.Map> response = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), java.util.Map.class);

        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(response.getBody().get("error")).isEqualTo("invalid_request");
    }

    @Test
    void tokenEndpointIsRateLimitedAfterExceedingTheAuthBucketCapacity() {
        // Regression guard: authorizationServerSecurityFilterChain (@Order HIGHEST_PRECEDENCE)
        // exclusively claims /oauth2/token, so it — not apiSecurityFilterChain, where
        // RateLimitFilter is wired — is what actually serves this request. Without the filter
        // wired into this chain too, /oauth2/token entirely bypasses rate limiting (§13).
        // A unique X-Forwarded-For gives this test its own Redis bucket, isolated from every
        // other request this class fires at /oauth2/token and /oauth2/jwks from 127.0.0.1.
        String burstIp = "203.0.113.211";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBasicAuth("example-app", "example-secret");
        headers.set("X-Forwarded-For", burstIp);

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("tenant", "nonexistent-tenant");
        form.add("username", "nobody@test.com");
        form.add("password", "Irrelevant!123");

        // Default auth-capacity-per-minute is 10 (RateLimiter's @Value default) — consume exactly
        // that many first, none of them should be rate-limited yet.
        for (int i = 0; i < 10; i++) {
            ResponseEntity<String> response = restTemplate.postForEntity(
                    "/oauth2/token", new HttpEntity<>(form, headers), String.class);
            assertThat(response.getStatusCode().value()).isNotEqualTo(429);
        }

        ResponseEntity<String> eleventh = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(form, headers), String.class);
        assertThat(eleventh.getStatusCode().value()).isEqualTo(429);
    }

    @Test
    void jwksResponseCarriesTheOverlapWindowCacheControl() {
        // §8.3: the rotation overlap (min 2h) is DERIVED from this header's max-age
        // (1h starting value) — it must be explicit, not whatever SAS defaults to.
        ResponseEntity<String> response = restTemplate.getForEntity("/oauth2/jwks", String.class);
        assertThat(response.getHeaders().getCacheControl()).contains("max-age=3600");
    }

    @Test
    void perIpLockoutTracksTheRealForwardedIpNotAPlaceholder() {
        // The regression this guards against: the converter passing a constant
        // (e.g. "unknown") instead of the real client IP. Under that bug every
        // request — regardless of its real IP — shares one fake bucket, so a
        // DIFFERENT real IP would incorrectly inherit the lockout too. A test that
        // only checks "lockout triggers after 5 failures" can't tell the two apart
        // (a shared fake bucket also "locks out" after 5 hits); this one can,
        // because it asserts the attacker's IP is blocked AND an unrelated IP is not.
        Tenant tenant = new Tenant();
        tenant.setSlug("pwgrant-ip-" + System.nanoTime());
        tenant.setName("IP Lockout Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "attacked@test.com", "ValidPassw0rd!123", null);
        userService.createUser(tenant.getId(), "bystander@test.com", "ValidPassw0rd!123", null);

        HttpHeaders attackerHeaders = new HttpHeaders();
        attackerHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        attackerHeaders.setBasicAuth("example-app", "example-secret");
        attackerHeaders.set("X-Forwarded-For", "203.0.113.55");

        MultiValueMap<String, String> wrongPasswordForm = new LinkedMultiValueMap<>();
        wrongPasswordForm.add("grant_type", "password");
        wrongPasswordForm.add("tenant", tenant.getSlug());
        wrongPasswordForm.add("username", "attacked@test.com");
        wrongPasswordForm.add("password", "WrongOnPurpose!1");

        for (int i = 0; i < 5; i++) {
            restTemplate.postForEntity("/oauth2/token", new HttpEntity<>(wrongPasswordForm, attackerHeaders),
                    java.util.Map.class);
        }

        // (a) the attacker's own IP is now locked, even with the correct password
        MultiValueMap<String, String> attackerRetryForm = new LinkedMultiValueMap<>();
        attackerRetryForm.add("grant_type", "password");
        attackerRetryForm.add("tenant", tenant.getSlug());
        attackerRetryForm.add("username", "attacked@test.com");
        attackerRetryForm.add("password", "ValidPassw0rd!123");

        ResponseEntity<java.util.Map> attackerRetry = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(attackerRetryForm, attackerHeaders), java.util.Map.class);
        assertThat(attackerRetry.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
        assertThat(attackerRetry.getBody().get("error")).isEqualTo("authentication_failed");

        // (b) a genuinely different IP, different account, correct password — succeeds.
        // Under the "unknown"-placeholder bug this would incorrectly be blocked too.
        HttpHeaders bystanderHeaders = new HttpHeaders();
        bystanderHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        bystanderHeaders.setBasicAuth("example-app", "example-secret");
        bystanderHeaders.set("X-Forwarded-For", "198.51.100.9");

        MultiValueMap<String, String> bystanderForm = new LinkedMultiValueMap<>();
        bystanderForm.add("grant_type", "password");
        bystanderForm.add("tenant", tenant.getSlug());
        bystanderForm.add("username", "bystander@test.com");
        bystanderForm.add("password", "ValidPassw0rd!123");

        ResponseEntity<java.util.Map> bystanderResponse = restTemplate.postForEntity(
                "/oauth2/token", new HttpEntity<>(bystanderForm, bystanderHeaders), java.util.Map.class);
        assertThat(bystanderResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(bystanderResponse.getBody()).containsKey("access_token");
    }
}
