package com.bacsystem.auth.token;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class SigningKeyRepositoryTest extends PostgresRedisTestBase {

    @Autowired private SigningKeyRepository signingKeyRepository;

    @Test
    void findsActiveAndRetiringKeysForJwks() {
        // The signing_keys table is shared across the whole test JVM (singleton container
        // pattern in PostgresRedisTestBase), so by the time this test runs, an ACTIVE row may
        // already exist from an earlier test class that exercised real JWT issuance (
        // SigningKeyService auto-bootstraps and commits one for real, outside any test
        // transaction). Retire any pre-existing ACTIVE key first so this test's own insert
        // doesn't violate the signing_keys_one_active_idx partial unique index, and use
        // nanoTime-suffixed kids plus a scoped assertion (rather than a raw hasSize on the
        // whole table) so leftover RETIRING rows from other classes can't affect the result.
        signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE)
                .ifPresent(existing -> {
                    existing.setStatus(SigningKeyStatus.RETIRED);
                    signingKeyRepository.saveAndFlush(existing);
                });

        String activeKid = "kid-active-" + System.nanoTime();
        SigningKey active = new SigningKey();
        active.setKid(activeKid);
        active.setAlgorithm("ES256");
        active.setPrivateKeyPem("priv-active");
        active.setPublicKeyPem("pub-active");
        active.setStatus(SigningKeyStatus.ACTIVE);
        active.setCreatedAt(Instant.now());
        signingKeyRepository.saveAndFlush(active);

        String retiringKid = "kid-retiring-" + System.nanoTime();
        SigningKey retiring = new SigningKey();
        retiring.setKid(retiringKid);
        retiring.setAlgorithm("ES256");
        retiring.setPrivateKeyPem("priv-retiring");
        retiring.setPublicKeyPem("pub-retiring");
        retiring.setStatus(SigningKeyStatus.RETIRING);
        retiring.setCreatedAt(Instant.now().minusSeconds(3600));
        retiring.setRetireAt(Instant.now().plusSeconds(3600));
        signingKeyRepository.saveAndFlush(retiring);

        List<SigningKey> publishable = signingKeyRepository
                .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
        assertThat(publishable).extracting(SigningKey::getKid).contains(activeKid, retiringKid);

        // Both rows above have fake, non-cryptographic PEM content ("priv-active"/"priv-retiring")
        // purely for exercising this repository query. Since signing_keys is a table shared
        // across the whole test JVM, leaving them in ACTIVE/RETIRING status would make any
        // later test's real JWT issuance (which selects from ACTIVE/RETIRING) try to parse
        // this garbage PEM data and fail. Clean up now that the assertion above is done.
        signingKeyRepository.delete(active);
        signingKeyRepository.delete(retiring);
    }
}
