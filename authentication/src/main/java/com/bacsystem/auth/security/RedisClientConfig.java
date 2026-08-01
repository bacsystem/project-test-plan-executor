package com.bacsystem.auth.security;

import io.lettuce.core.RedisClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Raw Lettuce {@link RedisClient} bean for bucket4j-redis's
 * {@code LettuceBasedProxyManager}, which needs the Lettuce client directly —
 * separate from Spring Data Redis's own {@code LettuceConnectionFactory}
 * (already used by {@code StringRedisTemplate} for the MFA challenge ticket).
 */
@Configuration
public class RedisClientConfig {

    @Bean
    public RedisClient redisClient(@Value("${spring.data.redis.host}") String host,
                                    @Value("${spring.data.redis.port}") int port) {
        return RedisClient.create("redis://" + host + ":" + port);
    }
}
