package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.PasswordChangeChallengeService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.onetime.OneTimeTokenService;
import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
import com.bacsystem.auth.security.ClientIpResolver;
import com.bacsystem.auth.security.RateLimiter;
import com.bacsystem.auth.tenancy.TenantRepository;
import com.bacsystem.auth.token.TokenIssuer;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Controller-slice tests for {@link PasswordController#change}, mirroring the
 * mocked-service style used by {@code UserControllerTest} since the endpoint
 * needs full control over the JWT's {@code tenant}/{@code sub} claims —
 * something the full-stack {@link PasswordControllerIT} (real password-grant
 * tokens always carry the caller's own tenant) can't exercise.
 */
@WebMvcTest(PasswordController.class)
class PasswordControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private ObjectMapper objectMapper;

    @MockBean private UserService userService;
    @MockBean private OneTimeTokenService oneTimeTokenService;
    @MockBean private TenantRepository tenantRepository;
    @MockBean private PasswordChangeChallengeService passwordChangeChallengeService;
    @MockBean private JpaRegisteredClientRepository registeredClientRepository;
    @MockBean private UserRepository userRepository;
    @MockBean private TokenIssuer tokenIssuer;

    // SecurityConfig's bean graph, same rationale as UserControllerTest.
    @MockBean private RateLimiter rateLimiter;
    @MockBean private ClientIpResolver clientIpResolver;
    @MockBean private JwtDecoder jwtDecoder;
    @MockBean private MeterRegistry meterRegistry;

    @BeforeEach
    void allowAllRequestsThroughTheRateLimiter() {
        // /v1/auth/** is classified as an auth path by RateLimitFilter, so it consumes
        // from the auth bucket, not the admin one (unlike /v1/users in UserControllerTest).
        when(rateLimiter.tryConsumeAuth(any())).thenReturn(true);
    }

    private Jwt jwtWithTenant(UUID tenantId, UUID subjectId) {
        return Jwt.withTokenValue("token")
                .header("alg", "ES256")
                .claim("tenant", tenantId.toString())
                .claim("sub", subjectId.toString())
                .build();
    }

    @Test
    void changePassesTheCallersTenantIdNotTheUnscopedLookup() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        User user = new User();
        user.setId(userId);
        user.setEmail("self@test.com");
        user.setStatus(UserStatus.ACTIVE);
        when(userService.getById(tenantId, userId)).thenReturn(user);

        mockMvc.perform(post("/v1/auth/password/change")
                        .with(jwt().jwt(jwtWithTenant(tenantId, userId)))
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(
                                new PasswordController.ChangeRequest("NewValidPassw0rd!123"))))
                .andExpect(status().isOk());

        verify(userService).getById(tenantId, userId);
        verify(userService).changePassword(user, "NewValidPassw0rd!123");
        verify(userService, org.mockito.Mockito.never()).getById(eq(userId));
    }

    @Test
    void changeWhenTheSubjectDoesNotBelongToTheClaimedTenantNowCorrectly404s() throws Exception {
        // Proves the fix actually goes through the tenant-scoped overload: a subject id
        // that's real but belongs to a different tenant than the "tenant" claim must be
        // rejected rather than silently resolved via the unscoped getById(UUID) overload.
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        when(userService.getById(tenantId, userId)).thenThrow(new UserNotFoundException(userId));

        mockMvc.perform(post("/v1/auth/password/change")
                        .with(jwt().jwt(jwtWithTenant(tenantId, userId)))
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(
                                new PasswordController.ChangeRequest("NewValidPassw0rd!123"))))
                .andExpect(status().isNotFound());
    }
}
