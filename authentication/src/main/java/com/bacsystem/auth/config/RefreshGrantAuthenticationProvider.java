package com.bacsystem.auth.config;

import com.bacsystem.auth.token.IssuedTokens;
import com.bacsystem.auth.token.RefreshTokenReuseException;
import com.bacsystem.auth.token.RefreshTokenRotationResult;
import com.bacsystem.auth.token.RefreshTokenService;
import com.bacsystem.auth.token.TokenIssuer;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.oauth2.server.authorization.authentication.OAuth2ClientAuthenticationToken;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;

import java.util.Set;

/**
 * This service's refresh tokens are opaque, hashed, and rotated with reuse
 * detection in our own {@code refresh_tokens} table (§8.3) — a fundamentally
 * different representation from SAS's built-in refresh token handling, which
 * expects to look up tokens via {@code OAuth2AuthorizationService}. This
 * provider is what actually handles the {@code refresh_token} grant type
 * instead of that default.
 */
public class RefreshGrantAuthenticationProvider implements AuthenticationProvider {

    private final RefreshTokenService refreshTokenService;
    private final TokenIssuer tokenIssuer;

    public RefreshGrantAuthenticationProvider(RefreshTokenService refreshTokenService, TokenIssuer tokenIssuer) {
        this.refreshTokenService = refreshTokenService;
        this.tokenIssuer = tokenIssuer;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        RefreshGrantAuthenticationToken grant = (RefreshGrantAuthenticationToken) authentication;
        RegisteredClient registeredClient = ((OAuth2ClientAuthenticationToken) grant.getClientPrincipal())
                .getRegisteredClient();

        // §6/Task 3: a client's `authorization_grant_types` scopes which grants it may use —
        // SAS's own built-in providers enforce this; our custom ones must too.
        if (!registeredClient.getAuthorizationGrantTypes().contains(RefreshGrantAuthenticationToken.REFRESH_TOKEN)) {
            throw new OAuth2AuthenticationException(new OAuth2Error(OAuth2ErrorCodes.UNAUTHORIZED_CLIENT,
                    "Client is not authorized to use the refresh_token grant type", null));
        }

        try {
            // requestingClientId binds the rotation to the presenting client (§8.2) — see
            // RefreshTokenService.rotate's javadoc for why a mismatch is treated as reuse.
            RefreshTokenRotationResult rotation = refreshTokenService.rotate(grant.getRefreshToken(),
                    registeredClient.getClientId());
            IssuedTokens issued = tokenIssuer.issueAccessTokenForRotatedRefresh(
                    registeredClient, rotation.user(), Set.of(), rotation.newRawRefreshToken());
            return PasswordGrantAuthenticationProvider.toAuthenticationToken(registeredClient, issued, Set.of());
        } catch (RefreshTokenReuseException reuse) {
            throw new OAuth2AuthenticationException(new OAuth2Error("authentication_failed",
                    "Refresh token reuse detected", null));
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return RefreshGrantAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
