package com.bacsystem.auth.config;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.mfa.MfaService;
import com.bacsystem.auth.rbac.UserRoleRepository;
import com.bacsystem.auth.security.ClientIpResolver;
import com.bacsystem.auth.security.LoginAttemptService;
import com.bacsystem.auth.security.RateLimitFilter;
import com.bacsystem.auth.tenancy.TenantRepository;
import com.bacsystem.auth.token.RefreshTokenService;
import com.bacsystem.auth.token.SigningKey;
import com.bacsystem.auth.token.SigningKeyService;
import com.bacsystem.auth.token.TokenIssuer;
import com.nimbusds.jose.jwk.Curve;
import com.nimbusds.jose.jwk.ECKey;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.authorization.InMemoryOAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.OAuth2AuthorizationService;
import org.springframework.security.oauth2.server.authorization.authentication.ClientSecretAuthenticationProvider;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configurers.OAuth2AuthorizationServerConfigurer;
import org.springframework.security.oauth2.server.authorization.settings.AuthorizationServerSettings;
import org.springframework.security.oauth2.server.authorization.token.DelegatingOAuth2TokenGenerator;
import org.springframework.security.oauth2.server.authorization.token.JwtEncodingContext;
import org.springframework.security.oauth2.server.authorization.token.JwtGenerator;
import org.springframework.security.oauth2.server.authorization.token.OAuth2AccessTokenGenerator;
import org.springframework.security.oauth2.server.authorization.token.OAuth2RefreshTokenGenerator;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenCustomizer;
import org.springframework.security.oauth2.server.authorization.token.OAuth2TokenGenerator;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.KeyFactory;
import java.security.interfaces.ECPrivateKey;
import java.security.interfaces.ECPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;

/**
 * Wires the framework-owned pieces the custom password and refresh grants
 * (§8.1, §8.3) build on: the JWKS-backed signing material, and the same
 * {@link OAuth2AuthorizationService}/{@link OAuth2TokenGenerator} instances
 * {@code TokenIssuer} uses to issue tokens outside the token endpoint's own
 * internal wiring — these are exposed as ordinary beans (rather than left to
 * Spring Authorization Server's per-filter-chain defaults, which are never
 * registered in the application context) specifically so {@code TokenIssuer}
 * can be constructor-injected with them.
 */
@Configuration
public class AuthorizationServerConfig {

    /**
     * Registers the custom password and refresh grants (§8.1, §8.3) into the
     * token endpoint — Spring Authorization Server's documented pattern for a
     * non-standard grant type: a custom {@code AuthenticationConverter} +
     * {@code AuthenticationProvider} pair per grant, added ahead of the
     * defaults so they run first.
     */
    @Bean
    @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain authorizationServerSecurityFilterChain(
            HttpSecurity http, TenantRepository tenantRepository, UserService userService,
            PasswordEncoder passwordEncoder, LoginAttemptService loginAttemptService, MfaService mfaService,
            RefreshTokenService refreshTokenService, TokenIssuer tokenIssuer,
            ClientIpResolver clientIpResolver, RateLimitFilter rateLimitFilter) throws Exception {

        // Spring Boot 3.3.4 pulls in Spring Security 6.3.x, which predates HttpSecurity#with(...);
        // the applicable pattern here is the older http.apply(configurer) — apply() both
        // registers the configurer and returns it, so its own DSL methods are called directly.
        OAuth2AuthorizationServerConfigurer authorizationServerConfigurer = new OAuth2AuthorizationServerConfigurer();

        http.securityMatcher(authorizationServerConfigurer.getEndpointsMatcher());
        http.apply(authorizationServerConfigurer)
                .tokenEndpoint(tokenEndpoint -> tokenEndpoint
                        .accessTokenRequestConverters(converters -> {
                            converters.add(0, new PasswordGrantAuthenticationConverter(clientIpResolver));
                            converters.add(0, new RefreshGrantAuthenticationConverter());
                        })
                        .authenticationProviders(providers -> {
                            providers.add(0, new PasswordGrantAuthenticationProvider(
                                    tenantRepository, userService, passwordEncoder,
                                    loginAttemptService, mfaService, tokenIssuer));
                            providers.add(0, new RefreshGrantAuthenticationProvider(
                                    refreshTokenService, tokenIssuer));
                        }))
                // The default ClientSecretAuthenticationProvider's PasswordEncoder defaults to
                // "bcrypt" too, but re-declaring it explicitly (rather than relying on that
                // default) avoids a silent breakage if SAS ever changes its own default: without
                // a matching id, upgradeEncoding(...) reports true on every client_secret_basic
                // authentication and the provider tries to re-save the RegisteredClient, which
                // JpaRegisteredClientRepository.save() always rejects (§6 — Flyway-only clients).
                .clientAuthentication(clientAuthentication -> clientAuthentication
                        .authenticationProviders(providers -> providers.stream()
                                .filter(ClientSecretAuthenticationProvider.class::isInstance)
                                .map(ClientSecretAuthenticationProvider.class::cast)
                                .forEach(provider -> provider.setPasswordEncoder(clientSecretPasswordEncoder()))));

        http.csrf(csrf -> csrf.ignoringRequestMatchers(authorizationServerConfigurer.getEndpointsMatcher()))
                // Spring Security's default header writer sets "no-cache" on every
                // response; disable it here so the explicit Cache-Control below (added
                // by JwksCacheControlFilter) is what JWKS clients actually see — the
                // overlap window in §8.3 is derived from this exact value.
                .headers(headers -> headers.cacheControl(cache -> cache.disable()))
                // Must run before NimbusJwkSetEndpointFilter — that endpoint filter is terminal
                // (it writes the /oauth2/jwks response itself and never calls the rest of the
                // chain), so anything placed after it never gets a chance to touch the response.
                // NimbusJwkSetEndpointFilter itself can't be used as the anchor here: SAS only
                // registers its filters' relative order inside the configurer's own configure(),
                // which HttpSecurity runs later at build() time, after this method body — at this
                // point Spring Security would reject it as "does not have a registered order".
                // LogoutFilter is a core, always-registered filter that SAS's own filters (as
                // observed at runtime) are themselves anchored after, so this still runs earlier.
                .addFilterBefore(new JwksCacheControlFilter(), LogoutFilter.class)
                // This chain's securityMatcher exclusively claims /oauth2/token and /oauth2/jwks
                // (§8.1/§8.3), so apiSecurityFilterChain's own RateLimitFilter registration (in
                // SecurityConfig, addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class))
                // never runs for this chain's requests — every request to /oauth2/token was
                // bypassing rate limiting (§13) entirely. Same LogoutFilter anchor as
                // JwksCacheControlFilter above, for the same reason: it must run before SAS's own
                // token-issuing filter, which only gets a registered order later at build() time.
                .addFilterBefore(rateLimitFilter, LogoutFilter.class);

        return http.build();
    }

    /**
     * The bcrypt-default encoder client secrets are stored with (§6's seed
     * migration uses {@code {bcrypt}...}) — scoped to client authentication
     * only, distinct from the argon2-default {@link PasswordEncoder} bean
     * user passwords use, so it must not itself be a {@code @Bean} (a second
     * one would make every {@code PasswordEncoder} injection point ambiguous).
     */
    private PasswordEncoder clientSecretPasswordEncoder() {
        return new DelegatingPasswordEncoder("bcrypt", Map.of("bcrypt", new BCryptPasswordEncoder(12)));
    }

    /** Sets the `Cache-Control` §8.3's overlap window is derived from — only on `/oauth2/jwks`. */
    static class JwksCacheControlFilter extends OncePerRequestFilter {
        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
                throws ServletException, IOException {
            if ("/oauth2/jwks".equals(request.getRequestURI())) {
                response.setHeader("Cache-Control", "public, max-age=3600");
            }
            chain.doFilter(request, response);
        }
    }

    @Bean
    public AuthorizationServerSettings authorizationServerSettings() {
        return AuthorizationServerSettings.builder().build();
    }

    @Bean
    public OAuth2AuthorizationService authorizationService() {
        return new InMemoryOAuth2AuthorizationService();
    }

    @Bean
    public JwtEncoder jwtEncoder(JWKSource<SecurityContext> jwkSource) {
        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    public OAuth2TokenGenerator<?> tokenGenerator(JwtEncoder jwtEncoder,
                                                   OAuth2TokenCustomizer<JwtEncodingContext> jwtCustomizer) {
        JwtGenerator jwtGenerator = new JwtGenerator(jwtEncoder);
        jwtGenerator.setJwtCustomizer(jwtCustomizer);
        return new DelegatingOAuth2TokenGenerator(
                jwtGenerator, new OAuth2AccessTokenGenerator(), new OAuth2RefreshTokenGenerator());
    }

    /**
     * Copies `tenant` and `roles` onto the actual JWT claims (§8.2) — SAS's
     * default {@code JwtGenerator} only emits standard claims; without this
     * customizer the attributes stashed on the {@code OAuth2Authorization}
     * in {@code TokenIssuer} never reach the token itself.
     *
     * <p>Also forces the JWS header to ES256: {@code JwtGenerator} defaults
     * every access token to RS256 regardless of the {@code RegisteredClient}'s
     * settings, but {@link SigningKeyService} only ever generates EC keys
     * (§8.3) — left at the default, {@code NimbusJwtEncoder} would fail every
     * signing attempt with "Failed to select a JWK signing key".
     */
    @Bean
    public OAuth2TokenCustomizer<JwtEncodingContext> jwtCustomizer(UserService userService,
                                                                    UserRoleRepository userRoleRepository) {
        return context -> {
            context.getJwsHeader().algorithm(SignatureAlgorithm.ES256);
            if (context.getTokenType().getValue().equals("access_token")
                    && PasswordGrantAuthenticationToken.PASSWORD.equals(context.getAuthorizationGrantType())) {
                UUID userId = UUID.fromString(context.getPrincipal().getName());
                User user = userService.getById(userId);
                List<String> roleNames = userRoleRepository.findByUserId(userId).stream()
                        .map(ur -> ur.getRole().getName()).toList();
                context.getClaims().claim("tenant", user.getTenant().getId().toString());
                context.getClaims().claim("roles", roleNames);
            }
        };
    }

    /**
     * JWKS backed by {@link SigningKeyService} (§8.3) — every ACTIVE and
     * RETIRING key is published, giving consumers the overlap window they
     * need to keep validating tokens signed by a just-rotated-out key.
     */
    @Bean
    public JWKSource<SecurityContext> jwkSource(SigningKeyService signingKeyService) {
        return (selector, context) -> {
            // Lazily provisions the ACTIVE key on first use (mirrors currentActiveKey()) —
            // a fresh environment has no signing_keys row yet, and publishableKeys() alone
            // never generates one, so JWKS would otherwise select from an empty set.
            signingKeyService.currentActiveKey();
            List<JWK> jwks = signingKeyService.publishableKeys().stream()
                    .map(this::toJwk)
                    .toList();
            return selector.select(new JWKSet(jwks));
        };
    }

    private JWK toJwk(SigningKey key) {
        try {
            KeyFactory keyFactory = KeyFactory.getInstance("EC");
            ECPublicKey publicKey = (ECPublicKey) keyFactory.generatePublic(
                    new X509EncodedKeySpec(Base64.getDecoder().decode(key.getPublicKeyPem())));
            ECPrivateKey privateKey = (ECPrivateKey) keyFactory.generatePrivate(
                    new PKCS8EncodedKeySpec(Base64.getDecoder().decode(key.getPrivateKeyPem())));
            return new ECKey.Builder(Curve.P_256, publicKey)
                    .privateKey(privateKey)
                    .keyID(key.getKid())
                    .build();
        } catch (Exception e) {
            throw new IllegalStateException("Failed to convert SigningKey to JWK: " + key.getKid(), e);
        }
    }
}
