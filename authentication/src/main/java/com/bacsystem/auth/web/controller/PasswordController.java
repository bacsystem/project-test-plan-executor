package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.onetime.OneTimeTokenService;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Authenticated password change plus the pre-authentication reset flow
 * (§11, §12). The reset endpoints are listed in {@code SecurityConfig}'s
 * public paths since the caller doesn't hold a token yet.
 */
@RestController
@RequestMapping("/v1/auth/password")
public class PasswordController {

    public record ChangeRequest(String newPassword) {}
    public record ResetRequestBody(String tenant, String email) {}
    public record ResetConfirmRequest(String token, String newPassword) {}

    private final UserService userService;
    private final OneTimeTokenService oneTimeTokenService;
    private final TenantRepository tenantRepository;

    public PasswordController(UserService userService, OneTimeTokenService oneTimeTokenService,
                               TenantRepository tenantRepository) {
        this.userService = userService;
        this.oneTimeTokenService = oneTimeTokenService;
        this.tenantRepository = tenantRepository;
    }

    @PostMapping("/change")
    public void change(@RequestBody ChangeRequest request, JwtAuthenticationToken auth) {
        Jwt jwt = (Jwt) auth.getPrincipal();
        UUID tenantId = UUID.fromString(jwt.getClaimAsString("tenant"));
        UUID userId = UUID.fromString(jwt.getSubject());
        userService.changePassword(userService.getById(tenantId, userId), request.newPassword());
    }

    @PostMapping("/reset-request")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void resetRequest(@RequestBody ResetRequestBody request) {
        tenantRepository.findBySlug(request.tenant())
                .ifPresent(tenant -> oneTimeTokenService.requestPasswordReset(tenant.getId(), request.email()));
        // always 202 regardless of tenant/email existing (§10.2, §12) — no branch on the result above
    }

    @PostMapping("/reset-confirm")
    public void resetConfirm(@RequestBody ResetConfirmRequest request) {
        oneTimeTokenService.confirmPasswordReset(request.token(), request.newPassword());
    }
}
