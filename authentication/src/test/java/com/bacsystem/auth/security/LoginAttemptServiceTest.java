package com.bacsystem.auth.security;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class LoginAttemptServiceTest {

    @Mock private LoginAttemptRepository loginAttemptRepository;
    @Mock private com.bacsystem.auth.audit.AuditLogService auditLogService;

    private MeterRegistry meterRegistry;

    private LoginAttemptService newService() {
        meterRegistry = new SimpleMeterRegistry();
        return new LoginAttemptService(loginAttemptRepository, auditLogService, meterRegistry);
    }

    private double lockedCounterCount(String scope) {
        var counter = meterRegistry.find("login_attempt_locked").tag("scope", scope).counter();
        return counter == null ? 0.0 : counter.count();
    }

    private double failedCounterCount(String scope) {
        var counter = meterRegistry.find("login_attempt_failed").tag("scope", scope).counter();
        return counter == null ? 0.0 : counter.count();
    }

    private List<LoginAttempt> failuresEndingAt(Instant lastFailure, int count) {
        return IntStream.range(0, count)
                .mapToObj(i -> {
                    LoginAttempt a = new LoginAttempt();
                    a.setSuccess(false);
                    a.setAttemptedAt(lastFailure.minusSeconds((count - 1 - i) * 5L));
                    return a;
                })
                .collect(Collectors.toList());
    }

    @Test
    void belowThresholdIsNotLocked() {
        when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(failuresEndingAt(Instant.now(), 4));
        when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(List.of());

        LoginAttemptService service = newService();

        service.assertNotLocked("user@test.com", "1.2.3.4");
        // no exception == not locked
        assertThat(lockedCounterCount("account")).isEqualTo(0.0);
        assertThat(lockedCounterCount("ip")).isEqualTo(0.0);
    }

    @Test
    void fifthFailureLocksForOneMinute() {
        Instant lastFailure = Instant.now();
        when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(failuresEndingAt(lastFailure, 5));
        when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(List.of());

        LoginAttemptService service = newService();

        assertThrows(AccountLockedException.class,
                () -> service.assertNotLocked("user@test.com", "1.2.3.4"));

        // §16: security alert distinct from generic ops metrics — an account-burst lockout must
        // be observable without scraping the login_attempts table.
        assertThat(lockedCounterCount("account")).isEqualTo(1.0);
        assertThat(lockedCounterCount("ip")).isEqualTo(0.0);
    }

    @Test
    void tenthFailureLocksLongerThanFifth() {
        LoginAttemptService service = newService();

        long fifthWaitSeconds = service.lockoutDurationSeconds(5);
        long tenthWaitSeconds = service.lockoutDurationSeconds(10);

        assertThat(tenthWaitSeconds).isGreaterThan(fifthWaitSeconds);
    }

    @Test
    void ipBurstAcrossDifferentAccountsAlsoLocks() {
        Instant lastFailure = Instant.now();
        when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(List.of());
        when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(failuresEndingAt(lastFailure, 5));

        LoginAttemptService service = newService();

        assertThrows(AccountLockedException.class,
                () -> service.assertNotLocked("victim@test.com", "9.9.9.9"));

        assertThat(lockedCounterCount("ip")).isEqualTo(1.0);
        assertThat(lockedCounterCount("account")).isEqualTo(0.0);
    }

    @Test
    void successResetsFailureCountSoOneNewFailureAfterwardsDoesNotRelock() {
        Instant now = Instant.now();
        // 5 failures well inside the 1-hour lookback window, but before the
        // success below -- these must stop counting once the login succeeds.
        List<LoginAttempt> staleFailuresBeforeSuccess = failuresEndingAt(now.minusSeconds(3200), 5);

        LoginAttempt success = new LoginAttempt();
        success.setSuccess(true);
        success.setAttemptedAt(now.minusSeconds(30));

        LoginAttempt newFailureAfterSuccess = new LoginAttempt();
        newFailureAfterSuccess.setSuccess(false);
        newFailureAfterSuccess.setAttemptedAt(now);

        List<LoginAttempt> allAttemptsForAccount = new ArrayList<>();
        allAttemptsForAccount.addAll(staleFailuresBeforeSuccess);
        allAttemptsForAccount.add(newFailureAfterSuccess);

        when(loginAttemptRepository.findTopByEmailAttemptedAndSuccessTrueOrderByAttemptedAtDesc(any()))
                .thenReturn(Optional.of(success));
        // Mimics the real repository: only failures strictly after the
        // "since" argument the service passes are returned.
        when(loginAttemptRepository.findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenAnswer(invocation -> {
                    Instant since = invocation.getArgument(1);
                    return allAttemptsForAccount.stream()
                            .filter(a -> a.getAttemptedAt().isAfter(since))
                            .collect(Collectors.toList());
                });
        when(loginAttemptRepository.findByIpAddressAndSuccessFalseAndAttemptedAtAfter(any(), any()))
                .thenReturn(List.of());

        LoginAttemptService service = newService();

        service.assertNotLocked("user@test.com", "1.2.3.4");
        // no exception == the 5 stale pre-success failures no longer count;
        // only the single new failure remains, which is below THRESHOLD.
    }

    // §16: a slow-and-low credential-stuffing burst that stays under the
    // per-account/per-IP lockout threshold must still be observable — every
    // raw failed attempt increments this counter, not just the ones that
    // trip a lockout. §16 also requires the failure-burst alert to be
    // distinguishable by IP vs. by account (distinct from the per-account-only
    // signal), mirroring login_attempt_locked's scope=account|ip tag scheme
    // instead of one untagged/global counter.
    @Test
    void recordFailureIncrementsFailedCounterOnEveryCallEvenBelowLockoutThreshold() {
        LoginAttemptService service = newService();

        service.recordFailure("user@test.com", "1.2.3.4");
        assertThat(failedCounterCount("account")).isEqualTo(1.0);
        assertThat(failedCounterCount("ip")).isEqualTo(1.0);

        service.recordFailure("other@test.com", "5.6.7.8");
        service.recordFailure("other@test.com", "5.6.7.8");
        assertThat(failedCounterCount("account")).isEqualTo(3.0);
        assertThat(failedCounterCount("ip")).isEqualTo(3.0);
    }
}
