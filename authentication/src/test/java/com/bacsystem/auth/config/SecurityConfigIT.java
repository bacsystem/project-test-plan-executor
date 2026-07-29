package com.bacsystem.auth.config;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

class SecurityConfigIT extends PostgresRedisTestBase {

    @Autowired private TestRestTemplate restTemplate;

    @Test
    void protectedEndpointRejectsUnauthenticatedRequest() {
        ResponseEntity<String> response = restTemplate.getForEntity("/v1/users/" + java.util.UUID.randomUUID(), String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
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
