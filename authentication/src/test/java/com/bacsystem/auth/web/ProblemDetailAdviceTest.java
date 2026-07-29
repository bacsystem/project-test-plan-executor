package com.bacsystem.auth.web;

import com.bacsystem.auth.identity.DuplicateEmailException;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.WeakPasswordException;
import com.bacsystem.auth.mfa.MfaChallengeExpiredException;
import com.bacsystem.auth.mfa.MfaVerificationFailedException;
import com.bacsystem.auth.mfa.SelfMfaResetException;
import com.bacsystem.auth.onetime.OneTimeTokenInvalidException;
import com.bacsystem.auth.rbac.DuplicateRoleNameException;
import com.bacsystem.auth.rbac.RoleInUseException;
import com.bacsystem.auth.rbac.RoleNotFoundException;
import com.bacsystem.auth.rbac.RoleVersionConflictException;
import com.bacsystem.auth.token.RefreshTokenReuseException;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import static org.assertj.core.api.Assertions.assertThat;

class ProblemDetailAdviceTest {

    private final ProblemDetailAdvice advice = new ProblemDetailAdvice();

    @Test
    void roleVersionConflictMapsTo409WithSpecificCode() {
        ProblemDetail pd = advice.handleRoleVersionConflict(new RoleVersionConflictException());
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_VERSION_CONFLICT");
    }

    @Test
    void roleNotFoundMapsTo404WithSpecificCode() {
        ProblemDetail pd = advice.handleRoleNotFound(new RoleNotFoundException(UUID.randomUUID()));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_NOT_FOUND");
    }

    @Test
    void duplicateRoleNameMapsTo409WithSpecificCode() {
        ProblemDetail pd = advice.handleDuplicateRoleName(new DuplicateRoleNameException("admin"));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("DUPLICATE_ROLE_NAME");
    }

    @Test
    void roleInUseMapsTo409WithSpecificCode() {
        ProblemDetail pd = advice.handleRoleInUse(new RoleInUseException(UUID.randomUUID()));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_IN_USE");
    }

    @Test
    void duplicateEmailMapsTo409WithSpecificCode() {
        ProblemDetail pd = advice.handleDuplicateEmail(new DuplicateEmailException("a@b.com"));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("DUPLICATE_EMAIL");
    }

    @Test
    void userNotFoundMapsTo404WithSpecificCode() {
        ProblemDetail pd = advice.handleUserNotFound(new UserNotFoundException(UUID.randomUUID()));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("USER_NOT_FOUND");
    }

    @Test
    void weakPasswordMapsTo400WithSpecificCode() {
        ProblemDetail pd = advice.handleWeakPassword(new WeakPasswordException("too short"));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("WEAK_PASSWORD");
    }

    @Test
    void selfMfaResetMapsTo403WithSpecificCode() {
        ProblemDetail pd = advice.handleSelfMfaReset(new SelfMfaResetException());
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.FORBIDDEN.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("SELF_MFA_RESET_FORBIDDEN");
    }

    @Test
    void mfaVerificationFailureMapsToGenericAuthenticationFailed() {
        ProblemDetail pd = advice.handleMfaVerificationFailed(new MfaVerificationFailedException());
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("authentication_failed");
        // never a hint at why — §10.2
        assertThat(pd.getDetail()).doesNotContainIgnoringCase("totp");
        assertThat(pd.getDetail()).doesNotContainIgnoringCase("backup");
    }

    @Test
    void mfaChallengeExpiredMapsToGenericAuthenticationFailed() {
        ProblemDetail pd = advice.handleMfaChallengeExpired(new MfaChallengeExpiredException());
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("authentication_failed");
        assertThat(pd.getDetail()).doesNotContainIgnoringCase("challenge");
    }

    @Test
    void oneTimeTokenInvalidMapsToGenericAuthenticationFailed() {
        ProblemDetail pd = advice.handleOneTimeTokenInvalid(new OneTimeTokenInvalidException());
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("authentication_failed");
        assertThat(pd.getDetail()).doesNotContainIgnoringCase("one-time");
    }

    @Test
    void refreshTokenReuseMapsToGenericAuthenticationFailed() {
        ProblemDetail pd = advice.handleRefreshTokenReuse(new RefreshTokenReuseException());
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("authentication_failed");
        // never a hint that a reuse/replay was detected — §10.2
        assertThat(pd.getDetail()).doesNotContainIgnoringCase("reuse");
        assertThat(pd.getDetail()).doesNotContainIgnoringCase("revoked");
    }
}
