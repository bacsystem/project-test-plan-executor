package com.bacsystem.auth.web;

/**
 * Thrown when a client-supplied {@code size} query parameter is not positive.
 * Mapped by {@link ProblemDetailAdvice} to a 400 {@code application/problem+json}
 * response instead of the bare 500 {@code PageRequest.of} would otherwise throw.
 */
public class InvalidPageSizeException extends RuntimeException {
    public InvalidPageSizeException(int size) {
        super("size must be positive: " + size);
    }
}
