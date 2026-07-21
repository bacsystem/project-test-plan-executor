package http_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"bs-inventory/internal/auth"
	bshttp "bs-inventory/internal/http"
)

func TestNewRouter_HealthzIsUnauthenticated(t *testing.T) {
	pool := setupTestDB(t)
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	router := bshttp.NewRouter(bshttp.Dependencies{Pool: pool, Issuer: issuer})
	ts := httptest.NewServer(router)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/healthz")
	if err != nil {
		t.Fatalf("GET /healthz error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestNewRouter_ProtectedRoutesRequireAuth(t *testing.T) {
	pool := setupTestDB(t)
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	router := bshttp.NewRouter(bshttp.Dependencies{Pool: pool, Issuer: issuer})
	ts := httptest.NewServer(router)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/warehouses")
	if err != nil {
		t.Fatalf("GET /api/v1/warehouses error = %v", err)
	}
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("without token: status = %d, want %d", resp.StatusCode, http.StatusUnauthorized)
	}

	regBody, _ := json.Marshal(map[string]string{
		"tenantName": "Acme Corp", "countryCode": "PE",
		"adminEmail": "wired@acme.com", "adminPassword": "s3cr3t",
	})
	http.Post(ts.URL+"/api/v1/auth/tenants", "application/json", bytes.NewReader(regBody))

	loginBody, _ := json.Marshal(map[string]string{"email": "wired@acme.com", "password": "s3cr3t"})
	loginResp, err := http.Post(ts.URL+"/api/v1/auth/login", "application/json", bytes.NewReader(loginBody))
	if err != nil {
		t.Fatalf("POST login error = %v", err)
	}
	var loginRespBody map[string]string
	json.NewDecoder(loginResp.Body).Decode(&loginRespBody)
	token := loginRespBody["token"]
	if token == "" {
		t.Fatal("login did not return a token")
	}

	req, _ := http.NewRequest(http.MethodGet, ts.URL+"/api/v1/warehouses", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	authedResp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("authed GET /api/v1/warehouses error = %v", err)
	}
	if authedResp.StatusCode != http.StatusOK {
		t.Errorf("with token: status = %d, want %d", authedResp.StatusCode, http.StatusOK)
	}
}
