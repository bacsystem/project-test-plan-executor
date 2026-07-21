package http_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	tcpostgres "github.com/testcontainers/testcontainers-go/modules/postgres"

	"bs-inventory/internal/auth"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/postgres"
)

func setupTestDB(t *testing.T) *pgxpool.Pool {
	t.Helper()
	ctx := context.Background()

	container, err := tcpostgres.Run(ctx, "postgres:16",
		tcpostgres.WithDatabase("bsinventory_test"),
		tcpostgres.WithUsername("test"),
		tcpostgres.WithPassword("test"),
		tcpostgres.BasicWaitStrategies(),
	)
	if err != nil {
		t.Fatalf("failed to start postgres: %v", err)
	}
	t.Cleanup(func() { _ = container.Terminate(ctx) })

	connStr, err := container.ConnectionString(ctx, "sslmode=disable")
	if err != nil {
		t.Fatalf("failed to get connection string: %v", err)
	}
	pool, err := pgxpool.New(ctx, connStr)
	if err != nil {
		t.Fatalf("failed to connect: %v", err)
	}
	t.Cleanup(pool.Close)

	schema, err := os.ReadFile("../postgres/schema.sql")
	if err != nil {
		t.Fatalf("failed to read schema: %v", err)
	}
	if _, err := pool.Exec(ctx, string(schema)); err != nil {
		t.Fatalf("failed to apply schema: %v", err)
	}

	return pool
}

func TestRegisterTenant_AndLogin(t *testing.T) {
	pool := setupTestDB(t)
	server := &bshttp.AuthServer{
		Tenants: postgres.NewTenantRepository(pool),
		Users:   postgres.NewUserRepository(pool),
		Issuer:  auth.NewTokenIssuer("test-secret", time.Hour),
	}
	ts := httptest.NewServer(server.Routes())
	defer ts.Close()

	regBody, _ := json.Marshal(map[string]string{
		"tenantName": "Acme Corp", "countryCode": "PE",
		"adminEmail": "admin@acme.com", "adminPassword": "s3cr3t",
	})
	resp, err := http.Post(ts.URL+"/api/v1/auth/tenants", "application/json", bytes.NewReader(regBody))
	if err != nil {
		t.Fatalf("POST tenants error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST tenants status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	loginBody, _ := json.Marshal(map[string]string{"email": "admin@acme.com", "password": "s3cr3t"})
	loginResp, err := http.Post(ts.URL+"/api/v1/auth/login", "application/json", bytes.NewReader(loginBody))
	if err != nil {
		t.Fatalf("POST login error = %v", err)
	}
	if loginResp.StatusCode != http.StatusOK {
		t.Fatalf("POST login status = %d, want %d", loginResp.StatusCode, http.StatusOK)
	}
	var body map[string]string
	json.NewDecoder(loginResp.Body).Decode(&body)
	if body["token"] == "" {
		t.Error("login response has no token")
	}
}

func TestLogin_WrongPassword(t *testing.T) {
	pool := setupTestDB(t)
	server := &bshttp.AuthServer{
		Tenants: postgres.NewTenantRepository(pool),
		Users:   postgres.NewUserRepository(pool),
		Issuer:  auth.NewTokenIssuer("test-secret", time.Hour),
	}
	ts := httptest.NewServer(server.Routes())
	defer ts.Close()

	regBody, _ := json.Marshal(map[string]string{
		"tenantName": "Acme Corp", "countryCode": "PE",
		"adminEmail": "admin2@acme.com", "adminPassword": "s3cr3t",
	})
	http.Post(ts.URL+"/api/v1/auth/tenants", "application/json", bytes.NewReader(regBody))

	loginBody, _ := json.Marshal(map[string]string{"email": "admin2@acme.com", "password": "wrong"})
	resp, err := http.Post(ts.URL+"/api/v1/auth/login", "application/json", bytes.NewReader(loginBody))
	if err != nil {
		t.Fatalf("POST login error = %v", err)
	}
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusUnauthorized)
	}
}

func TestMiddlewareAuth_RejectsMissingToken(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	protected := bshttp.NewProtectedTestRouterForAuthCheck(issuer)
	ts := httptest.NewServer(protected)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/protected")
	if err != nil {
		t.Fatalf("GET error = %v", err)
	}
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusUnauthorized)
	}
}
