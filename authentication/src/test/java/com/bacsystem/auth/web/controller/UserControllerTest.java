package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.rbac.RoleNotFoundException;
import com.bacsystem.auth.rbac.RoleService;
import com.bacsystem.auth.rbac.RoleSummary;
import com.bacsystem.auth.security.ClientIpResolver;
import com.bacsystem.auth.security.RateLimiter;
import com.bacsystem.auth.web.CursorPage;
import com.bacsystem.auth.web.InvalidCursorException;
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

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private UserService userService;
    @MockBean private RoleService roleService;
    @Autowired private ObjectMapper objectMapper;

    // SecurityConfig (loaded by @WebMvcTest alongside the controller) wires
    // RateLimitFilter and the JWT resource-server decoder; neither collaborator
    // is part of the MVC slice, so they're mocked here purely to satisfy
    // SecurityConfig's bean graph — this test targets UserController, not
    // rate limiting or JWT verification.
    @MockBean private RateLimiter rateLimiter;
    @MockBean private ClientIpResolver clientIpResolver;
    @MockBean private JwtDecoder jwtDecoder;
    @MockBean private MeterRegistry meterRegistry;

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
        when(userService.getById(any(), any())).thenThrow(new UserNotFoundException(UUID.randomUUID()));

        mockMvc.perform(get("/v1/users/{id}", UUID.randomUUID())
                        .with(jwt().jwt(jwtWithTenant(UUID.randomUUID(), UUID.randomUUID()))))
                .andExpect(status().isNotFound());
    }

    @Test
    void getUserPassesCallersTenantNotAPathOrQueryParameter() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        User found = new User();
        found.setId(userId);
        found.setEmail("found@test.com");
        found.setStatus(UserStatus.ACTIVE);
        when(userService.getById(tenantId, userId)).thenReturn(found);

        mockMvc.perform(get("/v1/users/{id}", userId)
                        .with(jwt().jwt(jwtWithTenant(tenantId, UUID.randomUUID()))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value("found@test.com"));

        verify(userService).getById(tenantId, userId);
    }

    @Test
    void listReturnsCursorPageScopedToCallersTenant() throws Exception {
        UUID tenantId = UUID.randomUUID();
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("listed@test.com");
        user.setStatus(UserStatus.ACTIVE);
        when(userService.listByTenantCursor(eq(tenantId), any(), eq(20)))
                .thenReturn(new CursorPage<>(List.of(user), "next-cursor-token"));

        mockMvc.perform(get("/v1/users")
                        .with(jwt().jwt(jwtWithTenant(tenantId, UUID.randomUUID()))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data[0].email").value("listed@test.com"))
                .andExpect(jsonPath("$.nextCursor").value("next-cursor-token"));

        verify(userService).listByTenantCursor(tenantId, null, 20);
    }

    @Test
    void listWithMalformedCursorReturnsProblemDetail() throws Exception {
        when(userService.listByTenantCursor(any(), eq("garbage"), anyInt()))
                .thenThrow(new InvalidCursorException("garbage", null));

        mockMvc.perform(get("/v1/users")
                        .queryParam("cursor", "garbage")
                        .with(jwt().jwt(jwtWithTenant(UUID.randomUUID(), UUID.randomUUID()))))
                .andExpect(status().isBadRequest())
                .andExpect(content().contentTypeCompatibleWith("application/problem+json"))
                .andExpect(jsonPath("$.code").value("INVALID_CURSOR"));
    }

    @Test
    void deactivateReturns204AndScopesToCallersTenant() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID actorId = UUID.randomUUID();

        mockMvc.perform(delete("/v1/users/{id}", userId)
                        .with(jwt().jwt(jwtWithTenant(tenantId, actorId))))
                .andExpect(status().isNoContent());

        verify(userService).deactivateUser(tenantId, userId, actorId);
    }

    @Test
    void deactivateUnknownUserReturns404() throws Exception {
        doThrow(new UserNotFoundException(UUID.randomUUID()))
                .when(userService).deactivateUser(any(), any(), any());

        mockMvc.perform(delete("/v1/users/{id}", UUID.randomUUID())
                        .with(jwt().jwt(jwtWithTenant(UUID.randomUUID(), UUID.randomUUID()))))
                .andExpect(status().isNotFound());
    }

    // ---- Item 1: role assignment endpoints ----

    @Test
    void assignRoleReturns204AndDelegatesToRoleService() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID actorId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();

        mockMvc.perform(post("/v1/users/{userId}/roles", userId)
                        .with(jwt().jwt(jwtWithTenant(tenantId, actorId)).authorities(() -> "SCOPE_roles:assign"))
                        .contentType("application/json")
                        .content("{\"roleId\":\"" + roleId + "\"}"))
                .andExpect(status().isNoContent());

        verify(roleService).assignRole(tenantId, userId, roleId, actorId);
    }

    // NOTE: no test asserts a 403 for a missing SCOPE_roles:assign authority here.
    // @WebMvcTest(UserController.class) does not load SecurityConfig's
    // @EnableMethodSecurity interceptor (confirmed empirically: omitting the
    // authority still returned 204), and no existing test in this module — not
    // even PermissionCatalogControllerTest for SCOPE_permissions:sync — asserts
    // @PreAuthorize enforcement at the WebMvcTest-slice level either. Verifying
    // real 403 enforcement would need a full @SpringBootTest-based IT (in the
    // style of SecurityConfigIT), which is out of scope for this task.

    @Test
    void assignRoleOnUnknownUserReturns404() throws Exception {
        doThrow(new UserNotFoundException(UUID.randomUUID()))
                .when(roleService).assignRole(any(), any(), any(), any());

        mockMvc.perform(post("/v1/users/{userId}/roles", UUID.randomUUID())
                        .with(jwt().jwt(jwtWithTenant(UUID.randomUUID(), UUID.randomUUID())).authorities(() -> "SCOPE_roles:assign"))
                        .contentType("application/json")
                        .content("{\"roleId\":\"" + UUID.randomUUID() + "\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void assignRoleOnUnknownRoleReturns404() throws Exception {
        doThrow(new RoleNotFoundException(UUID.randomUUID()))
                .when(roleService).assignRole(any(), any(), any(), any());

        mockMvc.perform(post("/v1/users/{userId}/roles", UUID.randomUUID())
                        .with(jwt().jwt(jwtWithTenant(UUID.randomUUID(), UUID.randomUUID())).authorities(() -> "SCOPE_roles:assign"))
                        .contentType("application/json")
                        .content("{\"roleId\":\"" + UUID.randomUUID() + "\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void listRolesReturnsRoleSummariesForCallersTenant() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(roleService.listRolesForUser(tenantId, userId)).thenReturn(List.of(new RoleSummary(roleId, "editor")));

        mockMvc.perform(get("/v1/users/{userId}/roles", userId)
                        .with(jwt().jwt(jwtWithTenant(tenantId, UUID.randomUUID())).authorities(() -> "SCOPE_roles:assign")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(roleId.toString()))
                .andExpect(jsonPath("$[0].name").value("editor"));
    }

    @Test
    void revokeRoleReturns204AndDelegatesToRoleService() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID actorId = UUID.randomUUID();
        UUID userId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();

        mockMvc.perform(delete("/v1/users/{userId}/roles/{roleId}", userId, roleId)
                        .with(jwt().jwt(jwtWithTenant(tenantId, actorId)).authorities(() -> "SCOPE_roles:assign")))
                .andExpect(status().isNoContent());

        verify(roleService).revokeRole(tenantId, userId, roleId, actorId);
    }
}
