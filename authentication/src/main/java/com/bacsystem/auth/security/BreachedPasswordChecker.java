package com.bacsystem.auth.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Component
public class BreachedPasswordChecker {

    private final Set<String> breachedShaHashes;

    @Autowired
    public BreachedPasswordChecker(@Value("classpath:breached-passwords-sample.txt") Resource resource) {
        this(loadPlaintextSet(resource));
    }

    // Package-private, not a second injection candidate: two public constructors with
    // no @Autowired on a @Component leaves Spring unable to pick one and fails context
    // startup for every test extending PostgresRedisTestBase, not just this class's own.
    // This one exists only for tests to pass an in-memory sample set directly.
    BreachedPasswordChecker(Set<String> plaintextSample) {
        this.breachedShaHashes = new HashSet<>();
        plaintextSample.forEach(p -> breachedShaHashes.add(sha1Hex(p)));
    }

    public boolean isBreached(String plaintextPassword) {
        return breachedShaHashes.contains(sha1Hex(plaintextPassword));
    }

    private static Set<String> loadPlaintextSet(Resource resource) {
        try (InputStream in = resource.getInputStream()) {
            return new HashSet<>(Arrays.asList(
                    new String(in.readAllBytes(), StandardCharsets.UTF_8).split("\\R+")));
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }

    private static String sha1Hex(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-1");
            byte[] hash = digest.digest(value.getBytes(StandardCharsets.UTF_8));
            StringBuilder hex = new StringBuilder();
            for (byte b : hash) hex.append(String.format("%02x", b));
            return hex.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException(e);
        }
    }
}
