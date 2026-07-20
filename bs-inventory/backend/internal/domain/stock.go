package domain

import (
	"errors"
	"time"
)

var ErrInsufficientStock = errors.New("insufficient stock at this location")

type StockLevel struct {
	TenantID    string    `json:"tenantId"`
	ProductSKU  string    `json:"productSku"`
	WarehouseID string    `json:"warehouseId"`
	SectionID   string    `json:"sectionId"`
	Quantity    int       `json:"quantity"`
	AvgUnitCost float64   `json:"avgUnitCost"`
	TotalValue  float64   `json:"totalValue"`
	UpdatedAt   time.Time `json:"updatedAt"`
}

// ApplyMovement returns the StockLevel that results from applying m on top
// of current. Average cost only changes on IN — an OUT (including a
// return-to-source or a transfer's outbound half) draws down quantity at
// the existing average without perturbing it; recomputing the average on
// an outflow is mathematically incoherent (it can leave value assigned to
// zero remaining units — verified against Odoo's documented return
// handling). Negative stock is rejected outright rather than requiring a
// fallback-costing policy nothing in this module needs yet.
func ApplyMovement(current StockLevel, m StockMovement) (StockLevel, error) {
	next := current
	switch m.Type {
	case MovementIn:
		newQty := current.Quantity + m.Quantity
		newAvgCost := (float64(current.Quantity)*current.AvgUnitCost + float64(m.Quantity)*m.UnitCost) / float64(newQty)
		next.Quantity = newQty
		next.AvgUnitCost = newAvgCost
	case MovementOut:
		if m.Quantity > current.Quantity {
			return StockLevel{}, ErrInsufficientStock
		}
		next.Quantity = current.Quantity - m.Quantity
	}
	next.TotalValue = float64(next.Quantity) * next.AvgUnitCost
	return next, nil
}

// IsLowStockCrossing reports whether a movement's resulting quantity newly
// crosses at/below threshold, given the quantity before it was applied —
// used to publish stock.low only once per crossing, not on every movement
// while already low.
func IsLowStockCrossing(previousQty, newQty, threshold int) bool {
	return previousQty > threshold && newQty <= threshold
}
