package com.bacsystem.auth.security;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class LoginAttemptRepositoryTest extends PostgresRedisTestBase {

    @Autowired private LoginAttemptRepository loginAttemptRepository;

    @Test
    void recordsAttemptAgainstNonexistentEmailWithNullUserId() {
        LoginAttempt attempt = new LoginAttempt();
        attempt.setUserId(null);
        attempt.setEmailAttempted("nobody@nowhere.test");
        attempt.setIpAddress("203.0.113.9");
        attempt.setSuccess(false);
        attempt.setAttemptedAt(Instant.now());

        LoginAttempt saved = loginAttemptRepository.saveAndFlush(attempt);
        assertThat(saved.getId()).isNotNull();
        assertThat(saved.getUserId()).isNull();
    }

    @Test
    void countsRecentFailuresByIpAcrossDifferentAccounts() {
        Instant now = Instant.now();
        for (int i = 0; i < 3; i++) {
            LoginAttempt attempt = new LoginAttempt();
            attempt.setEmailAttempted("victim" + i + "@spray.test");
            attempt.setIpAddress("198.51.100.5");
            attempt.setSuccess(false);
            attempt.setAttemptedAt(now);
            loginAttemptRepository.saveAndFlush(attempt);
        }

        List<LoginAttempt> byIp = loginAttemptRepository
                .findByIpAddressAndSuccessFalseAndAttemptedAtAfter(
                        "198.51.100.5", now.minusSeconds(60));
        assertThat(byIp).hasSize(3);
    }
}
