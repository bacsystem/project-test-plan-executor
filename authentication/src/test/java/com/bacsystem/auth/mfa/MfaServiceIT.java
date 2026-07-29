package com.bacsystem.auth.mfa;

import com.bacsystem.auth.identity.User;
import com.bacsystem.auth.identity.UserService;
import com.bacsystem.auth.rbac.Role;
import com.bacsystem.auth.rbac.RoleService;
import com.bacsystem.auth.rbac.UserRole;
import com.bacsystem.auth.rbac.UserRoleRepository;
import com.bacsystem.auth.support.PostgresRedisTestBase;
import com.bacsystem.auth.tenancy.Tenant;
import com.bacsystem.auth.tenancy.TenantRepository;
import dev.samstevens.totp.code.CodeGenerator;
import dev.samstevens.totp.code.DefaultCodeGenerator;
import dev.samstevens.totp.time.SystemTimeProvider;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

class MfaServiceIT extends PostgresRedisTestBase {

    @Autowired private TenantRepository tenantRepository;
    @Autowired private UserService userService;
    @Autowired private MfaService mfaService;
    @Autowired private MfaBackupCodeRepository mfaBackupCodeRepository;
    @Autowired private RoleService roleService;
    @Autowired private UserRoleRepository userRoleRepository;
    @Autowired private MeterRegistry meterRegistry;

    private static final String ADMIN_TARGET_COUNTER = "admin_mfa_reset_admin_target_total";

    private double adminTargetCounterValue() {
        Counter counter = meterRegistry.find(ADMIN_TARGET_COUNTER).counter();
        return counter == null ? 0.0 : counter.count();
    }

    private void grantAdminRole(User user, User grantedBy) {
        Role adminRole = roleService.createRole(user.getTenant().getId(), "admin", false, grantedBy.getId());
        UserRole assignment = new UserRole();
        assignment.setUser(user);
        assignment.setRole(adminRole);
        assignment.setAssignedBy(grantedBy);
        userRoleRepository.save(assignment);
    }

    private static final int TOTP_PERIOD_SECONDS = 30;

    private final CodeGenerator codeGenerator = new DefaultCodeGenerator();

    private User newUser(String email) {
        return userService.createUser(newTenant().getId(), email, "OriginalPassw0rd!1", null);
    }

    private Tenant newTenant() {
        Tenant tenant = new Tenant();
        tenant.setSlug("mfa-svc-" + System.nanoTime());
        tenant.setName("MFA Service Test");
        return tenantRepository.saveAndFlush(tenant);
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

        String challenge = mfaService.issueChallenge(user.getId(), "example-app", Set.of());
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

        String challenge = mfaService.issueChallenge(user.getId(), "example-app", Set.of());
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

        String challenge1 = mfaService.issueChallenge(user.getId(), "example-app", Set.of());
        mfaService.verifyChallenge(challenge1, firstBackupCode);

        String challenge2 = mfaService.issueChallenge(user.getId(), "example-app", Set.of());
        assertThrows(MfaVerificationFailedException.class,
                () -> mfaService.verifyChallenge(challenge2, firstBackupCode));
    }

    @Test
    void selfResetIsForbidden() {
        User user = newUser("mfa-self-reset@test.com");
        assertThrows(SelfMfaResetException.class,
                () -> mfaService.adminReset(user.getTenant().getId(), user.getId(), user.getId(), "video call"));
    }

    @Test
    void adminResetRevokesAllRefreshTokensAndDeactivatesMfa() throws Exception {
        Tenant tenant = newTenant();
        User admin = userService.createUser(tenant.getId(), "mfa-admin@test.com", "OriginalPassw0rd!1", null);
        User target = userService.createUser(tenant.getId(), "mfa-target@test.com", "OriginalPassw0rd!1", null);
        MfaEnrollmentResult enrollment = mfaService.beginEnrollment(target.getId());
        String code = currentCodeFor(enrollment.rawSecret());
        mfaService.confirmEnrollment(target.getId(), code);

        mfaService.adminReset(tenant.getId(), admin.getId(), target.getId(), "in-person ID check");

        List<com.bacsystem.auth.mfa.MfaBackupCode> remainingCodes =
                mfaBackupCodeRepository.findByUserIdAndUsedAtIsNull(target.getId());
        assertThat(remainingCodes).isEmpty();
    }

    @Test
    void adminResetRejectsTargetFromAnotherTenant() {
        User admin = newUser("mfa-admin-cross@test.com");
        User target = newUser("mfa-target-cross@test.com");

        assertThrows(com.bacsystem.auth.identity.UserNotFoundException.class,
                () -> mfaService.adminReset(admin.getTenant().getId(), admin.getId(), target.getId(),
                        "video call"));
    }

    @Test
    void adminResetOfGenuineAdminTargetEmitsElevatedSecuritySignal() {
        Tenant tenant = newTenant();
        User actor = userService.createUser(tenant.getId(), "mfa-signal-actor@test.com", "OriginalPassw0rd!1", null);
        User target = userService.createUser(tenant.getId(), "mfa-signal-target@test.com", "OriginalPassw0rd!1", null);
        grantAdminRole(target, actor);

        double before = adminTargetCounterValue();

        mfaService.adminReset(tenant.getId(), actor.getId(), target.getId(), "video call");

        assertThat(adminTargetCounterValue()).isEqualTo(before + 1.0);
    }

    @Test
    void adminResetOfNonAdminTargetDoesNotEmitElevatedSecuritySignal() {
        Tenant tenant = newTenant();
        User actor = userService.createUser(tenant.getId(), "mfa-nosignal-actor@test.com", "OriginalPassw0rd!1", null);
        User target = userService.createUser(tenant.getId(), "mfa-nosignal-target@test.com", "OriginalPassw0rd!1", null);

        double before = adminTargetCounterValue();

        mfaService.adminReset(tenant.getId(), actor.getId(), target.getId(), "video call");

        assertThat(adminTargetCounterValue()).isEqualTo(before);
    }
}
