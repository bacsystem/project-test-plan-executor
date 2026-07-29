package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.mfa.MfaService;
import com.bacsystem.auth.security.AccountLockedException;
import com.bacsystem.auth.security.LoginAttemptService;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import com.bacsystem.auth.token.IssuedTokens;
import com.bacsystem.auth.token.TokenIssuer;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2AccessTokenAuthenticationToken;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2ClientAuthenticationToken;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Implements the whole authentication decision tree the spec's login flows
 * require: tenant resolution (§5), lockout check before password verification
 * (§13), password verification, MFA branch (§8.4) returning an
 * {@code mfa_required} OAuth2 error carrying the challenge ticket instead of
 * a token, and — on full success — delegating to {@link TokenIssuer} so
 * token construction stays in one place shared with the refresh grant and
 * with {@code /v1/auth/mfa/verify} (Task 31).
 */
public class PasswordGrantAuthenticationProvider implements AuthenticationProvider {

    private final TenantRepository tenantRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final LoginAttemptService loginAttemptService;
    private final MfaService mfaService;
    private final TokenIssuer tokenIssuer;

    public PasswordGrantAuthenticationProvider(TenantRepository tenantRepository, UserService userService,
            PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService, MfaService mfaService,
            TokenIssuer tokenIssuer) {
        this.tenantRepository = tenantRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.mfaService = mfaService;
        this.tokenIssuer = tokenIssuer;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        PasswordGrantAuthenticationToken grant = (PasswordGrantAuthenticationToken) authentication;
        RegisteredClient registeredClient = ((OAuth2ClientAuthenticationToken) grant.getClientPrincipal())
                .getRegisteredClient();

        String clientIp = grant.getClientIp(); // resolved in the converter (§13) — never a placeholder
        try {
            loginAttemptService.assertNotLocked(grant.getUsername(), clientIp);

            Tenant tenant = tenantRepository.findBySlug(grant.getTenant())
                    .orElseThrow(this::genericAuthFailure);
            Optional<User> user = userService.findByTenantAndEmail(tenant.getId(), grant.getUsername());
            if (user.isEmpty() || !passwordEncoder.matches(grant.getPassword(), user.get().getPasswordHash())) {
                loginAttemptService.recordFailure(grant.getUsername(), clientIp);
                throw genericAuthFailure();
            }

            loginAttemptService.recordSuccess(user.get().getId(), grant.getUsername(), clientIp);

            if (mfaService.isEnrolled(user.get().getId())) {
                String challenge = mfaService.issueChallenge(user.get().getId());
                throw new OAuth2AuthenticationException(new OAuth2Error("mfa_required", challenge, null));
            }

            IssuedTokens issued = tokenIssuer.issue(registeredClient, user.get(), grant.getScopes());
            return toAuthenticationToken(registeredClient, issued, grant.getScopes());
        } catch (AccountLockedException locked) {
            throw genericAuthFailure();
        }
    }

    static Authentication toAuthenticationToken(RegisteredClient registeredClient, IssuedTokens issued,
                                                 Set<String> scopes) {
        OAuth2AccessToken accessToken = new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER,
                issued.accessToken(), Instant.now(), issued.accessTokenExpiresAt(), scopes);
        OAuth2RefreshToken refreshToken = new OAuth2RefreshToken(issued.refreshToken(), Instant.now());
        return new OAuth2AccessTokenAuthenticationToken(registeredClient,
                new UsernamePasswordAuthenticationToken("issued", null, List.of()),
                accessToken, refreshToken);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return PasswordGrantAuthenticationToken.class.isAssignableFrom(authentication);
    }

    private OAuth2AuthenticationException genericAuthFailure() {
        return new OAuth2AuthenticationException(new OAuth2Error("authentication_failed",
                "Invalid credentials", null));
    }
}
