package com.bacsystem.auth.bootstrap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * Fails fast (§7) if either secret that a real deployment must override —
 * the initial admin password or the MFA secret-encryption key — is still
 * the placeholder literal committed in {@code application.yml}. A resolved
 * property equal to that literal means the operator never set the
 * corresponding environment variable, which for these two values is a
 * security bug waiting to happen (a publicly-known admin password, or a
 * publicly-known key "encrypting" every user's MFA secret).
 *
 * <p>Gated on {@code --bootstrap}, the same flag {@link BootstrapRunner}
 * itself requires, because that is the one process invocation where these
 * secrets are actually used to provision real data (see the {@code auth}
 * service definition in {@code docker-compose.k6.yml}). Ordinary
 * application startup and every Testcontainers-based test in this module
 * never pass that flag as a real launch argument, so they are completely
 * unaffected — this class only ever runs during an actual bootstrap.
 *
 * <p>Runs at {@link Ordered#HIGHEST_PRECEDENCE} so it executes before
 * {@link BootstrapRunner}: refusing to start must happen before any admin
 * user is created with a bad password.
 *
 * <p>The two literals below MUST stay byte-for-byte in sync with the
 * defaults in {@code application.yml}; if one changes, change both.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class BootstrapSecretsValidator implements ApplicationRunner {

    static final String DEFAULT_ADMIN_PASSWORD = "ChangeMeOnFirstLogin!123";
    static final String DEFAULT_MFA_SECRET_ENCRYPTION_KEY_BASE64 =
            "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY=";

    private final String adminPassword;
    private final String mfaSecretEncryptionKeyBase64;

    public BootstrapSecretsValidator(
            @Value("${auth.bootstrap.admin-password}") String adminPassword,
            @Value("${auth.mfa.secret-encryption-key-base64}") String mfaSecretEncryptionKeyBase64) {
        this.adminPassword = adminPassword;
        this.mfaSecretEncryptionKeyBase64 = mfaSecretEncryptionKeyBase64;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (!args.containsOption("bootstrap")) {
            return;
        }
        if (DEFAULT_ADMIN_PASSWORD.equals(adminPassword)) {
            throw new IllegalStateException(
                    "Refusing to bootstrap: AUTH_BOOTSTRAP_ADMIN_PASSWORD is unset, so the well-known "
                            + "default admin password from application.yml would be used. Set "
                            + "AUTH_BOOTSTRAP_ADMIN_PASSWORD to a strong, unique password and restart.");
        }
        if (DEFAULT_MFA_SECRET_ENCRYPTION_KEY_BASE64.equals(mfaSecretEncryptionKeyBase64)) {
            throw new IllegalStateException(
                    "Refusing to bootstrap: AUTH_MFA_SECRET_ENCRYPTION_KEY_BASE64 is unset, so the "
                            + "well-known default MFA encryption key from application.yml would be used, "
                            + "leaving every user's MFA secret effectively unencrypted. Set "
                            + "AUTH_MFA_SECRET_ENCRYPTION_KEY_BASE64 to a unique, securely generated "
                            + "base64-encoded key and restart.");
        }
    }
}
