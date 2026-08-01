package domain_test

import (
	"testing"

	"bs-inventory/internal/domain"
)

func TestApplyMovement_IN_UpdatesWeightedAverage(t *testing.T) {
	current := domain.StockLevel{Quantity: 1000, AvgUnitCost: 5.00, TotalValue: 5000}
	m := domain.StockMovement{Type: domain.MovementIn, Quantity: 250, UnitCost: 6.00}

	got, err := domain.ApplyMovement(current, m)
	if err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}
	if got.Quantity != 1250 {
		t.Errorf("Quantity = %d, want 1250", got.Quantity)
	}
	if got.AvgUnitCost != 5.20 {
		t.Errorf("AvgUnitCost = %v, want 5.20", got.AvgUnitCost)
	}
}

func TestApplyMovement_OUT_LeavesAverageCostUnchanged(t *testing.T) {
	current := domain.StockLevel{Quantity: 1000, AvgUnitCost: 5.25, TotalValue: 5250}
	m := domain.StockMovement{Type: domain.MovementOut, Quantity: 200}

	got, err := domain.ApplyMovement(current, m)
	if err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}
	if got.Quantity != 800 {
		t.Errorf("Quantity = %d, want 800", got.Quantity)
	}
	if got.AvgUnitCost != 5.25 {
		t.Errorf("AvgUnitCost = %v, want unchanged 5.25", got.AvgUnitCost)
	}
}

func TestApplyMovement_OUT_RejectsNegativeStock(t *testing.T) {
	current := domain.StockLevel{Quantity: 10, AvgUnitCost: 5.00}
	m := domain.StockMovement{Type: domain.MovementOut, Quantity: 11}

	_, err := domain.ApplyMovement(current, m)
	if err != domain.ErrInsufficientStock {
		t.Errorf("error = %v, want ErrInsufficientStock", err)
	}
}

func TestApplyMovement_ReturnAtCurrentAverage_DoesNotDistortIt(t *testing.T) {
	// Odoo-verified pattern: 2 units at $12 average; a "return" of 1 unit
	// originally bought at $10 is recorded as an IN at the CURRENT average
	// ($12), not the original $10 — the average of what remains is
	// unaffected by construction, never recomputed from the old price.
	current := domain.StockLevel{Quantity: 2, AvgUnitCost: 12.00, TotalValue: 24.00}
	m := domain.StockMovement{Type: domain.MovementIn, Quantity: 1, UnitCost: 12.00}

	got, err := domain.ApplyMovement(current, m)
	if err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}
	if got.AvgUnitCost != 12.00 {
		t.Errorf("AvgUnitCost = %v, want unchanged 12.00", got.AvgUnitCost)
	}
	if got.Quantity != 3 {
		t.Errorf("Quantity = %d, want 3", got.Quantity)
	}
}

func TestIsLowStockCrossing(t *testing.T) {
	cases := []struct {
		name                       string
		prevQty, newQty, threshold int
		want                       bool
	}{
		{"crosses at exact threshold", 15, 10, 10, true},
		{"crosses below threshold", 12, 5, 10, true},
		{"already below threshold, stays below", 8, 5, 10, false},
		{"stays above threshold", 20, 15, 10, false},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got := domain.IsLowStockCrossing(c.prevQty, c.newQty, c.threshold)
			if got != c.want {
				t.Errorf("IsLowStockCrossing(%d, %d, %d) = %v, want %v", c.prevQty, c.newQty, c.threshold, got, c.want)
			}
		})
	}
}
