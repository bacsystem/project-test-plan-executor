package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.rbac.Role;
import com.bacsystem.auth.rbac.RoleService;
import com.bacsystem.auth.rbac.RoleVersionConflictException;
import com.bacsystem.auth.security.ClientIpResolver;
import com.bacsystem.auth.security.RateLimiter;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.web.ProblemDetailAdvice;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest({RoleController.class, ProblemDetailAdvice.class})
class RoleControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private RoleService roleService;
    // RateLimitFilter sits in the security chain and is picked up by @WebMvcTest
    // as a Filter bean; its own dependencies must be mocked so the slice context loads.
    @MockBean private RateLimiter rateLimiter;
    @MockBean private ClientIpResolver clientIpResolver;

    @BeforeEach
    void allowAllRequestsThroughRateLimiter() {
        when(rateLimiter.tryConsumeAdmin(any())).thenReturn(true);
    }

    @Test
    void getRoleReturnsVersionAndPermissions() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        Role role = roleOf(roleId, tenantId);
        when(roleService.getRole(roleId)).thenReturn(role);
        when(roleService.getPermissions(roleId)).thenReturn(List.of());

        mockMvc.perform(get("/v1/roles/{id}", roleId).with(jwt().jwt(token -> token.claim("tenant", tenantId.toString()))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.version").exists())
                .andExpect(jsonPath("$.permissions").isArray());
    }

    @Test
    void getRoleFromAnotherTenantReturns404() throws Exception {
        UUID roleId = UUID.randomUUID();
        Role role = roleOf(roleId, UUID.randomUUID());
        when(roleService.getRole(roleId)).thenReturn(role);

        mockMvc.perform(get("/v1/roles/{id}", roleId)
                        .with(jwt().jwt(token -> token.claim("tenant", UUID.randomUUID().toString()))))
                .andExpect(status().isNotFound());
    }

    @Test
    void replacePermissionsWithStaleVersionReturns409() throws Exception {
        UUID tenantId = UUID.randomUUID();
        UUID roleId = UUID.randomUUID();
        when(roleService.getRole(roleId)).thenReturn(roleOf(roleId, tenantId));
        when(roleService.replacePermissions(eq(roleId), eq(3L), anySet(), any()))
                .thenThrow(new RoleVersionConflictException());

        mockMvc.perform(put("/v1/roles/{id}/permissions", roleId)
                        .with(jwt().jwt(token -> token.subject(UUID.randomUUID().toString())
                                .claim("tenant", tenantId.toString())))
                        .contentType("application/json")
                        .content("{\"version\":3,\"permissionIds\":[]}"))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.code").value("ROLE_VERSION_CONFLICT"));
    }

    @Test
    void replacePermissionsOnAnotherTenantsRoleReturns404() throws Exception {
        UUID roleId = UUID.randomUUID();
        when(roleService.getRole(roleId)).thenReturn(roleOf(roleId, UUID.randomUUID()));

        mockMvc.perform(put("/v1/roles/{id}/permissions", roleId)
                        .with(jwt().jwt(token -> token.subject(UUID.randomUUID().toString())
                                .claim("tenant", UUID.randomUUID().toString())))
                        .contentType("application/json")
                        .content("{\"version\":3,\"permissionIds\":[]}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteOnAnotherTenantsRoleReturns404() throws Exception {
        UUID roleId = UUID.randomUUID();
        when(roleService.getRole(roleId)).thenReturn(roleOf(roleId, UUID.randomUUID()));

        mockMvc.perform(delete("/v1/roles/{id}", roleId)
                        .with(jwt().jwt(token -> token.claim("tenant", UUID.randomUUID().toString()))))
                .andExpect(status().isNotFound());
    }

    @Test
    void getSharedTemplateRoleWithNullTenantReturns404() throws Exception {
        UUID roleId = UUID.randomUUID();
        when(roleService.getRole(roleId)).thenReturn(templateRoleOf(roleId));

        mockMvc.perform(get("/v1/roles/{id}", roleId)
                        .with(jwt().jwt(token -> token.claim("tenant", UUID.randomUUID().toString()))))
                .andExpect(status().isNotFound());
    }

    @Test
    void replacePermissionsOnSharedTemplateRoleWithNullTenantReturns404() throws Exception {
        UUID roleId = UUID.randomUUID();
        when(roleService.getRole(roleId)).thenReturn(templateRoleOf(roleId));

        mockMvc.perform(put("/v1/roles/{id}/permissions", roleId)
                        .with(jwt().jwt(token -> token.subject(UUID.randomUUID().toString())
                                .claim("tenant", UUID.randomUUID().toString())))
                        .contentType("application/json")
                        .content("{\"version\":3,\"permissionIds\":[]}"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteSharedTemplateRoleWithNullTenantReturns404() throws Exception {
        UUID roleId = UUID.randomUUID();
        when(roleService.getRole(roleId)).thenReturn(templateRoleOf(roleId));

        mockMvc.perform(delete("/v1/roles/{id}", roleId)
                        .with(jwt().jwt(token -> token.claim("tenant", UUID.randomUUID().toString()))))
                .andExpect(status().isNotFound());
    }

    private static Role roleOf(UUID roleId, UUID tenantId) {
        Role role = new Role();
        role.setId(roleId);
        role.setName("editor");
        Tenant tenant = new Tenant();
        tenant.setId(tenantId);
        role.setTenant(tenant);
        return role;
    }

    private static Role templateRoleOf(UUID roleId) {
        Role role = new Role();
        role.setId(roleId);
        role.setName("template-editor");
        role.setTemplate(true);
        role.setTenant(null);
        return role;
    }
}
