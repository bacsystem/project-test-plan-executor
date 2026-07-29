package com.bacsystem.auth.security;

import com.bacsystem.auth.audit.AuditLogService;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoginAttemptService {

    private static final int THRESHOLD = 5;
    private static final long BASE_LOCKOUT_SECONDS = 60;
    private static final long MAX_LOCKOUT_SECONDS = 3600;
    private static final long LOOKBACK_SECONDS = 3600;

    private final LoginAttemptRepository loginAttemptRepository;
    // Not yet called: wiring into PasswordGrantAuthenticationProvider's audit
    // trail happens in a later task, per the plan. Kept here because the
    // brief mandates this constructor shape ahead of that wiring.
    private final AuditLogService auditLogService;
    private final MeterRegistry meterRegistry;

    public LoginAttemptService(LoginAttemptRepository loginAttemptRepository, AuditLogService auditLogService,
                                MeterRegistry meterRegistry) {
        this.loginAttemptRepository = loginAttemptRepository;
        this.auditLogService = auditLogService;
        this.meterRegistry = meterRegistry;
    }

    /** Throws {@link AccountLockedException} if either the account or the IP is over threshold (§13). */
    public void assertNotLocked(String email, String ipAddress) {
        Instant lookbackSince = Instant.now().minusSeconds(LOOKBACK_SECONDS);

        // Reset on success (§13): a failure window never reaches further back
        // than the most recent successful login, so failures from before it
        // don't count toward a fresh lockout.
        Instant accountSince = latestOf(lookbackSince, lastSuccessAt(
                loginAttemptRepository.findTopByEmailAttemptedAndSuccessTrueOrderByAttemptedAtDesc(email)));
        Instant ipSince = latestOf(lookbackSince, lastSuccessAt(
                loginAttemptRepository.findTopByIpAddressAndSuccessTrueOrderByAttemptedAtDesc(ipAddress)));

        List<LoginAttempt> byAccount = loginAttemptRepository
                .findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(email, accountSince);
        List<LoginAttempt> byIp = loginAttemptRepository
                .findByIpAddressAndSuccessFalseAndAttemptedAtAfter(ipAddress, ipSince);

        boolean accountLocked = isLocked(byAccount);
        boolean ipLocked = isLocked(byIp);
        // §16: login-failure burst / lockout rate is a security alert distinct from generic ops
        // metrics — tagged only with a bounded, non-PII "scope" (never the raw email or IP; see
        // ObservabilityConfig's forbidden-tag guard) so an external dashboard/alert can watch it.
        if (accountLocked) {
            meterRegistry.counter("login_attempt_locked", "scope", "account").increment();
        }
        if (ipLocked) {
            meterRegistry.counter("login_attempt_locked", "scope", "ip").increment();
        }
        if (accountLocked || ipLocked) {
            throw new AccountLockedException();
        }
    }

    private static Instant lastSuccessAt(Optional<LoginAttempt> lastSuccess) {
        return lastSuccess.map(LoginAttempt::getAttemptedAt).orElse(Instant.EPOCH);
    }

    private static Instant latestOf(Instant a, Instant b) {
        return a.isAfter(b) ? a : b;
    }

    public void recordFailure(String email, String ipAddress) {
        LoginAttempt attempt = new LoginAttempt();
        attempt.setEmailAttempted(email);
        attempt.setIpAddress(ipAddress);
        attempt.setSuccess(false);
        attempt.setAttemptedAt(Instant.now());
        loginAttemptRepository.save(attempt);
    }

    public void recordSuccess(UUID userId, String email, String ipAddress) {
        LoginAttempt attempt = new LoginAttempt();
        attempt.setUserId(userId);
        attempt.setEmailAttempted(email);
        attempt.setIpAddress(ipAddress);
        attempt.setSuccess(true);
        attempt.setAttemptedAt(Instant.now());
        loginAttemptRepository.save(attempt);
    }

    private boolean isLocked(List<LoginAttempt> recentFailures) {
        if (recentFailures.size() < THRESHOLD) {
            return false;
        }
        Instant mostRecentFailure = recentFailures.stream()
                .map(LoginAttempt::getAttemptedAt)
                .max(Instant::compareTo)
                .orElseThrow();
        long waitSeconds = lockoutDurationSeconds(recentFailures.size());
        return mostRecentFailure.plusSeconds(waitSeconds).isAfter(Instant.now());
    }

    /** Tier 1 at the 5th failure = 60s, doubling each subsequent tier, capped at 1 hour. */
    long lockoutDurationSeconds(int failureCount) {
        if (failureCount < THRESHOLD) {
            return 0;
        }
        int tier = (failureCount - THRESHOLD) / THRESHOLD;
        long seconds = BASE_LOCKOUT_SECONDS * (1L << Math.min(tier, 6));
        return Math.min(seconds, MAX_LOCKOUT_SECONDS);
    }
}
