package com.bacsystem.auth.identity;

import com.bacsystem.auth.token.TokenHasher;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

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
     * A ticket claimed via {@link #claimChallenge}, plus the TTL that remained on it at claim time —
     * everything {@link #restoreChallenge} needs to put an unused ticket back exactly as it was.
     */
    public record ClaimedChallenge(PasswordChangeChallengeContext context, Duration remainingTtl) {}

    /**
     * Atomically claims the ticket: a single Redis GETDEL (via {@link org.springframework.data.redis.core.ValueOperations#getAndDelete})
     * reads and deletes the key in one round-trip, so of any number of concurrent callers presenting
     * the same raw ticket, at most one can ever observe a non-null value — every other caller gets
     * nil back from GETDEL and fails here exactly as if the ticket didn't exist. This replaces the old
     * two-step {@code peekChallenge} (plain GET, non-destructive) + late {@code consumeChallenge}
     * (DEL, called only after the caller's entire downstream flow succeeded): that split had a TOCTOU
     * gap where two concurrent requests could both pass the non-destructive read, both run the full
     * change-required flow, and both eventually delete the same (already-deleted) key — redeeming a
     * single-use ticket twice.
     *
     * <p>Unlike the old {@code peekChallenge}, this DOES consume the ticket up front. A caller whose
     * remaining validation fails after a successful claim (e.g. {@code UserService.changePassword}
     * rejecting a weak new password) must call {@link #restoreChallenge} to put the ticket back for a
     * legitimate retry — see that method's javadoc.
     */
    public ClaimedChallenge claimChallenge(String rawTicket) {
        String key = redisKey(rawTicket);
        // Read the remaining TTL before claiming, purely so a later restoreChallenge can put the
        // ticket back with (approximately) the time budget it actually had left, rather than a fresh
        // full CHALLENGE_TTL — the claim's atomicity (and thus which caller wins) depends only on the
        // getAndDelete call below, not on this read, so a few milliseconds of staleness here is
        // harmless.
        Long ttlSeconds = redisTemplate.getExpire(key, TimeUnit.SECONDS);
        String value = redisTemplate.opsForValue().getAndDelete(key);
        if (value == null) {
            throw new PasswordChangeChallengeExpiredException();
        }
        Duration remainingTtl = (ttlSeconds != null && ttlSeconds > 0) ? Duration.ofSeconds(ttlSeconds) : CHALLENGE_TTL;
        return new ClaimedChallenge(PasswordChangeChallengeContext.fromRedisValue(value), remainingTtl);
    }

    /**
     * Re-inserts a ticket that {@link #claimChallenge} already consumed, restoring the same raw
     * ticket/context and (approximately) the TTL it had left at claim time. Call this only when the
     * atomic claim itself succeeded but the operation it gates then failed for a reason the caller
     * should be allowed to retry with the same ticket — e.g. {@code PasswordController.changeRequired}
     * calls this from a {@code WeakPasswordException} catch block, so a weak-password attempt doesn't
     * permanently burn the one-time ticket, mirroring the leniency the old {@code peekChallenge}
     * (non-destructive by default) used to provide for free.
     */
    public void restoreChallenge(String rawTicket, ClaimedChallenge claimed) {
        redisTemplate.opsForValue().set(redisKey(rawTicket), claimed.context().toRedisValue(), claimed.remainingTtl());
    }

    private String redisKey(String rawTicket) {
        return REDIS_KEY_PREFIX + TokenHasher.sha256Hex(rawTicket);
    }
}
