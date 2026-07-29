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

    /** Single-use: the Redis key is deleted as soon as it's read, valid or not. */
    public PasswordChangeChallengeContext verifyChallenge(String rawTicket) {
        String redisKey = REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket);
        String value = redisTemplate.opsForValue().get(redisKey);
        if (value == null) {
            throw new PasswordChangeChallengeExpiredException();
        }
        redisTemplate.delete(redisKey);
        return PasswordChangeChallengeContext.fromRedisValue(value);
    }
}
