package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.security.ClientIpResolver;
import com.bacsystem.auth.security.RateLimiter;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;
    @Autowired private ObjectMapper objectMapper;

    // SecurityConfig (loaded by @WebMvcTest alongside the controller) wires
    // RateLimitFilter and the JWT resource-server decoder; neither collaborator
    // is part of the MVC slice, so they're mocked here purely to satisfy
    // SecurityConfig's bean graph — this test targets UserController, not
    // rate limiting or JWT verification.
    @MockBean private RateLimiter rateLimiter;
    @MockBean private ClientIpResolver clientIpResolver;
    @MockBean private JwtDecoder jwtDecoder;

    @BeforeEach
    void allowAllRequestsThroughTheRateLimiter() {
        when(rateLimiter.tryConsumeAdmin(any())).thenReturn(true);
    }

    private Jwt jwtWithTenant(UUID tenantId, UUID callerId) {
        return Jwt.withTokenValue("token")
                .header("alg", "ES256")
                .claim("tenant", tenantId.toString())
                .claim("sub", callerId.toString()) // always a UUID in this system — TokenIssuer (Task 25) issues no other kind
                .build();
    }

    @Test
    void createUserReturns201() throws Exception {
        UUID tenantId = UUID.randomUUID();
        User created = new User();
        created.setId(UUID.randomUUID());
        created.setEmail("new@test.com");
        created.setStatus(UserStatus.ACTIVE);
        created.setMustChangePassword(true);
        when(userService.createUser(any(), any(), any(), any())).thenReturn(created);

        mockMvc.perform(post("/v1/users")
                        .with(jwt().jwt(jwtWithTenant(tenantId, UUID.randomUUID())))
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(
                                new UserController.CreateUserRequest("new@test.com", "TempPassw0rd!123"))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("new@test.com"));
    }

    @Test
    void getUnknownUserReturns404() throws Exception {
        when(userService.getById(any())).thenThrow(new UserNotFoundException(UUID.randomUUID()));

        mockMvc.perform(get("/v1/users/{id}", UUID.randomUUID())
                        .with(jwt().jwt(jwtWithTenant(UUID.randomUUID(), UUID.randomUUID()))))
                .andExpect(status().isNotFound());
    }
}
