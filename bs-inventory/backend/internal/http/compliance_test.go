package http_test

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"bs-inventory/internal/compliance"
	"bs-inventory/internal/domain"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

// withTenant injects a fixed tenant into the request context, standing in
// for the JWT Auth middleware. Deliberately NOT named withTestTenant: Task
// 8's catalog_test.go defines that helper in this same package, so reusing
// the name here would be a redeclaration compile error once both branches
// land on the integration branch.
func withTenant(tenantID string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := middleware.ContextWithClaims(r.Context(), tenantID, "test-user", "admin")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func TestReportsServer_Valuation(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	wh, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "A", Code: "A", RucEstablishmentCode: "0001"})
	sec, _ := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	if _, _, err := stock.ApplyMovement(ctx, m); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.ReportsServer{Stock: stock}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/reports/valuation")
	if err != nil {
		t.Fatalf("GET valuation error = %v", err)
	}
	var body map[string]any
	json.NewDecoder(resp.Body).Decode(&body)
	if body["total"].(float64) != 50 {
		t.Errorf("valuation total = %v, want 50", body["total"])
	}
}

func TestComplianceServer_Kardex(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	wh, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "A", Code: "A", RucEstablishmentCode: "0001"})
	sec, _ := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	if _, _, err := stock.ApplyMovement(ctx, m); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/compliance/kardex/SKU-1")
	if err != nil {
		t.Fatalf("GET kardex error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("GET kardex status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	var entries []compliance.KardexEntry
	json.NewDecoder(resp.Body).Decode(&entries)
	if len(entries) != 1 || entries[0].BalanceQuantity != 10 {
		t.Errorf("kardex entries = %+v, want 1 entry with BalanceQuantity=10", entries)
	}
}

func TestComplianceServer_PLEExport(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	wh, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "A", Code: "A", RucEstablishmentCode: "0001"})
	sec, _ := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	if _, _, err := stock.ApplyMovement(ctx, m); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	period := time.Now().UTC().Format("200601")
	resp, err := http.Get(ts.URL + "/api/v1/compliance/ple-export?period=" + period)
	if err != nil {
		t.Fatalf("GET ple-export error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("GET ple-export status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	body, _ := io.ReadAll(resp.Body)
	lines := strings.Split(strings.TrimSpace(string(body)), "\n")
	if len(lines) != 1 {
		t.Fatalf("ple-export produced %d lines, want 1", len(lines))
	}
	fields := strings.Split(lines[0], "|")
	if len(fields) != 27 {
		t.Errorf("ple-export line has %d fields, want 27", len(fields))
	}
	if fields[15] != "NIU" {
		t.Errorf("ple-export field[15] (código unidad de medida) = %q, want %q", fields[15], "NIU")
	}
	if fields[3] != "0001" {
		t.Errorf("ple-export field[3] (código de establecimiento anexo) = %q, want the warehouse's RucEstablishmentCode %q", fields[3], "0001")
	}
}

func TestComplianceServer_PLEExport_UnimplementedCountryReturns400(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "CO"})

	server := &bshttp.ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/compliance/ple-export?period=202607")
	if err != nil {
		t.Fatalf("GET ple-export error = %v", err)
	}
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusBadRequest)
	}
}
