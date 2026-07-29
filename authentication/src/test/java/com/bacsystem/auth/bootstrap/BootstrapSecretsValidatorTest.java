package com.bacsystem.auth.bootstrap;

import org.junit.jupiter.api.Test;
import org.springframework.boot.DefaultApplicationArguments;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

/**
 * Focused unit test for the fail-fast secrets check (§7): a real deployment
 * must never bootstrap with the placeholder admin password or MFA
 * encryption key committed in application.yml. No Spring context is needed
 * here — the validator is a plain constructor-injected component, so this
 * exercises {@link BootstrapSecretsValidator#run} directly, the same way
 * {@code BootstrapRunnerIT} exercises {@code BootstrapRunner#run} directly.
 */
class BootstrapSecretsValidatorTest {

    private static final String DEFAULT_ADMIN_PASSWORD = "ChangeMeOnFirstLogin!123";
    private static final String DEFAULT_MFA_KEY = "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY=";
    private static final String OVERRIDDEN_ADMIN_PASSWORD = "S0meRe4llyStr0ngP@ssword!";
    private static final String OVERRIDDEN_MFA_KEY = "c29tZS1vdGhlci1zdHJvbmcta2V5LWJhc2U2NA==";

    @Test
    void refusesToBootstrapWithDefaultAdminPasswordAndDefaultMfaKey() {
        var validator = new BootstrapSecretsValidator(DEFAULT_ADMIN_PASSWORD, DEFAULT_MFA_KEY);

        assertThatThrownBy(() -> validator.run(new DefaultApplicationArguments("--bootstrap")))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("AUTH_BOOTSTRAP_ADMIN_PASSWORD");
    }

    @Test
    void refusesToBootstrapWithDefaultMfaKeyEvenWhenAdminPasswordIsOverridden() {
        var validator = new BootstrapSecretsValidator(OVERRIDDEN_ADMIN_PASSWORD, DEFAULT_MFA_KEY);

        assertThatThrownBy(() -> validator.run(new DefaultApplicationArguments("--bootstrap")))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("AUTH_MFA_SECRET_ENCRYPTION_KEY_BASE64");
    }

    @Test
    void allowsBootstrapWhenBothSecretsAreOverridden() {
        var validator = new BootstrapSecretsValidator(OVERRIDDEN_ADMIN_PASSWORD, OVERRIDDEN_MFA_KEY);

        assertThatCode(() -> validator.run(new DefaultApplicationArguments("--bootstrap")))
                .doesNotThrowAnyException();
    }

    @Test
    void skipsTheCheckEntirelyWhenTheBootstrapFlagIsAbsent() {
        var validator = new BootstrapSecretsValidator(DEFAULT_ADMIN_PASSWORD, DEFAULT_MFA_KEY);

        assertThat(validator).isNotNull();
        validator.run(new DefaultApplicationArguments());
        // No exception above is the assertion: without --bootstrap, the
        // check must not run at all (mirrors BootstrapRunner's own gating),
        // so ordinary startup and every Testcontainers-based test — none of
        // which pass --bootstrap as a real launch argument — are unaffected.
    }
}
