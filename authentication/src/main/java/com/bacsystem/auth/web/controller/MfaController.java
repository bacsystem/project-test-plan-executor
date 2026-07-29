package com.bacsystem.auth.web.controller;

import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.mfa.MfaChallengeContext;
import com.bacsystem.auth.mfa.MfaEnrollmentResult;
import com.bacsystem.auth.mfa.MfaService;
import com.bacsystem.auth.rbac.JpaRegisteredClientRepository;
import com.bacsystem.auth.token.IssuedTokens;
import com.bacsystem.auth.token.TokenIssuer;
import com.fasterxml.jackson.annotation.JsonProperty;
import dev.samstevens.totp.exceptions.QrGenerationException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Authenticated MFA enrollment plus the pre-authentication verification step (§11). {@code /verify} is
 * reached before the caller has any bearer token — it is the second step of login — so it resolves the
 * target application itself from the challenge's {@link MfaChallengeContext} and issues tokens directly
 * via {@link TokenIssuer}, the same class the password and refresh grants use.
 */
@RestController
@RequestMapping("/v1/auth/mfa")
public class MfaController {

    public record VerifyRequest(String challenge, String code) {}

    public record TokenPairResponse(@JsonProperty("access_token") String accessToken,
                                     @JsonProperty("refresh_token") String refreshToken) {}

    public record EnrollResponse(String rawSecret, String qrDataUri) {}

    public record ConfirmRequest(String code) {}

    private final MfaService mfaService;
    private final JpaRegisteredClientRepository registeredClientRepository;
    private final UserRepository userRepository;
    private final TokenIssuer tokenIssuer;

    public MfaController(MfaService mfaService, JpaRegisteredClientRepository registeredClientRepository,
                          UserRepository userRepository, TokenIssuer tokenIssuer) {
        this.mfaService = mfaService;
        this.registeredClientRepository = registeredClientRepository;
        this.userRepository = userRepository;
        this.tokenIssuer = tokenIssuer;
    }

    @PostMapping("/enroll")
    public EnrollResponse enroll(JwtAuthenticationToken auth) throws QrGenerationException {
        MfaEnrollmentResult result = mfaService.beginEnrollment(subjectOf(auth));
        return new EnrollResponse(result.rawSecret(), result.qrDataUri());
    }

    @PostMapping("/enroll/confirm")
    public List<String> confirmEnroll(@RequestBody ConfirmRequest request, JwtAuthenticationToken auth) {
        return mfaService.confirmEnrollment(subjectOf(auth), request.code());
    }

    @PostMapping("/verify")
    public TokenPairResponse verify(@RequestBody VerifyRequest request) {
        MfaChallengeContext context = mfaService.verifyChallenge(request.challenge(), request.code());
        RegisteredClient client = registeredClientRepository.findByClientId(context.applicationClientId());
        var user = userRepository.findById(context.userId()).orElseThrow();
        IssuedTokens issued = tokenIssuer.issue(client, user, Set.of());
        return new TokenPairResponse(issued.accessToken(), issued.refreshToken());
    }

    private UUID subjectOf(JwtAuthenticationToken auth) {
        return UUID.fromString(((Jwt) auth.getPrincipal()).getSubject());
    }
}
