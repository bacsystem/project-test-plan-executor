package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.PasswordChangeChallengeContext;
import com.bacsystem.auth.identity.PasswordChangeChallengeExpiredException;
import com.bacsystem.auth.identity.PasswordChangeChallengeService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.onetime.OneTimeTokenService;
import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
import com.bacsystem.auth.tenancy.TenantRepository;
import com.bacsystem.auth.token.IssuedTokens;
import com.bacsystem.auth.token.TokenIssuer;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

/**
 * Authenticated password change plus the pre-authentication reset flow
 * (§11, §12), and the pre-authentication must-change-password ticket
 * exchange (§7). The reset endpoints and {@code /change-required} are listed
 * in {@code SecurityConfig}'s public paths since the caller doesn't hold a
 * token yet in any of those three cases.
 */
@RestController
@RequestMapping("/v1/auth/password")
public class PasswordController {

    public record ChangeRequest(String newPassword) {}
    public record ResetRequestBody(String tenant, String email) {}
    public record ResetConfirmRequest(String token, String newPassword) {}

    /** §7: the ticket-exchange request for a user gated by {@code mustChangePassword}. */
    public record ChangeRequiredRequest(String challenge, String newPassword) {}

    public record TokenPairResponse(@JsonProperty("access_token") String accessToken,
                                     @JsonProperty("refresh_token") String refreshToken) {}

    private final UserService userService;
    private final OneTimeTokenService oneTimeTokenService;
    private final TenantRepository tenantRepository;
    private final PasswordChangeChallengeService passwordChangeChallengeService;
    private final JpaRegisteredClientRepository registeredClientRepository;
    private final UserRepository userRepository;
    private final TokenIssuer tokenIssuer;

    public PasswordController(UserService userService, OneTimeTokenService oneTimeTokenService,
                               TenantRepository tenantRepository,
                               PasswordChangeChallengeService passwordChangeChallengeService,
                               JpaRegisteredClientRepository registeredClientRepository,
                               UserRepository userRepository, TokenIssuer tokenIssuer) {
        this.userService = userService;
        this.oneTimeTokenService = oneTimeTokenService;
        this.tenantRepository = tenantRepository;
        this.passwordChangeChallengeService = passwordChangeChallengeService;
        this.registeredClientRepository = registeredClientRepository;
        this.userRepository = userRepository;
        this.tokenIssuer = tokenIssuer;
    }

    @PostMapping("/change")
    public void change(@RequestBody ChangeRequest request, JwtAuthenticationToken auth) {
        Jwt jwt = (Jwt) auth.getPrincipal();
        UUID tenantId = UUID.fromString(jwt.getClaimAsString("tenant"));
        UUID userId = UUID.fromString(jwt.getSubject());
        userService.changePassword(userService.getById(tenantId, userId), request.newPassword());
    }

    /**
     * Reached before the caller has any bearer token — it is the forced second step of a
     * temporary-password login (§7) — so, mirroring {@code MfaController.verify}'s shape for the
     * {@code mfa_required} branch exactly, it resolves the target user and application itself from
     * the challenge's {@link PasswordChangeChallengeContext}, applies the actual password change
     * (which also clears {@code mustChangePassword}, see {@code UserService.changePassword}), and
     * issues tokens directly via {@link TokenIssuer}, the same class the password grant, refresh
     * grant, and MFA verify all share.
     */
    @PostMapping("/change-required")
    public TokenPairResponse changeRequired(@RequestBody ChangeRequiredRequest request) {
        PasswordChangeChallengeContext context = passwordChangeChallengeService.verifyChallenge(request.challenge());
        // Same defensive shape as MfaController.verify: the client/user referenced by an
        // already-verified challenge should always still exist, but if either vanished during the
        // challenge TTL, fail the same generic-authentication-failure way §10.2 requires everywhere
        // else on this pre-authentication path, instead of leaking a raw 500.
        RegisteredClient client = registeredClientRepository.findByClientId(context.applicationClientId());
        if (client == null) {
            throw new PasswordChangeChallengeExpiredException();
        }
        User user = userRepository.findById(context.userId())
                .orElseThrow(PasswordChangeChallengeExpiredException::new);

        userService.changePassword(user, request.newPassword());

        IssuedTokens issued = tokenIssuer.issue(client, user, context.scopes());
        return new TokenPairResponse(issued.accessToken(), issued.refreshToken());
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
