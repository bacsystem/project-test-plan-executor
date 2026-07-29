package com.bacsystem.auth.token;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class RefreshTokenServiceIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RefreshTokenRepository refreshTokenRepository;
    @Autowired private RefreshTokenService refreshTokenService;

    private User newUser() {
        Tenant tenant = new Tenant();
        tenant.setSlug("rt-" + System.nanoTime());
        tenant.setName("RT Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        User user = new User();
        user.setTenant(tenant);
        user.setEmail("rt@test.test");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        return userRepository.saveAndFlush(user);
    }

    @Test
    void rotatingAValidTokenIssuesANewOneAndRevokesTheOld() {
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");

        String rotatedRaw = refreshTokenService.rotate(raw);

        assertThat(rotatedRaw).isNotEqualTo(raw);
        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw));
    }

    @Test
    void reusingAnAlreadyRotatedTokenRevokesTheWholeChain() {
        User user = newUser();
        String raw = refreshTokenService.issue(user, "example-app");
        String rotatedOnce = refreshTokenService.rotate(raw);

        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(raw));

        // the chain is fully revoked — even the legitimately-rotated token no longer works
        assertThrows(RefreshTokenReuseException.class, () -> refreshTokenService.rotate(rotatedOnce));
    }
}
