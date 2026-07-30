package com.bacsystem.auth.support;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.utility.DockerImageName;

@ExtendWith(org.springframework.test.context.junit.jupiter.SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public abstract class PostgresRedisTestBase {

    // Singleton container pattern: these are started exactly once for the whole test JVM
    // (guaranteed by JVM classloading of this base class) and are intentionally never
    // stopped here - Testcontainers' Ryuk reaper cleans them up when the JVM exits.
    // Each subclass previously declared its own @Container static fields, which under
    // @Testcontainers are per-class-managed, causing ~70 containers (35 classes x 2) to be
    // started/stopped across a full suite run plus several cached Spring ApplicationContexts
    // each with a Hikari pool pointed at a different container - this reliably exhausted
    // Docker/DB resources and caused HikariPool "Connection is not available" errors.
    static final PostgreSQLContainer<?> POSTGRES =
            new PostgreSQLContainer<>(DockerImageName.parse("postgres:16-alpine"))
                    .withDatabaseName("authentication")
                    .withUsername("authentication")
                    .withPassword("authentication");

    static final GenericContainer<?> REDIS =
            new GenericContainer<>(DockerImageName.parse("redis:7-alpine"))
                    .withExposedPorts(6379);

    static {
        POSTGRES.start();
        REDIS.start();
    }

    @DynamicPropertySource
    static void registerProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", POSTGRES::getJdbcUrl);
        registry.add("spring.datasource.username", POSTGRES::getUsername);
        registry.add("spring.datasource.password", POSTGRES::getPassword);
        registry.add("spring.data.redis.host", REDIS::getHost);
        registry.add("spring.data.redis.port", () -> REDIS.getMappedPort(6379));
    }

    /**
     * Redis (unlike Postgres) has no per-test unique-value convention that could keep classes
     * isolated from each other: rate-limiter/login-attempt keys are inherently keyed by IP
     * address, and every test hits the app from the same loopback address. Under the old
     * per-class container model each class got a brand-new, empty Redis, so this was never
     * visible. Under the shared singleton Redis, one class's login/reset attempts would
     * otherwise accumulate towards the same rate-limit bucket seen by every later class,
     * causing spurious 429 TOO_MANY_REQUESTS failures unrelated to what that later class is
     * actually testing. A FLUSHALL is a sub-millisecond, in-memory, no-I/O operation - it
     * restores the old per-class isolation boundary without reintroducing the container
     * start/stop and Postgres connection-pool contention the singleton pattern removes.
     */
    @BeforeAll
    static void flushRedisBetweenTestClasses() throws Exception {
        REDIS.execInContainer("redis-cli", "FLUSHALL");
    }
}
