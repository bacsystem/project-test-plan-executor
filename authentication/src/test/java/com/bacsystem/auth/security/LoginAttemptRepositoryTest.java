package com.bacsystem.auth.security;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

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

    @Test
    void findsMostRecentSuccessfulAttemptByEmail() {
        Instant older = Instant.now().minusSeconds(120);
        Instant newer = Instant.now();

        LoginAttempt earlierSuccess = new LoginAttempt();
        earlierSuccess.setEmailAttempted("reset@example.test");
        earlierSuccess.setIpAddress("203.0.113.20");
        earlierSuccess.setSuccess(true);
        earlierSuccess.setAttemptedAt(older);
        loginAttemptRepository.saveAndFlush(earlierSuccess);

        LoginAttempt latestSuccess = new LoginAttempt();
        latestSuccess.setEmailAttempted("reset@example.test");
        latestSuccess.setIpAddress("203.0.113.21");
        latestSuccess.setSuccess(true);
        latestSuccess.setAttemptedAt(newer);
        loginAttemptRepository.saveAndFlush(latestSuccess);

        Optional<LoginAttempt> found = loginAttemptRepository
                .findTopByEmailAttemptedAndSuccessTrueOrderByAttemptedAtDesc("reset@example.test");

        assertThat(found).isPresent();
        assertThat(found.get().getAttemptedAt()).isEqualTo(newer);
        assertThat(found.get().getIpAddress()).isEqualTo("203.0.113.21");
    }

    @Test
    void findsMostRecentSuccessfulAttemptByIp() {
        Instant older = Instant.now().minusSeconds(120);
        Instant newer = Instant.now();

        LoginAttempt earlierSuccess = new LoginAttempt();
        earlierSuccess.setEmailAttempted("first@example.test");
        earlierSuccess.setIpAddress("203.0.113.30");
        earlierSuccess.setSuccess(true);
        earlierSuccess.setAttemptedAt(older);
        loginAttemptRepository.saveAndFlush(earlierSuccess);

        LoginAttempt latestSuccess = new LoginAttempt();
        latestSuccess.setEmailAttempted("second@example.test");
        latestSuccess.setIpAddress("203.0.113.30");
        latestSuccess.setSuccess(true);
        latestSuccess.setAttemptedAt(newer);
        loginAttemptRepository.saveAndFlush(latestSuccess);

        Optional<LoginAttempt> found = loginAttemptRepository
                .findTopByIpAddressAndSuccessTrueOrderByAttemptedAtDesc("203.0.113.30");

        assertThat(found).isPresent();
        assertThat(found.get().getAttemptedAt()).isEqualTo(newer);
        assertThat(found.get().getEmailAttempted()).isEqualTo("second@example.test");
    }

    @Test
    void findsNoSuccessfulAttemptWhenNoneExist() {
        Optional<LoginAttempt> byEmail = loginAttemptRepository
                .findTopByEmailAttemptedAndSuccessTrueOrderByAttemptedAtDesc("nobody-succeeded@example.test");
        Optional<LoginAttempt> byIp = loginAttemptRepository
                .findTopByIpAddressAndSuccessTrueOrderByAttemptedAtDesc("203.0.113.99");

        assertThat(byEmail).isEmpty();
        assertThat(byIp).isEmpty();
    }
}
