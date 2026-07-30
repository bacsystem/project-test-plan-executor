package com.bacsystem.auth.token;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

class SigningKeyServiceIT extends PostgresRedisTestBase {

    @Autowired private SigningKeyService signingKeyService;
    @Autowired private SigningKeyRepository signingKeyRepository;

    /**
     * The signing_keys table is shared across the whole test JVM (singleton container
     * pattern - see PostgresRedisTestBase). Several tests below deliberately exercise
     * rotate()/emergencyRotate(), which - by design - can leave a real ACTIVE key and a
     * real RETIRING key persisted simultaneously (the JWKS overlap window that lets
     * consumers keep validating tokens signed by a just-rotated-out key). That's correct
     * production behavior, but it means any other test class that issues a brand new JWT
     * afterward (e.g. TokenIssuerIT) can find more than one ES256 signing key published
     * and fail with "Found multiple JWK signing keys for algorithm 'ES256'" - a test
     * isolation gap, not a production bug. Clearing the table after each test here restores
     * a clean slate for whatever runs next; any test that needs an active key again will
     * simply have one lazily re-bootstrapped by SigningKeyService.currentActiveKey().
     */
    @AfterEach
    void cleanUpSigningKeys() {
        signingKeyRepository.deleteAll();
    }

    @Test
    void bootstrapsAnActiveKeyWhenNoneExists() {
        SigningKey active = signingKeyService.currentActiveKey();
        assertThat(active).isNotNull();
        assertThat(active.getAlgorithm()).isEqualTo("ES256");
    }

    @Test
    void scheduledRotationRetiresThePreviousActiveKeyWithOverlap() {
        SigningKey firstActive = signingKeyService.currentActiveKey();

        signingKeyService.rotate();

        SigningKey newActive = signingKeyService.currentActiveKey();
        assertThat(newActive.getId()).isNotEqualTo(firstActive.getId());

        List<SigningKey> publishable = signingKeyRepository
                .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
        assertThat(publishable).extracting(SigningKey::getId)
                .contains(firstActive.getId(), newActive.getId());

        SigningKey retiring = signingKeyRepository.findById(firstActive.getId()).orElseThrow();
        assertThat(retiring.getStatus()).isEqualTo(SigningKeyStatus.RETIRING);
        assertThat(retiring.getRetireAt()).isNotNull();
    }

    @Test
    void emergencyRotationRetiresImmediatelyWithNoOverlap() {
        SigningKey firstActive = signingKeyService.currentActiveKey();

        signingKeyService.emergencyRotate(firstActive.getKid());

        SigningKey retired = signingKeyRepository.findById(firstActive.getId()).orElseThrow();
        assertThat(retired.getStatus()).isEqualTo(SigningKeyStatus.RETIRED);

        List<SigningKey> publishable = signingKeyRepository
                .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
        assertThat(publishable).extracting(SigningKey::getId).doesNotContain(firstActive.getId());
    }

    @Test
    void emergencyRotationOfARetiringKeyDoesNotCreateASecondActiveKey() {
        SigningKey active = signingKeyService.currentActiveKey();
        signingKeyService.rotate();
        SigningKey stillActive = signingKeyService.currentActiveKey();
        SigningKey retiring = signingKeyRepository.findById(active.getId()).orElseThrow();
        assertThat(retiring.getStatus()).isEqualTo(SigningKeyStatus.RETIRING);

        signingKeyService.emergencyRotate(retiring.getKid());

        SigningKey retired = signingKeyRepository.findById(retiring.getId()).orElseThrow();
        assertThat(retired.getStatus()).isEqualTo(SigningKeyStatus.RETIRED);

        List<SigningKey> activeKeys = signingKeyRepository.findByStatusIn(List.of(SigningKeyStatus.ACTIVE));
        assertThat(activeKeys).extracting(SigningKey::getId).containsExactly(stillActive.getId());
    }

    @Test
    void retireExpiredOverlapsRetiresAnElapsedRetiringKeyButLeavesAFutureOneAlone() {
        SigningKey elapsed = new SigningKey();
        elapsed.setKid("kid-elapsed");
        elapsed.setAlgorithm("ES256");
        elapsed.setPrivateKeyPem("priv-elapsed");
        elapsed.setPublicKeyPem("pub-elapsed");
        elapsed.setStatus(SigningKeyStatus.RETIRING);
        elapsed.setRetireAt(Instant.now().minusSeconds(60));
        signingKeyRepository.saveAndFlush(elapsed);

        SigningKey stillWithinOverlap = new SigningKey();
        stillWithinOverlap.setKid("kid-not-yet");
        stillWithinOverlap.setAlgorithm("ES256");
        stillWithinOverlap.setPrivateKeyPem("priv-not-yet");
        stillWithinOverlap.setPublicKeyPem("pub-not-yet");
        stillWithinOverlap.setStatus(SigningKeyStatus.RETIRING);
        stillWithinOverlap.setRetireAt(Instant.now().plusSeconds(3600));
        signingKeyRepository.saveAndFlush(stillWithinOverlap);

        signingKeyService.retireExpiredOverlaps();

        SigningKey retired = signingKeyRepository.findById(elapsed.getId()).orElseThrow();
        assertThat(retired.getStatus()).isEqualTo(SigningKeyStatus.RETIRED);
        assertThat(retired.getRetiredAt()).isNotNull();

        SigningKey notYetRetired = signingKeyRepository.findById(stillWithinOverlap.getId()).orElseThrow();
        assertThat(notYetRetired.getStatus()).isEqualTo(SigningKeyStatus.RETIRING);
        // (cleanUpSigningKeys() below removes these rows after this test - see its Javadoc)
    }

    @Test
    void concurrentBootstrapOfTheActiveKeyNeverCreatesTwoActiveRows() throws Exception {
        int callers = 8;
        ExecutorService pool = Executors.newFixedThreadPool(callers);
        CountDownLatch ready = new CountDownLatch(callers);
        CountDownLatch go = new CountDownLatch(1);
        try {
            List<Future<SigningKey>> futures = IntStream.range(0, callers)
                    .mapToObj(i -> pool.submit(() -> {
                        ready.countDown();
                        go.await();
                        return signingKeyService.currentActiveKey();
                    }))
                    .collect(Collectors.toList());

            assertThat(ready.await(5, TimeUnit.SECONDS)).isTrue();
            go.countDown();

            List<SigningKey> results = futures.stream().map(f -> {
                try {
                    return f.get(10, TimeUnit.SECONDS);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }).collect(Collectors.toList());

            assertThat(results).extracting(SigningKey::getId).doesNotContainNull();
            List<SigningKey> activeKeys = signingKeyRepository.findByStatusIn(List.of(SigningKeyStatus.ACTIVE));
            assertThat(activeKeys).hasSize(1);
            assertThat(results).extracting(SigningKey::getId)
                    .allMatch(id -> id.equals(activeKeys.get(0).getId()));
        } finally {
            pool.shutdownNow();
        }
    }
}
