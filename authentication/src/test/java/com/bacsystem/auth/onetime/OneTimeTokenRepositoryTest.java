package com.bacsystem.auth.onetime;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class OneTimeTokenRepositoryTest extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private OneTimeTokenRepository oneTimeTokenRepository;

    @Test
    void savesAndFindsUnredeemedByHash() {
        Tenant tenant = new Tenant();
        tenant.setSlug("ott-" + System.nanoTime());
        tenant.setName("OTT Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        User user = new User();
        user.setTenant(tenant);
        user.setEmail("reset@ott.test");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        user = userRepository.saveAndFlush(user);

        OneTimeToken token = new OneTimeToken();
        token.setUser(user);
        token.setPurpose(OneTimeTokenPurpose.PASSWORD_RESET);
        token.setTokenHash("reset-hash");
        token.setExpiresAt(Instant.now().plusSeconds(900));
        oneTimeTokenRepository.saveAndFlush(token);

        Optional<OneTimeToken> found = oneTimeTokenRepository
                .findByTokenHashAndRedeemedAtIsNull("reset-hash");
        assertThat(found).isPresent();
        assertThat(found.get().getPurpose()).isEqualTo(OneTimeTokenPurpose.PASSWORD_RESET);
    }
}
