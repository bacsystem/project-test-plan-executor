package com.bacsystem.auth.web;

import com.bacsystem.auth.identity.DuplicateEmailException;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.WeakPasswordException;
import com.bacsystem.auth.mfa.MfaChallengeExpiredException;
import com.bacsystem.auth.mfa.MfaVerificationFailedException;
import com.bacsystem.auth.mfa.SelfMfaResetException;
import com.bacsystem.auth.onetime.OneTimeTokenInvalidException;
import com.bacsystem.auth.rbac.DuplicateRoleNameException;
import com.bacsystem.auth.rbac.RoleAlreadyAssignedException;
import com.bacsystem.auth.rbac.RoleAssignmentNotFoundException;
import com.bacsystem.auth.rbac.RoleInUseException;
import com.bacsystem.auth.rbac.RoleNotFoundException;
import com.bacsystem.auth.rbac.RoleVersionConflictException;
import com.bacsystem.auth.token.RefreshTokenReuseException;
import java.sql.SQLException;
import java.util.UUID;
import org.hibernate.exception.ConstraintViolationException;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

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
    void roleAlreadyAssignedMapsTo409WithSpecificCode() {
        ProblemDetail pd = advice.handleRoleAlreadyAssigned(
                new RoleAlreadyAssignedException(UUID.randomUUID(), UUID.randomUUID()));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_ALREADY_ASSIGNED");
    }

    @Test
    void roleAssignmentNotFoundMapsTo404WithSpecificCode() {
        ProblemDetail pd = advice.handleRoleAssignmentNotFound(
                new RoleAssignmentNotFoundException(UUID.randomUUID(), UUID.randomUUID()));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.NOT_FOUND.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_ASSIGNMENT_NOT_FOUND");
    }

    // Narrow backstop for the assignRole race (Item 1): this handler exists ONLY to
    // catch user_roles' PK constraint (user_roles_pkey, see V5__create_rbac_tables.sql)
    // slipping past RoleService's existsById pre-check. Every other
    // DataIntegrityViolationException (a different unique/FK/check constraint,
    // frequently signaling a real application bug — e.g. a NOT-NULL violation) must
    // propagate unhandled so it surfaces as the default 500, not a misleading 409.

    @Test
    void dataIntegrityViolationOnUserRolesPkMessageMapsTo409WithRoleAlreadyAssignedCode() {
        // Real Postgres wording, as observed with no wrapped SQLException/ConstraintViolationException
        // available (mirrors UserControllerTest's mocked race scenario).
        ProblemDetail pd = advice.handleDataIntegrityViolation(
                new DataIntegrityViolationException(
                        "duplicate key value violates unique constraint \"user_roles_pkey\""));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_ALREADY_ASSIGNED");
    }

    @Test
    void dataIntegrityViolationOnUserRolesPkViaConstraintNameMapsTo409WithRoleAlreadyAssignedCode() {
        // Real path through a live DB: Hibernate wraps the driver's SQLException in its
        // own ConstraintViolationException, which exposes the constraint name directly
        // rather than requiring message-sniffing.
        ConstraintViolationException cve = new ConstraintViolationException(
                "could not execute statement", new SQLException("duplicate key value"), "user_roles_pkey");
        ProblemDetail pd = advice.handleDataIntegrityViolation(
                new DataIntegrityViolationException("insert failed", cve));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.CONFLICT.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("ROLE_ALREADY_ASSIGNED");
    }

    @Test
    void dataIntegrityViolationOnADifferentConstraintPropagatesUnhandled() {
        // e.g. UserService.createUser's identical existsById-then-save TOCTOU race against
        // users(tenant_id, email)'s unique constraint must NOT be reclassified as a
        // role-assignment 409 — it should fall through to the default 500.
        DataIntegrityViolationException e = new DataIntegrityViolationException(
                "duplicate key value violates unique constraint \"users_tenant_id_email_key\"");
        assertThatThrownBy(() -> advice.handleDataIntegrityViolation(e)).isSameAs(e);
    }

    @Test
    void dataIntegrityViolationWithNoDeterminableConstraintPropagatesUnhandled() {
        // A genuine application bug (e.g. a NOT-NULL/FK/check-constraint violation) must
        // keep alerting as a raw 500, not get silently swallowed into a 409.
        DataIntegrityViolationException e = new DataIntegrityViolationException("not-null constraint failed");
        assertThatThrownBy(() -> advice.handleDataIntegrityViolation(e)).isSameAs(e);
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
    void invalidCursorMapsTo400WithSpecificCode() {
        ProblemDetail pd = advice.handleInvalidCursor(new InvalidCursorException("garbage", null));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("INVALID_CURSOR");
    }

    @Test
    void invalidPageSizeMapsTo400WithSpecificCode() {
        ProblemDetail pd = advice.handleInvalidPageSize(new InvalidPageSizeException(0));
        assertThat(pd.getStatus()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        assertThat(pd.getProperties().get("code")).isEqualTo("INVALID_PAGE_SIZE");
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
