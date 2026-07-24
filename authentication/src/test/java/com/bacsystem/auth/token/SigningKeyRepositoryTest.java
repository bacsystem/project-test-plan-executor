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
        SigningKey active = new SigningKey();
        active.setKid("kid-active");
        active.setAlgorithm("ES256");
        active.setPrivateKeyPem("priv-active");
        active.setPublicKeyPem("pub-active");
        active.setStatus(SigningKeyStatus.ACTIVE);
        active.setCreatedAt(Instant.now());
        signingKeyRepository.saveAndFlush(active);

        SigningKey retiring = new SigningKey();
        retiring.setKid("kid-retiring");
        retiring.setAlgorithm("ES256");
        retiring.setPrivateKeyPem("priv-retiring");
        retiring.setPublicKeyPem("pub-retiring");
        retiring.setStatus(SigningKeyStatus.RETIRING);
        retiring.setCreatedAt(Instant.now().minusSeconds(3600));
        retiring.setRetireAt(Instant.now().plusSeconds(3600));
        signingKeyRepository.saveAndFlush(retiring);

        List<SigningKey> publishable = signingKeyRepository
                .findByStatusIn(List.of(SigningKeyStatus.ACTIVE, SigningKeyStatus.RETIRING));
        assertThat(publishable).hasSize(2);
    }
}
