package postgres

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/domain"
)

var ErrWarehouseNotFound = errors.New("warehouse not found")
var ErrSectionNotFound = errors.New("section not found")

type WarehouseRepository struct {
	pool *pgxpool.Pool
}

func NewWarehouseRepository(pool *pgxpool.Pool) *WarehouseRepository {
	return &WarehouseRepository{pool: pool}
}

func (r *WarehouseRepository) Create(ctx context.Context, w domain.Warehouse) (domain.Warehouse, error) {
	err := r.pool.QueryRow(ctx,
		`INSERT INTO warehouses (tenant_id, name, code, ruc_establishment_code) VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
		w.TenantID, w.Name, w.Code, w.RucEstablishmentCode,
	).Scan(&w.ID, &w.CreatedAt)
	return w, err
}

func (r *WarehouseRepository) ListByTenant(ctx context.Context, tenantID string) ([]domain.Warehouse, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, tenant_id, name, code, ruc_establishment_code, created_at FROM warehouses WHERE tenant_id = $1`,
		tenantID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var warehouses []domain.Warehouse
	for rows.Next() {
		var w domain.Warehouse
		if err := rows.Scan(&w.ID, &w.TenantID, &w.Name, &w.Code, &w.RucEstablishmentCode, &w.CreatedAt); err != nil {
			return nil, err
		}
		warehouses = append(warehouses, w)
	}
	return warehouses, rows.Err()
}

func (r *WarehouseRepository) GetByID(ctx context.Context, tenantID, id string) (domain.Warehouse, error) {
	var w domain.Warehouse
	err := r.pool.QueryRow(ctx,
		`SELECT id, tenant_id, name, code, ruc_establishment_code, created_at FROM warehouses WHERE tenant_id = $1 AND id = $2`,
		tenantID, id,
	).Scan(&w.ID, &w.TenantID, &w.Name, &w.Code, &w.RucEstablishmentCode, &w.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Warehouse{}, ErrWarehouseNotFound
	}
	return w, err
}

type SectionRepository struct {
	pool *pgxpool.Pool
}

func NewSectionRepository(pool *pgxpool.Pool) *SectionRepository {
	return &SectionRepository{pool: pool}
}

func (r *SectionRepository) Create(ctx context.Context, s domain.Section) (domain.Section, error) {
	err := r.pool.QueryRow(ctx,
		`INSERT INTO sections (warehouse_id, name, code) VALUES ($1, $2, $3) RETURNING id, created_at`,
		s.WarehouseID, s.Name, s.Code,
	).Scan(&s.ID, &s.CreatedAt)
	return s, err
}

func (r *SectionRepository) ListByWarehouse(ctx context.Context, warehouseID string) ([]domain.Section, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, warehouse_id, name, code, created_at FROM sections WHERE warehouse_id = $1`,
		warehouseID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var sections []domain.Section
	for rows.Next() {
		var s domain.Section
		if err := rows.Scan(&s.ID, &s.WarehouseID, &s.Name, &s.Code, &s.CreatedAt); err != nil {
			return nil, err
		}
		sections = append(sections, s)
	}
	return sections, rows.Err()
}
