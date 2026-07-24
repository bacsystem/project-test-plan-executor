package com.bacsystem.auth.security;

import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

class ClientIpResolverTest {

    private final ClientIpResolver resolver = new ClientIpResolver(java.util.Set.of("10.0.0.1"));

    @Test
    void usesForwardedForWhenRemoteAddrIsATrustedProxy() {
        HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);
        when(request.getRemoteAddr()).thenReturn("10.0.0.1");
        when(request.getHeader("X-Forwarded-For")).thenReturn("203.0.113.7, 10.0.0.1");

        assertThat(resolver.resolve(request)).isEqualTo("203.0.113.7");
    }

    @Test
    void ignoresForwardedForWhenRemoteAddrIsNotATrustedProxy() {
        HttpServletRequest request = org.mockito.Mockito.mock(HttpServletRequest.class);
        when(request.getRemoteAddr()).thenReturn("198.51.100.9");
        when(request.getHeader("X-Forwarded-For")).thenReturn("1.2.3.4");

        // an untrusted caller can't spoof its IP via the header
        assertThat(resolver.resolve(request)).isEqualTo("198.51.100.9");
    }
}
