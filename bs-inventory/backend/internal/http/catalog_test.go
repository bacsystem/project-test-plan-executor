package http_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"bs-inventory/internal/domain"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

func withTestTenant(tenantID string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := middleware.ContextWithClaims(r.Context(), tenantID, "test-user", "admin")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func TestCatalogServer_CreateAndListWarehousesAndSections(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: postgres.NewWarehouseRepository(pool),
		Sections:   postgres.NewSectionRepository(pool),
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	whBody, _ := json.Marshal(map[string]string{"name": "Lima Norte", "code": "LIM-N", "rucEstablishmentCode": "0001"})
	resp, err := http.Post(ts.URL+"/api/v1/warehouses", "application/json", bytes.NewReader(whBody))
	if err != nil {
		t.Fatalf("POST warehouses error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST warehouses status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}
	var created domain.Warehouse
	json.NewDecoder(resp.Body).Decode(&created)
	if created.ID == "" {
		t.Fatal("created warehouse has no id")
	}

	listResp, err := http.Get(ts.URL + "/api/v1/warehouses")
	if err != nil {
		t.Fatalf("GET warehouses error = %v", err)
	}
	var list []domain.Warehouse
	json.NewDecoder(listResp.Body).Decode(&list)
	if len(list) != 1 || list[0].Name != "Lima Norte" {
		t.Fatalf("GET warehouses = %+v, want 1 warehouse named Lima Norte", list)
	}

	secBody, _ := json.Marshal(map[string]string{"name": "Electrónica", "code": "ELEC"})
	secResp, err := http.Post(ts.URL+"/api/v1/warehouses/"+list[0].ID+"/sections", "application/json", bytes.NewReader(secBody))
	if err != nil {
		t.Fatalf("POST sections error = %v", err)
	}
	if secResp.StatusCode != http.StatusCreated {
		t.Fatalf("POST sections status = %d, want %d", secResp.StatusCode, http.StatusCreated)
	}

	secListResp, err := http.Get(ts.URL + "/api/v1/warehouses/" + list[0].ID + "/sections")
	if err != nil {
		t.Fatalf("GET sections error = %v", err)
	}
	var secList []domain.Section
	json.NewDecoder(secListResp.Body).Decode(&secList)
	if len(secList) != 1 || secList[0].Name != "Electrónica" {
		t.Fatalf("GET sections = %+v, want 1 section named Electrónica", secList)
	}
}

func TestCatalogServer_ListSections_ScopedToTenant(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: warehouses,
		Sections:   sections,
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenantA, _ := tenants.Create(ctx, domain.Tenant{Name: "Tenant A", CountryCode: "PE"})
	tenantB, _ := tenants.Create(ctx, domain.Tenant{Name: "Tenant B", CountryCode: "PE"})
	whA, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenantA.ID, Name: "Lima Norte", Code: "LIM-N", RucEstablishmentCode: "0001"})
	sections.Create(ctx, domain.Section{WarehouseID: whA.ID, Name: "Electrónica", Code: "ELEC"})

	ts := httptest.NewServer(withTestTenant(tenantB.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/warehouses/" + whA.ID + "/sections")
	if err != nil {
		t.Fatalf("GET sections error = %v", err)
	}
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("GET sections for another tenant's warehouse status = %d, want %d", resp.StatusCode, http.StatusNotFound)
	}
}

func TestCatalogServer_CreateAndGetProduct(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: postgres.NewWarehouseRepository(pool),
		Sections:   postgres.NewSectionRepository(pool),
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-1", "name": "Widget", "category": "tools", "unitOfMeasureCode": "NIU"})
	resp, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST products error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST products status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	getResp, err := http.Get(ts.URL + "/api/v1/products/SKU-1")
	if err != nil {
		t.Fatalf("GET product error = %v", err)
	}
	if getResp.StatusCode != http.StatusOK {
		t.Fatalf("GET product status = %d, want %d", getResp.StatusCode, http.StatusOK)
	}
	var got domain.Product
	json.NewDecoder(getResp.Body).Decode(&got)
	if got.Name != "Widget" {
		t.Errorf("GET product Name = %q, want %q", got.Name, "Widget")
	}

	missingResp, err := http.Get(ts.URL + "/api/v1/products/NO-SUCH-SKU")
	if err != nil {
		t.Fatalf("GET missing product error = %v", err)
	}
	if missingResp.StatusCode != http.StatusNotFound {
		t.Errorf("GET missing product status = %d, want %d", missingResp.StatusCode, http.StatusNotFound)
	}
}

func TestCatalogServer_DuplicateSKU(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: postgres.NewWarehouseRepository(pool),
		Sections:   postgres.NewSectionRepository(pool),
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-DUP", "name": "Widget", "unitOfMeasureCode": "NIU"})
	http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	resp, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("second POST products error = %v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Errorf("second POST products status = %d, want %d", resp.StatusCode, http.StatusConflict)
	}
}

func TestCatalogServer_ProductMovements(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	wh, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "Lima Norte", Code: "LIM-N", RucEstablishmentCode: "0001"})
	sec, _ := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
	if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.CatalogServer{
		Warehouses: warehouses,
		Sections:   sections,
		Products:   products,
		Stock:      stock,
	}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/products/SKU-1/movements")
	if err != nil {
		t.Fatalf("GET product movements error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("GET product movements status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	var movements []domain.StockMovement
	json.NewDecoder(resp.Body).Decode(&movements)
	if len(movements) != 1 || movements[0].Quantity != 10 {
		t.Errorf("GET product movements = %+v, want 1 movement with Quantity=10", movements)
	}

	missingResp, err := http.Get(ts.URL + "/api/v1/products/NO-SUCH-SKU/movements")
	if err != nil {
		t.Fatalf("GET movements for missing product error = %v", err)
	}
	if missingResp.StatusCode != http.StatusNotFound {
		t.Errorf("GET movements for missing product status = %d, want %d", missingResp.StatusCode, http.StatusNotFound)
	}
}
