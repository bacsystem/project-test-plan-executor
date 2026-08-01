package com.bacsystem.auth.security;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class BreachedPasswordCheckerTest {

    private final BreachedPasswordChecker checker = new BreachedPasswordChecker(loadSampleList());

    private static java.util.Set<String> loadSampleList() {
        return java.util.Set.of("password123456", "letmein12345", "qwertyuiop12");
    }

    @Test
    void flagsKnownBreachedPassword() {
        assertThat(checker.isBreached("password123456")).isTrue();
    }

    @Test
    void allowsPasswordNotOnList() {
        assertThat(checker.isBreached("Tr0ub4dor&3-uncommon-phrase")).isFalse();
    }

    @Test
    void comparisonIsCaseSensitiveOnTheStoredHashNotThePlaintext() {
        // the checker hashes internally; casing of the raw input still matters
        // because it changes the SHA-1 digest, exactly like the real password would.
        assertThat(checker.isBreached("PASSWORD123456")).isFalse();
    }
}
