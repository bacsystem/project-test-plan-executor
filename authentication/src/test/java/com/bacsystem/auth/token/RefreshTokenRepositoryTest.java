package com.bacsystem.auth.token;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class RefreshTokenRepositoryTest extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private RefreshTokenRepository refreshTokenRepository;

    @Test
    void savesAndFindsByTokenHash() {
        User user = newUser();
        String tokenHash = "hash-1-" + System.nanoTime();

        RefreshToken token = new RefreshToken();
        token.setUser(user);
        token.setTokenHash(tokenHash);
        token.setApplicationClientId("example-app");
        token.setExpiresAt(Instant.now().plusSeconds(3600));
        RefreshToken saved = refreshTokenRepository.saveAndFlush(token);

        Optional<RefreshToken> found = refreshTokenRepository.findByTokenHash(tokenHash);
        assertThat(found).isPresent();
        assertThat(found.get().getUser().getId()).isEqualTo(user.getId());
        assertThat(found.get().getReplacedBy()).isNull();
    }

    @Test
    void rotationChainViaReplacedBy() {
        User user = newUser();
        String originalHash = "original-hash-" + System.nanoTime();
        String rotatedHash = "rotated-hash-" + System.nanoTime();

        RefreshToken original = new RefreshToken();
        original.setUser(user);
        original.setTokenHash(originalHash);
        original.setApplicationClientId("example-app");
        original.setExpiresAt(Instant.now().plusSeconds(3600));
        original = refreshTokenRepository.saveAndFlush(original);

        RefreshToken rotated = new RefreshToken();
        rotated.setUser(user);
        rotated.setTokenHash(rotatedHash);
        rotated.setApplicationClientId("example-app");
        rotated.setExpiresAt(Instant.now().plusSeconds(3600));
        rotated = refreshTokenRepository.saveAndFlush(rotated);

        original.setReplacedBy(rotated);
        refreshTokenRepository.saveAndFlush(original);

        List<RefreshToken> chain = refreshTokenRepository.findByUserId(user.getId()).stream()
                .filter(t -> t.getTokenHash().equals(originalHash) || t.getTokenHash().equals(rotatedHash))
                .toList();
        assertThat(chain).hasSize(2);

        Optional<RefreshToken> found = refreshTokenRepository.findByTokenHash(originalHash);
        assertThat(found).isPresent();
        assertThat(found.get().getReplacedBy()).isNotNull();
        assertThat(found.get().getReplacedBy().getId()).isEqualTo(rotated.getId());
    }

    @Test
    void findByTokenHashReturnsEmptyForUnknownHash() {
        Optional<RefreshToken> found = refreshTokenRepository.findByTokenHash("does-not-exist");
        assertThat(found).isEmpty();
    }

    @Test
    void findByUserIdReturnsEmptyListForUserWithNoTokens() {
        User user = newUser();

        List<RefreshToken> chain = refreshTokenRepository.findByUserId(user.getId());
        assertThat(chain).isEmpty();
    }

    private User newUser() {
        Tenant tenant = new Tenant();
        tenant.setSlug("token-" + System.nanoTime());
        tenant.setName("Token Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        User user = new User();
        user.setTenant(tenant);
        user.setEmail("user@token.test");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        return userRepository.saveAndFlush(user);
    }
}
