package com.bacsystem.auth.mfa;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserRepository;
import com.bacsystem.auth.identity.UserStatus;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

class MfaRepositoryTest extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private MfaCredentialRepository mfaCredentialRepository;
    @Autowired private MfaBackupCodeRepository mfaBackupCodeRepository;

    @Test
    void savesCredentialAndBackupCodes() {
        User user = newUser();

        MfaCredential credential = new MfaCredential();
        credential.setUser(user);
        credential.setEncryptedSecret("enc-secret");
        credential.setActive(true);
        mfaCredentialRepository.saveAndFlush(credential);

        MfaBackupCode code = new MfaBackupCode();
        code.setUser(user);
        code.setCodeHash("code-hash-1");
        mfaBackupCodeRepository.saveAndFlush(code);

        Optional<MfaCredential> found = mfaCredentialRepository.findByUserIdAndActiveTrue(user.getId());
        assertThat(found).isPresent();

        List<MfaBackupCode> codes = mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(user.getId());
        assertThat(codes).hasSize(1);
    }

    private User newUser() {
        Tenant tenant = new Tenant();
        tenant.setSlug("mfa-" + System.nanoTime());
        tenant.setName("MFA Test");
        tenant = tenantRepository.saveAndFlush(tenant);

        User user = new User();
        user.setTenant(tenant);
        user.setEmail("mfa@test.test");
        user.setPasswordHash("{argon2}hash");
        user.setStatus(UserStatus.ACTIVE);
        return userRepository.saveAndFlush(user);
    }
}
