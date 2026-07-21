package http

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	bsauth "bs-inventory/internal/auth"
	"bs-inventory/internal/domain"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type AuthServer struct {
	Tenants *postgres.TenantRepository
	Users   *postgres.UserRepository
	Issuer  *bsauth.TokenIssuer
}

func (s *AuthServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/api/v1/auth/tenants", s.handleRegisterTenant)
	r.Post("/api/v1/auth/login", s.handleLogin)
	return r
}

// NewProtectedTestRouterForAuthCheck exists only so Step 2's test can
// verify middleware.Auth rejects a missing token, without needing a full
// downstream handler wired up yet (that happens across Tasks 8-11).
func NewProtectedTestRouterForAuthCheck(issuer *bsauth.TokenIssuer) chi.Router {
	r := chi.NewRouter()
	r.With(middleware.Auth(issuer)).Get("/protected", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"tenantId": middleware.TenantID(r.Context())})
	})
	return r
}

type registerTenantRequest struct {
	TenantName    string `json:"tenantName"`
	CountryCode   string `json:"countryCode"`
	AdminEmail    string `json:"adminEmail"`
	AdminPassword string `json:"adminPassword"`
}

func (s *AuthServer) handleRegisterTenant(w http.ResponseWriter, r *http.Request) {
	var req registerTenantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.TenantName == "" || req.AdminEmail == "" || req.AdminPassword == "" {
		writeError(w, http.StatusBadRequest, "tenantName, adminEmail, and adminPassword are required")
		return
	}

	tenant, err := s.Tenants.Create(r.Context(), domain.Tenant{Name: req.TenantName, CountryCode: req.CountryCode})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create tenant")
		return
	}

	hash, err := bsauth.HashPassword(req.AdminPassword)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to hash password")
		return
	}

	user, err := s.Users.Create(r.Context(), domain.User{TenantID: tenant.ID, Email: req.AdminEmail, PasswordHash: hash, Role: domain.RoleAdmin})
	if err != nil {
		if err == postgres.ErrDuplicateEmail {
			writeError(w, http.StatusConflict, "a user with this email already exists")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to create admin user")
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"tenant":    tenant,
		"adminUser": map[string]string{"id": user.ID, "email": user.Email},
	})
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *AuthServer) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	user, err := s.Users.GetByEmail(r.Context(), req.Email)
	if err != nil || !bsauth.VerifyPassword(user.PasswordHash, req.Password) {
		writeError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}

	token, err := s.Issuer.GenerateToken(user.ID, user.TenantID, string(user.Role))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to generate token")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"token": token})
}
