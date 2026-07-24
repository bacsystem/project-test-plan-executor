package com.bacsystem.auth.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.distributed.BucketProxy;
import io.github.bucket4j.distributed.ExpirationAfterWriteStrategy;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;
import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisException;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;
import io.lettuce.core.codec.StringCodec;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(RateLimiter.class);

    private final RedisClient redisClient;
    private final int authCapacityPerMinute;
    private final int adminCapacityPerMinute;

    // Lazily (re)established: a null value means "Redis was unreachable the
    // last time we checked", not "Redis is down forever". Volatile so a
    // reconnect made under the lock in proxyManager() is visible to every
    // thread's fast-path read.
    private volatile ProxyManager<String> proxyManager;

    public RateLimiter(RedisClient redisClient,
                        @Value("${auth.rate-limit.auth-capacity-per-minute:10}") int authCapacityPerMinute,
                        @Value("${auth.rate-limit.admin-capacity-per-minute:100}") int adminCapacityPerMinute) {
        this.redisClient = redisClient;
        this.authCapacityPerMinute = authCapacityPerMinute;
        this.adminCapacityPerMinute = adminCapacityPerMinute;
        this.proxyManager = createProxyManager(redisClient);
    }

    public boolean tryConsumeAuth(String key) {
        ProxyManager<String> manager = proxyManager();
        if (manager == null) {
            return false; // fail CLOSED on auth endpoints (§13)
        }
        try {
            return bucket(manager, "auth:" + key, authCapacityPerMinute).tryConsume(1);
        } catch (RedisException redisUnavailable) {
            log.warn("Rate limiter: Redis unavailable while checking auth bucket for key '{}'; "
                    + "failing CLOSED", key, redisUnavailable);
            return false; // fail CLOSED on auth endpoints (§13)
        }
    }

    public boolean tryConsumeAdmin(String key) {
        ProxyManager<String> manager = proxyManager();
        if (manager == null) {
            return true; // fail OPEN on admin endpoints (§13)
        }
        try {
            return bucket(manager, "admin:" + key, adminCapacityPerMinute).tryConsume(1);
        } catch (RedisException redisUnavailable) {
            log.warn("Rate limiter: Redis unavailable while checking admin bucket for key '{}'; "
                    + "failing OPEN", key, redisUnavailable);
            return true; // fail OPEN on admin endpoints (§13)
        }
    }

    // Returns the current proxy manager, retrying the Redis connection if the
    // previous attempt failed. Without this, a transient outage at the exact
    // moment this singleton is constructed (e.g. a Redis restart during app
    // startup) would otherwise permanently fail-closed the whole auth surface
    // for the process lifetime, even after Redis recovers seconds later.
    private ProxyManager<String> proxyManager() {
        ProxyManager<String> current = proxyManager;
        if (current != null) {
            return current;
        }
        synchronized (this) {
            if (proxyManager == null) {
                proxyManager = createProxyManager(redisClient);
            }
            return proxyManager;
        }
    }

    // Lettuce's RedisClient#connect blocks and throws immediately when the
    // target is unreachable. Callers must not fail in that case — a null
    // return here means "Redis is down right now" to proxyManager(), which
    // will retry on the next call once the current reference is null again.
    private static ProxyManager<String> createProxyManager(RedisClient redisClient) {
        try {
            RedisCodec<String, byte[]> codec = RedisCodec.of(StringCodec.UTF8, ByteArrayCodec.INSTANCE);
            return LettuceBasedProxyManager.builderFor(redisClient.connect(codec))
                    .withExpirationStrategy(
                            ExpirationAfterWriteStrategy.basedOnTimeForRefillingBucketUpToMax(Duration.ofMinutes(2)))
                    .build();
        } catch (RedisException redisUnreachable) {
            log.warn("Rate limiter: failed to connect to Redis; rate limiting will fail-open/closed "
                    + "per endpoint until a subsequent request successfully reconnects", redisUnreachable);
            return null;
        }
    }

    private static BucketProxy bucket(ProxyManager<String> manager, String key, int capacityPerMinute) {
        Supplier<BucketConfiguration> configSupplier = () -> BucketConfiguration.builder()
                .addLimit(Bandwidth.builder().capacity(capacityPerMinute)
                        .refillIntervally(capacityPerMinute, Duration.ofMinutes(1)).build())
                .build();
        return manager.builder().build(key, configSupplier);
    }
}
