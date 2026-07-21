package http_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"bs-inventory/internal/domain"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/postgres"
)

// withTenant is declared in catalog_test.go (same package); these
// tests reuse it.

func TestStockServer_CreateMovement_INThenOUT(t *testing.T) {
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

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	inBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 100, "unitCost": 5.00, "type": "IN",
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(inBody))
	if err != nil {
		t.Fatalf("POST movements (IN) error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST movements (IN) status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	outBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 30, "type": "OUT",
	})
	resp2, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(outBody))
	if err != nil {
		t.Fatalf("POST movements (OUT) error = %v", err)
	}
	if resp2.StatusCode != http.StatusCreated {
		t.Fatalf("POST movements (OUT) status = %d, want %d", resp2.StatusCode, http.StatusCreated)
	}

	levelResp, err := http.Get(ts.URL + "/api/v1/stock/SKU-1?warehouseId=" + wh.ID + "&sectionId=" + sec.ID)
	if err != nil {
		t.Fatalf("GET stock error = %v", err)
	}
	var level domain.StockLevel
	json.NewDecoder(levelResp.Body).Decode(&level)
	if level.Quantity != 70 || level.AvgUnitCost != 5.00 {
		t.Errorf("GET stock = %+v, want Quantity=70 AvgUnitCost=5.00", level)
	}

	totalResp, err := http.Get(ts.URL + "/api/v1/stock/SKU-1")
	if err != nil {
		t.Fatalf("GET stock (aggregated) error = %v", err)
	}
	var totalBody map[string]any
	json.NewDecoder(totalResp.Body).Decode(&totalBody)
	if totalBody["totalQuantity"].(float64) != 70 {
		t.Errorf("GET stock (aggregated) totalQuantity = %v, want 70", totalBody["totalQuantity"])
	}
}

func TestStockServer_CreateMovement_InsufficientStockReturns409(t *testing.T) {
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

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 10, "type": "OUT",
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST movements error = %v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusConflict)
	}
}

func TestStockServer_CreateMovement_UnknownWarehouseReturns404(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": "00000000-0000-0000-0000-000000000000", "sectionId": "00000000-0000-0000-0000-000000000000",
		"quantity": 10, "unitCost": 1.0, "type": "IN",
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST movements error = %v", err)
	}
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusNotFound)
	}
}

func TestStockServer_CreateTransfer_MovesBetweenWarehouses(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	whA, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "A", Code: "A", RucEstablishmentCode: "0001"})
	whB, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "B", Code: "B", RucEstablishmentCode: "0002"})
	secA, _ := sections.Create(ctx, domain.Section{WarehouseID: whA.ID, Name: "General", Code: "GEN"})
	secB, _ := sections.Create(ctx, domain.Section{WarehouseID: whB.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	seedBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": whA.ID, "sectionId": secA.ID,
		"quantity": 100, "unitCost": 5.00, "type": "IN",
	})
	http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(seedBody))

	transferBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "fromWarehouseId": whA.ID, "fromSectionId": secA.ID,
		"toWarehouseId": whB.ID, "toSectionId": secB.ID, "quantity": 40,
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/transfers", "application/json", bytes.NewReader(transferBody))
	if err != nil {
		t.Fatalf("POST transfers error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST transfers status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	levelA, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", whA.ID, secA.ID)
	if err != nil || levelA.Quantity != 60 {
		t.Errorf("GetLevel(A) = %+v, %v, want Quantity=60", levelA, err)
	}
	levelB, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", whB.ID, secB.ID)
	if err != nil || levelB.Quantity != 40 || levelB.AvgUnitCost != 5.00 {
		t.Errorf("GetLevel(B) = %+v, %v, want Quantity=40 AvgUnitCost=5.00", levelB, err)
	}
}

func TestStockServer_LowStockReport(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE", LowStockThreshold: 10})
	wh, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "A", Code: "A", RucEstablishmentCode: "0001"})
	sec, _ := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-LOW", Name: "Low", UnitOfMeasureCode: "NIU"})

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]any{
		"productSku": "SKU-LOW", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 5, "unitCost": 1.0, "type": "IN",
	})
	http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(body))

	resp, err := http.Get(ts.URL + "/api/v1/stock/low")
	if err != nil {
		t.Fatalf("GET stock/low error = %v", err)
	}
	var low []postgres.LowStockLevel
	json.NewDecoder(resp.Body).Decode(&low)
	if len(low) != 1 || low[0].ProductSKU != "SKU-LOW" {
		t.Errorf("GET stock/low = %+v, want [{SKU-LOW 5}]", low)
	}
}
