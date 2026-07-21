package compliance_test

import (
	"context"
	"strings"
	"testing"
	"time"

	"bs-inventory/internal/compliance"
	"bs-inventory/internal/domain"
)

func sampleMovements() []domain.StockMovement {
	base := time.Date(2026, 7, 1, 9, 0, 0, 0, time.UTC)
	return []domain.StockMovement{
		{
			TenantID: "t1", ProductSKU: "SKU-1", WarehouseID: "wh-01", SectionID: "sec-01",
			Quantity: 100, UnitCost: 5.00, Type: domain.MovementIn,
			DocumentType: "01", DocumentSeries: "F001", DocumentNumber: "123",
			OccurredAt: base,
		},
		{
			TenantID: "t1", ProductSKU: "SKU-1", WarehouseID: "wh-01", SectionID: "sec-01",
			Quantity: 30, Type: domain.MovementOut,
			DocumentType: "09", DocumentSeries: "T001", DocumentNumber: "1",
			OccurredAt: base.Add(24 * time.Hour),
		},
	}
}

func TestBuildKardex_TracksRunningBalance(t *testing.T) {
	entries := compliance.BuildKardex(sampleMovements())

	if len(entries) != 2 {
		t.Fatalf("BuildKardex() returned %d entries, want 2", len(entries))
	}
	if entries[0].BalanceQuantity != 100 || entries[0].BalanceUnitCost != 5.00 {
		t.Errorf("entries[0] balance = qty=%d cost=%v, want qty=100 cost=5.00", entries[0].BalanceQuantity, entries[0].BalanceUnitCost)
	}
	if entries[1].BalanceQuantity != 70 || entries[1].BalanceUnitCost != 5.00 {
		t.Errorf("entries[1] balance = qty=%d cost=%v, want qty=70 cost=5.00 (OUT doesn't change avg cost)", entries[1].BalanceQuantity, entries[1].BalanceUnitCost)
	}
}

// TestBuildKardex_TracksIndependentBalancesPerProductAndWarehouse guards
// against a real bug caught in review: BuildKardex must never let a
// single shared accumulator mix balances across different products or
// warehouses — exactly what the Kardex endpoint (one product, multiple
// warehouses) and the PLE export (one tenant, multiple products) each
// feed it in practice.
func TestBuildKardex_TracksIndependentBalancesPerProductAndWarehouse(t *testing.T) {
	base := time.Date(2026, 7, 1, 9, 0, 0, 0, time.UTC)
	movements := []domain.StockMovement{
		{TenantID: "t1", ProductSKU: "SKU-1", WarehouseID: "wh-01", SectionID: "sec-01", Quantity: 100, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: base},
		{TenantID: "t1", ProductSKU: "SKU-2", WarehouseID: "wh-01", SectionID: "sec-01", Quantity: 50, UnitCost: 20.00, Type: domain.MovementIn, OccurredAt: base.Add(1 * time.Hour)},
		{TenantID: "t1", ProductSKU: "SKU-1", WarehouseID: "wh-02", SectionID: "sec-01", Quantity: 10, UnitCost: 9.00, Type: domain.MovementIn, OccurredAt: base.Add(2 * time.Hour)},
		{TenantID: "t1", ProductSKU: "SKU-1", WarehouseID: "wh-01", SectionID: "sec-01", Quantity: 40, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: base.Add(3 * time.Hour)},
	}

	entries := compliance.BuildKardex(movements)
	if len(entries) != 4 {
		t.Fatalf("BuildKardex() returned %d entries, want 4", len(entries))
	}

	// SKU-1 @ wh-01: 100 -> +40 = 140, average unchanged at 5.00 (same cost).
	if entries[3].BalanceQuantity != 140 || entries[3].BalanceUnitCost != 5.00 {
		t.Errorf("entries[3] (SKU-1@wh-01 second IN) = qty=%d cost=%v, want qty=140 cost=5.00 — SKU-2's and SKU-1@wh-02's movements must not have leaked into this balance",
			entries[3].BalanceQuantity, entries[3].BalanceUnitCost)
	}
	// SKU-2 @ wh-01: independent from SKU-1's balance entirely.
	if entries[1].BalanceQuantity != 50 || entries[1].BalanceUnitCost != 20.00 {
		t.Errorf("entries[1] (SKU-2@wh-01) = qty=%d cost=%v, want qty=50 cost=20.00", entries[1].BalanceQuantity, entries[1].BalanceUnitCost)
	}
	// SKU-1 @ wh-02: independent from SKU-1 @ wh-01 despite the same SKU.
	if entries[2].BalanceQuantity != 10 || entries[2].BalanceUnitCost != 9.00 {
		t.Errorf("entries[2] (SKU-1@wh-02) = qty=%d cost=%v, want qty=10 cost=9.00 — same SKU as wh-01 but a different warehouse, must not share a balance",
			entries[2].BalanceQuantity, entries[2].BalanceUnitCost)
	}
}

func sampleProducts() map[string]domain.Product {
	return map[string]domain.Product{
		"SKU-1": {TenantID: "t1", SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"},
	}
}

func sampleWarehouses() map[string]domain.Warehouse {
	return map[string]domain.Warehouse{
		"wh-01": {TenantID: "t1", ID: "wh-01", Name: "Lima Norte", Code: "LIM-N", RucEstablishmentCode: "0001"},
	}
}

func TestPeruProfile_ExportLedger_ProducesPipeDelimitedRowsWith27Fields(t *testing.T) {
	profile := compliance.NewPeruProfile()

	out, err := profile.ExportLedger(context.Background(), sampleMovements(), sampleProducts(), sampleWarehouses(), "202607")
	if err != nil {
		t.Fatalf("ExportLedger() error = %v", err)
	}

	lines := strings.Split(strings.TrimSpace(string(out)), "\n")
	if len(lines) != 2 {
		t.Fatalf("ExportLedger() produced %d lines, want 2 (one per movement)", len(lines))
	}
	fields := strings.Split(lines[0], "|")
	if len(fields) != 27 {
		t.Errorf("first line has %d pipe-delimited fields, want 27 (PLE 13.1)", len(fields))
	}
	if fields[0] != "202607" {
		t.Errorf("field[0] (período) = %q, want %q", fields[0], "202607")
	}
	if fields[3] != "0001" {
		t.Errorf("field[3] (código de establecimiento anexo) = %q, want the warehouse's RucEstablishmentCode %q, not its internal WarehouseID", fields[3], "0001")
	}
	if fields[15] != "NIU" {
		t.Errorf("field[15] (código unidad de medida) = %q, want %q", fields[15], "NIU")
	}
	// field[6] is PLE field 7 ("código propio de la existencia") per the
	// row's own inline field-number comments; fields[4],[7],[8] (PLE
	// fields 5, 8, 9) are undefined catalog slots this exporter doesn't
	// populate and so must stay empty. A prior run of this exact task
	// caught a real defect here: an extra blank slot pushed the SKU one
	// column to the right of where its own comment said it belonged.
	if fields[6] != "SKU-1" {
		t.Errorf("field[6] (código propio de la existencia) = %q, want %q — the SKU must sit at PLE field 7, not be pushed right by an extra empty slot", fields[6], "SKU-1")
	}
	for _, i := range []int{4, 7, 8} {
		if fields[i] != "" {
			t.Errorf("field[%d] is an unused catalog slot, want empty, got %q", i, fields[i])
		}
	}
}
