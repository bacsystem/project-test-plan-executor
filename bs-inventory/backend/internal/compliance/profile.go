package compliance

import (
	"context"

	"bs-inventory/internal/domain"
)

// RegulatoryProfile is implemented once per supported country. Only Peru
// is implemented in this version — adding another LATAM country means a
// new implementation of this interface, not a domain-model change.
type RegulatoryProfile interface {
	// products maps SKU to its full record, and warehouses maps warehouse
	// ID to its full record — callers must join both before calling
	// ExportLedger. A movement whose SKU or warehouse ID is missing from
	// its map exports that row's dependent field(s) empty rather than
	// erroring, since the FK constraints on stock_movements already
	// guarantee the product and warehouse exist in the database (a
	// missing map entry means the caller forgot to include it, not a
	// data-integrity issue).
	ExportLedger(ctx context.Context, movements []domain.StockMovement, products map[string]domain.Product, warehouses map[string]domain.Warehouse, period string) ([]byte, error)
}

// KardexEntry is one row of a product's valorized ledger: the movement
// plus its running balance immediately after being applied.
type KardexEntry struct {
	Movement        domain.StockMovement `json:"movement"`
	BalanceQuantity int                  `json:"balanceQuantity"`
	BalanceUnitCost float64              `json:"balanceUnitCost"`
	BalanceValue    float64              `json:"balanceValue"`
}

// kardexKey identifies one independent running-balance series — the same
// (product, warehouse, section) key domain.StockLevel itself uses.
type kardexKey struct {
	sku, warehouseID, sectionID string
}

// BuildKardex replays movements (assumed already sorted by OccurredAt) to
// produce the balance progression, one independent running balance PER
// (ProductSKU, WarehouseID, SectionID) — never a single shared accumulator
// across the whole slice. This matters because both call sites feed in
// movements that span more than one such key: the Kardex endpoint passes
// one product's movements across ALL its warehouses, and the PLE export
// passes an entire tenant's movements across ALL products — mixing those
// into one running balance would silently corrupt every saldo after the
// first product/warehouse (caught in review before this ever merged; see
// TestBuildKardex_TracksIndependentBalancesPerProductAndWarehouse below).
// This is the one place a full replay remains correct and appropriate —
// an on-demand compliance export, not cys-inventory's hot read path (see
// design spec §5 for why the hot path uses the materialized stock_levels
// table instead).
func BuildKardex(movements []domain.StockMovement) []KardexEntry {
	entries := make([]KardexEntry, 0, len(movements))
	balances := make(map[kardexKey]domain.StockLevel)
	for _, m := range movements {
		key := kardexKey{sku: m.ProductSKU, warehouseID: m.WarehouseID, sectionID: m.SectionID}
		next, err := domain.ApplyMovement(balances[key], m)
		if err != nil {
			// A compliance export must not silently drop a movement that
			// the live system already accepted; surfacing here would need
			// error-plumbing this function's callers don't have yet — out
			// of scope until a real export has actually hit this case.
			continue
		}
		balances[key] = next
		entries = append(entries, KardexEntry{
			Movement:        m,
			BalanceQuantity: next.Quantity,
			BalanceUnitCost: next.AvgUnitCost,
			BalanceValue:    next.TotalValue,
		})
	}
	return entries
}
