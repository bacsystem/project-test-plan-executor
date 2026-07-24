package com.bacsystem.auth.config;

import io.micrometer.core.instrument.Meter;
import io.micrometer.core.instrument.config.MeterFilter;
import io.micrometer.core.instrument.config.MeterFilterReply;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Set;

@Configuration
public class ObservabilityConfig {

    private static final Set<String> FORBIDDEN_TAG_KEYS = Set.of("email", "user_id", "userId");

    // §16: metrics must never carry personal data or unbounded-cardinality
    // tags (email, user_id) — enforced here so a forbidden tag fails loudly
    // at increment time rather than depending on reviewers catching it.
    @Bean
    public MeterFilter denyPersonalDataTags() {
        return new MeterFilter() {
            @Override
            public MeterFilterReply accept(Meter.Id id) {
                boolean hasForbiddenTag = id.getTags().stream()
                        .anyMatch(tag -> FORBIDDEN_TAG_KEYS.contains(tag.getKey()));
                if (hasForbiddenTag) {
                    throw new IllegalArgumentException(
                            "Metric tag would leak personal data / unbounded cardinality: " + id);
                }
                return MeterFilterReply.NEUTRAL;
            }
        };
    }
}
