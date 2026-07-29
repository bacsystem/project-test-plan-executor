package com.bacsystem.auth.web;

import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CursorCodecTest {

    @Test
    void roundTripsInstantAndId() {
        Instant now = Instant.parse("2026-07-24T10:15:30.123456Z");
        UUID id = UUID.randomUUID();

        String cursor = CursorCodec.encode(now, id);
        CursorCodec.Decoded decoded = CursorCodec.decode(cursor);

        assertThat(decoded.createdAt()).isEqualTo(now);
        assertThat(decoded.id()).isEqualTo(id);
    }

    @Test
    void nullOrBlankCursorDecodesToNull() {
        assertThat(CursorCodec.decode(null)).isNull();
        assertThat(CursorCodec.decode("")).isNull();
    }

    @Test
    void malformedBase64ThrowsInvalidCursorException() {
        assertThatThrownBy(() -> CursorCodec.decode("not-valid-base64!!"))
                .isInstanceOf(InvalidCursorException.class);
    }

    @Test
    void decodedValueWithoutDelimiterThrowsInvalidCursorException() {
        String cursor = java.util.Base64.getUrlEncoder().withoutPadding()
                .encodeToString("no-delimiter-here".getBytes(java.nio.charset.StandardCharsets.UTF_8));

        assertThatThrownBy(() -> CursorCodec.decode(cursor))
                .isInstanceOf(InvalidCursorException.class);
    }

    @Test
    void decodedValueWithUnparsableTimestampThrowsInvalidCursorException() {
        String cursor = java.util.Base64.getUrlEncoder().withoutPadding()
                .encodeToString("not-a-timestamp|not-a-uuid".getBytes(java.nio.charset.StandardCharsets.UTF_8));

        assertThatThrownBy(() -> CursorCodec.decode(cursor))
                .isInstanceOf(InvalidCursorException.class);
    }
}
