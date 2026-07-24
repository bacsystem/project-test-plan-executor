package com.bacsystem.auth.config;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.simple.SimpleMeterRegistry;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class ObservabilityConfigTest {

    @Test
    void deniesEmailAndUserIdTags() {
        MeterRegistry registry = new SimpleMeterRegistry();
        registry.config().meterFilter(new ObservabilityConfig().denyPersonalDataTags());

        registry.counter("logins", "result", "success").increment(); // allowed tag — must not throw
        assertThat(registry.find("logins").counter()).isNotNull();

        assertThrows(IllegalArgumentException.class,
                () -> registry.counter("logins", "email", "someone@test.com").increment());
        assertThrows(IllegalArgumentException.class,
                () -> registry.counter("logins", "user_id", "abc-123").increment());
    }
}
