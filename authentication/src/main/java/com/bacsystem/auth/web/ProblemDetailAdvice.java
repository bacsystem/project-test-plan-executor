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

    // Everything below is an authentication failure — §10.2 requires ONE
    // generic code/detail regardless of which of these actually happened,
    // so the real exception message/type never reaches the response body.

    @ExceptionHandler(MfaChallengeExpiredException.class)
    public ProblemDetail handleMfaChallengeExpired(MfaChallengeExpiredException e) {
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
