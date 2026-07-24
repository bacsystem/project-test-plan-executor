package com.bacsystem.auth.security;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import io.lettuce.core.RedisClient;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;

class RateLimiterIT extends PostgresRedisTestBase {

    @Autowired private RateLimiter rateLimiter;

    @Test
    void authBucketAllowsUpToConfiguredCapacityThenBlocks() {
        String key = "test-auth-" + System.nanoTime();
        for (int i = 0; i < 10; i++) {
            assertThat(rateLimiter.tryConsumeAuth(key)).isTrue();
        }
        assertThat(rateLimiter.tryConsumeAuth(key)).isFalse();
    }

    @Test
    void adminBucketFailsOpenWhenRedisIsUnreachable() {
        RateLimiter brokenRedisLimiter = new RateLimiter(
                RedisClient.create("redis://localhost:1"), 10, 100);

        // Redis at that port is unreachable — admin path must still allow the call
        assertThat(brokenRedisLimiter.tryConsumeAdmin("any-key")).isTrue();
    }

    @Test
    void authBucketFailsClosedWhenRedisIsUnreachable() {
        RateLimiter brokenRedisLimiter = new RateLimiter(
                RedisClient.create("redis://localhost:1"), 10, 100);

        // Redis at that port is unreachable — auth path must deny the call
        assertThat(brokenRedisLimiter.tryConsumeAuth("any-key")).isFalse();
    }
}
