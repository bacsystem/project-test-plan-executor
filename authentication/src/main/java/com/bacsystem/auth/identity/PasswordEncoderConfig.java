package com.bacsystem.auth.identity;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@Configuration
public class PasswordEncoderConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        // saltLength=16, hashLength=32, parallelism=1, memory=19456 KB (~19 MB),
        // iterations=2 — OWASP's baseline Argon2id profile, ~250-350ms on
        // typical CI/cloud CPU. Recalibrate against target hardware (§17.2)
        // before relying on the derived login latency threshold.
        //
        // Delegating, not bare Argon2: this bean also verifies the OAuth2 client
        // secret Task 3's migration seeded as a BCrypt hash ({bcrypt}$2a$12$...) —
        // an Argon2-only encoder would reject that hash and break client auth.
        String defaultId = "argon2";
        Map<String, PasswordEncoder> encoders = Map.of(
                "argon2", new Argon2PasswordEncoder(16, 32, 1, 19456, 2),
                "bcrypt", new BCryptPasswordEncoder(12));
        return new DelegatingPasswordEncoder(defaultId, encoders);
    }
}
