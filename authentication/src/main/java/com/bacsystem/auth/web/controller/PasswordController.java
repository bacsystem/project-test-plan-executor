package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.PasswordChangeChallengeContext;
import com.bacsystem.auth.identity.PasswordChangeChallengeExpiredException;
import com.bacsystem.auth.identity.PasswordChangeChallengeService;
import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.mfa.MfaService;
import com.bacsystem.auth.onetime.OneTimeTokenService;
import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
import com.bacsystem.auth.tenancy.TenantRepository;
import com.bacsystem.auth.token.IssuedTokens;
import com.bacsystem.auth.token.TokenIssuer;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    /**
     * Same {@code error}/{@code error_description} field shape the password grant's {@code mfa_required}
     * {@code OAuth2Error} renders as on {@code POST /oauth2/token} (see {@code MustChangePasswordLoginIT}).
     * Built explicitly here rather than by throwing {@code OAuth2AuthenticationException} because that
     * exception's JSON rendering is produced by Spring Authorization Server's token-endpoint filter,
     * which this controller — reached over a plain resource-server-secured path, not the authorization
     * server's endpoint matcher — is not part of; throwing it here would only surface as an empty-body
     * 401 via {@code BearerTokenAuthenticationEntryPoint}, not this JSON shape.
     */
    public record MfaRequiredResponse(String error, @JsonProperty("error_description") String errorDescription) {}

    private final UserService userService;
    private final OneTimeTokenService oneTimeTokenService;
    private final TenantRepository tenantRepository;
    private final PasswordChangeChallengeService passwordChangeChallengeService;
    private final JpaRegisteredClientRepository registeredClientRepository;
    private final UserRepository userRepository;
    private final TokenIssuer tokenIssuer;
    private final MfaService mfaService;

    public PasswordController(UserService userService, OneTimeTokenService oneTimeTokenService,
                               TenantRepository tenantRepository,
                               PasswordChangeChallengeService passwordChangeChallengeService,
                               JpaRegisteredClientRepository registeredClientRepository,
                               UserRepository userRepository, TokenIssuer tokenIssuer, MfaService mfaService) {
        this.userService = userService;
        this.oneTimeTokenService = oneTimeTokenService;
        this.tenantRepository = tenantRepository;
        this.passwordChangeChallengeService = passwordChangeChallengeService;
        this.registeredClientRepository = registeredClientRepository;
        this.userRepository = userRepository;
        this.tokenIssuer = tokenIssuer;
        this.mfaService = mfaService;
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
     * temporary-password login (§7) — so, mirroring {@code MfaController.verify}'s shape for
     * resolving the target user and application from the challenge context, it resolves both from
     * the challenge's {@link PasswordChangeChallengeContext}, applies the actual password change
     * (which also clears {@code mustChangePassword}, see {@code UserService.changePassword}), and
     * only then — mirroring {@code PasswordGrantAuthenticationProvider}'s decision tree exactly,
     * where the must-change-password branch is checked ahead of the MFA branch — checks whether the
     * user is MFA-enrolled. If so, a full token pair must not be issued here either: an
     * {@code mfa_required} challenge is issued via the same {@code mfaService.issueChallenge} call
     * the password grant uses, redeemable at {@code /v1/auth/mfa/verify} exactly as normal. Only when
     * the user isn't MFA-enrolled are tokens issued directly via {@link TokenIssuer}, the same class
     * the password grant, refresh grant, and MFA verify all share.
     *
     * <p>The challenge ticket itself is only consumed (deleted from Redis, via
     * {@link PasswordChangeChallengeService#consumeChallenge}) once the password change has actually
     * succeeded — not merely because the ticket was found valid. {@code peekChallenge} below reads it
     * without deleting, so a request that fails {@code UserService.changePassword}'s strength check
     * leaves the ticket redeemable for a retry, instead of forcing the caller back through the whole
     * login flow over what might be a simple typo.
     */
    @PostMapping("/change-required")
    public ResponseEntity<?> changeRequired(@RequestBody ChangeRequiredRequest request) {
        PasswordChangeChallengeContext context = passwordChangeChallengeService.peekChallenge(request.challenge());
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

        // May throw WeakPasswordException — the ticket is still untouched at this point, so it
        // remains valid for a retry with a stronger password.
        userService.changePassword(user, request.newPassword());
        passwordChangeChallengeService.consumeChallenge(request.challenge());

        if (mfaService.isEnrolled(user.getId())) {
            String mfaChallenge = mfaService.issueChallenge(user.getId(), client.getClientId(), context.scopes());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MfaRequiredResponse("mfa_required", mfaChallenge));
        }

        IssuedTokens issued = tokenIssuer.issue(client, user, context.scopes());
        return ResponseEntity.ok(new TokenPairResponse(issued.accessToken(), issued.refreshToken()));
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
