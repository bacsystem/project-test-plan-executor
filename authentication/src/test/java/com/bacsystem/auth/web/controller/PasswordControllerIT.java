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
}
