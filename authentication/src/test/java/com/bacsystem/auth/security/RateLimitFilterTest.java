package com.bacsystem.auth.security;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import jakarta.servlet.FilterChain;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RateLimitFilterTest {

    @Mock private RateLimiter rateLimiter;
    @Mock private ClientIpResolver clientIpResolver;
    @Mock private FilterChain filterChain;

    private double rejectedCounterCount(MeterRegistry meterRegistry, String pathType) {
        var counter = meterRegistry.find("rate_limit_rejected").tag("path_type", pathType).counter();
        return counter == null ? 0.0 : counter.count();
    }

    @Test
    void rejectingAnAuthPathRequestIncrementsTheAuthRejectedCounter() throws Exception {
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        RateLimitFilter filter = new RateLimitFilter(rateLimiter, clientIpResolver, meterRegistry);
        when(clientIpResolver.resolve(any())).thenReturn("1.2.3.4");
        when(rateLimiter.tryConsumeAuth("1.2.3.4")).thenReturn(false);

        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/oauth2/token");
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilterInternal(request, response, filterChain);

        assertThat(response.getStatus()).isEqualTo(429);
        assertThat(rejectedCounterCount(meterRegistry, "auth")).isEqualTo(1.0);
        assertThat(rejectedCounterCount(meterRegistry, "admin")).isEqualTo(0.0);
        verifyNoInteractions(filterChain);
    }

    @Test
    void rejectingAnAdminPathRequestIncrementsTheAdminRejectedCounter() throws Exception {
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        RateLimitFilter filter = new RateLimitFilter(rateLimiter, clientIpResolver, meterRegistry);
        when(clientIpResolver.resolve(any())).thenReturn("5.6.7.8");
        when(rateLimiter.tryConsumeAdmin("5.6.7.8")).thenReturn(false);

        MockHttpServletRequest request = new MockHttpServletRequest("GET", "/v1/admin/users");
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilterInternal(request, response, filterChain);

        assertThat(response.getStatus()).isEqualTo(429);
        assertThat(rejectedCounterCount(meterRegistry, "admin")).isEqualTo(1.0);
        assertThat(rejectedCounterCount(meterRegistry, "auth")).isEqualTo(0.0);
    }

    @Test
    void anAllowedRequestDoesNotIncrementTheRejectedCounter() throws Exception {
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        RateLimitFilter filter = new RateLimitFilter(rateLimiter, clientIpResolver, meterRegistry);
        when(clientIpResolver.resolve(any())).thenReturn("1.2.3.4");
        when(rateLimiter.tryConsumeAuth("1.2.3.4")).thenReturn(true);

        MockHttpServletRequest request = new MockHttpServletRequest("POST", "/oauth2/token");
        MockHttpServletResponse response = new MockHttpServletResponse();

        filter.doFilterInternal(request, response, filterChain);

        assertThat(rejectedCounterCount(meterRegistry, "auth")).isEqualTo(0.0);
        assertThat(rejectedCounterCount(meterRegistry, "admin")).isEqualTo(0.0);
        verify(filterChain).doFilter(request, response);
    }
}
