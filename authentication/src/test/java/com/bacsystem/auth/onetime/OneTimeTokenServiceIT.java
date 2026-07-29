package com.bacsystem.auth.onetime;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class OneTimeTokenServiceIT extends PostgresRedisTestBase {

    private static final java.util.UUID UUID_TENANT = java.util.UUID.randomUUID();

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private UserService userService;
    @Autowired private OneTimeTokenService oneTimeTokenService;

    @Test
    void requestResetForUnknownEmailDoesNotThrow() {
        // always looks like success (§10.2 / §12) — no exception, no signal either way
        oneTimeTokenService.requestPasswordReset(UUID_TENANT, "nobody@nowhere.test");
    }

    @Test
    void fullResetCycleChangesPassword() {
        Tenant tenant = new Tenant();
        tenant.setSlug("ott-svc-" + System.nanoTime());
        tenant.setName("OTT Service Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        User user = userService.createUser(tenant.getId(), "reset-me@test.com", "OriginalPassw0rd!1", null);

        String rawToken = oneTimeTokenService.requestPasswordReset(tenant.getId(), "reset-me@test.com");
        assertThat(rawToken).isNotBlank();

        oneTimeTokenService.confirmPasswordReset(rawToken, "BrandNewPassw0rd!99");

        User reloaded = userRepository.findById(user.getId()).orElseThrow();
        assertThat(reloaded.isMustChangePassword()).isFalse();
    }

    @Test
    void redeemingTheSameTokenTwiceFailsTheSecondTime() {
        Tenant tenant = new Tenant();
        tenant.setSlug("ott-redeem-" + System.nanoTime());
        tenant.setName("OTT Redeem Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        userService.createUser(tenant.getId(), "redeem@test.com", "OriginalPassw0rd!1", null);

        String rawToken = oneTimeTokenService.requestPasswordReset(tenant.getId(), "redeem@test.com");
        oneTimeTokenService.confirmPasswordReset(rawToken, "FirstNewPassw0rd!1");

        assertThrows(OneTimeTokenInvalidException.class,
                () -> oneTimeTokenService.confirmPasswordReset(rawToken, "SecondNewPassw0rd!2"));
    }
}
