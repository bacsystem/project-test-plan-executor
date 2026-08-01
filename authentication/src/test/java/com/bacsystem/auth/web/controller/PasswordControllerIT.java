package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

class PasswordControllerIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private TestRestTemplate restTemplate;

    @Test
    void resetRequestAlwaysReturns202RegardlessOfWhetherTheEmailExists() {
        Tenant tenant = new Tenant();
        tenant.setSlug("pw-reset-" + System.nanoTime());
        tenant.setName("Password Reset Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "known@test.com", "Passw0rd!12345", null);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<String> knownEmail = restTemplate.postForEntity("/v1/auth/password/reset-request",
                new HttpEntity<>(Map.of("tenant", tenant.getSlug(), "email", "known@test.com"), headers),
                String.class);
        ResponseEntity<String> unknownEmail = restTemplate.postForEntity("/v1/auth/password/reset-request",
                new HttpEntity<>(Map.of("tenant", tenant.getSlug(), "email", "nobody@test.com"), headers),
                String.class);

        assertThat(knownEmail.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
        assertThat(unknownEmail.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }

    /**
     * Companion to the case above: a tenant slug that doesn't resolve at all
     * (as opposed to a real tenant with an unknown email) must be
     * indistinguishable at the HTTP layer too. The invocation-count/round-trip
     * shape assertion for this case lives in {@code PasswordControllerTest}
     * (mocked {@code OneTimeTokenService}/{@code TenantRepository}), since
     * this full-stack test has no seam to assert DB round-trip counts against.
     */
    @Test
    void resetRequestAlsoReturns202WhenTheTenantSlugItselfDoesNotExist() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<String> unknownTenant = restTemplate.postForEntity("/v1/auth/password/reset-request",
                new HttpEntity<>(Map.of("tenant", "no-such-tenant-" + System.nanoTime(), "email", "someone@test.com"),
                        headers),
                String.class);

        assertThat(unknownTenant.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
    }
}
