package com.bacsystem.auth.token;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class SigningKeyRepositoryTest extends PostgresRedisTestBase {

    @Autowired private SigningKeyRepository signingKeyRepository;

    @Test
    void findsActiveAndRetiringKeysForJwks() {
        // This test only exercises findByStatusIn's ACTIVE/RETIRING query, not the
        // signing_keys_one_active_idx partial unique index (that's covered elsewhere, e.g.
        // SigningKeyServiceTest). The signing_keys table is shared across the whole test JVM
        // (singleton container pattern in PostgresRedisTestBase), so by the time this test runs
        // an ACTIVE row may already exist from an earlier test class's real JWT issuance.
        // Never mutate that pre-existing row (doing so would flip a real ACTIVE key to RETIRED
        // out from under whatever other test relies on it) - instead reuse its kid for the
        // assertion, and only insert our own ACTIVE row (cleaning it up afterwards) when none
        // exists yet. Either way the RETIRING row is always our own, nanoTime-suffixed insert.
        Optional<SigningKey> preexistingActive = signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE);
        String activeKid;
        SigningKey ownActive = null;
        if (preexistingActive.isPresent()) {
            activeKid = preexistingActive.get().getKid();
        } else {
            activeKid = "kid-active-" + System.nanoTime();
            ownActive = new SigningKey();
            ownActive.setKid(activeKid);
            ownActive.setAlgorithm("ES256");
            ownActive.setPrivateKeyPem("priv-active");
            ownActive.setPublicKeyPem("pub-active");
            ownActive.setStatus(SigningKeyStatus.ACTIVE);
            ownActive.setCreatedAt(Instant.now());
            signingKeyRepository.saveAndFlush(ownActive);
        }

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

        // The retiring row above has fake, non-cryptographic PEM content ("priv-retiring")
        // purely for exercising this repository query. Since signing_keys is a table shared
        // across the whole test JVM, leaving it in RETIRING status would make any later test's
        // real JWT issuance (which selects from ACTIVE/RETIRING) try to parse this garbage PEM
        // data and fail. Clean up now that the assertion above is done. Only delete the ACTIVE
        // row if this test created it - a pre-existing one belongs to another test/component and
        // must be left untouched.
        signingKeyRepository.delete(retiring);
        if (ownActive != null) {
            signingKeyRepository.delete(ownActive);
        }
    }
}
