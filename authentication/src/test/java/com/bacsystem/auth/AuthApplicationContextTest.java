package com.bacsystem.auth;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;

class AuthApplicationContextTest extends PostgresRedisTestBase {

    @Test
    void contextLoads() {
        // Intentionally empty: a successful Spring context load against
        // real Postgres + Redis containers is the assertion.
    }
}
