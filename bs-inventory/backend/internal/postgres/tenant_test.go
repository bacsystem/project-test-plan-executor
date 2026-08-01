package postgres_test

import (
	"context"
	"os"
	"testing"

	"github.com/jackc/pgx/v5/pgxpool"
	tcpostgres "github.com/testcontainers/testcontainers-go/modules/postgres"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/postgres"
)

func setupTestDB(t *testing.T) *pgxpool.Pool {
	t.Helper()
	ctx := context.Background()

	container, err := tcpostgres.Run(ctx, "postgres:16",
		tcpostgres.WithDatabase("bsinventory_test"),
		tcpostgres.WithUsername("test"),
		tcpostgres.WithPassword("test"),
		tcpostgres.BasicWaitStrategies(),
	)
	if err != nil {
		t.Fatalf("failed to start postgres container: %v", err)
	}
	t.Cleanup(func() { _ = container.Terminate(ctx) })

	connStr, err := container.ConnectionString(ctx, "sslmode=disable")
	if err != nil {
		t.Fatalf("failed to get connection string: %v", err)
	}

	pool, err := pgxpool.New(ctx, connStr)
	if err != nil {
		t.Fatalf("failed to connect: %v", err)
	}
	t.Cleanup(pool.Close)

	schema, err := os.ReadFile("schema.sql")
	if err != nil {
		t.Fatalf("failed to read schema: %v", err)
	}
	if _, err := pool.Exec(ctx, string(schema)); err != nil {
		t.Fatalf("failed to apply schema: %v", err)
	}

	return pool
}

func TestTenantRepository_CreateAndGet(t *testing.T) {
	pool := setupTestDB(t)
	repo := postgres.NewTenantRepository(pool)
	ctx := context.Background()

	created, err := repo.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	if err != nil {
		t.Fatalf("Create() error = %v", err)
	}
	if created.ID == "" {
		t.Fatal("Create() did not populate ID")
	}

	got, err := repo.GetByID(ctx, created.ID)
	if err != nil {
		t.Fatalf("GetByID() error = %v", err)
	}
	if got.Name != "Acme Corp" {
		t.Errorf("GetByID().Name = %q, want %q", got.Name, "Acme Corp")
	}
	if got.LowStockThreshold != 10 {
		t.Errorf("GetByID().LowStockThreshold = %d, want default 10", got.LowStockThreshold)
	}
}

func TestUserRepository_CreateAndGetByEmail(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	users := postgres.NewUserRepository(pool)
	ctx := context.Background()

	tenant, err := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	if err != nil {
		t.Fatalf("Create tenant error = %v", err)
	}

	_, err = users.Create(ctx, domain.User{TenantID: tenant.ID, Email: "admin@acme.com", PasswordHash: "hashed", Role: domain.RoleAdmin})
	if err != nil {
		t.Fatalf("Create user error = %v", err)
	}

	got, err := users.GetByEmail(ctx, "admin@acme.com")
	if err != nil {
		t.Fatalf("GetByEmail() error = %v", err)
	}
	if got.TenantID != tenant.ID {
		t.Errorf("GetByEmail().TenantID = %q, want %q", got.TenantID, tenant.ID)
	}
}

func TestUserRepository_DuplicateEmail(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	users := postgres.NewUserRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	u := domain.User{TenantID: tenant.ID, Email: "dup@acme.com", PasswordHash: "hashed", Role: domain.RoleAdmin}
	if _, err := users.Create(ctx, u); err != nil {
		t.Fatalf("first Create() error = %v", err)
	}
	if _, err := users.Create(ctx, u); err != postgres.ErrDuplicateEmail {
		t.Errorf("second Create() error = %v, want ErrDuplicateEmail", err)
	}
}

func TestWarehouseAndSectionRepository_CreateAndList(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	wh, err := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "Lima Norte", Code: "LIM-N", RucEstablishmentCode: "0001"})
	if err != nil {
		t.Fatalf("Create warehouse error = %v", err)
	}

	list, err := warehouses.ListByTenant(ctx, tenant.ID)
	if err != nil || len(list) != 1 {
		t.Fatalf("ListByTenant() = %v, %v, want 1 warehouse", list, err)
	}

	sec, err := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "Electrónica", Code: "ELEC"})
	if err != nil {
		t.Fatalf("Create section error = %v", err)
	}

	secList, err := sections.ListByWarehouse(ctx, wh.ID)
	if err != nil || len(secList) != 1 || secList[0].ID != sec.ID {
		t.Fatalf("ListByWarehouse() = %v, %v, want [sec]", secList, err)
	}
}
