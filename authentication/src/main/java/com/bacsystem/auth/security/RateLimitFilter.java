package com.bacsystem.auth.security;

import io.micrometer.core.instrument.MeterRegistry;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Applies the auth/admin rate-limit split by path (§13). Auth endpoints have
 * no authenticated user yet, so the client IP (via {@link ClientIpResolver})
 * is the only available rate-limit key there.
 */
@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimiter rateLimiter;
    private final ClientIpResolver clientIpResolver;
    private final MeterRegistry meterRegistry;

    public RateLimitFilter(RateLimiter rateLimiter, ClientIpResolver clientIpResolver, MeterRegistry meterRegistry) {
        this.rateLimiter = rateLimiter;
        this.clientIpResolver = clientIpResolver;
        this.meterRegistry = meterRegistry;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        boolean isAuthPath = path.startsWith("/oauth2/") || path.startsWith("/v1/auth/");
        String key = clientIpResolver.resolve(request);

        boolean allowed = isAuthPath ? rateLimiter.tryConsumeAuth(key) : rateLimiter.tryConsumeAdmin(key);
        if (!allowed) {
            // §16: 429 rejection rate is a security-relevant alert distinct from generic ops
            // metrics — tagged only with the bounded, non-PII path split, never the client key.
            meterRegistry.counter("rate_limit_rejected", "path_type", isAuthPath ? "auth" : "admin").increment();
            response.setStatus(429);
            response.setContentType("application/problem+json");
            response.getWriter().write(
                    "{\"type\":\"rate_limited\",\"title\":\"Too Many Requests\",\"status\":429}");
            return;
        }
        chain.doFilter(request, response);
    }
}
