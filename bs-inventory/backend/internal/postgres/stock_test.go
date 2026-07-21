package postgres_test

import (
	"context"
	"testing"
	"time"

	"github.com/google/uuid"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/postgres"
)

func TestProductRepository_CreateAndGet(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	products := postgres.NewProductRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	p := domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", Category: "tools", UnitOfMeasureCode: "NIU"}
	if err := products.Create(ctx, p); err != nil {
		t.Fatalf("Create() error = %v", err)
	}

	got, err := products.GetBySKU(ctx, tenant.ID, "SKU-1")
	if err != nil {
		t.Fatalf("GetBySKU() error = %v", err)
	}
	if got.Name != "Widget" {
		t.Errorf("GetBySKU().Name = %q, want %q", got.Name, "Widget")
	}
}

func TestProductRepository_SameSKUAllowedAcrossDifferentTenants(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	products := postgres.NewProductRepository(pool)
	ctx := context.Background()

	tenantA, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme A", CountryCode: "PE"})
	tenantB, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme B", CountryCode: "PE"})

	if err := products.Create(ctx, domain.Product{TenantID: tenantA.ID, SKU: "SKU-SHARED", Name: "Widget A", UnitOfMeasureCode: "NIU"}); err != nil {
		t.Fatalf("Create for tenant A error = %v", err)
	}
	if err := products.Create(ctx, domain.Product{TenantID: tenantB.ID, SKU: "SKU-SHARED", Name: "Widget B", UnitOfMeasureCode: "NIU"}); err != nil {
		t.Fatalf("Create for tenant B error = %v (SKU should be unique per tenant, not globally)", err)
	}
}

func TestStockRepository_ApplyMovement_INThenOUT(t *testing.T) {
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

	current, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", wh.ID, sec.ID)
	if err != nil {
		t.Fatalf("GetLevel() (nonexistent) error = %v", err)
	}
	if current.Quantity != 0 {
		t.Errorf("GetLevel() for nonexistent level: Quantity = %d, want 0", current.Quantity)
	}

	inMove := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 100, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, err := domain.ApplyMovement(current, inMove)
	if err != nil {
		t.Fatalf("domain.ApplyMovement() error = %v", err)
	}
	if _, err := stock.ApplyMovement(ctx, inMove, next); err != nil {
		t.Fatalf("stock.ApplyMovement() error = %v", err)
	}

	afterIn, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", wh.ID, sec.ID)
	if err != nil {
		t.Fatalf("GetLevel() after IN error = %v", err)
	}
	if afterIn.Quantity != 100 || afterIn.AvgUnitCost != 5.00 {
		t.Errorf("GetLevel() after IN = %+v, want Quantity=100 AvgUnitCost=5.00", afterIn)
	}

	outMove := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 30, Type: domain.MovementOut, OccurredAt: time.Now().UTC()}
	next2, err := domain.ApplyMovement(afterIn, outMove)
	if err != nil {
		t.Fatalf("domain.ApplyMovement() OUT error = %v", err)
	}
	if _, err := stock.ApplyMovement(ctx, outMove, next2); err != nil {
		t.Fatalf("stock.ApplyMovement() OUT error = %v", err)
	}

	afterOut, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", wh.ID, sec.ID)
	if err != nil {
		t.Fatalf("GetLevel() after OUT error = %v", err)
	}
	if afterOut.Quantity != 70 || afterOut.AvgUnitCost != 5.00 {
		t.Errorf("GetLevel() after OUT = %+v, want Quantity=70 AvgUnitCost=5.00 (unchanged)", afterOut)
	}

	movements, err := stock.ListMovementsByProduct(ctx, tenant.ID, "SKU-1")
	if err != nil || len(movements) != 2 {
		t.Fatalf("ListMovementsByProduct() = %v, %v, want 2 movements", movements, err)
	}
}

func TestStockRepository_TotalQuantityAggregatesAcrossWarehouses(t *testing.T) {
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

	for _, loc := range []struct {
		whID, secID string
		qty         int
	}{{whA.ID, secA.ID, 40}, {whB.ID, secB.ID, 60}} {
		m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: loc.whID, SectionID: loc.secID, Quantity: loc.qty, UnitCost: 1.0, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
		next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
		if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
			t.Fatalf("ApplyMovement() error = %v", err)
		}
	}

	total, err := stock.TotalQuantityBySKU(ctx, tenant.ID, "SKU-1")
	if err != nil {
		t.Fatalf("TotalQuantityBySKU() error = %v", err)
	}
	if total != 100 {
		t.Errorf("TotalQuantityBySKU() = %d, want 100", total)
	}
}

func TestStockRepository_ApplyMovement_RejectsUnknownWarehouse(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: uuid.NewString(), SectionID: uuid.NewString(), Quantity: 10, UnitCost: 1.0, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
	if _, err := stock.ApplyMovement(ctx, m, next); err != postgres.ErrInvalidReference {
		t.Errorf("ApplyMovement() with unknown warehouse error = %v, want ErrInvalidReference", err)
	}
}

func TestStockRepository_LowStockProducts(t *testing.T) {
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
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-LOW", Name: "Low", UnitOfMeasureCode: "NIU"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-HIGH", Name: "High", UnitOfMeasureCode: "NIU"})

	for _, mv := range []struct {
		sku string
		qty int
	}{{"SKU-LOW", 5}, {"SKU-HIGH", 500}} {
		m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: mv.sku, WarehouseID: wh.ID, SectionID: sec.ID, Quantity: mv.qty, UnitCost: 1.0, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
		next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
		if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
			t.Fatalf("ApplyMovement() error = %v", err)
		}
	}

	low, err := stock.LowStockProducts(ctx, tenant.ID, 10)
	if err != nil {
		t.Fatalf("LowStockProducts() error = %v", err)
	}
	if len(low) != 1 || low[0].ProductSKU != "SKU-LOW" || low[0].Quantity != 5 {
		t.Errorf("LowStockProducts() = %+v, want [{SKU-LOW 5}]", low)
	}
}

func TestStockRepository_ApplyTransfer_MovesBetweenWarehousesAtomically(t *testing.T) {
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

	seed := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: whA.ID, SectionID: secA.ID, Quantity: 100, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	seedNext, _ := domain.ApplyMovement(domain.StockLevel{}, seed)
	if _, err := stock.ApplyMovement(ctx, seed, seedNext); err != nil {
		t.Fatalf("seed ApplyMovement() error = %v", err)
	}

	transferID := uuid.NewString()
	out := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: whA.ID, SectionID: secA.ID, Quantity: 40, Type: domain.MovementOut, TransferID: transferID, OccurredAt: time.Now().UTC()}
	outNext, err := domain.ApplyMovement(seedNext, out)
	if err != nil {
		t.Fatalf("domain.ApplyMovement() OUT error = %v", err)
	}
	in := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: whB.ID, SectionID: secB.ID, Quantity: 40, UnitCost: seedNext.AvgUnitCost, Type: domain.MovementIn, TransferID: transferID, OccurredAt: time.Now().UTC()}
	inNext, err := domain.ApplyMovement(domain.StockLevel{}, in)
	if err != nil {
		t.Fatalf("domain.ApplyMovement() IN error = %v", err)
	}

	if _, _, err := stock.ApplyTransfer(ctx, out, outNext, in, inNext); err != nil {
		t.Fatalf("ApplyTransfer() error = %v", err)
	}

	gotA, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", whA.ID, secA.ID)
	if err != nil || gotA.Quantity != 60 {
		t.Errorf("GetLevel(A) = %+v, %v, want Quantity=60", gotA, err)
	}
	gotB, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", whB.ID, secB.ID)
	if err != nil || gotB.Quantity != 40 || gotB.AvgUnitCost != 5.00 {
		t.Errorf("GetLevel(B) = %+v, %v, want Quantity=40 AvgUnitCost=5.00", gotB, err)
	}
}

func TestStockRepository_ListMovementsByTenantAndPeriod(t *testing.T) {
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
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-2", Name: "Gadget", UnitOfMeasureCode: "NIU"})

	inJuly := time.Date(2026, 7, 15, 0, 0, 0, 0, time.UTC)
	inAugust := time.Date(2026, 8, 15, 0, 0, 0, 0, time.UTC)
	for _, mv := range []struct {
		sku string
		at  time.Time
	}{{"SKU-1", inJuly}, {"SKU-2", inAugust}} {
		m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: mv.sku, WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 1.0, Type: domain.MovementIn, OccurredAt: mv.at}
		next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
		if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
			t.Fatalf("ApplyMovement() error = %v", err)
		}
	}

	from := time.Date(2026, 7, 1, 0, 0, 0, 0, time.UTC)
	to := time.Date(2026, 8, 1, 0, 0, 0, 0, time.UTC)
	movements, err := stock.ListMovementsByTenantAndPeriod(ctx, tenant.ID, from, to)
	if err != nil {
		t.Fatalf("ListMovementsByTenantAndPeriod() error = %v", err)
	}
	if len(movements) != 1 || movements[0].ProductSKU != "SKU-1" {
		t.Errorf("ListMovementsByTenantAndPeriod() = %+v, want 1 movement for SKU-1", movements)
	}
}
