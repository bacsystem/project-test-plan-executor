package com.bacsystem.auth.security;

import com.bacsystem.auth.audit.AuditLogService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class LoginAttemptService {

    private static final int THRESHOLD = 5;
    private static final long BASE_LOCKOUT_SECONDS = 60;
    private static final long MAX_LOCKOUT_SECONDS = 3600;
    private static final long LOOKBACK_SECONDS = 3600;

    private final LoginAttemptRepository loginAttemptRepository;
    private final AuditLogService auditLogService;

    public LoginAttemptService(LoginAttemptRepository loginAttemptRepository, AuditLogService auditLogService) {
        this.loginAttemptRepository = loginAttemptRepository;
        this.auditLogService = auditLogService;
    }

    /** Throws {@link AccountLockedException} if either the account or the IP is over threshold (§13). */
    public void assertNotLocked(String email, String ipAddress) {
        Instant since = Instant.now().minusSeconds(LOOKBACK_SECONDS);
        List<LoginAttempt> byAccount = loginAttemptRepository
                .findByEmailAttemptedAndSuccessFalseAndAttemptedAtAfter(email, since);
        List<LoginAttempt> byIp = loginAttemptRepository
                .findByIpAddressAndSuccessFalseAndAttemptedAtAfter(ipAddress, since);

        if (isLocked(byAccount) || isLocked(byIp)) {
            throw new AccountLockedException();
        }
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
