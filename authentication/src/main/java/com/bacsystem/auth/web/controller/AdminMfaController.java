package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.mfa.MfaService;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * Administrator-initiated MFA reset (§8.4, §11). A distinct small controller rather than a method on
 * {@link MfaController} because it lives under a different path, {@code /v1/admin/users/{id}/mfa/reset}.
 *
 * <p>The target {@code userId} is caller-supplied, so — like {@link UserController} and
 * {@link RoleController} — the caller's tenant is read from the access token's {@code tenant} claim
 * (never from the path) and passed into {@link MfaService#adminReset}, which resolves the target through
 * the tenant-scoped {@code UserService.getById(tenantId, userId)} overload. This is what prevents an
 * admin in one tenant from resetting a user in another tenant (cross-tenant IDOR).
 */
@RestController
@RequestMapping("/v1/admin/users")
public class AdminMfaController {

    public record AdminResetRequest(String verificationMethod, boolean targetIsAdmin) {}

    private final MfaService mfaService;

    public AdminMfaController(MfaService mfaService) {
        this.mfaService = mfaService;
    }

    @PostMapping("/{userId}/mfa/reset")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('admin')")
    public void reset(@PathVariable UUID userId, @RequestBody AdminResetRequest request,
                       JwtAuthenticationToken auth) {
        Jwt jwt = (Jwt) auth.getPrincipal();
        UUID tenantId = UUID.fromString(jwt.getClaimAsString("tenant"));
        UUID actorId = UUID.fromString(jwt.getSubject());
        mfaService.adminReset(tenantId, actorId, userId, request.verificationMethod(), request.targetIsAdmin());
    }
}
