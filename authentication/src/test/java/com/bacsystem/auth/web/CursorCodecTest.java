package com.bacsystem.auth.web;

import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

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
    void nullCursorDecodesToEmpty() {
        assertThat(CursorCodec.decode(null)).isNull();
        assertThat(CursorCodec.decode("")).isNull();
    }
}
