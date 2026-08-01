package postgres

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/domain"
)

var ErrTenantNotFound = errors.New("tenant not found")

type TenantRepository struct {
	pool *pgxpool.Pool
}

func NewTenantRepository(pool *pgxpool.Pool) *TenantRepository {
	return &TenantRepository{pool: pool}
}

// Create defaults LowStockThreshold to 10 when the caller leaves it at
// the zero value — a tenant is always created with a usable threshold,
// never a silent 0 that would flag every product as perpetually low.
func (r *TenantRepository) Create(ctx context.Context, t domain.Tenant) (domain.Tenant, error) {
	if t.LowStockThreshold <= 0 {
		t.LowStockThreshold = 10
	}
	err := r.pool.QueryRow(ctx,
		`INSERT INTO tenants (name, country_code, low_stock_threshold) VALUES ($1, $2, $3) RETURNING id, created_at`,
		t.Name, t.CountryCode, t.LowStockThreshold,
	).Scan(&t.ID, &t.CreatedAt)
	return t, err
}

func (r *TenantRepository) GetByID(ctx context.Context, id string) (domain.Tenant, error) {
	var t domain.Tenant
	err := r.pool.QueryRow(ctx,
		`SELECT id, name, country_code, low_stock_threshold, created_at FROM tenants WHERE id = $1`, id,
	).Scan(&t.ID, &t.Name, &t.CountryCode, &t.LowStockThreshold, &t.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Tenant{}, ErrTenantNotFound
	}
	return t, err
}
