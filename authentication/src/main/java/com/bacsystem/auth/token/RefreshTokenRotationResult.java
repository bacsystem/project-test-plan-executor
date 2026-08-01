package com.bacsystem.auth.token;

import com.bacsystem.auth.identity.User;

public record RefreshTokenRotationResult(User user, String newRawRefreshToken) {
}
