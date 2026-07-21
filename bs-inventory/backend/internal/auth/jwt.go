package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// ErrInvalidToken is returned for any token that fails parsing, signature
// verification, or expiry validation — callers get one uniform error so
// they can't distinguish "expired" from "tampered" and short-circuit auth.
var ErrInvalidToken = errors.New("invalid or expired token")

// Claims carries the tenant-scoped identity embedded in an issued token.
type Claims struct {
	UserID   string `json:"userId"`
	TenantID string `json:"tenantId"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

// TokenIssuer generates and validates HS256 JWTs signed with a shared secret.
type TokenIssuer struct {
	secret []byte
	ttl    time.Duration
}

// NewTokenIssuer builds a TokenIssuer with the given signing secret and
// token lifetime.
func NewTokenIssuer(secret string, ttl time.Duration) *TokenIssuer {
	return &TokenIssuer{secret: []byte(secret), ttl: ttl}
}

// GenerateToken issues a signed JWT embedding the given identity.
func (i *TokenIssuer) GenerateToken(userID, tenantID, role string) (string, error) {
	claims := Claims{
		UserID:   userID,
		TenantID: tenantID,
		Role:     role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(i.ttl)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(i.secret)
}

// ValidateToken parses and verifies tokenString, returning its claims.
func (i *TokenIssuer) ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (any, error) {
		return i.secret, nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil || !token.Valid {
		return nil, ErrInvalidToken
	}
	return claims, nil
}
