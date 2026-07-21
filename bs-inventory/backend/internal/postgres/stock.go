package postgres

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/domain"
)

// ErrInvalidReference means the movement named a product SKU, warehouse,
// or section that doesn't exist for this tenant — caught via the
// database's own foreign key constraints rather than a separate
// existence check per field, so the three "unknown X" 404 cases the
// HTTP layer needs (SKU, warehouse, section) collapse to one error path.
var ErrInvalidReference = errors.New("movement references an unknown product, warehouse, or section")

type StockRepository struct {
	pool *pgxpool.Pool
}

func NewStockRepository(pool *pgxpool.Pool) *StockRepository {
	return &StockRepository{pool: pool}
}

// GetLevel returns the current StockLevel for a location, zero-valued if
// no row exists yet — a product that never moved at a location has no
// stock there, not an error.
func (r *StockRepository) GetLevel(ctx context.Context, tenantID, sku, warehouseID, sectionID string) (domain.StockLevel, error) {
	var lvl domain.StockLevel
	err := r.pool.QueryRow(ctx,
		`SELECT tenant_id, product_sku, warehouse_id, section_id, quantity, avg_unit_cost, total_value, updated_at
		 FROM stock_levels WHERE tenant_id = $1 AND product_sku = $2 AND warehouse_id = $3 AND section_id = $4`,
		tenantID, sku, warehouseID, sectionID,
	).Scan(&lvl.TenantID, &lvl.ProductSKU, &lvl.WarehouseID, &lvl.SectionID, &lvl.Quantity, &lvl.AvgUnitCost, &lvl.TotalValue, &lvl.UpdatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.StockLevel{TenantID: tenantID, ProductSKU: sku, WarehouseID: warehouseID, SectionID: sectionID}, nil
	}
	return lvl, err
}

// insertMovementTx inserts m inside an already-open transaction. Shared
// by ApplyMovement and ApplyTransfer so both single movements and the
// two legs of a transfer go through identical insert logic (including
// the same FK-violation-to-ErrInvalidReference mapping).
func insertMovementTx(ctx context.Context, tx pgx.Tx, m domain.StockMovement) (domain.StockMovement, error) {
	m.ID = uuid.NewString()
	// transfer_id is a nullable uuid column; binding "" as its parameter
	// (rather than a Go nil) makes Postgres's parameter-type inference for
	// a NULLIF(...)::uuid expression unpredictable — it intermittently
	// decided $12 itself was uuid-typed and tried to parse "" as one
	// before NULLIF ever ran. Building the nullable value in Go sidesteps
	// that inference entirely.
	var transferID any
	if m.TransferID != "" {
		transferID = m.TransferID
	}
	_, err := tx.Exec(ctx,
		`INSERT INTO stock_movements (id, tenant_id, product_sku, warehouse_id, section_id, quantity, unit_cost, type, document_type, document_series, document_number, transfer_id, guide_number, occurred_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
		m.ID, m.TenantID, m.ProductSKU, m.WarehouseID, m.SectionID, m.Quantity, m.UnitCost, m.Type,
		m.DocumentType, m.DocumentSeries, m.DocumentNumber, transferID, m.GuideNumber, m.OccurredAt,
	)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23503" {
			return domain.StockMovement{}, ErrInvalidReference
		}
		return domain.StockMovement{}, err
	}
	return m, nil
}

// upsertLevelTx writes next inside an already-open transaction. The
// location identity (tenant/SKU/warehouse/section) is always taken from
// m, never from next: domain.ApplyMovement(current, m) only carries
// identity fields over from current, so a caller computing next from a
// bare zero-valued StockLevel{} (no prior GetLevel — the normal case for
// a location's first-ever movement) yields a next with those fields
// empty. m unambiguously names the location the movement happened at,
// so it's the correct source of truth regardless of how next was built.
func upsertLevelTx(ctx context.Context, tx pgx.Tx, m domain.StockMovement, next domain.StockLevel) error {
	_, err := tx.Exec(ctx,
		`INSERT INTO stock_levels (tenant_id, product_sku, warehouse_id, section_id, quantity, avg_unit_cost, total_value, updated_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, now())
		 ON CONFLICT (tenant_id, product_sku, warehouse_id, section_id)
		 DO UPDATE SET quantity = $5, avg_unit_cost = $6, total_value = $7, updated_at = now()`,
		m.TenantID, m.ProductSKU, m.WarehouseID, m.SectionID, next.Quantity, next.AvgUnitCost, next.TotalValue,
	)
	return err
}

// ApplyMovement inserts m and upserts stock_levels to next, both inside
// one transaction — this is the ONLY way stock_movements/stock_levels
// are written, so the two can never disagree.
func (r *StockRepository) ApplyMovement(ctx context.Context, m domain.StockMovement, next domain.StockLevel) (domain.StockMovement, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return domain.StockMovement{}, err
	}
	defer tx.Rollback(ctx)

	saved, err := insertMovementTx(ctx, tx, m)
	if err != nil {
		return domain.StockMovement{}, err
	}
	if err := upsertLevelTx(ctx, tx, m, next); err != nil {
		return domain.StockMovement{}, err
	}
	if err := tx.Commit(ctx); err != nil {
		return domain.StockMovement{}, err
	}
	return saved, nil
}

// ApplyTransfer inserts both legs of an atomic transfer (an OUT from the
// source location and an IN to the destination, sharing out.TransferID
// == in.TransferID) and upserts both stock_levels rows, all inside ONE
// transaction — per the design's atomicity requirement, a transfer must
// never be observable as only one leg having happened.
func (r *StockRepository) ApplyTransfer(ctx context.Context, out domain.StockMovement, outNext domain.StockLevel, in domain.StockMovement, inNext domain.StockLevel) (domain.StockMovement, domain.StockMovement, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	defer tx.Rollback(ctx)

	savedOut, err := insertMovementTx(ctx, tx, out)
	if err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	if err := upsertLevelTx(ctx, tx, out, outNext); err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	savedIn, err := insertMovementTx(ctx, tx, in)
	if err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	if err := upsertLevelTx(ctx, tx, in, inNext); err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}

	if err := tx.Commit(ctx); err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	return savedOut, savedIn, nil
}

func (r *StockRepository) ListMovementsByProduct(ctx context.Context, tenantID, sku string) ([]domain.StockMovement, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, tenant_id, product_sku, warehouse_id, section_id, quantity, unit_cost, type, document_type, document_series, document_number, COALESCE(transfer_id::text, ''), guide_number, occurred_at
		 FROM stock_movements WHERE tenant_id = $1 AND product_sku = $2 ORDER BY occurred_at`,
		tenantID, sku,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movements []domain.StockMovement
	for rows.Next() {
		var m domain.StockMovement
		if err := rows.Scan(&m.ID, &m.TenantID, &m.ProductSKU, &m.WarehouseID, &m.SectionID, &m.Quantity, &m.UnitCost, &m.Type,
			&m.DocumentType, &m.DocumentSeries, &m.DocumentNumber, &m.TransferID, &m.GuideNumber, &m.OccurredAt); err != nil {
			return nil, err
		}
		movements = append(movements, m)
	}
	return movements, rows.Err()
}

// ListMovementsByTenantAndPeriod returns every movement for the tenant
// (across all products) with occurredAt in [from, to) — backs the PLE
// export, which covers the whole tenant for one period, not one SKU.
func (r *StockRepository) ListMovementsByTenantAndPeriod(ctx context.Context, tenantID string, from, to time.Time) ([]domain.StockMovement, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, tenant_id, product_sku, warehouse_id, section_id, quantity, unit_cost, type, document_type, document_series, document_number, COALESCE(transfer_id::text, ''), guide_number, occurred_at
		 FROM stock_movements WHERE tenant_id = $1 AND occurred_at >= $2 AND occurred_at < $3 ORDER BY occurred_at`,
		tenantID, from, to,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movements []domain.StockMovement
	for rows.Next() {
		var m domain.StockMovement
		if err := rows.Scan(&m.ID, &m.TenantID, &m.ProductSKU, &m.WarehouseID, &m.SectionID, &m.Quantity, &m.UnitCost, &m.Type,
			&m.DocumentType, &m.DocumentSeries, &m.DocumentNumber, &m.TransferID, &m.GuideNumber, &m.OccurredAt); err != nil {
			return nil, err
		}
		movements = append(movements, m)
	}
	return movements, rows.Err()
}

// TotalQuantityBySKU aggregates stock across all warehouses/sections for
// a product — used by the low-stock report and the aggregated stock view.
func (r *StockRepository) TotalQuantityBySKU(ctx context.Context, tenantID, sku string) (int, error) {
	var total int
	err := r.pool.QueryRow(ctx,
		`SELECT COALESCE(SUM(quantity), 0) FROM stock_levels WHERE tenant_id = $1 AND product_sku = $2`,
		tenantID, sku,
	).Scan(&total)
	return total, err
}

// TotalValuation returns total stock value per warehouse for a tenant —
// backs the valuation report.
func (r *StockRepository) TotalValuation(ctx context.Context, tenantID string) (map[string]float64, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT warehouse_id, SUM(total_value) FROM stock_levels WHERE tenant_id = $1 GROUP BY warehouse_id`,
		tenantID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	byWarehouse := map[string]float64{}
	for rows.Next() {
		var whID string
		var value float64
		if err := rows.Scan(&whID, &value); err != nil {
			return nil, err
		}
		byWarehouse[whID] = value
	}
	return byWarehouse, rows.Err()
}

// LowStockLevel is one row of the low-stock report: a product's quantity
// aggregated across every warehouse/section, already at or below the
// tenant's threshold.
type LowStockLevel struct {
	ProductSKU string `json:"productSku"`
	Quantity   int    `json:"quantity"`
}

// LowStockProducts returns every product whose tenant-wide quantity is
// at or below threshold — backs the low-stock report and the
// stock.low crossing check.
func (r *StockRepository) LowStockProducts(ctx context.Context, tenantID string, threshold int) ([]LowStockLevel, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT product_sku, SUM(quantity) AS total_qty FROM stock_levels
		 WHERE tenant_id = $1 GROUP BY product_sku HAVING SUM(quantity) <= $2`,
		tenantID, threshold,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var levels []LowStockLevel
	for rows.Next() {
		var l LowStockLevel
		if err := rows.Scan(&l.ProductSKU, &l.Quantity); err != nil {
			return nil, err
		}
		levels = append(levels, l)
	}
	return levels, rows.Err()
}
