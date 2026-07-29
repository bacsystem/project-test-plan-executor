package com.bacsystem.auth.token;

import com.bacsystem.auth.support.PostgresRedisTestBase;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class SigningKeyServiceIT extends PostgresRedisTestBase {

    @Autowired private SigningKeyService signingKeyService;
    @Autowired private SigningKeyRepository signingKeyRepository;

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
}
