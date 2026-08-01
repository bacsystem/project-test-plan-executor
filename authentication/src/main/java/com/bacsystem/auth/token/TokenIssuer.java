package com.bacsystem.auth.token;

import com.bacsystem.auth.identity.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.server.authorization.OAuth2Authorization;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2TokenType;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.context.AuthorizationServerContext;
import org.springframework.security.oauth2.server.authorization.context.AuthorizationServerContextHolder;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.token.DefaultOAuth2TokenContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenContext;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenGenerator;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * The one place a {@link RegisteredClient} + {@link User} + scopes becomes a
 * token pair, shared by the custom password and refresh grants
 * ({@code com.bacsystem.auth.config}) and by MFA-verified login (Task 31).
 */
@Service
public class TokenIssuer {

    // Deliberately not `PasswordGrantAuthenticationToken.PASSWORD` from the `config`
    // package: `token` is a lower layer that `config` depends on, not the reverse.
    // Both grants sharing this class need a single grant-type label to save under
    // regardless of which one actually issued the tokens; the label only affects
    // `OAuth2Authorization` bookkeeping, not how either grant is dispatched.
    private static final AuthorizationGrantType GRANT_TYPE = new AuthorizationGrantType("password");

    private final OAuth2AuthorizationService authorizationService;
    private final OAuth2TokenGenerator<?> tokenGenerator;
    private final RefreshTokenService refreshTokenService;
    private final AuthorizationServerSettings authorizationServerSettings;

    public TokenIssuer(OAuth2AuthorizationService authorizationService, OAuth2TokenGenerator<?> tokenGenerator,
                        RefreshTokenService refreshTokenService, AuthorizationServerSettings authorizationServerSettings) {
        this.authorizationService = authorizationService;
        this.tokenGenerator = tokenGenerator;
        this.refreshTokenService = refreshTokenService;
        this.authorizationServerSettings = authorizationServerSettings;
    }

    /**
     * Full issuance: a new JWT access token (framework-generated, §8.1) plus
     * a brand-new opaque refresh token (§8.3). Used by the password grant
     * and by MFA-verified login (Task 31), where no refresh token exists yet.
     */
    public IssuedTokens issue(RegisteredClient registeredClient, User user, Set<String> scopes) {
        OAuth2AccessToken accessToken = generateAccessToken(registeredClient, user, scopes);
        String rawRefreshToken = refreshTokenService.issue(user, registeredClient.getClientId());
        saveAuthorization(registeredClient, user, scopes, accessToken);
        return new IssuedTokens(accessToken.getTokenValue(), accessToken.getExpiresAt(), rawRefreshToken);
    }

    /**
     * Access-token-only issuance for the refresh grant ({@code
     * RefreshGrantAuthenticationProvider}): the refresh token already exists —
     * {@code RefreshTokenService.rotate} just produced it — so this must not
     * call {@code refreshTokenService.issue(...)} again, which would mint a
     * second, orphaned refresh token no client ever sees.
     */
    public IssuedTokens issueAccessTokenForRotatedRefresh(RegisteredClient registeredClient, User user,
                                                           Set<String> scopes, String rawRefreshToken) {
        OAuth2AccessToken accessToken = generateAccessToken(registeredClient, user, scopes);
        saveAuthorization(registeredClient, user, scopes, accessToken);
        return new IssuedTokens(accessToken.getTokenValue(), accessToken.getExpiresAt(), rawRefreshToken);
    }

    private OAuth2AccessToken generateAccessToken(RegisteredClient registeredClient, User user, Set<String> scopes) {
        DefaultOAuth2TokenContext.Builder contextBuilder = DefaultOAuth2TokenContext.builder()
                .registeredClient(registeredClient)
                .principal(new UsernamePasswordAuthenticationToken(user.getId().toString(), null, List.of()))
                .authorizationServerContext(currentAuthorizationServerContext())
                .authorizedScopes(scopes)
                .authorizationGrantType(GRANT_TYPE);

        OAuth2TokenContext accessTokenContext = contextBuilder.tokenType(OAuth2TokenType.ACCESS_TOKEN).build();
        var generated = tokenGenerator.generate(accessTokenContext);
        return new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER,
                generated.getTokenValue(), generated.getIssuedAt(), generated.getExpiresAt(), scopes);
    }

    /**
     * Falls back to a settings-only context when none is bound to the thread:
     * the {@code AuthorizationServerContextFilter} only runs for requests under
     * the token endpoint's own matcher, so callers outside it — MFA-verified
     * login (Task 31) and this class's own tests — never have one set.
     */
    private AuthorizationServerContext currentAuthorizationServerContext() {
        AuthorizationServerContext current = AuthorizationServerContextHolder.getContext();
        if (current != null) {
            return current;
        }
        return new AuthorizationServerContext() {
            @Override
            public String getIssuer() {
                return authorizationServerSettings.getIssuer();
            }

            @Override
            public AuthorizationServerSettings getAuthorizationServerSettings() {
                return authorizationServerSettings;
            }
        };
    }

    private void saveAuthorization(RegisteredClient registeredClient, User user, Set<String> scopes,
                                    OAuth2AccessToken accessToken) {
        OAuth2Authorization authorization = OAuth2Authorization.withRegisteredClient(registeredClient)
                .principalName(user.getId().toString())
                .authorizationGrantType(GRANT_TYPE)
                .authorizedScopes(scopes)
                .accessToken(accessToken)
                .build();
        authorizationService.save(authorization);
    }
}
