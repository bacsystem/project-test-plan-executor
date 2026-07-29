package com.bacsystem.auth.web;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.UUID;

/**
 * Encodes/decodes the keyset-pagination cursor used by every list endpoint
 * per spec §10.1: an opaque, URL-safe token carrying the last row's
 * {@code (createdAt, id)} tie-break pair.
 */
public final class CursorCodec {

    private CursorCodec() {}

    public record Decoded(Instant createdAt, UUID id) {}

    public static String encode(Instant createdAt, UUID id) {
        String raw = createdAt.toString() + "|" + id;
        return Base64.getUrlEncoder().withoutPadding().encodeToString(raw.getBytes(StandardCharsets.UTF_8));
    }

    public static Decoded decode(String cursor) {
        if (cursor == null || cursor.isBlank()) {
            return null;
        }
        try {
            String raw = new String(Base64.getUrlDecoder().decode(cursor), StandardCharsets.UTF_8);
            String[] parts = raw.split("\\|", 2);
            if (parts.length != 2) {
                throw new InvalidCursorException(cursor, null);
            }
            return new Decoded(Instant.parse(parts[0]), UUID.fromString(parts[1]));
        } catch (InvalidCursorException e) {
            throw e;
        } catch (RuntimeException e) {
            // IllegalArgumentException (bad base64/UUID), DateTimeParseException — all
            // mean "client sent garbage", never a 500. Mapped by ProblemDetailAdvice.
            throw new InvalidCursorException(cursor, e);
        }
    }
}
