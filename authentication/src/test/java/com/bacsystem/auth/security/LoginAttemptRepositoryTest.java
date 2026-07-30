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
        // login_attempts is shared across the whole test JVM (singleton container pattern in
        // PostgresRedisTestBase), so a hardcoded literal IP could collide with rows from other
        // tests/classes and make hasSize(3) flaky. ip_address is a plain, unvalidated
        // VARCHAR(45) (see LoginAttempt entity - no parsing anywhere in the codebase), so a
        // nanoTime-suffixed value is safe to use and keeps this test's rows exclusively its own,
        // which is what makes the hasSize(3) assertion below correct.
        Instant now = Instant.now();
        String ip = "198.51.100.5-" + System.nanoTime();
        for (int i = 0; i < 3; i++) {
            LoginAttempt attempt = new LoginAttempt();
            attempt.setEmailAttempted("victim" + i + "@spray.test");
            attempt.setIpAddress(ip);
            attempt.setSuccess(false);
            attempt.setAttemptedAt(now);
            loginAttemptRepository.saveAndFlush(attempt);
        }

        List<LoginAttempt> byIp = loginAttemptRepository
                .findByIpAddressAndSuccessFalseAndAttemptedAtAfter(
                        ip, now.minusSeconds(60));
        assertThat(byIp).hasSize(3);
    }

    @Test
    void findsMostRecentSuccessfulAttemptByEmail() {
        Instant older = Instant.now().minusSeconds(120);
        Instant newer = Instant.now();
        String email = "reset-" + System.nanoTime() + "@example.test";

        LoginAttempt earlierSuccess = new LoginAttempt();
        earlierSuccess.setEmailAttempted(email);
        earlierSuccess.setIpAddress("203.0.113.20");
        earlierSuccess.setSuccess(true);
        earlierSuccess.setAttemptedAt(older);
        loginAttemptRepository.saveAndFlush(earlierSuccess);

        LoginAttempt latestSuccess = new LoginAttempt();
        latestSuccess.setEmailAttempted(email);
        latestSuccess.setIpAddress("203.0.113.21");
        latestSuccess.setSuccess(true);
        latestSuccess.setAttemptedAt(newer);
        loginAttemptRepository.saveAndFlush(latestSuccess);

        Optional<LoginAttempt> found = loginAttemptRepository
                .findTopByEmailAttemptedAndSuccessTrueOrderByAttemptedAtDesc(email);

        assertThat(found).isPresent();
        assertThat(found.get().getAttemptedAt()).isEqualTo(newer);
        assertThat(found.get().getIpAddress()).isEqualTo("203.0.113.21");
    }

    @Test
    void findsMostRecentSuccessfulAttemptByIp() {
        Instant older = Instant.now().minusSeconds(120);
        Instant newer = Instant.now();
        String ip = "203.0.113.30-" + System.nanoTime();

        LoginAttempt earlierSuccess = new LoginAttempt();
        earlierSuccess.setEmailAttempted("first@example.test");
        earlierSuccess.setIpAddress(ip);
        earlierSuccess.setSuccess(true);
        earlierSuccess.setAttemptedAt(older);
        loginAttemptRepository.saveAndFlush(earlierSuccess);

        LoginAttempt latestSuccess = new LoginAttempt();
        latestSuccess.setEmailAttempted("second@example.test");
        latestSuccess.setIpAddress(ip);
        latestSuccess.setSuccess(true);
        latestSuccess.setAttemptedAt(newer);
        loginAttemptRepository.saveAndFlush(latestSuccess);

        Optional<LoginAttempt> found = loginAttemptRepository
                .findTopByIpAddressAndSuccessTrueOrderByAttemptedAtDesc(ip);

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
