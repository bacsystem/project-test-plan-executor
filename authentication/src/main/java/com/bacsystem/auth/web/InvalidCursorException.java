package com.bacsystem.auth.web;

/**
 * Thrown when a client-supplied {@code cursor} query parameter isn't a value
 * {@link CursorCodec#encode} could have produced — malformed base64, missing
 * delimiter, or an unparsable timestamp. Mapped by {@link ProblemDetailAdvice}
 * to a 400 {@code application/problem+json} response instead of a bare 500.
 */
public class InvalidCursorException extends RuntimeException {
    public InvalidCursorException(String cursor, Throwable cause) {
        super("Invalid cursor: " + cursor, cause);
    }
}
