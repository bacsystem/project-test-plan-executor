package com.bacsystem.auth.config;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.AuthorizationGrantType;

import java.util.Collections;

public class RefreshGrantAuthenticationToken extends AbstractAuthenticationToken {

    public static final AuthorizationGrantType REFRESH_TOKEN = new AuthorizationGrantType("refresh_token");

    private final Authentication clientPrincipal;
    private final String refreshToken;

    public RefreshGrantAuthenticationToken(Authentication clientPrincipal, String refreshToken) {
        super(Collections.emptyList());
        this.clientPrincipal = clientPrincipal;
        this.refreshToken = refreshToken;
        setAuthenticated(false);
    }

    @Override public Object getCredentials() { return refreshToken; }
    @Override public Object getPrincipal() { return clientPrincipal; }
    public Authentication getClientPrincipal() { return clientPrincipal; }
    public String getRefreshToken() { return refreshToken; }
}
