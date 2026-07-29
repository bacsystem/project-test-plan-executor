package com.bacsystem.auth.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationConverter;

/**
 * Recognizes {@code grant_type=refresh_token} requests. This only ever
 * claims requests for this service's own opaque tokens, not SAS's built-in
 * format — in practice this service only ever issues its own tokens, so
 * every real request matches, and no separate disabling of the default
 * provider is needed.
 */
public class RefreshGrantAuthenticationConverter implements AuthenticationConverter {

    @Override
    public Authentication convert(HttpServletRequest request) {
        String grantType = request.getParameter("grant_type");
        if (!RefreshGrantAuthenticationToken.REFRESH_TOKEN.getValue().equals(grantType)) {
            return null;
        }
        Authentication clientPrincipal = SecurityContextHolder.getContext().getAuthentication();
        String refreshToken = request.getParameter("refresh_token");
        return new RefreshGrantAuthenticationToken(clientPrincipal, refreshToken);
    }
}
