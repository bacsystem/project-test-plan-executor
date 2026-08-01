package middleware

import (
	"context"
	"net/http"
	"strings"

	"bs-inventory/internal/auth"
)

type contextKey string

const (
	tenantIDKey contextKey = "tenantID"
	userIDKey   contextKey = "userID"
	roleKey     contextKey = "role"
)

// ContextWithClaims is an exported test seam: it lets a handler test in a
// later task inject a known tenant/user/role directly, without a real
// JWT round-trip through Auth per test. Production code only ever
// reaches this state via Auth below.
func ContextWithClaims(ctx context.Context, tenantID, userID, role string) context.Context {
	ctx = context.WithValue(ctx, tenantIDKey, tenantID)
	ctx = context.WithValue(ctx, userIDKey, userID)
	return context.WithValue(ctx, roleKey, role)
}

func Auth(issuer *auth.TokenIssuer) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			if !strings.HasPrefix(header, "Bearer ") {
				http.Error(w, `{"error":"missing or invalid Authorization header"}`, http.StatusUnauthorized)
				return
			}
			token := strings.TrimPrefix(header, "Bearer ")
			claims, err := issuer.ValidateToken(token)
			if err != nil {
				http.Error(w, `{"error":"invalid or expired token"}`, http.StatusUnauthorized)
				return
			}
			ctx := ContextWithClaims(r.Context(), claims.TenantID, claims.UserID, claims.Role)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func TenantID(ctx context.Context) string {
	v, _ := ctx.Value(tenantIDKey).(string)
	return v
}

func UserID(ctx context.Context) string {
	v, _ := ctx.Value(userIDKey).(string)
	return v
}
