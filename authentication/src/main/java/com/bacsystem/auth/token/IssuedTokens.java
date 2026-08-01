package com.bacsystem.auth.token;

import java.time.Instant;

public record IssuedTokens(String accessToken, Instant accessTokenExpiresAt, String refreshToken) {
}
