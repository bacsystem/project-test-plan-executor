package com.bacsystem.auth.token;

import com.bacsystem.auth.audit.AuditLogService;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

/**
 * §16: scheduled key rotation is a watchdog-style signal — an external dashboard/alert needs a
 * counter that increments on every successful rotation so it can notice the *absence* of recent
 * increments (the standard Prometheus {@code rate() == 0} pattern), plus a separate counter for
 * rotation failures.
 */
@ExtendWith(MockitoExtension.class)
class SigningKeyServiceTest {

    @Mock private SigningKeyRepository signingKeyRepository;
    @Mock private AuditLogService auditLogService;

    private SigningKeyService newService(MeterRegistry meterRegistry) {
        return new SigningKeyService(signingKeyRepository, auditLogService, 7200, meterRegistry);
    }

    @Test
    void successfulScheduledRotationIncrementsTheSuccessCounterOnly() {
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        when(signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE)).thenReturn(Optional.empty());
        when(signingKeyRepository.insertActiveKeyIfAbsent(anyString(), anyString(), anyString(), anyString()))
                .thenReturn(1);
        when(signingKeyRepository.findByKid(anyString())).thenReturn(Optional.of(newActiveKey()));

        SigningKeyService service = newService(meterRegistry);
        service.rotate();

        assertThat(meterRegistry.find("signing_key_rotation_success").counter().count()).isEqualTo(1.0);
        assertThat(meterRegistry.find("signing_key_rotation_failure").counter()).isNull();
    }

    @Test
    void failedScheduledRotationIncrementsTheFailureCounterAndStillPropagatesTheException() {
        MeterRegistry meterRegistry = new SimpleMeterRegistry();
        when(signingKeyRepository.findByStatus(SigningKeyStatus.ACTIVE)).thenReturn(Optional.empty());
        when(signingKeyRepository.insertActiveKeyIfAbsent(anyString(), anyString(), anyString(), anyString()))
                .thenThrow(new RuntimeException("db unavailable"));

        SigningKeyService service = newService(meterRegistry);

        assertThrows(RuntimeException.class, service::rotate);

        assertThat(meterRegistry.find("signing_key_rotation_failure").counter().count()).isEqualTo(1.0);
        assertThat(meterRegistry.find("signing_key_rotation_success").counter()).isNull();
    }

    private static SigningKey newActiveKey() {
        SigningKey key = new SigningKey();
        key.setKid("kid-1");
        key.setAlgorithm("ES256");
        key.setPrivateKeyPem("priv");
        key.setPublicKeyPem("pub");
        key.setStatus(SigningKeyStatus.ACTIVE);
        return key;
    }
}
