package com.bacsystem.auth.mfa;

public record MfaEnrollmentResult(String rawSecret, String qrDataUri) {
}
