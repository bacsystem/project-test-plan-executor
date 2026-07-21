package postgres

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/domain"
)

var ErrDuplicateSKU = errors.New("product with this SKU already exists")
var ErrProductNotFound = errors.New("product not found")

type ProductRepository struct {
	pool *pgxpool.Pool
}

func NewProductRepository(pool *pgxpool.Pool) *ProductRepository {
	return &ProductRepository{pool: pool}
}

func (r *ProductRepository) Create(ctx context.Context, p domain.Product) error {
	_, err := r.pool.Exec(ctx,
		`INSERT INTO products (tenant_id, sku, name, category, unit_of_measure_code) VALUES ($1, $2, $3, $4, $5)`,
		p.TenantID, p.SKU, p.Name, p.Category, p.UnitOfMeasureCode,
	)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return ErrDuplicateSKU
		}
		return err
	}
	return nil
}

func (r *ProductRepository) GetBySKU(ctx context.Context, tenantID, sku string) (domain.Product, error) {
	var p domain.Product
	err := r.pool.QueryRow(ctx,
		`SELECT tenant_id, sku, name, category, unit_of_measure_code, created_at FROM products WHERE tenant_id = $1 AND sku = $2`,
		tenantID, sku,
	).Scan(&p.TenantID, &p.SKU, &p.Name, &p.Category, &p.UnitOfMeasureCode, &p.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Product{}, ErrProductNotFound
	}
	return p, err
}

func (r *ProductRepository) List(ctx context.Context, tenantID string, limit, offset int) ([]domain.Product, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT tenant_id, sku, name, category, unit_of_measure_code, created_at FROM products WHERE tenant_id = $1 ORDER BY created_at LIMIT $2 OFFSET $3`,
		tenantID, limit, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []domain.Product
	for rows.Next() {
		var p domain.Product
		if err := rows.Scan(&p.TenantID, &p.SKU, &p.Name, &p.Category, &p.UnitOfMeasureCode, &p.CreatedAt); err != nil {
			return nil, err
		}
		products = append(products, p)
	}
	return products, rows.Err()
}
