package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.rbac.PermissionCatalogService;
import com.bacsystem.auth.rbac.PermissionSyncResult;
import com.bacsystem.auth.security.ClientIpResolver;
import com.bacsystem.auth.security.RateLimiter;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.jwt;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PermissionCatalogController.class)
class PermissionCatalogControllerTest {

    @Autowired private MockMvc mockMvc;
    @MockBean private PermissionCatalogService permissionCatalogService;
    // RateLimitFilter sits in the security chain and is picked up by @WebMvcTest
    // as a Filter bean; its own dependencies must be mocked so the slice context loads.
    @MockBean private RateLimiter rateLimiter;
    @MockBean private ClientIpResolver clientIpResolver;

    @BeforeEach
    void allowAllRequestsThroughRateLimiter() {
        when(rateLimiter.tryConsumeAdmin(any())).thenReturn(true);
    }

    @Test
    void syncReturnsAddedAndDeprecatedCounts() throws Exception {
        when(permissionCatalogService.sync(any(), any())).thenReturn(new PermissionSyncResult(2, 1));

        mockMvc.perform(put("/v1/applications/{app}/permissions", "example-app")
                        .with(jwt().authorities(() -> "SCOPE_permissions:sync"))
                        .contentType("application/json")
                        .content("{\"permissionNames\":[\"a:read\",\"a:write\"]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.added").value(2))
                .andExpect(jsonPath("$.deprecated").value(1));
    }
}
