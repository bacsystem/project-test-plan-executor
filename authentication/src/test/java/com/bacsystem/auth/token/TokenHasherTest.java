package com.bacsystem.auth.token;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TokenHasherTest {

    @Test
    void sameInputProducesSameHash() {
        assertThat(TokenHasher.sha256Hex("abc")).isEqualTo(TokenHasher.sha256Hex("abc"));
    }

    @Test
    void differentInputProducesDifferentHash() {
        assertThat(TokenHasher.sha256Hex("abc")).isNotEqualTo(TokenHasher.sha256Hex("abd"));
    }

    @Test
    void generateRawTokenIsUrlSafeAndNonEmpty() {
        String raw = TokenHasher.generateRawToken();
        assertThat(raw).isNotBlank();
        assertThat(raw).doesNotContain("+", "/", "=");
    }
}
