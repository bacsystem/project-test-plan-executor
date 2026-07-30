package com.bacsystem.auth.identity;

import com.bacsystem.auth.token.TokenHasher;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Set;
import java.util.UUID;

/**
 * Must-change-password challenge (§7/§5): mirrors {@code MfaService}'s
 * login-time challenge ticket mechanism for the {@code mfa_required} branch —
 * a single-use, Redis-backed ticket handed to the caller instead of a normal
 * token when {@code user.isMustChangePassword()} is true, exchanged later at
 * {@code POST /v1/auth/password/change-required} for a real token pair once
 * the password has actually been changed via {@code UserService.changePassword}.
 *
 * <p>Kept as its own small service, separate from {@code UserService}, for the
 * same reason MFA's challenge logic lives in {@code MfaService} rather than
 * {@code UserService}: it needs a {@link StringRedisTemplate}, which
 * {@code UserService} does not otherwise depend on.
 */
@Service
public class PasswordChangeChallengeService {

    private static final Duration CHALLENGE_TTL = Duration.ofMinutes(3);
    private static final String REDIS_KEY_PREFIX = "password-change:challenge:";

    private final StringRedisTemplate redisTemplate;

    public PasswordChangeChallengeService(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    /**
     * Issues a single-use challenge ticket after password verification, in place of a
     * normal token pair, for a user whose {@code mustChangePassword} flag is set.
     * Carries the application client id and originally-requested scopes so the
     * eventual post-change token pair is issued for the right {@code RegisteredClient}
     * with the same scopes the caller originally asked for — identical contract to
     * {@code MfaService.issueChallenge}.
     */
    public String issueChallenge(UUID userId, String applicationClientId, Set<String> scopes) {
        String rawTicket = TokenHasher.generateRawToken();
        redisTemplate.opsForValue().set(REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket),
                new PasswordChangeChallengeContext(userId, applicationClientId, scopes).toRedisValue(), CHALLENGE_TTL);
        return rawTicket;
    }

    /**
     * Validates the ticket exists and returns its context WITHOUT consuming it — mirrors the read half
     * of {@code MfaService.verifyChallenge}, which only deletes its Redis key once the rest of the
     * verification (there, the TOTP/backup-code check; here, the caller's full change-required flow)
     * has actually succeeded. Split out from the old single-step {@code verifyChallenge} because,
     * unlike MFA's code check, the remaining validation for this ticket (new-password strength) lives
     * one layer up in {@code PasswordController}/{@code UserService}, so the two steps can't be
     * collapsed into one method here the way MFA's can.
     */
    public PasswordChangeChallengeContext peekChallenge(String rawTicket) {
        String value = redisTemplate.opsForValue().get(redisKey(rawTicket));
        if (value == null) {
            throw new PasswordChangeChallengeExpiredException();
        }
        return PasswordChangeChallengeContext.fromRedisValue(value);
    }

    /**
     * Consumes (deletes) the ticket. Call only once the operation it gates has fully succeeded — same
     * single-use contract as MFA's challenge, just split into its own step since success here is
     * determined by the caller, not by this service.
     */
    public void consumeChallenge(String rawTicket) {
        redisTemplate.delete(redisKey(rawTicket));
    }

    private String redisKey(String rawTicket) {
        return REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket);
    }
}
