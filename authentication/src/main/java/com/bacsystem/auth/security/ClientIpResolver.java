package com.bacsystem.auth.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Resolves the client IP used as the rate-limit key. {@code X-Forwarded-For}
 * is only trusted when the direct peer ({@code remoteAddr}) is a configured
 * proxy — otherwise any caller could spoof the header to bypass its own
 * rate-limit bucket (§13).
 */
@Component
public class ClientIpResolver {

    private final Set<String> trustedProxies;

    public ClientIpResolver(@Value("${auth.rate-limit.trusted-proxies:}") Set<String> trustedProxies) {
        this.trustedProxies = trustedProxies;
    }

    public String resolve(HttpServletRequest request) {
        String remoteAddr = request.getRemoteAddr();
        if (!trustedProxies.contains(remoteAddr)) {
            return remoteAddr;
        }
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor == null || forwardedFor.isBlank()) {
            return remoteAddr;
        }
        return forwardedFor.split(",")[0].trim();
    }
}
