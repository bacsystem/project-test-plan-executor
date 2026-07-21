package auth_test

import (
	"testing"
	"time"

	"bs-inventory/internal/auth"
)

func TestHashAndVerifyPassword(t *testing.T) {
	hash, err := auth.HashPassword("s3cr3t")
	if err != nil {
		t.Fatalf("HashPassword() error = %v", err)
	}
	if !auth.VerifyPassword(hash, "s3cr3t") {
		t.Error("VerifyPassword() = false, want true for correct password")
	}
	if auth.VerifyPassword(hash, "wrong") {
		t.Error("VerifyPassword() = true, want false for wrong password")
	}
}

func TestTokenIssuer_GenerateAndValidate(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)

	token, err := issuer.GenerateToken("user-1", "tenant-1", "admin")
	if err != nil {
		t.Fatalf("GenerateToken() error = %v", err)
	}

	claims, err := issuer.ValidateToken(token)
	if err != nil {
		t.Fatalf("ValidateToken() error = %v", err)
	}
	if claims.UserID != "user-1" || claims.TenantID != "tenant-1" || claims.Role != "admin" {
		t.Errorf("claims = %+v, want UserID=user-1 TenantID=tenant-1 Role=admin", claims)
	}
}

func TestTokenIssuer_RejectsExpiredToken(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", -time.Hour) // already expired

	token, err := issuer.GenerateToken("user-1", "tenant-1", "admin")
	if err != nil {
		t.Fatalf("GenerateToken() error = %v", err)
	}

	_, err = issuer.ValidateToken(token)
	if err != auth.ErrInvalidToken {
		t.Errorf("error = %v, want ErrInvalidToken", err)
	}
}

func TestTokenIssuer_RejectsTamperedToken(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	token, _ := issuer.GenerateToken("user-1", "tenant-1", "admin")

	_, err := issuer.ValidateToken(token + "tampered")
	if err != auth.ErrInvalidToken {
		t.Errorf("error = %v, want ErrInvalidToken", err)
	}
}
