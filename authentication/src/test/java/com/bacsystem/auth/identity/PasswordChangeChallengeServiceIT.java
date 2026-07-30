package com.bacsystem.auth.identity;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.Callable;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.atomic.AtomicInteger;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

/**
 * Regression coverage for the atomic claim/restore mechanism {@link PasswordChangeChallengeService}
 * uses to fix a TOCTOU race: the old {@code peekChallenge} (plain Redis GET) + late
 * {@code consumeChallenge} (Redis DEL) split let two concurrent callers presenting the same raw
 * ticket both pass the (non-destructive) read and both eventually delete the same key, so the
 * "single-use" ticket could be redeemed twice concurrently. {@code claimChallenge} now uses an
 * atomic Redis GETDEL so only one caller can ever observe a non-null value for a given ticket, and
 * {@code restoreChallenge} re-inserts the ticket for a legitimate retry when the caller's downstream
 * validation (e.g. weak-password check) fails after the atomic claim already consumed it.
 */
class PasswordChangeChallengeServiceIT extends PostgresRedisTestBase {

    @Autowired private PasswordChangeChallengeService passwordChangeChallengeService;

    private static final Set<String> SCOPES = Set.of("openid");

    @Test
    void claimChallengeReturnsTheContextAndConsumesTheTicket() {
        UUID userId = UUID.randomUUID();
        String rawTicket = passwordChangeChallengeService.issueChallenge(userId, "example-app", SCOPES);

        PasswordChangeChallengeService.ClaimedChallenge claimed =
                passwordChangeChallengeService.claimChallenge(rawTicket);

        assertThat(claimed.context().userId()).isEqualTo(userId);
        assertThat(claimed.context().applicationClientId()).isEqualTo("example-app");
        assertThat(claimed.context().scopes()).isEqualTo(SCOPES);

        // Single-use: a second claim of the same ticket must now fail.
        assertThrows(PasswordChangeChallengeExpiredException.class,
                () -> passwordChangeChallengeService.claimChallenge(rawTicket));
    }

    @Test
    void claimingAnUnknownTicketThrows() {
        assertThrows(PasswordChangeChallengeExpiredException.class,
                () -> passwordChangeChallengeService.claimChallenge("not-a-real-ticket"));
    }

    @Test
    void restoreChallengeMakesAClaimedTicketRedeemableAgain() {
        UUID userId = UUID.randomUUID();
        String rawTicket = passwordChangeChallengeService.issueChallenge(userId, "example-app", SCOPES);

        PasswordChangeChallengeService.ClaimedChallenge claimed =
                passwordChangeChallengeService.claimChallenge(rawTicket);
        passwordChangeChallengeService.restoreChallenge(rawTicket, claimed);

        PasswordChangeChallengeService.ClaimedChallenge secondClaim =
                passwordChangeChallengeService.claimChallenge(rawTicket);
        assertThat(secondClaim.context().userId()).isEqualTo(userId);

        // And now it really is consumed.
        assertThrows(PasswordChangeChallengeExpiredException.class,
                () -> passwordChangeChallengeService.claimChallenge(rawTicket));
    }

    // Regression for the exact race the fix closes: two concurrent callers presenting the same raw
    // ticket must not both win. Mirrors the ExecutorService/invokeAll pattern used by
    // RoleServiceConcurrencyIT / PermissionCatalogServiceConcurrencyIT elsewhere in this codebase.
    @Test
    void concurrentClaimsOfTheSameTicketSucceedExactlyOnce() throws Exception {
        UUID userId = UUID.randomUUID();
        String rawTicket = passwordChangeChallengeService.issueChallenge(userId, "example-app", SCOPES);

        int callers = 20;
        ExecutorService pool = Executors.newFixedThreadPool(callers);
        AtomicInteger okCount = new AtomicInteger();
        AtomicInteger expiredCount = new AtomicInteger();
        List<Throwable> unexpected = new CopyOnWriteArrayList<>();

        List<Callable<Void>> tasks = new java.util.ArrayList<>();
        for (int i = 0; i < callers; i++) {
            tasks.add(() -> {
                try {
                    passwordChangeChallengeService.claimChallenge(rawTicket);
                    okCount.incrementAndGet();
                } catch (PasswordChangeChallengeExpiredException expected) {
                    expiredCount.incrementAndGet();
                } catch (Throwable t) {
                    unexpected.add(t);
                }
                return null;
            });
        }
        List<Future<Void>> futures = pool.invokeAll(tasks);
        for (Future<Void> f : futures) f.get();
        pool.shutdown();

        assertThat(unexpected).isEmpty();
        assertThat(okCount.get()).isEqualTo(1);
        assertThat(expiredCount.get()).isEqualTo(callers - 1);
    }
}
