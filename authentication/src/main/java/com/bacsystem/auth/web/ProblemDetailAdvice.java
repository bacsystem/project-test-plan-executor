package com.bacsystem.auth.web;

import com.bacsystem.auth.identity.DuplicateEmailException;
import com.bacsystem.auth.identity.UserNotFoundException;
import com.bacsystem.auth.identity.WeakPasswordException;
import com.bacsystem.auth.identity.PasswordChangeChallengeExpiredException;
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
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * RFC 7807 for validation/business errors; a single generic
 * {@code authentication_failed} code for every authentication failure,
 * regardless of real cause (§10.2) — the fine-grained {@code code} values
 * below never apply to credentials/MFA/token/lockout failures.
 */
@RestControllerAdvice
public class ProblemDetailAdvice {

    private static final String AUTH_FAILED_CODE = "authentication_failed";
    private static final String AUTH_FAILED_DETAIL = "Authentication failed";

    @ExceptionHandler(RoleVersionConflictException.class)
    public ProblemDetail handleRoleVersionConflict(RoleVersionConflictException e) {
        return problem(HttpStatus.CONFLICT, "ROLE_VERSION_CONFLICT", e.getMessage());
    }

    @ExceptionHandler(RoleNotFoundException.class)
    public ProblemDetail handleRoleNotFound(RoleNotFoundException e) {
        return problem(HttpStatus.NOT_FOUND, "ROLE_NOT_FOUND", e.getMessage());
    }

    @ExceptionHandler(DuplicateRoleNameException.class)
    public ProblemDetail handleDuplicateRoleName(DuplicateRoleNameException e) {
        return problem(HttpStatus.CONFLICT, "DUPLICATE_ROLE_NAME", e.getMessage());
    }

    @ExceptionHandler(RoleInUseException.class)
    public ProblemDetail handleRoleInUse(RoleInUseException e) {
        return problem(HttpStatus.CONFLICT, "ROLE_IN_USE", e.getMessage());
    }

    @ExceptionHandler(RoleAlreadyAssignedException.class)
    public ProblemDetail handleRoleAlreadyAssigned(RoleAlreadyAssignedException e) {
        return problem(HttpStatus.CONFLICT, "ROLE_ALREADY_ASSIGNED", e.getMessage());
    }

    @ExceptionHandler(RoleAssignmentNotFoundException.class)
    public ProblemDetail handleRoleAssignmentNotFound(RoleAssignmentNotFoundException e) {
        return problem(HttpStatus.NOT_FOUND, "ROLE_ASSIGNMENT_NOT_FOUND", e.getMessage());
    }

    // Postgres auto-names an unnamed composite PRIMARY KEY "<table>_pkey"; user_roles'
    // PK is declared without an explicit name in V5__create_rbac_tables.sql, so this
    // is the real constraint name, not an assumption.
    private static final String USER_ROLES_PK_CONSTRAINT = "user_roles_pkey";

    /**
     * Backstop for the race Item 1 documents on {@code RoleService.assignRole}: two
     * concurrent first-time assigns of the same (user, role) pair can both pass the
     * application-level {@code existsById} pre-check, in which case the loser hits
     * {@code user_roles}' PK constraint (enforced via {@code UserRole}'s {@code
     * Persistable} implementation) instead of the pre-check's own {@link
     * RoleAlreadyAssignedException}. This handler exists so that race is ALWAYS a
     * structured 409, regardless of which of the two paths actually fires — without
     * it the DB exception fell through to the default handler as a raw 500.
     *
     * <p>This is deliberately narrow: {@code @RestControllerAdvice} is app-wide, so a
     * blanket handler here would also swallow every OTHER
     * DataIntegrityViolationException in the app — e.g. {@code UserService.createUser}
     * has an identical existsById-then-save race against {@code users(tenant_id,
     * email)}'s unique constraint (which has its own, more specific, {@code
     * DuplicateEmailException}/{@code DUPLICATE_EMAIL} handling on the fast path), and
     * NOT-NULL/FK/check-constraint violations usually indicate a genuine application
     * bug that should alert as a raw 500, not get silently reclassified as a
     * client-facing 409. So only a violation of {@code user_roles_pkey} specifically
     * is translated here (by delegating to {@link #handleRoleAlreadyAssigned}, reusing
     * its response shape rather than duplicating it); every other constraint, or one
     * we can't identify, is rethrown so Spring's default (unmapped, 500) handling
     * takes over.
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    public ProblemDetail handleDataIntegrityViolation(DataIntegrityViolationException e) {
        if (violatesUserRolesPrimaryKey(e)) {
            return handleRoleAlreadyAssigned(new RoleAlreadyAssignedException());
        }
        throw e;
    }

    private boolean violatesUserRolesPrimaryKey(DataIntegrityViolationException e) {
        for (Throwable cause = e.getCause(); cause != null; cause = cause.getCause()) {
            if (cause instanceof ConstraintViolationException cve) {
                return USER_ROLES_PK_CONSTRAINT.equals(cve.getConstraintName());
            }
        }
        String message = e.getMostSpecificCause().getMessage();
        return message != null && message.contains(USER_ROLES_PK_CONSTRAINT);
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ProblemDetail handleDuplicateEmail(DuplicateEmailException e) {
        return problem(HttpStatus.CONFLICT, "DUPLICATE_EMAIL", e.getMessage());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ProblemDetail handleUserNotFound(UserNotFoundException e) {
        return problem(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", e.getMessage());
    }

    @ExceptionHandler(WeakPasswordException.class)
    public ProblemDetail handleWeakPassword(WeakPasswordException e) {
        return problem(HttpStatus.BAD_REQUEST, "WEAK_PASSWORD", e.getMessage());
    }

    @ExceptionHandler(SelfMfaResetException.class)
    public ProblemDetail handleSelfMfaReset(SelfMfaResetException e) {
        return problem(HttpStatus.FORBIDDEN, "SELF_MFA_RESET_FORBIDDEN", e.getMessage());
    }

    @ExceptionHandler(InvalidCursorException.class)
    public ProblemDetail handleInvalidCursor(InvalidCursorException e) {
        return problem(HttpStatus.BAD_REQUEST, "INVALID_CURSOR", e.getMessage());
    }

    @ExceptionHandler(InvalidPageSizeException.class)
    public ProblemDetail handleInvalidPageSize(InvalidPageSizeException e) {
        return problem(HttpStatus.BAD_REQUEST, "INVALID_PAGE_SIZE", e.getMessage());
    }

    // Everything below is an authentication failure — §10.2 requires ONE
    // generic code/detail regardless of which of these actually happened,
    // so the real exception message/type never reaches the response body.

    @ExceptionHandler(MfaChallengeExpiredException.class)
    public ProblemDetail handleMfaChallengeExpired(MfaChallengeExpiredException e) {
        return genericAuthenticationFailure();
    }

    @ExceptionHandler(PasswordChangeChallengeExpiredException.class)
    public ProblemDetail handlePasswordChangeChallengeExpired(PasswordChangeChallengeExpiredException e) {
        return genericAuthenticationFailure();
    }

    @ExceptionHandler(MfaVerificationFailedException.class)
    public ProblemDetail handleMfaVerificationFailed(MfaVerificationFailedException e) {
        return genericAuthenticationFailure();
    }

    @ExceptionHandler(OneTimeTokenInvalidException.class)
    public ProblemDetail handleOneTimeTokenInvalid(OneTimeTokenInvalidException e) {
        return genericAuthenticationFailure();
    }

    @ExceptionHandler(RefreshTokenReuseException.class)
    public ProblemDetail handleRefreshTokenReuse(RefreshTokenReuseException e) {
        return genericAuthenticationFailure();
    }

    private ProblemDetail genericAuthenticationFailure() {
        return problem(HttpStatus.BAD_REQUEST, AUTH_FAILED_CODE, AUTH_FAILED_DETAIL);
    }

    private ProblemDetail problem(HttpStatus status, String code, String detail) {
        ProblemDetail pd = ProblemDetail.forStatus(status);
        pd.setDetail(detail);
        pd.setProperty("code", code);
        return pd;
    }
}
