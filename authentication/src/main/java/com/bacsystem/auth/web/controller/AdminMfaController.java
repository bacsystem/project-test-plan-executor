package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.mfa.MfaService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

/**
 * Administrator-initiated MFA reset (§8.4, §11). A distinct small controller rather than a method on
 * {@link MfaController} because it lives under a different path, {@code /v1/admin/users/{id}/mfa/reset}.
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
    @PreAuthorize("hasRole('admin')")
    public void reset(@PathVariable UUID userId, @RequestBody AdminResetRequest request,
                       JwtAuthenticationToken auth) {
        UUID actorId = UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
        mfaService.adminReset(actorId, userId, request.verificationMethod(), request.targetIsAdmin());
    }
}
