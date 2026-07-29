package com.bacsystem.auth.config;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.AuthorizationGrantType;

import java.util.Collections;
import java.util.Set;

public class PasswordGrantAuthenticationToken extends AbstractAuthenticationToken {

    public static final AuthorizationGrantType PASSWORD = new AuthorizationGrantType("password");

    private final Authentication clientPrincipal;
    private final String tenant;
    private final String username;
    private final String password;
    private final Set<String> scopes;
    private final String clientIp;

    public PasswordGrantAuthenticationToken(Authentication clientPrincipal, String tenant, String username,
                                             String password, Set<String> scopes, String clientIp) {
        super(Collections.emptyList());
        this.clientPrincipal = clientPrincipal;
        this.tenant = tenant;
        this.username = username;
        this.password = password;
        this.scopes = scopes;
        this.clientIp = clientIp;
        setAuthenticated(false);
    }

    @Override public Object getCredentials() { return password; }
    @Override public Object getPrincipal() { return clientPrincipal; }
    public Authentication getClientPrincipal() { return clientPrincipal; }
    public String getTenant() { return tenant; }
    public String getUsername() { return username; }
    public String getPassword() { return password; }
    public Set<String> getScopes() { return scopes; }
    public String getClientIp() { return clientIp; }
}
