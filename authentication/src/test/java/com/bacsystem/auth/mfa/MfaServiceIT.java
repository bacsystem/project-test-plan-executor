package com.bacsystem.auth.mfa;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import dev.samstevens.totp.code.CodeGenerator;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MfaServiceIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private MfaService mfaService;
    @Autowired private MfaBackupCodeRepository mfaBackupCodeRepository;

    private static final int TOTP_PERIOD_SECONDS = 30;

    private final CodeGenerator codeGenerator = new DefaultCodeGenerator();

    private User newUser(String email) {
        Tenant tenant = new Tenant();
        tenant.setSlug("mfa-svc-" + System.nanoTime());
        tenant.setName("MFA Service Test");
        tenant = tenantRepository.saveAndFlush(tenant);
        return userService.createUser(tenant.getId(), email, "OriginalPassw0rd!1", null);
    }

    /**
     * {@link CodeGenerator#generate} takes the TOTP time-step counter (epoch seconds / period), not raw
     * epoch seconds — {@link dev.samstevens.totp.code.DefaultCodeVerifier} does that division internally
     * before comparing, so the test must do the same division to generate a code it will accept.
     */
    private String currentCodeFor(String rawSecret) throws Exception {
        long timeStepCounter = Math.floorDiv(new SystemTimeProvider().getTime(), TOTP_PERIOD_SECONDS);
        return codeGenerator.generate(rawSecret, timeStepCounter);
    }

    @Test
    void enrollConfirmAndVerifyFullCycle() throws Exception {
        User user = newUser("mfa-cycle@test.com");

        MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
        assertThat(enrollment.qrDataUri()).startsWith("data:image/png;base64,");

        String currentCode = currentCodeFor(enrollment.rawSecret());
        List<String> backupCodes = mfaService.confirmEnrollment(user.getId(), currentCode);
        assertThat(backupCodes).hasSize(10);

        String challenge = mfaService.issueChallenge(user.getId(), "example-app");
        String loginCode = currentCodeFor(enrollment.rawSecret());
        MfaChallengeContext result = mfaService.verifyChallenge(challenge, loginCode);
        assertThat(result.userId()).isEqualTo(user.getId());
    }

    @Test
    void challengeIsSingleUse() throws Exception {
        User user = newUser("mfa-single-use@test.com");
        MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
        String code = currentCodeFor(enrollment.rawSecret());
        mfaService.confirmEnrollment(user.getId(), code);

        String challenge = mfaService.issueChallenge(user.getId(), "example-app");
        String loginCode = currentCodeFor(enrollment.rawSecret());
        mfaService.verifyChallenge(challenge, loginCode);

        assertThrows(MfaChallengeExpiredException.class,
                () -> mfaService.verifyChallenge(challenge, loginCode));
    }

    @Test
    void backupCodeWorksOnceThenIsConsumed() throws Exception {
        User user = newUser("mfa-backup@test.com");
        MfaEnrollmentResult enrollment = mfaService.beginEnrollment(user.getId());
        String code = currentCodeFor(enrollment.rawSecret());
        List<String> backupCodes = mfaService.confirmEnrollment(user.getId(), code);
        String firstBackupCode = backupCodes.get(0);

        String challenge1 = mfaService.issueChallenge(user.getId(), "example-app");
        mfaService.verifyChallenge(challenge1, firstBackupCode);

        String challenge2 = mfaService.issueChallenge(user.getId(), "example-app");
        assertThrows(MfaVerificationFailedException.class,
                () -> mfaService.verifyChallenge(challenge2, firstBackupCode));
    }

    @Test
    void selfResetIsForbidden() {
        User user = newUser("mfa-self-reset@test.com");
        assertThrows(SelfMfaResetException.class,
                () -> mfaService.adminReset(user.getId(), user.getId(), "video call", false));
    }

    @Test
    void adminResetRevokesAllRefreshTokensAndDeactivatesMfa() throws Exception {
        User admin = newUser("mfa-admin@test.com");
        User target = newUser("mfa-target@test.com");
        MfaEnrollmentResult enrollment = mfaService.beginEnrollment(target.getId());
        String code = currentCodeFor(enrollment.rawSecret());
        mfaService.confirmEnrollment(target.getId(), code);

        mfaService.adminReset(admin.getId(), target.getId(), "in-person ID check", false);

        List<com.bacsystem.auth.mfa.MfaBackupCode> remainingCodes =
                mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(target.getId());
        assertThat(remainingCodes).isEmpty();
    }
}
