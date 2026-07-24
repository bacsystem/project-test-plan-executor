package com.bacsystem.auth.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.BucketProxy;
import io.github.bucket4j.distributed.ExpirationAfterWriteStrategy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;
import io.lettuce.core.codec.StringCodec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.function.Supplier;

/**
 * Distributed, Redis-backed token-bucket rate limiting (§13). Auth endpoints
 * (unauthenticated, credential-guessing surface) fail CLOSED when Redis is
 * unreachable so an outage can't be used to bypass brute-force protection;
 * admin endpoints (already authenticated) fail OPEN so a Redis outage
 * doesn't also take down authenticated traffic.
 */
@Component
public class RateLimiter {

    private final ProxyManager<String> proxyManager;
    private final int authCapacityPerMinute;
    private final int adminCapacityPerMinute;

    public RateLimiter(RedisClient redisClient,
                        @Value("${auth.rate-limit.auth-capacity-per-minute:10}") int authCapacityPerMinute,
                        @Value("${auth.rate-limit.admin-capacity-per-minute:100}") int adminCapacityPerMinute) {
        this.proxyManager = createProxyManager(redisClient);
        this.authCapacityPerMinute = authCapacityPerMinute;
        this.adminCapacityPerMinute = adminCapacityPerMinute;
    }

    public boolean tryConsumeAuth(String key) {
        if (proxyManager == null) {
            return false; // fail CLOSED on auth endpoints (§13)
        }
        try {
            return bucket("auth:" + key, authCapacityPerMinute).tryConsume(1);
        } catch (Exception redisUnavailable) {
            return false; // fail CLOSED on auth endpoints (§13)
        }
    }

    public boolean tryConsumeAdmin(String key) {
        if (proxyManager == null) {
            return true; // fail OPEN on admin endpoints (§13)
        }
        try {
            return bucket("admin:" + key, adminCapacityPerMinute).tryConsume(1);
        } catch (Exception redisUnavailable) {
            return true; // fail OPEN on admin endpoints (§13)
        }
    }

    // Lettuce's RedisClient#connect blocks and throws immediately when the
    // target is unreachable. The constructor must not fail in that case —
    // availability is decided per-call by tryConsumeAuth/tryConsumeAdmin, so
    // a null proxyManager here means "Redis is down" to both of them.
    private static ProxyManager<String> createProxyManager(RedisClient redisClient) {
        try {
            RedisCodec<String, byte[]> codec = RedisCodec.of(StringCodec.UTF8, ByteArrayCodec.INSTANCE);
            return LettuceBasedProxyManager.builderFor(redisClient.connect(codec))
                    .withExpirationStrategy(
                            ExpirationAfterWriteStrategy.basedOnTimeForRefillingBucketUpToMax(Duration.ofMinutes(2)))
                    .build();
        } catch (Exception redisUnreachable) {
            return null;
        }
    }

    private BucketProxy bucket(String key, int capacityPerMinute) {
        Supplier<BucketConfiguration> configSupplier = () -> BucketConfiguration.builder()
                .addLimit(Bandwidth.builder().capacity(capacityPerMinute)
                        .refillIntervally(capacityPerMinute, Duration.ofMinutes(1)).build())
                .build();
        return proxyManager.builder().build(key, configSupplier);
    }
}
