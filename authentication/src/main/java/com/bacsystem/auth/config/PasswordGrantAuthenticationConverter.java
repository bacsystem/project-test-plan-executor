package com.bacsystem.auth.config;

import com.bacsystem.auth.security.ClientIpResolver;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.OAuth2ErrorCodes;
import org.springframework.security.web.authentication.AuthenticationConverter;

import java.util.LinkedHashSet;
import java.util.Set;

/**
 * Recognizes {@code grant_type=password} token requests. The client IP is
 * resolved here, not in the provider: this converter is the only place in the
 * grant with direct access to the {@link HttpServletRequest}, and it's what
 * makes the per-IP lockout in §13 (Task 16's {@code LoginAttemptService})
 * actually observe real IPs instead of a placeholder — using
 * {@link ClientIpResolver} (Task 24) so a forged {@code X-Forwarded-For} from
 * an untrusted caller can't spoof it (§13's trusted-proxy rule applies here
 * exactly as it does to rate limiting).
 */
public class PasswordGrantAuthenticationConverter implements AuthenticationConverter {

    private final ClientIpResolver clientIpResolver;

    public PasswordGrantAuthenticationConverter(ClientIpResolver clientIpResolver) {
        this.clientIpResolver = clientIpResolver;
    }

    @Override
    public Authentication convert(HttpServletRequest request) {
        String grantType = request.getParameter("grant_type");
        if (!PasswordGrantAuthenticationToken.PASSWORD.getValue().equals(grantType)) {
            return null; // not our grant type — let the next converter in the chain try
        }
        Authentication clientPrincipal = SecurityContextHolder.getContext().getAuthentication();
        String tenant = request.getParameter("tenant");
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        // A missing/blank tenant, username, or password would otherwise propagate a null value all
        // the way into the provider: a null username reaches LoginAttemptService.recordFailure(...)
        // -> LoginAttempt.emailAttempted, a NOT NULL column, and a null password reaches
        // Argon2PasswordEncoder.matches(null, ...) — both an uncontrolled exception (raw 500)
        // instead of a clean OAuth2 error. tenant is validated too since, like the other two, no
        // request can ever succeed without it.
        requireParameter(tenant, "tenant");
        requireParameter(username, "username");
        requireParameter(password, "password");
        String scopeParam = request.getParameter("scope");
        String clientIp = clientIpResolver.resolve(request);

        Set<String> scopes = new LinkedHashSet<>();
        if (scopeParam != null && !scopeParam.isBlank()) {
            for (String s : scopeParam.split(" ")) {
                scopes.add(s);
            }
        }
        return new PasswordGrantAuthenticationToken(clientPrincipal, tenant, username, password, scopes, clientIp);
    }

    private static void requireParameter(String value, String paramName) {
        if (value == null || value.isBlank()) {
            throw new OAuth2AuthenticationException(new OAuth2Error(OAuth2ErrorCodes.INVALID_REQUEST,
                    paramName + " parameter is required", null));
        }
    }
}
