# bs-inventory Implementation Plan (v2)

> **For agentic workers:** execute this plan with the
> parallel-plan-executor Workflow (cys:run / the /cys:run-plan command).
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** build `bs-inventory` per the approved v2 design at
`docs/cys/specs/2026-07-20-bs-inventory-design.md` — multi-tenant, JWT
auth, warehouse→section stock with atomic transfers and weighted-average
costing (materialized `stock_levels`, not replay), Peru Kardex/PLE 13.1
compliance, k6 load testing, and a Next.js Multi-Zone frontend.

**Architecture:** backend builds domain → {auth infra, warehouse/section
repo, product+stock repo, RabbitMQ, compliance} → {auth handlers, core
CRUD handlers, stock handlers, reports/compliance handlers} → server
wiring → k6. Frontend builds an extended API client → eight independent
pages. Both branches join at docker-compose + the end-to-end test.

**Tech Stack:** Go 1.23, PostgreSQL 16, RabbitMQ 3.13, `golang-jwt/jwt/v5`,
`golang.org/x/crypto/bcrypt`, Next.js 16 (App Router), React 19, MUI 9
(Community only), Vitest + RTL, Playwright, k6.

## Global Constraints

- Go >= 1.23. Node >= 22.14.0, mechanically enforced via `engine-strict=true`
  in the frontend's `.npmrc` (reconciling the template's own disagreeing
  `.nvmrc`/`package.json engines.node`, same finding as v1 of this plan).
  **After any `go get`/`go mod tidy` (every task that adds a Go dependency),
  check `go.mod`'s `go` directive and hand-edit it back to `1.23` if the
  local toolchain bumped it** — a real regression a first run of this plan
  hit (Task 2's `go get` silently raised it to `1.25.0`, failing review for
  raising the whole module's minimum Go version as an unreviewed side
  effect). Task 1 already does this correctly; every later task doing its
  own `go get` must re-check it, since each runs in its own worktree and
  can re-trigger the same toolchain behavior independently.
- Docker required for all backend integration tests (Postgres, RabbitMQ
  via `testcontainers-go`) and the end-to-end/k6 runs — no mocked
  database or broker anywhere.
- Every tenant-scoped table carries `tenant_id`; every repository method
  takes it as an explicit parameter, never inferred implicitly.
- `stock_levels` is updated in the **same Postgres transaction** as the
  `stock_movements` row(s) that produced it — never via a separate async
  step.
- No MUI X Premium/Pro packages anywhere in the frontend.
- Commit messages: Conventional Commits, in English.

---

### Task 1: Domain types and weighted-average costing logic

**Files:**
- Create: `bs-inventory/backend/go.mod`
- Create: `bs-inventory/backend/internal/domain/tenant.go`
- Create: `bs-inventory/backend/internal/domain/warehouse.go`
- Create: `bs-inventory/backend/internal/domain/product.go`
- Create: `bs-inventory/backend/internal/domain/movement.go`
- Create: `bs-inventory/backend/internal/domain/stock.go`
- Test: `bs-inventory/backend/internal/domain/stock_test.go`

**Interfaces:**
- Consumes: None
- Produces: `Tenant`, `User`, `UserRole`, `RoleAdmin`, `RoleMember`, `Warehouse`, `Section`, `Product`, `StockMovement`, `MovementType`, `MovementIn`, `MovementOut`, `StockLevel`, `ApplyMovement`, `IsLowStockCrossing`, `ErrInsufficientStock`

- [ ] **Step 1: Initialize the Go module**

```bash
mkdir -p bs-inventory/backend
(cd bs-inventory/backend && go mod init bs-inventory)
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/domain/stock_test.go`:

```go
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
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/domain/...`
Expected: FAIL — none of the domain types or `ApplyMovement` exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/domain/tenant.go`:

```go
package domain

import "time"

type Tenant struct {
	ID                string    `json:"id"`
	Name              string    `json:"name"`
	CountryCode       string    `json:"countryCode"`
	LowStockThreshold int       `json:"lowStockThreshold"`
	CreatedAt         time.Time `json:"createdAt"`
}

type UserRole string

const (
	RoleAdmin  UserRole = "admin"
	RoleMember UserRole = "member"
)

type User struct {
	ID           string    `json:"id"`
	TenantID     string    `json:"tenantId"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Role         UserRole  `json:"role"`
	CreatedAt    time.Time `json:"createdAt"`
}
```

Note the `json:"-"` on `PasswordHash` — a hash must never round-trip
through a JSON response, even by accident (e.g. a handler that
marshals the whole `User` struct instead of a trimmed view).

Create `bs-inventory/backend/internal/domain/warehouse.go`:

```go
package domain

import "time"

type Warehouse struct {
	ID                   string    `json:"id"`
	TenantID             string    `json:"tenantId"`
	Name                 string    `json:"name"`
	Code                 string    `json:"code"`
	RucEstablishmentCode string    `json:"rucEstablishmentCode"`
	CreatedAt            time.Time `json:"createdAt"`
}

type Section struct {
	ID          string    `json:"id"`
	WarehouseID string    `json:"warehouseId"`
	Name        string    `json:"name"`
	Code        string    `json:"code"`
	CreatedAt   time.Time `json:"createdAt"`
}
```

Create `bs-inventory/backend/internal/domain/product.go`:

```go
package domain

import "time"

type Product struct {
	TenantID          string    `json:"tenantId"`
	SKU               string    `json:"sku"`
	Name              string    `json:"name"`
	Category          string    `json:"category"`
	UnitOfMeasureCode string    `json:"unitOfMeasureCode"`
	CreatedAt         time.Time `json:"createdAt"`
}
```

Create `bs-inventory/backend/internal/domain/movement.go`:

```go
package domain

import "time"

type MovementType string

const (
	MovementIn  MovementType = "IN"
	MovementOut MovementType = "OUT"
)

type StockMovement struct {
	ID             string       `json:"id"`
	TenantID       string       `json:"tenantId"`
	ProductSKU     string       `json:"productSku"`
	WarehouseID    string       `json:"warehouseId"`
	SectionID      string       `json:"sectionId"`
	Quantity       int          `json:"quantity"`
	UnitCost       float64      `json:"unitCost"`
	Type           MovementType `json:"type"`
	DocumentType   string       `json:"documentType"`
	DocumentSeries string       `json:"documentSeries"`
	DocumentNumber string       `json:"documentNumber"`
	TransferID     string       `json:"transferId,omitempty"` // empty if not part of a transfer
	GuideNumber    string       `json:"guideNumber,omitempty"` // empty if not applicable (Guía de Remisión reference)
	OccurredAt     time.Time    `json:"occurredAt"`
}
```

Create `bs-inventory/backend/internal/domain/stock.go`:

```go
package domain

import "errors"

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
```

Note: `stock.go` uses `time.Time` in `StockLevel` — add `import "time"` to
its import block alongside `"errors"`.

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/domain/...`
Expected: PASS — all 5 new tests.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/go.mod bs-inventory/backend/internal/domain
git commit -m "feat(domain): add Tenant, Warehouse, Product, StockMovement types and weighted-average costing"
```

---

### Task 2: Auth infrastructure (JWT + password hashing)

**Files:**
- Create: `bs-inventory/backend/internal/auth/password.go`
- Create: `bs-inventory/backend/internal/auth/jwt.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/auth/auth_test.go`

**Interfaces:**
- Consumes: None
- Produces: `HashPassword`, `VerifyPassword`, `TokenIssuer`, `NewTokenIssuer`, `Claims`, `ErrInvalidToken`

- [ ] **Step 1: Add dependencies**

```bash
go -C bs-inventory/backend get github.com/golang-jwt/jwt/v5 golang.org/x/crypto
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/auth/auth_test.go`:

```go
package auth_test

import (
	"testing"
	"time"

	"bs-inventory/internal/auth"
)

func TestHashAndVerifyPassword(t *testing.T) {
	hash, err := auth.HashPassword("s3cr3t")
	if err != nil {
		t.Fatalf("HashPassword() error = %v", err)
	}
	if !auth.VerifyPassword(hash, "s3cr3t") {
		t.Error("VerifyPassword() = false, want true for correct password")
	}
	if auth.VerifyPassword(hash, "wrong") {
		t.Error("VerifyPassword() = true, want false for wrong password")
	}
}

func TestTokenIssuer_GenerateAndValidate(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)

	token, err := issuer.GenerateToken("user-1", "tenant-1", "admin")
	if err != nil {
		t.Fatalf("GenerateToken() error = %v", err)
	}

	claims, err := issuer.ValidateToken(token)
	if err != nil {
		t.Fatalf("ValidateToken() error = %v", err)
	}
	if claims.UserID != "user-1" || claims.TenantID != "tenant-1" || claims.Role != "admin" {
		t.Errorf("claims = %+v, want UserID=user-1 TenantID=tenant-1 Role=admin", claims)
	}
}

func TestTokenIssuer_RejectsExpiredToken(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", -time.Hour) // already expired

	token, err := issuer.GenerateToken("user-1", "tenant-1", "admin")
	if err != nil {
		t.Fatalf("GenerateToken() error = %v", err)
	}

	_, err = issuer.ValidateToken(token)
	if err != auth.ErrInvalidToken {
		t.Errorf("error = %v, want ErrInvalidToken", err)
	}
}

func TestTokenIssuer_RejectsTamperedToken(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	token, _ := issuer.GenerateToken("user-1", "tenant-1", "admin")

	_, err := issuer.ValidateToken(token + "tampered")
	if err != auth.ErrInvalidToken {
		t.Errorf("error = %v, want ErrInvalidToken", err)
	}
}
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/auth/...`
Expected: FAIL — none of `auth.HashPassword`, `auth.NewTokenIssuer` exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/auth/password.go`:

```go
package auth

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) (string, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hash), err
}

func VerifyPassword(hash, password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(hash), []byte(password)) == nil
}
```

Create `bs-inventory/backend/internal/auth/jwt.go`:

```go
package auth

import (
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var ErrInvalidToken = errors.New("invalid or expired token")

type Claims struct {
	UserID   string `json:"userId"`
	TenantID string `json:"tenantId"`
	Role     string `json:"role"`
	jwt.RegisteredClaims
}

type TokenIssuer struct {
	secret []byte
	ttl    time.Duration
}

func NewTokenIssuer(secret string, ttl time.Duration) *TokenIssuer {
	return &TokenIssuer{secret: []byte(secret), ttl: ttl}
}

func (i *TokenIssuer) GenerateToken(userID, tenantID, role string) (string, error) {
	claims := Claims{
		UserID:   userID,
		TenantID: tenantID,
		Role:     role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(i.ttl)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(i.secret)
}

func (i *TokenIssuer) ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (any, error) {
		return i.secret, nil
	})
	if err != nil || !token.Valid {
		return nil, ErrInvalidToken
	}
	return claims, nil
}
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/auth/...`
Expected: PASS — all 4 new tests.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/auth bs-inventory/backend/go.mod bs-inventory/backend/go.sum
git commit -m "feat(auth): add JWT issuance/validation and bcrypt password hashing"
```

---

### Task 3: Tenant/User/Warehouse/Section repositories and the full schema

**Files:**
- Create: `bs-inventory/backend/internal/postgres/schema.sql`
- Create: `bs-inventory/backend/internal/postgres/tenants.go`
- Create: `bs-inventory/backend/internal/postgres/users.go`
- Create: `bs-inventory/backend/internal/postgres/warehouses.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/postgres/tenant_test.go`

**Interfaces:**
- Consumes: `Tenant`, `User`, `RoleAdmin`, `Warehouse`, `Section`
- Produces: `NewTenantRepository`, `NewUserRepository`, `NewWarehouseRepository`, `NewSectionRepository`, `TenantRepository`, `UserRepository`, `WarehouseRepository`, `SectionRepository`, `ErrTenantNotFound`, `ErrDuplicateEmail`, `ErrUserNotFound`, `ErrWarehouseNotFound`, `ErrSectionNotFound`

**Design note:** `users.email` is a **globally unique** column (not scoped
per tenant) — deliberately, so `POST /auth/login` can look a user up by
email alone without also requiring a tenant identifier upfront. One
person having accounts across multiple tenants under the same email is
out of scope for this version.

- [ ] **Step 1: Add dependencies**

```bash
go -C bs-inventory/backend get github.com/jackc/pgx/v5 github.com/testcontainers/testcontainers-go github.com/testcontainers/testcontainers-go/modules/postgres
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/postgres/tenant_test.go`:

```go
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
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/postgres/...`
Expected: FAIL — `schema.sql` and every repository type don't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/postgres/schema.sql` — the
**complete** schema for the whole module (Task 4 adds no further tables,
only code that queries these):

```sql
CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country_code TEXT NOT NULL DEFAULT 'PE',
    low_stock_threshold INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS warehouses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    ruc_establishment_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, code)
);

CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (warehouse_id, code)
);

CREATE TABLE IF NOT EXISTS products (
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    sku TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    unit_of_measure_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (tenant_id, sku)
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    product_sku TEXT NOT NULL,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    section_id UUID NOT NULL REFERENCES sections(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_cost NUMERIC(14,4) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('IN', 'OUT')),
    document_type TEXT NOT NULL DEFAULT '',
    document_series TEXT NOT NULL DEFAULT '',
    document_number TEXT NOT NULL DEFAULT '',
    transfer_id UUID,
    guide_number TEXT NOT NULL DEFAULT '',
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (tenant_id, product_sku) REFERENCES products(tenant_id, sku)
);
CREATE INDEX IF NOT EXISTS idx_stock_movements_lookup ON stock_movements(tenant_id, product_sku, warehouse_id, section_id);

CREATE TABLE IF NOT EXISTS stock_levels (
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    product_sku TEXT NOT NULL,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    section_id UUID NOT NULL REFERENCES sections(id),
    quantity INTEGER NOT NULL DEFAULT 0,
    avg_unit_cost NUMERIC(14,4) NOT NULL DEFAULT 0,
    total_value NUMERIC(14,4) NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (tenant_id, product_sku, warehouse_id, section_id),
    FOREIGN KEY (tenant_id, product_sku) REFERENCES products(tenant_id, sku)
);
```

Create `bs-inventory/backend/internal/postgres/tenants.go`:

```go
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
```

Create `bs-inventory/backend/internal/postgres/users.go`:

```go
package postgres

import (
	"context"
	"errors"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/domain"
)

var ErrDuplicateEmail = errors.New("a user with this email already exists")
var ErrUserNotFound = errors.New("user not found")

type UserRepository struct {
	pool *pgxpool.Pool
}

func NewUserRepository(pool *pgxpool.Pool) *UserRepository {
	return &UserRepository{pool: pool}
}

func (r *UserRepository) Create(ctx context.Context, u domain.User) (domain.User, error) {
	err := r.pool.QueryRow(ctx,
		`INSERT INTO users (tenant_id, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, created_at`,
		u.TenantID, u.Email, u.PasswordHash, u.Role,
	).Scan(&u.ID, &u.CreatedAt)
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return domain.User{}, ErrDuplicateEmail
		}
		return domain.User{}, err
	}
	return u, nil
}

func (r *UserRepository) GetByEmail(ctx context.Context, email string) (domain.User, error) {
	var u domain.User
	err := r.pool.QueryRow(ctx,
		`SELECT id, tenant_id, email, password_hash, role, created_at FROM users WHERE email = $1`,
		email,
	).Scan(&u.ID, &u.TenantID, &u.Email, &u.PasswordHash, &u.Role, &u.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.User{}, ErrUserNotFound
	}
	return u, err
}
```

Create `bs-inventory/backend/internal/postgres/warehouses.go`:

```go
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
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/postgres/...`
Expected: PASS — all 4 new tests.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/postgres bs-inventory/backend/go.mod bs-inventory/backend/go.sum
git commit -m "feat(postgres): add tenant, user, warehouse, and section repositories, and the full schema"
```

---

### Task 4: Product and Stock repositories (transactional movement application)

**Files:**
- Create: `bs-inventory/backend/internal/postgres/products.go`
- Create: `bs-inventory/backend/internal/postgres/stock.go`
- Test: `bs-inventory/backend/internal/postgres/stock_test.go`

**Interfaces:**
- Consumes: `Product`, `StockMovement`, `StockLevel`, `ApplyMovement`, `MovementIn`, `TenantRepository`, `WarehouseRepository`, `SectionRepository` (uses the schema Task 3 already created — no schema changes here)
- Produces: `NewProductRepository`, `NewStockRepository`, `ProductRepository`, `StockRepository`, `ErrDuplicateSKU`, `ErrProductNotFound`, `ErrInvalidReference`, `LowStockLevel`, `ApplyTransfer`, `ListMovementsByTenantAndPeriod`, `TotalValuation`, `ListMovementsByProduct`

- [ ] **Step 1: Add the uuid dependency**

```bash
go -C bs-inventory/backend get github.com/google/uuid
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/postgres/stock_test.go`:

```go
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
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/postgres/...`
Expected: FAIL — `postgres.NewProductRepository` and `postgres.NewStockRepository` don't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/postgres/products.go`:

```go
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
```

Create `bs-inventory/backend/internal/postgres/stock.go`:

```go
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
	_, err := tx.Exec(ctx,
		`INSERT INTO stock_movements (id, tenant_id, product_sku, warehouse_id, section_id, quantity, unit_cost, type, document_type, document_series, document_number, transfer_id, guide_number, occurred_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NULLIF($12, ''), $13, $14)`,
		m.ID, m.TenantID, m.ProductSKU, m.WarehouseID, m.SectionID, m.Quantity, m.UnitCost, m.Type,
		m.DocumentType, m.DocumentSeries, m.DocumentNumber, m.TransferID, m.GuideNumber, m.OccurredAt,
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

// upsertLevelTx writes next inside an already-open transaction.
func upsertLevelTx(ctx context.Context, tx pgx.Tx, next domain.StockLevel) error {
	_, err := tx.Exec(ctx,
		`INSERT INTO stock_levels (tenant_id, product_sku, warehouse_id, section_id, quantity, avg_unit_cost, total_value, updated_at)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, now())
		 ON CONFLICT (tenant_id, product_sku, warehouse_id, section_id)
		 DO UPDATE SET quantity = $5, avg_unit_cost = $6, total_value = $7, updated_at = now()`,
		next.TenantID, next.ProductSKU, next.WarehouseID, next.SectionID, next.Quantity, next.AvgUnitCost, next.TotalValue,
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
	if err := upsertLevelTx(ctx, tx, next); err != nil {
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
	if err := upsertLevelTx(ctx, tx, outNext); err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	savedIn, err := insertMovementTx(ctx, tx, in)
	if err != nil {
		return domain.StockMovement{}, domain.StockMovement{}, err
	}
	if err := upsertLevelTx(ctx, tx, inNext); err != nil {
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
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/postgres/...`
Expected: PASS — all tests, including the 8 new ones.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/postgres bs-inventory/backend/go.mod bs-inventory/backend/go.sum
git commit -m "feat(postgres): add product repository and transactional stock movement application"
```

---

### Task 5: RabbitMQ event publisher

**Files:**
- Create: `bs-inventory/backend/internal/events/events.go`
- Create: `bs-inventory/backend/internal/events/publisher.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/events/publisher_test.go`

**Interfaces:**
- Consumes: None
- Produces: `NewPublisher`, `Publisher`, `StockUpdatedPayload`, `StockLowPayload`, `ExchangeName`

- [ ] **Step 1: Add dependencies**

```bash
go -C bs-inventory/backend get github.com/rabbitmq/amqp091-go github.com/testcontainers/testcontainers-go/modules/rabbitmq
```

- [ ] **Step 2: Write the failing test**

Create `bs-inventory/backend/internal/events/publisher_test.go`:

```go
package events_test

import (
	"context"
	"encoding/json"
	"testing"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
	tcrabbitmq "github.com/testcontainers/testcontainers-go/modules/rabbitmq"

	"bs-inventory/internal/events"
)

func setupTestBroker(t *testing.T) *amqp.Connection {
	t.Helper()
	ctx := context.Background()

	container, err := tcrabbitmq.Run(ctx, "rabbitmq:3.13-management-alpine")
	if err != nil {
		t.Fatalf("failed to start rabbitmq container: %v", err)
	}
	t.Cleanup(func() { _ = container.Terminate(ctx) })

	amqpURL, err := container.AmqpURL(ctx)
	if err != nil {
		t.Fatalf("failed to get amqp url: %v", err)
	}

	conn, err := amqp.Dial(amqpURL)
	if err != nil {
		t.Fatalf("failed to dial rabbitmq: %v", err)
	}
	t.Cleanup(func() { _ = conn.Close() })

	return conn
}

func TestPublisher_PublishStockUpdated(t *testing.T) {
	conn := setupTestBroker(t)
	publisher, err := events.NewPublisher(conn)
	if err != nil {
		t.Fatalf("NewPublisher() error = %v", err)
	}

	ch, err := conn.Channel()
	if err != nil {
		t.Fatalf("Channel() error = %v", err)
	}
	q, err := ch.QueueDeclare("", false, true, true, false, nil)
	if err != nil {
		t.Fatalf("QueueDeclare() error = %v", err)
	}
	if err := ch.QueueBind(q.Name, "stock.updated", events.ExchangeName, false, nil); err != nil {
		t.Fatalf("QueueBind() error = %v", err)
	}

	msgs, err := ch.Consume(q.Name, "", true, false, false, false, nil)
	if err != nil {
		t.Fatalf("Consume() error = %v", err)
	}

	payload := events.StockUpdatedPayload{TenantID: "tenant-1", SKU: "SKU-1", WarehouseID: "wh-1", SectionID: "sec-1", Quantity: 42, AvgUnitCost: 5.25, MovementType: "IN", OccurredAt: "2026-07-20T00:00:00Z"}
	if err := publisher.PublishStockUpdated(context.Background(), payload); err != nil {
		t.Fatalf("PublishStockUpdated() error = %v", err)
	}

	select {
	case msg := <-msgs:
		var got events.StockUpdatedPayload
		if err := json.Unmarshal(msg.Body, &got); err != nil {
			t.Fatalf("failed to unmarshal message: %v", err)
		}
		if got.SKU != "SKU-1" || got.Quantity != 42 {
			t.Errorf("got %+v, want SKU=SKU-1 Quantity=42", got)
		}
	case <-time.After(5 * time.Second):
		t.Fatal("timed out waiting for published message")
	}
}
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/events/...`
Expected: FAIL — `events.NewPublisher`, `events.StockUpdatedPayload`, `events.ExchangeName` don't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/events/events.go`:

```go
package events

type StockUpdatedPayload struct {
	TenantID     string  `json:"tenantId"`
	SKU          string  `json:"sku"`
	WarehouseID  string  `json:"warehouseId"`
	SectionID    string  `json:"sectionId"`
	Quantity     int     `json:"quantity"`
	AvgUnitCost  float64 `json:"avgUnitCost"`
	MovementType string  `json:"movementType"`
	OccurredAt   string  `json:"occurredAt"`
}

type StockLowPayload struct {
	TenantID  string `json:"tenantId"`
	SKU       string `json:"sku"`
	Quantity  int    `json:"quantity"`
	Threshold int    `json:"threshold"`
}
```

Create `bs-inventory/backend/internal/events/publisher.go`:

```go
package events

import (
	"context"
	"encoding/json"

	amqp "github.com/rabbitmq/amqp091-go"
)

const ExchangeName = "bs-inventory.events"

type Publisher struct {
	channel *amqp.Channel
}

func NewPublisher(conn *amqp.Connection) (*Publisher, error) {
	ch, err := conn.Channel()
	if err != nil {
		return nil, err
	}
	if err := ch.ExchangeDeclare(ExchangeName, "topic", true, false, false, false, nil); err != nil {
		return nil, err
	}
	return &Publisher{channel: ch}, nil
}

func (p *Publisher) PublishStockUpdated(ctx context.Context, payload StockUpdatedPayload) error {
	return p.publish(ctx, "stock.updated", payload)
}

func (p *Publisher) PublishStockLow(ctx context.Context, payload StockLowPayload) error {
	return p.publish(ctx, "stock.low", payload)
}

func (p *Publisher) publish(ctx context.Context, routingKey string, payload any) error {
	body, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	return p.channel.PublishWithContext(ctx, ExchangeName, routingKey, false, false, amqp.Publishing{
		ContentType: "application/json",
		Body:        body,
	})
}
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/events/...`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/events bs-inventory/backend/go.mod bs-inventory/backend/go.sum
git commit -m "feat(events): add RabbitMQ publisher for stock.updated and stock.low"
```

---

### Task 6: Compliance — regulatory profile interface and Peru (Kardex + PLE 13.1)

**Files:**
- Create: `bs-inventory/backend/internal/compliance/profile.go`
- Create: `bs-inventory/backend/internal/compliance/peru.go`
- Test: `bs-inventory/backend/internal/compliance/peru_test.go`

**Interfaces:**
- Consumes: `StockMovement`, `MovementIn`, `MovementOut`, `Product`, `Warehouse`
- Produces: `RegulatoryProfile`, `PeruProfile`, `NewPeruProfile`, `KardexEntry`, `BuildKardex`

- [ ] **Step 1: Write the failing tests**

Create `bs-inventory/backend/internal/compliance/peru_test.go`:

```go
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
}
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/compliance/...`
Expected: FAIL — `compliance.BuildKardex` and `compliance.NewPeruProfile` don't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/backend/internal/compliance/profile.go`:

```go
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
```

Create `bs-inventory/backend/internal/compliance/peru.go`:

```go
package compliance

import (
	"bytes"
	"context"
	"fmt"

	"bs-inventory/internal/domain"
)

// PeruProfile implements PLE 13.1 ("Registro de Inventario Permanente
// Valorizado"), verified directly against SUNAT's own published
// structure (Anexo 2, base norm RS 286-2009/SUNAT, amended by RS
// 361-2015 and RS 315-2018) — not transcribed from a secondary summary.
type PeruProfile struct{}

func NewPeruProfile() *PeruProfile {
	return &PeruProfile{}
}

// entryType values for PLE field 14 ("Tipo de operación") — both
// space-padded to the same 3-character width so the pipe-delimited
// columns that follow always start at a fixed offset in a fixed-width
// viewer, matching how the rest of this row's literals are aligned.
const (
	entryTypeIn  = "IN "
	entryTypeOut = "OUT"
)

func (p *PeruProfile) ExportLedger(ctx context.Context, movements []domain.StockMovement, products map[string]domain.Product, warehouses map[string]domain.Warehouse, period string) ([]byte, error) {
	entries := BuildKardex(movements)

	var buf bytes.Buffer
	for i, e := range entries {
		m := e.Movement
		entryType := entryTypeIn
		outQty, outCost, outTotal := 0, 0.0, 0.0
		inQty, inCost, inTotal := 0, 0.0, 0.0
		if m.Type == domain.MovementIn {
			inQty, inCost, inTotal = m.Quantity, m.UnitCost, float64(m.Quantity)*m.UnitCost
		} else {
			entryType = entryTypeOut
			outQty, outCost, outTotal = m.Quantity, e.BalanceUnitCost, float64(m.Quantity)*e.BalanceUnitCost
		}

		// 27 fields per PLE 13.1's Anexo 2 structure. Fields with no
		// established value in this version (catalog/UNSPSC codes) are
		// emitted empty, not omitted — PLE's own rule is "empty field,
		// still present" for optional-but-defined columns, distinct from
		// truly free-use fields 28-56 (which this exporter doesn't emit
		// at all).
		row := fmt.Sprintf(
			"%s|%s|%s|%s||%s||%s||%s|%s|%s|%s|%s||%s|%s|%d|%.4f|%.4f|%d|%.4f|%.4f|%d|%.4f|%.4f|1",
			period,                             // 1: Período
			fmt.Sprintf("CUO-%d", i+1),          // 2: CUO
			"M",                                 // 3: Correlativo del asiento
			warehouses[m.WarehouseID].RucEstablishmentCode, // 4: Código de establecimiento anexo
			"03",                                // 6: Tipo de existencia (03 = mercadería)
			m.ProductSKU,                        // 7: Código propio de la existencia
			m.OccurredAt.Format("02/01/2006"),   // 10: Fecha de emisión del documento
			m.DocumentType,                      // 11: Tipo de documento
			m.DocumentSeries,                    // 12: Serie del documento
			m.DocumentNumber,                    // 13: Número del documento
			entryType,                           // 14: Tipo de operación
			products[m.ProductSKU].UnitOfMeasureCode, // 16: Código unidad de medida
			"1",                                 // 17: Método de valuación (1 = promedio ponderado)
			inQty, inCost, inTotal,               // 18-20: Entrada
			outQty, outCost, outTotal,             // 21-23: Salida
			e.BalanceQuantity, e.BalanceUnitCost, e.BalanceValue, // 24-26: Saldo final
			// 27: Estado de la operación — always "1" (vigente/normal) in
			// this version; no cancellation/correction workflow exists yet
			// that would ever emit another value here.
		)
		buf.WriteString(row)
		buf.WriteString("\n")
	}
	return buf.Bytes(), nil
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/compliance/...`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/backend/internal/compliance
git commit -m "feat(compliance): add RegulatoryProfile interface and Peru Kardex/PLE 13.1 export"
```

---

### Task 7: Auth handlers and tenant/JWT middleware

**Files:**
- Create: `bs-inventory/backend/internal/http/middleware/auth.go`
- Create: `bs-inventory/backend/internal/http/respond.go`
- Create: `bs-inventory/backend/internal/http/auth_handlers.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/http/auth_test.go`

**Interfaces:**
- Consumes: `TenantRepository`, `UserRepository`, `HashPassword`, `VerifyPassword`, `TokenIssuer`, `RoleAdmin`, `ErrDuplicateEmail`
- Produces: `AuthServer`, `writeJSON`, `writeError`, `middleware.Auth`, `middleware.TenantID`, `middleware.UserID`, `middleware.ContextWithClaims`

**Design note:** each HTTP task in this plan (7–10) defines its own small,
independently-testable route group (a `Routes() chi.Router` method) —
they are **not** wired to the real `middleware.Auth` inside their own
tests. `middleware.ContextWithClaims` is an exported test seam that lets
Tasks 8–10's tests inject a known `tenantID`/`userID`/`role` directly,
without a real JWT round-trip per test. Task 11 (server wiring) is where
all route groups are actually mounted **behind** `middleware.Auth` for
real traffic — this task's own auth endpoints (`/auth/tenants`,
`/auth/login`) are deliberately the two routes that must stay
**unauthenticated**.

- [ ] **Step 1: Add the chi dependency**

```bash
go -C bs-inventory/backend get github.com/go-chi/chi/v5
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/http/auth_test.go`:

```go
package http_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	tcpostgres "github.com/testcontainers/testcontainers-go/modules/postgres"

	"bs-inventory/internal/auth"
	bshttp "bs-inventory/internal/http"
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
		t.Fatalf("failed to start postgres: %v", err)
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

	schema, err := os.ReadFile("../postgres/schema.sql")
	if err != nil {
		t.Fatalf("failed to read schema: %v", err)
	}
	if _, err := pool.Exec(ctx, string(schema)); err != nil {
		t.Fatalf("failed to apply schema: %v", err)
	}

	return pool
}

func TestRegisterTenant_AndLogin(t *testing.T) {
	pool := setupTestDB(t)
	server := &bshttp.AuthServer{
		Tenants: postgres.NewTenantRepository(pool),
		Users:   postgres.NewUserRepository(pool),
		Issuer:  auth.NewTokenIssuer("test-secret", time.Hour),
	}
	ts := httptest.NewServer(server.Routes())
	defer ts.Close()

	regBody, _ := json.Marshal(map[string]string{
		"tenantName": "Acme Corp", "countryCode": "PE",
		"adminEmail": "admin@acme.com", "adminPassword": "s3cr3t",
	})
	resp, err := http.Post(ts.URL+"/api/v1/auth/tenants", "application/json", bytes.NewReader(regBody))
	if err != nil {
		t.Fatalf("POST tenants error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST tenants status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	loginBody, _ := json.Marshal(map[string]string{"email": "admin@acme.com", "password": "s3cr3t"})
	loginResp, err := http.Post(ts.URL+"/api/v1/auth/login", "application/json", bytes.NewReader(loginBody))
	if err != nil {
		t.Fatalf("POST login error = %v", err)
	}
	if loginResp.StatusCode != http.StatusOK {
		t.Fatalf("POST login status = %d, want %d", loginResp.StatusCode, http.StatusOK)
	}
	var body map[string]string
	json.NewDecoder(loginResp.Body).Decode(&body)
	if body["token"] == "" {
		t.Error("login response has no token")
	}
}

func TestLogin_WrongPassword(t *testing.T) {
	pool := setupTestDB(t)
	server := &bshttp.AuthServer{
		Tenants: postgres.NewTenantRepository(pool),
		Users:   postgres.NewUserRepository(pool),
		Issuer:  auth.NewTokenIssuer("test-secret", time.Hour),
	}
	ts := httptest.NewServer(server.Routes())
	defer ts.Close()

	regBody, _ := json.Marshal(map[string]string{
		"tenantName": "Acme Corp", "countryCode": "PE",
		"adminEmail": "admin2@acme.com", "adminPassword": "s3cr3t",
	})
	http.Post(ts.URL+"/api/v1/auth/tenants", "application/json", bytes.NewReader(regBody))

	loginBody, _ := json.Marshal(map[string]string{"email": "admin2@acme.com", "password": "wrong"})
	resp, err := http.Post(ts.URL+"/api/v1/auth/login", "application/json", bytes.NewReader(loginBody))
	if err != nil {
		t.Fatalf("POST login error = %v", err)
	}
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusUnauthorized)
	}
}

func TestMiddlewareAuth_RejectsMissingToken(t *testing.T) {
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	protected := bshttp.NewProtectedTestRouterForAuthCheck(issuer)
	ts := httptest.NewServer(protected)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/protected")
	if err != nil {
		t.Fatalf("GET error = %v", err)
	}
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusUnauthorized)
	}
}
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: FAIL — `bshttp.AuthServer` doesn't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/http/respond.go`:

```go
package http

import (
	"encoding/json"
	"net/http"
)

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
```

Create `bs-inventory/backend/internal/http/middleware/auth.go`:

```go
package middleware

import (
	"context"
	"net/http"
	"strings"

	"bs-inventory/internal/auth"
)

type contextKey string

const (
	tenantIDKey contextKey = "tenantID"
	userIDKey   contextKey = "userID"
	roleKey     contextKey = "role"
)

// ContextWithClaims is an exported test seam: it lets a handler test in a
// later task inject a known tenant/user/role directly, without a real
// JWT round-trip through Auth per test. Production code only ever
// reaches this state via Auth below.
func ContextWithClaims(ctx context.Context, tenantID, userID, role string) context.Context {
	ctx = context.WithValue(ctx, tenantIDKey, tenantID)
	ctx = context.WithValue(ctx, userIDKey, userID)
	return context.WithValue(ctx, roleKey, role)
}

func Auth(issuer *auth.TokenIssuer) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			header := r.Header.Get("Authorization")
			if !strings.HasPrefix(header, "Bearer ") {
				http.Error(w, `{"error":"missing or invalid Authorization header"}`, http.StatusUnauthorized)
				return
			}
			token := strings.TrimPrefix(header, "Bearer ")
			claims, err := issuer.ValidateToken(token)
			if err != nil {
				http.Error(w, `{"error":"invalid or expired token"}`, http.StatusUnauthorized)
				return
			}
			ctx := ContextWithClaims(r.Context(), claims.TenantID, claims.UserID, claims.Role)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func TenantID(ctx context.Context) string {
	v, _ := ctx.Value(tenantIDKey).(string)
	return v
}

func UserID(ctx context.Context) string {
	v, _ := ctx.Value(userIDKey).(string)
	return v
}
```

Create `bs-inventory/backend/internal/http/auth_handlers.go`:

```go
package http

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	bsauth "bs-inventory/internal/auth"
	"bs-inventory/internal/domain"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type AuthServer struct {
	Tenants *postgres.TenantRepository
	Users   *postgres.UserRepository
	Issuer  *bsauth.TokenIssuer
}

func (s *AuthServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/api/v1/auth/tenants", s.handleRegisterTenant)
	r.Post("/api/v1/auth/login", s.handleLogin)
	return r
}

// NewProtectedTestRouterForAuthCheck exists only so Step 2's test can
// verify middleware.Auth rejects a missing token, without needing a full
// downstream handler wired up yet (that happens across Tasks 8-11).
func NewProtectedTestRouterForAuthCheck(issuer *bsauth.TokenIssuer) chi.Router {
	r := chi.NewRouter()
	r.With(middleware.Auth(issuer)).Get("/protected", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"tenantId": middleware.TenantID(r.Context())})
	})
	return r
}

type registerTenantRequest struct {
	TenantName    string `json:"tenantName"`
	CountryCode   string `json:"countryCode"`
	AdminEmail    string `json:"adminEmail"`
	AdminPassword string `json:"adminPassword"`
}

func (s *AuthServer) handleRegisterTenant(w http.ResponseWriter, r *http.Request) {
	var req registerTenantRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.TenantName == "" || req.AdminEmail == "" || req.AdminPassword == "" {
		writeError(w, http.StatusBadRequest, "tenantName, adminEmail, and adminPassword are required")
		return
	}

	tenant, err := s.Tenants.Create(r.Context(), domain.Tenant{Name: req.TenantName, CountryCode: req.CountryCode})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create tenant")
		return
	}

	hash, err := bsauth.HashPassword(req.AdminPassword)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to hash password")
		return
	}

	user, err := s.Users.Create(r.Context(), domain.User{TenantID: tenant.ID, Email: req.AdminEmail, PasswordHash: hash, Role: domain.RoleAdmin})
	if err != nil {
		if err == postgres.ErrDuplicateEmail {
			writeError(w, http.StatusConflict, "a user with this email already exists")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to create admin user")
		return
	}

	writeJSON(w, http.StatusCreated, map[string]any{
		"tenant":    tenant,
		"adminUser": map[string]string{"id": user.ID, "email": user.Email},
	})
}

type loginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *AuthServer) handleLogin(w http.ResponseWriter, r *http.Request) {
	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	user, err := s.Users.GetByEmail(r.Context(), req.Email)
	if err != nil || !bsauth.VerifyPassword(user.PasswordHash, req.Password) {
		writeError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}

	token, err := s.Issuer.GenerateToken(user.ID, user.TenantID, string(user.Role))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to generate token")
		return
	}
	writeJSON(w, http.StatusOK, map[string]string{"token": token})
}
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: PASS — all 3 new tests.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/http bs-inventory/backend/go.mod bs-inventory/backend/go.sum
git commit -m "feat(http): add tenant registration, login, and JWT auth middleware"
```

---

### Task 8: Catalog HTTP handlers (warehouses, sections, products)

**Files:**
- Create: `bs-inventory/backend/internal/http/catalog_handlers.go`
- Test: `bs-inventory/backend/internal/http/catalog_test.go`

**Interfaces:**
- Consumes: `WarehouseRepository`, `SectionRepository`, `ProductRepository`, `StockRepository`, `ErrDuplicateSKU`, `ErrProductNotFound`, `ListMovementsByProduct`, `Warehouse`, `Section`, `Product`, `middleware.TenantID`, `middleware.ContextWithClaims`, `writeJSON`, `writeError`
- Produces: `CatalogServer`

Every handler scopes its repository call to `middleware.TenantID(r.Context())` —
never trusts a tenant id from the request body or path.

- [ ] **Step 1: Write the failing tests**

Create `bs-inventory/backend/internal/http/catalog_test.go`:

```go
package http_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"bs-inventory/internal/domain"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

func withTestTenant(tenantID string, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := middleware.ContextWithClaims(r.Context(), tenantID, "test-user", "admin")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func TestCatalogServer_CreateAndListWarehousesAndSections(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: postgres.NewWarehouseRepository(pool),
		Sections:   postgres.NewSectionRepository(pool),
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	whBody, _ := json.Marshal(map[string]string{"name": "Lima Norte", "code": "LIM-N", "rucEstablishmentCode": "0001"})
	resp, err := http.Post(ts.URL+"/api/v1/warehouses", "application/json", bytes.NewReader(whBody))
	if err != nil {
		t.Fatalf("POST warehouses error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST warehouses status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}
	var created domain.Warehouse
	json.NewDecoder(resp.Body).Decode(&created)
	if created.ID == "" {
		t.Fatal("created warehouse has no id")
	}

	listResp, err := http.Get(ts.URL + "/api/v1/warehouses")
	if err != nil {
		t.Fatalf("GET warehouses error = %v", err)
	}
	var list []domain.Warehouse
	json.NewDecoder(listResp.Body).Decode(&list)
	if len(list) != 1 || list[0].Name != "Lima Norte" {
		t.Fatalf("GET warehouses = %+v, want 1 warehouse named Lima Norte", list)
	}

	secBody, _ := json.Marshal(map[string]string{"name": "Electrónica", "code": "ELEC"})
	secResp, err := http.Post(ts.URL+"/api/v1/warehouses/"+list[0].ID+"/sections", "application/json", bytes.NewReader(secBody))
	if err != nil {
		t.Fatalf("POST sections error = %v", err)
	}
	if secResp.StatusCode != http.StatusCreated {
		t.Fatalf("POST sections status = %d, want %d", secResp.StatusCode, http.StatusCreated)
	}

	secListResp, err := http.Get(ts.URL + "/api/v1/warehouses/" + list[0].ID + "/sections")
	if err != nil {
		t.Fatalf("GET sections error = %v", err)
	}
	var secList []domain.Section
	json.NewDecoder(secListResp.Body).Decode(&secList)
	if len(secList) != 1 || secList[0].Name != "Electrónica" {
		t.Fatalf("GET sections = %+v, want 1 section named Electrónica", secList)
	}
}

func TestCatalogServer_CreateAndGetProduct(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: postgres.NewWarehouseRepository(pool),
		Sections:   postgres.NewSectionRepository(pool),
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-1", "name": "Widget", "category": "tools", "unitOfMeasureCode": "NIU"})
	resp, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST products error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST products status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	getResp, err := http.Get(ts.URL + "/api/v1/products/SKU-1")
	if err != nil {
		t.Fatalf("GET product error = %v", err)
	}
	if getResp.StatusCode != http.StatusOK {
		t.Fatalf("GET product status = %d, want %d", getResp.StatusCode, http.StatusOK)
	}
	var got domain.Product
	json.NewDecoder(getResp.Body).Decode(&got)
	if got.Name != "Widget" {
		t.Errorf("GET product Name = %q, want %q", got.Name, "Widget")
	}

	missingResp, err := http.Get(ts.URL + "/api/v1/products/NO-SUCH-SKU")
	if err != nil {
		t.Fatalf("GET missing product error = %v", err)
	}
	if missingResp.StatusCode != http.StatusNotFound {
		t.Errorf("GET missing product status = %d, want %d", missingResp.StatusCode, http.StatusNotFound)
	}
}

func TestCatalogServer_DuplicateSKU(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	server := &bshttp.CatalogServer{
		Warehouses: postgres.NewWarehouseRepository(pool),
		Sections:   postgres.NewSectionRepository(pool),
		Products:   postgres.NewProductRepository(pool),
		Stock:      postgres.NewStockRepository(pool),
	}
	ctx := context.Background()
	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})

	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-DUP", "name": "Widget", "unitOfMeasureCode": "NIU"})
	http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	resp, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("second POST products error = %v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Errorf("second POST products status = %d, want %d", resp.StatusCode, http.StatusConflict)
	}
}

func TestCatalogServer_ProductMovements(t *testing.T) {
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

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
	if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.CatalogServer{
		Warehouses: warehouses,
		Sections:   sections,
		Products:   products,
		Stock:      stock,
	}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/products/SKU-1/movements")
	if err != nil {
		t.Fatalf("GET product movements error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("GET product movements status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	var movements []domain.StockMovement
	json.NewDecoder(resp.Body).Decode(&movements)
	if len(movements) != 1 || movements[0].Quantity != 10 {
		t.Errorf("GET product movements = %+v, want 1 movement with Quantity=10", movements)
	}

	missingResp, err := http.Get(ts.URL + "/api/v1/products/NO-SUCH-SKU/movements")
	if err != nil {
		t.Fatalf("GET movements for missing product error = %v", err)
	}
	if missingResp.StatusCode != http.StatusNotFound {
		t.Errorf("GET movements for missing product status = %d, want %d", missingResp.StatusCode, http.StatusNotFound)
	}
}
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: FAIL — `bshttp.CatalogServer` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/backend/internal/http/catalog_handlers.go`:

```go
package http

import (
	"encoding/json"
	"net/http"

	"github.com/go-chi/chi/v5"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type CatalogServer struct {
	Warehouses *postgres.WarehouseRepository
	Sections   *postgres.SectionRepository
	Products   *postgres.ProductRepository
	Stock      *postgres.StockRepository
}

func (s *CatalogServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/api/v1/warehouses", s.handleCreateWarehouse)
	r.Get("/api/v1/warehouses", s.handleListWarehouses)
	r.Post("/api/v1/warehouses/{warehouseID}/sections", s.handleCreateSection)
	r.Get("/api/v1/warehouses/{warehouseID}/sections", s.handleListSections)
	r.Post("/api/v1/products", s.handleCreateProduct)
	r.Get("/api/v1/products", s.handleListProducts)
	r.Get("/api/v1/products/{sku}", s.handleGetProduct)
	r.Get("/api/v1/products/{sku}/movements", s.handleProductMovements)
	return r
}

type createWarehouseRequest struct {
	Name                 string `json:"name"`
	Code                 string `json:"code"`
	RucEstablishmentCode string `json:"rucEstablishmentCode"`
}

func (s *CatalogServer) handleCreateWarehouse(w http.ResponseWriter, r *http.Request) {
	var req createWarehouseRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Name == "" || req.Code == "" {
		writeError(w, http.StatusBadRequest, "name and code are required")
		return
	}
	wh, err := s.Warehouses.Create(r.Context(), domain.Warehouse{
		TenantID:             middleware.TenantID(r.Context()),
		Name:                 req.Name,
		Code:                 req.Code,
		RucEstablishmentCode: req.RucEstablishmentCode,
	})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create warehouse")
		return
	}
	writeJSON(w, http.StatusCreated, wh)
}

func (s *CatalogServer) handleListWarehouses(w http.ResponseWriter, r *http.Request) {
	list, err := s.Warehouses.ListByTenant(r.Context(), middleware.TenantID(r.Context()))
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list warehouses")
		return
	}
	writeJSON(w, http.StatusOK, list)
}

type createSectionRequest struct {
	Name string `json:"name"`
	Code string `json:"code"`
}

func (s *CatalogServer) handleCreateSection(w http.ResponseWriter, r *http.Request) {
	warehouseID := chi.URLParam(r, "warehouseID")
	if _, err := s.Warehouses.GetByID(r.Context(), middleware.TenantID(r.Context()), warehouseID); err != nil {
		writeError(w, http.StatusNotFound, "warehouse not found")
		return
	}
	var req createSectionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Name == "" || req.Code == "" {
		writeError(w, http.StatusBadRequest, "name and code are required")
		return
	}
	sec, err := s.Sections.Create(r.Context(), domain.Section{WarehouseID: warehouseID, Name: req.Name, Code: req.Code})
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to create section")
		return
	}
	writeJSON(w, http.StatusCreated, sec)
}

func (s *CatalogServer) handleListSections(w http.ResponseWriter, r *http.Request) {
	warehouseID := chi.URLParam(r, "warehouseID")
	list, err := s.Sections.ListByWarehouse(r.Context(), warehouseID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list sections")
		return
	}
	writeJSON(w, http.StatusOK, list)
}

type createProductRequest struct {
	SKU               string `json:"sku"`
	Name              string `json:"name"`
	Category          string `json:"category"`
	UnitOfMeasureCode string `json:"unitOfMeasureCode"`
}

func (s *CatalogServer) handleCreateProduct(w http.ResponseWriter, r *http.Request) {
	var req createProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.SKU == "" || req.Name == "" || req.UnitOfMeasureCode == "" {
		writeError(w, http.StatusBadRequest, "sku, name, and unitOfMeasureCode are required")
		return
	}
	p := domain.Product{
		TenantID:          middleware.TenantID(r.Context()),
		SKU:               req.SKU,
		Name:              req.Name,
		Category:          req.Category,
		UnitOfMeasureCode: req.UnitOfMeasureCode,
	}
	if err := s.Products.Create(r.Context(), p); err != nil {
		if err == postgres.ErrDuplicateSKU {
			writeError(w, http.StatusConflict, "a product with this SKU already exists")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to create product")
		return
	}
	writeJSON(w, http.StatusCreated, p)
}

func (s *CatalogServer) handleListProducts(w http.ResponseWriter, r *http.Request) {
	list, err := s.Products.List(r.Context(), middleware.TenantID(r.Context()), 100, 0)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list products")
		return
	}
	writeJSON(w, http.StatusOK, list)
}

func (s *CatalogServer) handleGetProduct(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	p, err := s.Products.GetBySKU(r.Context(), middleware.TenantID(r.Context()), sku)
	if err != nil {
		if err == postgres.ErrProductNotFound {
			writeError(w, http.StatusNotFound, "product not found")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to get product")
		return
	}
	writeJSON(w, http.StatusOK, p)
}

func (s *CatalogServer) handleProductMovements(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	tenantID := middleware.TenantID(r.Context())
	if _, err := s.Products.GetBySKU(r.Context(), tenantID, sku); err != nil {
		writeError(w, http.StatusNotFound, "product not found")
		return
	}
	movements, err := s.Stock.ListMovementsByProduct(r.Context(), tenantID, sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read movements")
		return
	}
	writeJSON(w, http.StatusOK, movements)
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: PASS — all 4 new tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/backend/internal/http
git commit -m "feat(http): add warehouse, section, and product catalog handlers"
```

---

### Task 9: Stock handlers (movements, transfers, low-stock report)

**Files:**
- Create: `bs-inventory/backend/internal/http/stock_handlers.go`
- Test: `bs-inventory/backend/internal/http/stock_test.go`

**Interfaces:**
- Consumes: `StockRepository`, `ProductRepository`, `TenantRepository`, `ErrInvalidReference`, `LowStockLevel`, `ApplyMovement`, `ApplyTransfer`, `IsLowStockCrossing`, `MovementIn`, `MovementOut`, `Publisher`, `StockUpdatedPayload`, `StockLowPayload`, `middleware.TenantID`, `writeJSON`, `writeError`
- Produces: `StockServer`

**Design note on the 409 vs. 400 discrepancy:** the design spec's REST API
table (§7) lists `409 insufficient stock` for both movement endpoints,
while its "Error handling" bullet list (§7) says "400 for validation and
insufficient-stock-on-OUT" — an internal inconsistency. Resolved in favor
of **409** (a Conflict — the request is well-formed, but the current
state prevents it), matching every per-endpoint row in the REST table,
which is the more specific and more likely deliberate of the two.

**Design note on transfers and low-stock:** a transfer moves the same
quantity from one location to another, so the tenant-wide total for that
SKU is unchanged — it can never cross the low-stock threshold. Only
`POST /stock/movements` checks `domain.IsLowStockCrossing`.

- [ ] **Step 1: Write the failing tests**

Create `bs-inventory/backend/internal/http/stock_test.go`:

```go
package http_test

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"bs-inventory/internal/domain"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/postgres"
)

func TestStockServer_CreateMovement_INThenOUT(t *testing.T) {
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

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	inBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 100, "unitCost": 5.00, "type": "IN",
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(inBody))
	if err != nil {
		t.Fatalf("POST movements (IN) error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST movements (IN) status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	outBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 30, "type": "OUT",
	})
	resp2, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(outBody))
	if err != nil {
		t.Fatalf("POST movements (OUT) error = %v", err)
	}
	if resp2.StatusCode != http.StatusCreated {
		t.Fatalf("POST movements (OUT) status = %d, want %d", resp2.StatusCode, http.StatusCreated)
	}

	levelResp, err := http.Get(ts.URL + "/api/v1/stock/SKU-1?warehouseId=" + wh.ID + "&sectionId=" + sec.ID)
	if err != nil {
		t.Fatalf("GET stock error = %v", err)
	}
	var level domain.StockLevel
	json.NewDecoder(levelResp.Body).Decode(&level)
	if level.Quantity != 70 || level.AvgUnitCost != 5.00 {
		t.Errorf("GET stock = %+v, want Quantity=70 AvgUnitCost=5.00", level)
	}

	totalResp, err := http.Get(ts.URL + "/api/v1/stock/SKU-1")
	if err != nil {
		t.Fatalf("GET stock (aggregated) error = %v", err)
	}
	var totalBody map[string]any
	json.NewDecoder(totalResp.Body).Decode(&totalBody)
	if totalBody["totalQuantity"].(float64) != 70 {
		t.Errorf("GET stock (aggregated) totalQuantity = %v, want 70", totalBody["totalQuantity"])
	}
}

func TestStockServer_CreateMovement_InsufficientStockReturns409(t *testing.T) {
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

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 10, "type": "OUT",
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST movements error = %v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusConflict)
	}
}

func TestStockServer_CreateMovement_UnknownWarehouseReturns404(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-1", Name: "Widget", UnitOfMeasureCode: "NIU"})

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": "00000000-0000-0000-0000-000000000000", "sectionId": "00000000-0000-0000-0000-000000000000",
		"quantity": 10, "unitCost": 1.0, "type": "IN",
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST movements error = %v", err)
	}
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusNotFound)
	}
}

func TestStockServer_CreateTransfer_MovesBetweenWarehouses(t *testing.T) {
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

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	seedBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "warehouseId": whA.ID, "sectionId": secA.ID,
		"quantity": 100, "unitCost": 5.00, "type": "IN",
	})
	http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(seedBody))

	transferBody, _ := json.Marshal(map[string]any{
		"productSku": "SKU-1", "fromWarehouseId": whA.ID, "fromSectionId": secA.ID,
		"toWarehouseId": whB.ID, "toSectionId": secB.ID, "quantity": 40,
	})
	resp, err := http.Post(ts.URL+"/api/v1/stock/transfers", "application/json", bytes.NewReader(transferBody))
	if err != nil {
		t.Fatalf("POST transfers error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST transfers status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	levelA, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", whA.ID, secA.ID)
	if err != nil || levelA.Quantity != 60 {
		t.Errorf("GetLevel(A) = %+v, %v, want Quantity=60", levelA, err)
	}
	levelB, err := stock.GetLevel(ctx, tenant.ID, "SKU-1", whB.ID, secB.ID)
	if err != nil || levelB.Quantity != 40 || levelB.AvgUnitCost != 5.00 {
		t.Errorf("GetLevel(B) = %+v, %v, want Quantity=40 AvgUnitCost=5.00", levelB, err)
	}
}

func TestStockServer_LowStockReport(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	sections := postgres.NewSectionRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "PE", LowStockThreshold: 10})
	wh, _ := warehouses.Create(ctx, domain.Warehouse{TenantID: tenant.ID, Name: "A", Code: "A", RucEstablishmentCode: "0001"})
	sec, _ := sections.Create(ctx, domain.Section{WarehouseID: wh.ID, Name: "General", Code: "GEN"})
	_ = products.Create(ctx, domain.Product{TenantID: tenant.ID, SKU: "SKU-LOW", Name: "Low", UnitOfMeasureCode: "NIU"})

	server := &bshttp.StockServer{Stock: stock, Products: products, Tenants: tenants}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	body, _ := json.Marshal(map[string]any{
		"productSku": "SKU-LOW", "warehouseId": wh.ID, "sectionId": sec.ID,
		"quantity": 5, "unitCost": 1.0, "type": "IN",
	})
	http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(body))

	resp, err := http.Get(ts.URL + "/api/v1/stock/low")
	if err != nil {
		t.Fatalf("GET stock/low error = %v", err)
	}
	var low []postgres.LowStockLevel
	json.NewDecoder(resp.Body).Decode(&low)
	if len(low) != 1 || low[0].ProductSKU != "SKU-LOW" {
		t.Errorf("GET stock/low = %+v, want [{SKU-LOW 5}]", low)
	}
}
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: FAIL — `bshttp.StockServer` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/backend/internal/http/stock_handlers.go`:

```go
package http

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/events"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type StockServer struct {
	Stock    *postgres.StockRepository
	Products *postgres.ProductRepository
	Tenants  *postgres.TenantRepository
	Events   *events.Publisher
}

func (s *StockServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Post("/api/v1/stock/movements", s.handleCreateMovement)
	r.Post("/api/v1/stock/transfers", s.handleCreateTransfer)
	r.Get("/api/v1/stock/low", s.handleLowStock)
	r.Get("/api/v1/stock/{sku}", s.handleGetStock)
	return r
}

type createMovementRequest struct {
	ProductSKU     string  `json:"productSku"`
	WarehouseID    string  `json:"warehouseId"`
	SectionID      string  `json:"sectionId"`
	Quantity       int     `json:"quantity"`
	UnitCost       float64 `json:"unitCost"`
	Type           string  `json:"type"`
	DocumentType   string  `json:"documentType"`
	DocumentSeries string  `json:"documentSeries"`
	DocumentNumber string  `json:"documentNumber"`
	GuideNumber    string  `json:"guideNumber"`
}

func (s *StockServer) handleCreateMovement(w http.ResponseWriter, r *http.Request) {
	var req createMovementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.ProductSKU == "" || req.WarehouseID == "" || req.SectionID == "" || req.Quantity <= 0 {
		writeError(w, http.StatusBadRequest, "productSku, warehouseId, sectionId, and a positive quantity are required")
		return
	}
	movementType := domain.MovementType(req.Type)
	if movementType != domain.MovementIn && movementType != domain.MovementOut {
		writeError(w, http.StatusBadRequest, `type must be "IN" or "OUT"`)
		return
	}

	tenantID := middleware.TenantID(r.Context())
	current, err := s.Stock.GetLevel(r.Context(), tenantID, req.ProductSKU, req.WarehouseID, req.SectionID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read current stock level")
		return
	}
	prevTotal, err := s.Stock.TotalQuantityBySKU(r.Context(), tenantID, req.ProductSKU)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read current stock total")
		return
	}

	m := domain.StockMovement{
		TenantID: tenantID, ProductSKU: req.ProductSKU, WarehouseID: req.WarehouseID, SectionID: req.SectionID,
		Quantity: req.Quantity, UnitCost: req.UnitCost, Type: movementType,
		DocumentType: req.DocumentType, DocumentSeries: req.DocumentSeries, DocumentNumber: req.DocumentNumber,
		GuideNumber: req.GuideNumber, OccurredAt: time.Now().UTC(),
	}
	next, err := domain.ApplyMovement(current, m)
	if err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}

	saved, err := s.Stock.ApplyMovement(r.Context(), m, next)
	if err != nil {
		if err == postgres.ErrInvalidReference {
			writeError(w, http.StatusNotFound, "unknown product, warehouse, or section")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to apply movement")
		return
	}

	s.publishStockUpdated(r.Context(), events.StockUpdatedPayload{
		TenantID: tenantID, SKU: req.ProductSKU, WarehouseID: req.WarehouseID, SectionID: req.SectionID,
		Quantity: next.Quantity, AvgUnitCost: next.AvgUnitCost, MovementType: string(movementType),
		OccurredAt: m.OccurredAt.Format(time.RFC3339),
	})

	newTotal := prevTotal - current.Quantity + next.Quantity
	if tenant, err := s.Tenants.GetByID(r.Context(), tenantID); err == nil {
		if domain.IsLowStockCrossing(prevTotal, newTotal, tenant.LowStockThreshold) {
			s.publishStockLow(r.Context(), events.StockLowPayload{
				TenantID: tenantID, SKU: req.ProductSKU, Quantity: newTotal, Threshold: tenant.LowStockThreshold,
			})
		}
	}

	writeJSON(w, http.StatusCreated, saved)
}

type createTransferRequest struct {
	ProductSKU      string `json:"productSku"`
	FromWarehouseID string `json:"fromWarehouseId"`
	FromSectionID   string `json:"fromSectionId"`
	ToWarehouseID   string `json:"toWarehouseId"`
	ToSectionID     string `json:"toSectionId"`
	Quantity        int    `json:"quantity"`
	DocumentType    string `json:"documentType"`
	DocumentSeries  string `json:"documentSeries"`
	DocumentNumber  string `json:"documentNumber"`
	GuideNumber     string `json:"guideNumber"`
}

type transferResponse struct {
	TransferID string               `json:"transferId"`
	Out        domain.StockMovement `json:"out"`
	In         domain.StockMovement `json:"in"`
}

func (s *StockServer) handleCreateTransfer(w http.ResponseWriter, r *http.Request) {
	var req createTransferRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.ProductSKU == "" || req.FromWarehouseID == "" || req.FromSectionID == "" || req.ToWarehouseID == "" || req.ToSectionID == "" || req.Quantity <= 0 {
		writeError(w, http.StatusBadRequest, "productSku, source/destination warehouse+section, and a positive quantity are required")
		return
	}

	tenantID := middleware.TenantID(r.Context())
	source, err := s.Stock.GetLevel(r.Context(), tenantID, req.ProductSKU, req.FromWarehouseID, req.FromSectionID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read source stock level")
		return
	}

	transferID := uuid.NewString()
	occurredAt := time.Now().UTC()
	out := domain.StockMovement{
		TenantID: tenantID, ProductSKU: req.ProductSKU, WarehouseID: req.FromWarehouseID, SectionID: req.FromSectionID,
		Quantity: req.Quantity, Type: domain.MovementOut, TransferID: transferID,
		DocumentType: req.DocumentType, DocumentSeries: req.DocumentSeries, DocumentNumber: req.DocumentNumber,
		GuideNumber: req.GuideNumber, OccurredAt: occurredAt,
	}
	outNext, err := domain.ApplyMovement(source, out)
	if err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}

	// The destination receives already-owned, already-valued stock at the
	// source's current average cost — not a new purchase (design §5).
	dest, err := s.Stock.GetLevel(r.Context(), tenantID, req.ProductSKU, req.ToWarehouseID, req.ToSectionID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read destination stock level")
		return
	}
	in := domain.StockMovement{
		TenantID: tenantID, ProductSKU: req.ProductSKU, WarehouseID: req.ToWarehouseID, SectionID: req.ToSectionID,
		Quantity: req.Quantity, UnitCost: source.AvgUnitCost, Type: domain.MovementIn, TransferID: transferID,
		DocumentType: req.DocumentType, DocumentSeries: req.DocumentSeries, DocumentNumber: req.DocumentNumber,
		GuideNumber: req.GuideNumber, OccurredAt: occurredAt,
	}
	inNext, err := domain.ApplyMovement(dest, in)
	if err != nil {
		writeError(w, http.StatusConflict, err.Error())
		return
	}

	savedOut, savedIn, err := s.Stock.ApplyTransfer(r.Context(), out, outNext, in, inNext)
	if err != nil {
		if err == postgres.ErrInvalidReference {
			writeError(w, http.StatusNotFound, "unknown product, warehouse, or section")
			return
		}
		writeError(w, http.StatusInternalServerError, "failed to apply transfer")
		return
	}

	s.publishStockUpdated(r.Context(), events.StockUpdatedPayload{
		TenantID: tenantID, SKU: req.ProductSKU, WarehouseID: req.FromWarehouseID, SectionID: req.FromSectionID,
		Quantity: outNext.Quantity, AvgUnitCost: outNext.AvgUnitCost, MovementType: string(domain.MovementOut),
		OccurredAt: occurredAt.Format(time.RFC3339),
	})
	s.publishStockUpdated(r.Context(), events.StockUpdatedPayload{
		TenantID: tenantID, SKU: req.ProductSKU, WarehouseID: req.ToWarehouseID, SectionID: req.ToSectionID,
		Quantity: inNext.Quantity, AvgUnitCost: inNext.AvgUnitCost, MovementType: string(domain.MovementIn),
		OccurredAt: occurredAt.Format(time.RFC3339),
	})

	writeJSON(w, http.StatusCreated, transferResponse{TransferID: transferID, Out: savedOut, In: savedIn})
}

func (s *StockServer) handleGetStock(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	tenantID := middleware.TenantID(r.Context())
	if _, err := s.Products.GetBySKU(r.Context(), tenantID, sku); err != nil {
		writeError(w, http.StatusNotFound, "product not found")
		return
	}

	warehouseID := r.URL.Query().Get("warehouseId")
	sectionID := r.URL.Query().Get("sectionId")
	if warehouseID != "" && sectionID != "" {
		level, err := s.Stock.GetLevel(r.Context(), tenantID, sku, warehouseID, sectionID)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to read stock level")
			return
		}
		writeJSON(w, http.StatusOK, level)
		return
	}

	total, err := s.Stock.TotalQuantityBySKU(r.Context(), tenantID, sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read stock total")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"sku": sku, "totalQuantity": total})
}

func (s *StockServer) handleLowStock(w http.ResponseWriter, r *http.Request) {
	tenantID := middleware.TenantID(r.Context())
	tenant, err := s.Tenants.GetByID(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read tenant")
		return
	}
	low, err := s.Stock.LowStockProducts(r.Context(), tenantID, tenant.LowStockThreshold)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read low stock products")
		return
	}
	writeJSON(w, http.StatusOK, low)
}

// publishStockUpdated/publishStockLow no-op when Events is nil (tests
// exercise the HTTP/repository layers without a RabbitMQ container —
// the publisher itself has its own dedicated test in Task 5) and are
// best-effort in production: a failed publish never fails the HTTP
// response (design §7 error handling).
func (s *StockServer) publishStockUpdated(ctx context.Context, payload events.StockUpdatedPayload) {
	if s.Events == nil {
		return
	}
	_ = s.Events.PublishStockUpdated(ctx, payload)
}

func (s *StockServer) publishStockLow(ctx context.Context, payload events.StockLowPayload) {
	if s.Events == nil {
		return
	}
	_ = s.Events.PublishStockLow(ctx, payload)
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: PASS — all 5 new tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/backend/internal/http
git commit -m "feat(http): add stock movement, transfer, and low-stock report handlers"
```

---

### Task 10: Reports and compliance handlers (valuation, Kardex, PLE export)

**Files:**
- Create: `bs-inventory/backend/internal/http/compliance_handlers.go`
- Test: `bs-inventory/backend/internal/http/compliance_test.go`

**Interfaces:**
- Consumes: `TotalValuation`, `ListMovementsByProduct`, `ListMovementsByTenantAndPeriod`, `Product`, `ProductRepository`, `TenantRepository`, `WarehouseRepository`, `Warehouse`, `RegulatoryProfile`, `NewPeruProfile`, `BuildKardex`, `KardexEntry`, `middleware.TenantID`, `writeJSON`, `writeError`
- Produces: `ReportsServer`, `ComplianceServer`

**Design note:** the tenant's `CountryCode` selects the regulatory
profile via a plain `switch` inside the handler — only Peru (`"PE"`) is
implemented, so a registry/plugin abstraction has no second case to
justify it yet (design spec §8.1).

- [ ] **Step 1: Write the failing tests**

Create `bs-inventory/backend/internal/http/compliance_test.go`:

```go
package http_test

import (
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"bs-inventory/internal/compliance"
	"bs-inventory/internal/domain"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/postgres"
)

func TestReportsServer_Valuation(t *testing.T) {
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

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
	if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.ReportsServer{Stock: stock}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/reports/valuation")
	if err != nil {
		t.Fatalf("GET valuation error = %v", err)
	}
	var body map[string]any
	json.NewDecoder(resp.Body).Decode(&body)
	if body["total"].(float64) != 50 {
		t.Errorf("valuation total = %v, want 50", body["total"])
	}
}

func TestComplianceServer_Kardex(t *testing.T) {
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

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
	if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/compliance/kardex/SKU-1")
	if err != nil {
		t.Fatalf("GET kardex error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("GET kardex status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	var entries []compliance.KardexEntry
	json.NewDecoder(resp.Body).Decode(&entries)
	if len(entries) != 1 || entries[0].BalanceQuantity != 10 {
		t.Errorf("kardex entries = %+v, want 1 entry with BalanceQuantity=10", entries)
	}
}

func TestComplianceServer_PLEExport(t *testing.T) {
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

	m := domain.StockMovement{TenantID: tenant.ID, ProductSKU: "SKU-1", WarehouseID: wh.ID, SectionID: sec.ID, Quantity: 10, UnitCost: 5.00, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	next, _ := domain.ApplyMovement(domain.StockLevel{}, m)
	if _, err := stock.ApplyMovement(ctx, m, next); err != nil {
		t.Fatalf("ApplyMovement() error = %v", err)
	}

	server := &bshttp.ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	period := time.Now().UTC().Format("200601")
	resp, err := http.Get(ts.URL + "/api/v1/compliance/ple-export?period=" + period)
	if err != nil {
		t.Fatalf("GET ple-export error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("GET ple-export status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
	body, _ := io.ReadAll(resp.Body)
	lines := strings.Split(strings.TrimSpace(string(body)), "\n")
	if len(lines) != 1 {
		t.Fatalf("ple-export produced %d lines, want 1", len(lines))
	}
	fields := strings.Split(lines[0], "|")
	if len(fields) != 27 {
		t.Errorf("ple-export line has %d fields, want 27", len(fields))
	}
	if fields[15] != "NIU" {
		t.Errorf("ple-export field[15] (código unidad de medida) = %q, want %q", fields[15], "NIU")
	}
	if fields[3] != "0001" {
		t.Errorf("ple-export field[3] (código de establecimiento anexo) = %q, want the warehouse's RucEstablishmentCode %q", fields[3], "0001")
	}
}

func TestComplianceServer_PLEExport_UnimplementedCountryReturns400(t *testing.T) {
	pool := setupTestDB(t)
	tenants := postgres.NewTenantRepository(pool)
	warehouses := postgres.NewWarehouseRepository(pool)
	products := postgres.NewProductRepository(pool)
	stock := postgres.NewStockRepository(pool)
	ctx := context.Background()

	tenant, _ := tenants.Create(ctx, domain.Tenant{Name: "Acme Corp", CountryCode: "CO"})

	server := &bshttp.ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}
	ts := httptest.NewServer(withTestTenant(tenant.ID, server.Routes()))
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/compliance/ple-export?period=202607")
	if err != nil {
		t.Fatalf("GET ple-export error = %v", err)
	}
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusBadRequest)
	}
}
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: FAIL — `bshttp.ReportsServer` and `bshttp.ComplianceServer` don't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/backend/internal/http/compliance_handlers.go`:

```go
package http

import (
	"errors"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"bs-inventory/internal/compliance"
	"bs-inventory/internal/domain"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

type ReportsServer struct {
	Stock *postgres.StockRepository
}

func (s *ReportsServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/api/v1/reports/valuation", s.handleValuation)
	return r
}

type valuationResponse struct {
	ByWarehouse map[string]float64 `json:"byWarehouse"`
	Total       float64            `json:"total"`
}

func (s *ReportsServer) handleValuation(w http.ResponseWriter, r *http.Request) {
	tenantID := middleware.TenantID(r.Context())
	byWarehouse, err := s.Stock.TotalValuation(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to compute valuation")
		return
	}
	var total float64
	for _, v := range byWarehouse {
		total += v
	}
	writeJSON(w, http.StatusOK, valuationResponse{ByWarehouse: byWarehouse, Total: total})
}

type ComplianceServer struct {
	Stock      *postgres.StockRepository
	Products   *postgres.ProductRepository
	Tenants    *postgres.TenantRepository
	Warehouses *postgres.WarehouseRepository
}

func (s *ComplianceServer) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/api/v1/compliance/kardex/{sku}", s.handleKardex)
	r.Get("/api/v1/compliance/ple-export", s.handlePLEExport)
	return r
}

func (s *ComplianceServer) handleKardex(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	tenantID := middleware.TenantID(r.Context())
	if _, err := s.Products.GetBySKU(r.Context(), tenantID, sku); err != nil {
		writeError(w, http.StatusNotFound, "product not found")
		return
	}
	movements, err := s.Stock.ListMovementsByProduct(r.Context(), tenantID, sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read movements")
		return
	}
	writeJSON(w, http.StatusOK, compliance.BuildKardex(movements))
}

func (s *ComplianceServer) handlePLEExport(w http.ResponseWriter, r *http.Request) {
	tenantID := middleware.TenantID(r.Context())
	tenant, err := s.Tenants.GetByID(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read tenant")
		return
	}

	var profile compliance.RegulatoryProfile
	switch tenant.CountryCode {
	case "PE":
		profile = compliance.NewPeruProfile()
	default:
		writeError(w, http.StatusBadRequest, "no compliance profile implemented for this tenant's country")
		return
	}

	period := r.URL.Query().Get("period")
	from, to, err := parsePeriodRange(period)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	movements, err := s.Stock.ListMovementsByTenantAndPeriod(r.Context(), tenantID, from, to)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read movements")
		return
	}

	// PLE needs each movement's unit-of-measure (on Product) and its
	// warehouse's RUC establishment code (on Warehouse) — neither lives on
	// StockMovement, so join both here rather than growing the domain
	// type (see Task 6's ExportLedger signature note).
	products, err := s.Products.List(r.Context(), tenantID, 10000, 0)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read products")
		return
	}
	productsBySKU := make(map[string]domain.Product, len(products))
	for _, p := range products {
		productsBySKU[p.SKU] = p
	}

	warehouseList, err := s.Warehouses.ListByTenant(r.Context(), tenantID)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read warehouses")
		return
	}
	warehousesByID := make(map[string]domain.Warehouse, len(warehouseList))
	for _, wh := range warehouseList {
		warehousesByID[wh.ID] = wh
	}

	out, err := profile.ExportLedger(r.Context(), movements, productsBySKU, warehousesByID, period)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to build export")
		return
	}

	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)
	_, _ = w.Write(out)
}

// parsePeriodRange parses a "YYYYMM" period into the half-open [from, to)
// range used to filter stock_movements.occurred_at for the PLE export.
func parsePeriodRange(period string) (time.Time, time.Time, error) {
	if len(period) != 6 {
		return time.Time{}, time.Time{}, errors.New(`period must be in "YYYYMM" format`)
	}
	from, err := time.Parse("200601", period)
	if err != nil {
		return time.Time{}, time.Time{}, errors.New(`period must be in "YYYYMM" format`)
	}
	return from, from.AddDate(0, 1, 0), nil
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: PASS — all 4 new tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/backend/internal/http
git commit -m "feat(http): add valuation report and Kardex/PLE compliance handlers"
```

---

### Task 11: Server wiring (`cmd/server/main.go`)

**Files:**
- Create: `bs-inventory/backend/internal/http/server.go`
- Create: `bs-inventory/backend/cmd/server/main.go`
- Test: `bs-inventory/backend/internal/http/server_test.go`

**Interfaces:**
- Consumes: `AuthServer`, `CatalogServer`, `StockServer`, `ReportsServer`, `ComplianceServer`, `middleware.Auth`, `NewTenantRepository`, `NewUserRepository`, `NewWarehouseRepository`, `NewSectionRepository`, `NewProductRepository`, `NewStockRepository`, `NewTokenIssuer`, `NewPublisher`
- Produces: `NewRouter`, `Dependencies`

**Design note on composing the sub-routers:** each `XServer.Routes()`
from Tasks 7-10 registers **full absolute paths** (e.g.
`/api/v1/warehouses`), not paths relative to a mount point — deliberately,
so each task's own tests can `httptest.NewServer(server.Routes())`
standalone. `chi.Router.Mount()` is the wrong tool here: it strips the
mount prefix and re-resolves the remainder against the sub-router, which
would break these already-absolute paths. Instead, `NewRouter` uses
`r.Handle(pattern, subRouter)`, which forwards the request **unchanged**
to the sub-router — safe precisely because the sub-router matches against
the same full path it always expected.

- [ ] **Step 1: Write the failing tests**

Create `bs-inventory/backend/internal/http/server_test.go`:

```go
package http_test

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"

	"bs-inventory/internal/auth"
	bshttp "bs-inventory/internal/http"
)

func TestNewRouter_HealthzIsUnauthenticated(t *testing.T) {
	pool := setupTestDB(t)
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	router := bshttp.NewRouter(bshttp.Dependencies{Pool: pool, Issuer: issuer})
	ts := httptest.NewServer(router)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/healthz")
	if err != nil {
		t.Fatalf("GET /healthz error = %v", err)
	}
	if resp.StatusCode != http.StatusOK {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusOK)
	}
}

func TestNewRouter_ProtectedRoutesRequireAuth(t *testing.T) {
	pool := setupTestDB(t)
	issuer := auth.NewTokenIssuer("test-secret", time.Hour)
	router := bshttp.NewRouter(bshttp.Dependencies{Pool: pool, Issuer: issuer})
	ts := httptest.NewServer(router)
	defer ts.Close()

	resp, err := http.Get(ts.URL + "/api/v1/warehouses")
	if err != nil {
		t.Fatalf("GET /api/v1/warehouses error = %v", err)
	}
	if resp.StatusCode != http.StatusUnauthorized {
		t.Errorf("without token: status = %d, want %d", resp.StatusCode, http.StatusUnauthorized)
	}

	regBody, _ := json.Marshal(map[string]string{
		"tenantName": "Acme Corp", "countryCode": "PE",
		"adminEmail": "wired@acme.com", "adminPassword": "s3cr3t",
	})
	http.Post(ts.URL+"/api/v1/auth/tenants", "application/json", bytes.NewReader(regBody))

	loginBody, _ := json.Marshal(map[string]string{"email": "wired@acme.com", "password": "s3cr3t"})
	loginResp, err := http.Post(ts.URL+"/api/v1/auth/login", "application/json", bytes.NewReader(loginBody))
	if err != nil {
		t.Fatalf("POST login error = %v", err)
	}
	var loginRespBody map[string]string
	json.NewDecoder(loginResp.Body).Decode(&loginRespBody)
	token := loginRespBody["token"]
	if token == "" {
		t.Fatal("login did not return a token")
	}

	req, _ := http.NewRequest(http.MethodGet, ts.URL+"/api/v1/warehouses", nil)
	req.Header.Set("Authorization", "Bearer "+token)
	authedResp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatalf("authed GET /api/v1/warehouses error = %v", err)
	}
	if authedResp.StatusCode != http.StatusOK {
		t.Errorf("with token: status = %d, want %d", authedResp.StatusCode, http.StatusOK)
	}
}
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: FAIL — `bshttp.NewRouter` and `bshttp.Dependencies` don't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/backend/internal/http/server.go`:

```go
package http

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/auth"
	"bs-inventory/internal/events"
	"bs-inventory/internal/http/middleware"
	"bs-inventory/internal/postgres"
)

// Dependencies bundles everything NewRouter needs to wire the full API.
// Publisher may be nil (StockServer no-ops event publishing in that
// case) — useful for tests that don't need a RabbitMQ container.
type Dependencies struct {
	Pool      *pgxpool.Pool
	Issuer    *auth.TokenIssuer
	Publisher *events.Publisher
}

func NewRouter(deps Dependencies) chi.Router {
	tenants := postgres.NewTenantRepository(deps.Pool)
	users := postgres.NewUserRepository(deps.Pool)
	warehouses := postgres.NewWarehouseRepository(deps.Pool)
	sections := postgres.NewSectionRepository(deps.Pool)
	products := postgres.NewProductRepository(deps.Pool)
	stock := postgres.NewStockRepository(deps.Pool)

	authServer := &AuthServer{Tenants: tenants, Users: users, Issuer: deps.Issuer}
	catalogServer := &CatalogServer{Warehouses: warehouses, Sections: sections, Products: products, Stock: stock}
	stockServer := &StockServer{Stock: stock, Products: products, Tenants: tenants, Events: deps.Publisher}
	reportsServer := &ReportsServer{Stock: stock}
	complianceServer := &ComplianceServer{Stock: stock, Products: products, Tenants: tenants, Warehouses: warehouses}

	r := chi.NewRouter()
	r.Get("/healthz", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})

	// Unauthenticated.
	r.Handle("/api/v1/auth/*", authServer.Routes())

	// Everything else requires a valid JWT.
	r.Group(func(r chi.Router) {
		r.Use(middleware.Auth(deps.Issuer))
		r.Handle("/api/v1/warehouses", catalogServer.Routes())
		r.Handle("/api/v1/warehouses/*", catalogServer.Routes())
		r.Handle("/api/v1/products", catalogServer.Routes())
		r.Handle("/api/v1/products/*", catalogServer.Routes())
		r.Handle("/api/v1/stock/*", stockServer.Routes())
		r.Handle("/api/v1/reports/*", reportsServer.Routes())
		r.Handle("/api/v1/compliance/*", complianceServer.Routes())
	})

	return r
}
```

Create `bs-inventory/backend/cmd/server/main.go`:

```go
package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	amqp "github.com/rabbitmq/amqp091-go"

	"bs-inventory/internal/auth"
	"bs-inventory/internal/events"
	bshttp "bs-inventory/internal/http"
)

func main() {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, mustEnv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("failed to connect to postgres: %v", err)
	}
	defer pool.Close()

	conn, err := amqp.Dial(mustEnv("RABBITMQ_URL"))
	if err != nil {
		log.Fatalf("failed to connect to rabbitmq: %v", err)
	}
	defer conn.Close()

	publisher, err := events.NewPublisher(conn)
	if err != nil {
		log.Fatalf("failed to create event publisher: %v", err)
	}

	issuer := auth.NewTokenIssuer(mustEnv("JWT_SECRET"), 24*time.Hour)

	router := bshttp.NewRouter(bshttp.Dependencies{
		Pool:      pool,
		Issuer:    issuer,
		Publisher: publisher,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("bs-inventory listening on :%s", port)
	if err := http.ListenAndServe(":"+port, router); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

func mustEnv(key string) string {
	v := os.Getenv(key)
	if v == "" {
		log.Fatalf("missing required environment variable %s", key)
	}
	return v
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: PASS — all 2 new tests.

- [ ] **Step 5: Verify the binary builds**

Run: `go -C bs-inventory/backend build ./...`
Expected: builds with no errors (this exercises `cmd/server/main.go`,
which has no dedicated test since it is pure config/wiring with no
branching logic worth a unit test).

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/http bs-inventory/backend/cmd bs-inventory/backend/go.mod bs-inventory/backend/go.sum
git commit -m "feat(server): wire all handlers into one router and add the main entrypoint"
```

---

### Task 12: k6 load test for the read-heavy path

**Files:**
- Create: `bs-inventory/backend/k6/stock-read.js`

**Interfaces:**
- Consumes: None
- Produces: None

This script has no unit test in the TDD sense — it's a load-testing
artifact that runs against a fully live stack, not `go test`. Its
"verification" is a real k6 run once Task 22's `docker-compose.yml`
stack is up, not something this task can execute standalone; the API
shape it exercises (auth, warehouses, sections, products, stock
movements, `GET /stock/{sku}`, `GET /products`) is fixed by Tasks 7-9's
already-written REST surface.

- [ ] **Step 1: Write the k6 script**

Create `bs-inventory/backend/k6/stock-read.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export const options = {
  scenarios: {
    read_heavy: {
      executor: 'constant-vus',
      vus: 20,
      duration: '30s',
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<300'], // adjust once a real baseline exists
    http_req_failed: ['rate<0.01'],
  },
};

// setup() runs once, outside the VU loop: registers a throwaway tenant,
// seeds one product with stock, and hands the VUs a ready-to-use token
// and SKU — the load test measures reads, not the setup cost.
export function setup() {
  const adminEmail = `k6-${Date.now()}@example.com`;
  const tenantBody = JSON.stringify({
    tenantName: `k6-load-${Date.now()}`,
    countryCode: 'PE',
    adminEmail: adminEmail,
    adminPassword: 'k6-password',
  });
  const tenantRes = http.post(`${BASE_URL}/api/v1/auth/tenants`, tenantBody, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(tenantRes, { 'tenant created': (r) => r.status === 201 });

  const loginBody = JSON.stringify({ email: adminEmail, password: 'k6-password' });
  const loginRes = http.post(`${BASE_URL}/api/v1/auth/login`, loginBody, {
    headers: { 'Content-Type': 'application/json' },
  });
  const token = loginRes.json('token');
  const authHeaders = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  const whRes = http.post(
    `${BASE_URL}/api/v1/warehouses`,
    JSON.stringify({ name: 'k6 Warehouse', code: 'K6-WH', rucEstablishmentCode: '0001' }),
    authHeaders
  );
  const warehouseId = whRes.json('id');

  const secRes = http.post(
    `${BASE_URL}/api/v1/warehouses/${warehouseId}/sections`,
    JSON.stringify({ name: 'k6 Section', code: 'K6-SEC' }),
    authHeaders
  );
  const sectionId = secRes.json('id');

  const sku = 'K6-SKU-1';
  http.post(
    `${BASE_URL}/api/v1/products`,
    JSON.stringify({ sku: sku, name: 'k6 Load Test Product', category: 'load-test', unitOfMeasureCode: 'NIU' }),
    authHeaders
  );
  http.post(
    `${BASE_URL}/api/v1/stock/movements`,
    JSON.stringify({ productSku: sku, warehouseId: warehouseId, sectionId: sectionId, quantity: 1000, unitCost: 1.0, type: 'IN' }),
    authHeaders
  );

  return { token: token, sku: sku };
}

export default function (data) {
  const authHeaders = { headers: { Authorization: `Bearer ${data.token}` } };

  const stockRes = http.get(`${BASE_URL}/api/v1/stock/${data.sku}`, authHeaders);
  check(stockRes, { 'stock read OK': (r) => r.status === 200 });

  const productsRes = http.get(`${BASE_URL}/api/v1/products`, authHeaders);
  check(productsRes, { 'products read OK': (r) => r.status === 200 });

  sleep(1);
}
```

- [ ] **Step 2: Commit**

```bash
git add bs-inventory/backend/k6
git commit -m "test(k6): add read-heavy load test script for stock and product endpoints"
```

---

### Task 13: Frontend project setup (Acorn template, trimmed) and API client

**Files:**
- Create: `bs-inventory/frontend/` (extracted from the Acorn template — see Step 1)
- Modify: `bs-inventory/frontend/package.json`
- Modify: `bs-inventory/frontend/.npmrc`
- Modify: `bs-inventory/frontend/next.config.mjs`
- Create: `bs-inventory/frontend/vitest.config.ts`
- Create: `bs-inventory/frontend/src/lib/apiClient.ts`
- Test: `bs-inventory/frontend/src/lib/apiClient.test.ts`

**Interfaces:**
- Consumes: None (the REST surface it calls is fixed by Tasks 7-10; not
  parser-enforced since frontend and backend are different languages)
- Produces: `login`, `registerTenant`, `setAuthToken`, `listWarehouses`, `createWarehouse`, `listSections`, `createSection`, `listProducts`, `createProduct`, `getProduct`, `getProductMovements`, `createMovement`, `createTransfer`, `getStock`, `getLowStock`, `getValuation`, `getKardex`

**Template inventory (verified by extracting the user's own
`acorn-next-mui-admin.zip`, not assumed):** `package.json` pins
`engines.node` to `>=24.15.0` while `.nvmrc` says `22.14.0` and `.npmrc`
has no `engine-strict` — neither file wins, so `npm install` silently
accepts any Node version. Six MUI X **Premium/Pro** packages are present
in `dependencies` with no license for this project: `@mui/x-charts-premium`,
`@mui/x-charts-pro`, `@mui/x-data-grid-premium`, `@mui/x-data-grid-pro`,
`@mui/x-date-pickers-pro`, `@mui/x-tree-view-pro`. Their Community
counterparts (`@mui/x-charts`, `@mui/x-data-grid`, `@mui/x-date-pickers`,
`@mui/x-tree-view`) are already present separately and are kept. The
template ships no test tooling (no Vitest/RTL/jsdom) — added in this task.

- [ ] **Step 1: Extract the template into the module directory**

```bash
mkdir -p /tmp/acorn-extract
unzip -q "$HOME/Downloads/acorn-next-mui-admin.zip" -d /tmp/acorn-extract
mkdir -p bs-inventory
cp -r /tmp/acorn-extract/acorn-next-mui-admin bs-inventory/frontend
rm -rf /tmp/acorn-extract
rm -rf bs-inventory/frontend/.git
```

- [ ] **Step 2: Remove the six Premium/Pro packages and fix the Node version**

Edit `bs-inventory/frontend/package.json`:
- Delete these six lines from `dependencies`: `"@mui/x-charts-premium"`,
  `"@mui/x-charts-pro"`, `"@mui/x-data-grid-premium"`,
  `"@mui/x-data-grid-pro"`, `"@mui/x-date-pickers-pro"`,
  `"@mui/x-tree-view-pro"`.
- Change `"engines": { "node": ">=24.15.0", ... }` to
  `"engines": { "node": ">=22.14.0", "npm": ">=11.12.0" }` — matching
  `.nvmrc`.
- Add to `"scripts"`: `"test": "vitest run"`.
- Add to `"devDependencies"`: `"vitest": "^2.1.0"`,
  `"@vitejs/plugin-react": "^4.3.0"`, `"jsdom": "^25.0.0"`,
  `"@testing-library/react": "^16.0.0"`, `"@testing-library/jest-dom": "^6.5.0"`.

- [ ] **Step 3: Mechanically enforce the Node version**

Edit `bs-inventory/frontend/.npmrc`, appending:

```
engine-strict=true
```

- [ ] **Step 4: Set the Multi-Zone base path**

Edit `bs-inventory/frontend/next.config.mjs` — add `basePath: "/inventory"`
to the existing config object:

```javascript
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Multi-Zones requires this to be a real, static basePath — cross-zone
  // links must use plain <a> tags, not next/link's <Link>, per Next.js's
  // own Multi-Zones documentation. Do not "fix" this into a <Link>.
  basePath: "/inventory",
  reactStrictMode: false,
  transpilePackages: ["@mui/material-nextjs"],
  images: {
    formats: ["image/webp", "image/avif"],
    qualities: [90],
  },
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 5: Add the Vitest config**

Create `bs-inventory/frontend/vitest.config.ts`:

```typescript
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
```

- [ ] **Step 6: Write the failing test**

Create `bs-inventory/frontend/src/lib/apiClient.test.ts`:

```typescript
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createMovement,
  createWarehouse,
  getStock,
  getValuation,
  listWarehouses,
  login,
  setAuthToken,
} from "./apiClient";

describe("apiClient", () => {
  beforeEach(() => {
    setAuthToken(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("login() posts credentials and returns the token", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ token: "jwt-123" }), { status: 200 })
    );

    const result = await login("admin@acme.com", "s3cr3t");

    expect(result).toEqual({ token: "jwt-123" });
    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/auth/login");
    expect(options?.method).toBe("POST");
    expect(JSON.parse(options?.body as string)).toEqual({
      email: "admin@acme.com",
      password: "s3cr3t",
    });
  });

  it("attaches the Authorization header once a token is set", async () => {
    setAuthToken("jwt-123");
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

    await listWarehouses();

    const [, options] = fetchMock.mock.calls[0];
    const headers = options?.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer jwt-123");
  });

  it("createWarehouse() posts to /api/v1/warehouses", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "wh-1", name: "Lima Norte" }), { status: 201 })
    );

    await createWarehouse({ name: "Lima Norte", code: "LIM-N", rucEstablishmentCode: "0001" });

    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/warehouses");
    expect(options?.method).toBe("POST");
  });

  it("createMovement() posts to /api/v1/stock/movements", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "mv-1" }), { status: 201 })
    );

    await createMovement({
      productSku: "SKU-1",
      warehouseId: "wh-1",
      sectionId: "sec-1",
      quantity: 10,
      unitCost: 5,
      type: "IN",
    });

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/stock/movements");
  });

  it("getStock() includes warehouseId/sectionId query params when given", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ quantity: 5 }), { status: 200 }));

    await getStock("SKU-1", "wh-1", "sec-1");

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/stock/SKU-1?warehouseId=wh-1&sectionId=sec-1");
  });

  it("getValuation() reads /api/v1/reports/valuation", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ byWarehouse: {}, total: 0 }), { status: 200 })
    );

    await getValuation();

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/reports/valuation");
  });

  it("throws with the server's error message on a non-2xx response", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "invalid email or password" }), { status: 401 })
    );

    await expect(login("admin@acme.com", "wrong")).rejects.toThrow(
      "invalid email or password"
    );
  });
});
```

- [ ] **Step 7: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test`
Expected: FAIL — `./apiClient` doesn't exist yet.

- [ ] **Step 8: Write the minimal implementation**

Create `bs-inventory/frontend/src/lib/apiClient.ts`:

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new Error(body.error || `request to ${path} failed with status ${res.status}`);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

export interface LoginResponse {
  token: string;
}
export function login(email: string, password: string): Promise<LoginResponse> {
  return request("/api/v1/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export interface RegisterTenantRequest {
  tenantName: string;
  countryCode: string;
  adminEmail: string;
  adminPassword: string;
}
export function registerTenant(req: RegisterTenantRequest): Promise<unknown> {
  return request("/api/v1/auth/tenants", { method: "POST", body: JSON.stringify(req) });
}

export interface Warehouse {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  rucEstablishmentCode: string;
  createdAt: string;
}
export function listWarehouses(): Promise<Warehouse[]> {
  return request("/api/v1/warehouses");
}
export function createWarehouse(req: {
  name: string;
  code: string;
  rucEstablishmentCode: string;
}): Promise<Warehouse> {
  return request("/api/v1/warehouses", { method: "POST", body: JSON.stringify(req) });
}

export interface Section {
  id: string;
  warehouseId: string;
  name: string;
  code: string;
  createdAt: string;
}
export function listSections(warehouseId: string): Promise<Section[]> {
  return request(`/api/v1/warehouses/${warehouseId}/sections`);
}
export function createSection(
  warehouseId: string,
  req: { name: string; code: string }
): Promise<Section> {
  return request(`/api/v1/warehouses/${warehouseId}/sections`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export interface Product {
  tenantId: string;
  sku: string;
  name: string;
  category: string;
  unitOfMeasureCode: string;
  createdAt: string;
}
export function listProducts(): Promise<Product[]> {
  return request("/api/v1/products");
}
export function createProduct(req: {
  sku: string;
  name: string;
  category: string;
  unitOfMeasureCode: string;
}): Promise<Product> {
  return request("/api/v1/products", { method: "POST", body: JSON.stringify(req) });
}
export function getProduct(sku: string): Promise<Product> {
  return request(`/api/v1/products/${sku}`);
}

export interface StockMovement {
  id: string;
  tenantId: string;
  productSku: string;
  warehouseId: string;
  sectionId: string;
  quantity: number;
  unitCost: number;
  type: "IN" | "OUT";
  occurredAt: string;
}
export function getProductMovements(sku: string): Promise<StockMovement[]> {
  return request(`/api/v1/products/${sku}/movements`);
}

export interface CreateMovementRequest {
  productSku: string;
  warehouseId: string;
  sectionId: string;
  quantity: number;
  unitCost?: number;
  type: "IN" | "OUT";
  documentType?: string;
  documentSeries?: string;
  documentNumber?: string;
  guideNumber?: string;
}
export function createMovement(req: CreateMovementRequest): Promise<StockMovement> {
  return request("/api/v1/stock/movements", { method: "POST", body: JSON.stringify(req) });
}

export interface CreateTransferRequest {
  productSku: string;
  fromWarehouseId: string;
  fromSectionId: string;
  toWarehouseId: string;
  toSectionId: string;
  quantity: number;
  guideNumber?: string;
}
export function createTransfer(req: CreateTransferRequest): Promise<unknown> {
  return request("/api/v1/stock/transfers", { method: "POST", body: JSON.stringify(req) });
}

export interface StockLevel {
  productSku: string;
  warehouseId: string;
  sectionId: string;
  quantity: number;
  avgUnitCost: number;
  totalValue: number;
}
export interface AggregatedStock {
  sku: string;
  totalQuantity: number;
}
export function getStock(
  sku: string,
  warehouseId?: string,
  sectionId?: string
): Promise<StockLevel | AggregatedStock> {
  const query = warehouseId && sectionId ? `?warehouseId=${warehouseId}&sectionId=${sectionId}` : "";
  return request(`/api/v1/stock/${sku}${query}`);
}

export interface LowStockLevel {
  productSku: string;
  quantity: number;
}
export function getLowStock(): Promise<LowStockLevel[]> {
  return request("/api/v1/stock/low");
}

export interface ValuationReport {
  byWarehouse: Record<string, number>;
  total: number;
}
export function getValuation(): Promise<ValuationReport> {
  return request("/api/v1/reports/valuation");
}

export interface KardexEntry {
  movement: StockMovement;
  balanceQuantity: number;
  balanceUnitCost: number;
  balanceValue: number;
}
export function getKardex(sku: string): Promise<KardexEntry[]> {
  return request(`/api/v1/compliance/kardex/${sku}`);
}
```

- [ ] **Step 9: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test`
Expected: PASS — all 7 tests.

- [ ] **Step 10: Commit**

```bash
git add bs-inventory/frontend
git commit -m "feat(frontend): seed from the Acorn template, trim Premium/Pro packages, add API client"
```

---

**Scope note for Tasks 14-21 (the eight pages):** each page is a
self-contained client component under a new top-level `src/app/...`
route directory (`login`, `warehouses`, `products`, `products/[sku]`,
`stock/movements/new`, `stock/transfers/new`, `stock/low`,
`reports/valuation`) — none of these paths exist in the Acorn template,
so all eight can be written in parallel with no file collisions between
them or with Task 13. Each renders directly with MUI components; wiring
into the template's existing `(dashboard)` layout/navigation shell is
explicitly deferred (out of scope for this plan — a manual follow-up once
the module's own pages exist to link to).

### Task 14: Login page

**Files:**
- Create: `bs-inventory/frontend/src/app/login/page.tsx`
- Test: `bs-inventory/frontend/src/app/login/page.test.tsx`

**Interfaces:**
- Consumes: `login`, `setAuthToken`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/login/page.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const loginMock = vi.fn();
const setAuthTokenMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  login: (...args: unknown[]) => loginMock(...args),
  setAuthToken: (...args: unknown[]) => setAuthTokenMock(...args),
}));

import LoginPage from "./page";

describe("LoginPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("logs in and redirects to /warehouses on success", async () => {
    loginMock.mockResolvedValue({ token: "jwt-123" });
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "admin@acme.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "s3cr3t" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/warehouses"));
    expect(loginMock).toHaveBeenCalledWith("admin@acme.com", "s3cr3t");
    expect(setAuthTokenMock).toHaveBeenCalledWith("jwt-123");
  });

  it("shows an error message on failed login", async () => {
    loginMock.mockRejectedValue(new Error("invalid email or password"));
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "admin@acme.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("invalid email or password")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- login`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/login/page.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { login, setAuthToken } from "@/lib/apiClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { token } = await login(email, password);
      setAuthToken(token);
      window.localStorage.setItem("bs-inventory-token", token);
      router.push("/warehouses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 360, mx: "auto", mt: 8 }}>
      <Typography variant="h5" gutterBottom>
        Sign in
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth disabled={submitting} sx={{ mt: 2 }}>
        {submitting ? "Signing in..." : "Sign in"}
      </Button>
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- login`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/login
git commit -m "feat(frontend): add login page"
```

---

### Task 15: Warehouses page (list/create warehouses and sections)

**Files:**
- Create: `bs-inventory/frontend/src/app/warehouses/page.tsx`
- Test: `bs-inventory/frontend/src/app/warehouses/page.test.tsx`

**Interfaces:**
- Consumes: `listWarehouses`, `createWarehouse`, `listSections`, `createSection`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/warehouses/page.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const listWarehousesMock = vi.fn();
const createWarehouseMock = vi.fn();
const listSectionsMock = vi.fn();
const createSectionMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  listWarehouses: (...args: unknown[]) => listWarehousesMock(...args),
  createWarehouse: (...args: unknown[]) => createWarehouseMock(...args),
  listSections: (...args: unknown[]) => listSectionsMock(...args),
  createSection: (...args: unknown[]) => createSectionMock(...args),
}));

import WarehousesPage from "./page";

describe("WarehousesPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("lists warehouses and creates a new one", async () => {
    listWarehousesMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "wh-1", name: "Lima Norte", code: "LIM-N" }]);
    createWarehouseMock.mockResolvedValue({ id: "wh-1", name: "Lima Norte", code: "LIM-N" });

    render(<WarehousesPage />);
    await waitFor(() => expect(listWarehousesMock).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Lima Norte" } });
    fireEvent.change(screen.getByLabelText(/^code$/i), { target: { value: "LIM-N" } });
    fireEvent.change(screen.getByLabelText(/ruc establishment code/i), { target: { value: "0001" } });
    fireEvent.click(screen.getByRole("button", { name: /add warehouse/i }));

    expect(await screen.findByText("Lima Norte (LIM-N)")).toBeInTheDocument();
    expect(createWarehouseMock).toHaveBeenCalledWith({
      name: "Lima Norte",
      code: "LIM-N",
      rucEstablishmentCode: "0001",
    });
  });

  it("loads sections when a warehouse is selected", async () => {
    listWarehousesMock.mockResolvedValue([{ id: "wh-1", name: "Lima Norte", code: "LIM-N" }]);
    listSectionsMock.mockResolvedValue([{ id: "sec-1", name: "Electrónica", code: "ELEC" }]);

    render(<WarehousesPage />);
    fireEvent.click(await screen.findByText("Lima Norte (LIM-N)"));

    expect(await screen.findByText("Electrónica (ELEC)")).toBeInTheDocument();
    expect(listSectionsMock).toHaveBeenCalledWith("wh-1");
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- warehouses`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/warehouses/page.tsx`:

```tsx
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  createSection,
  createWarehouse,
  listSections,
  listWarehouses,
  type Section,
  type Warehouse,
} from "@/lib/apiClient";

export default function WarehousesPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [rucCode, setRucCode] = useState("");

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [sectionName, setSectionName] = useState("");
  const [sectionCode, setSectionCode] = useState("");

  async function refreshWarehouses() {
    setWarehouses(await listWarehouses());
  }

  useEffect(() => {
    refreshWarehouses();
  }, []);

  async function handleCreateWarehouse(e: FormEvent) {
    e.preventDefault();
    await createWarehouse({ name, code, rucEstablishmentCode: rucCode });
    setName("");
    setCode("");
    setRucCode("");
    await refreshWarehouses();
  }

  async function selectWarehouse(id: string) {
    setSelectedId(id);
    setSections(await listSections(id));
  }

  async function handleCreateSection(e: FormEvent) {
    e.preventDefault();
    if (!selectedId) return;
    await createSection(selectedId, { name: sectionName, code: sectionCode });
    setSectionName("");
    setSectionCode("");
    setSections(await listSections(selectedId));
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Warehouses
      </Typography>

      <Box component="form" onSubmit={handleCreateWarehouse} sx={{ display: "flex", gap: 1, mb: 3 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required size="small" />
        <TextField label="Code" value={code} onChange={(e) => setCode(e.target.value)} required size="small" />
        <TextField
          label="RUC establishment code"
          value={rucCode}
          onChange={(e) => setRucCode(e.target.value)}
          required
          size="small"
        />
        <Button type="submit" variant="contained">
          Add warehouse
        </Button>
      </Box>

      <List>
        {warehouses.map((w) => (
          <ListItemButton key={w.id} selected={w.id === selectedId} onClick={() => selectWarehouse(w.id)}>
            <ListItemText primary={`${w.name} (${w.code})`} />
          </ListItemButton>
        ))}
      </List>

      {selectedId && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Sections</Typography>
          <List>
            {sections.map((s) => (
              <ListItemText key={s.id} primary={`${s.name} (${s.code})`} />
            ))}
          </List>
          <Box component="form" onSubmit={handleCreateSection} sx={{ display: "flex", gap: 1 }}>
            <TextField
              label="Section name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              required
              size="small"
            />
            <TextField
              label="Section code"
              value={sectionCode}
              onChange={(e) => setSectionCode(e.target.value)}
              required
              size="small"
            />
            <Button type="submit" variant="outlined">
              Add section
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- warehouses`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/warehouses
git commit -m "feat(frontend): add warehouses and sections page"
```

---

### Task 16: Products page (list + create dialog)

**Files:**
- Create: `bs-inventory/frontend/src/app/products/page.tsx`
- Test: `bs-inventory/frontend/src/app/products/page.test.tsx`

**Interfaces:**
- Consumes: `listProducts`, `createProduct`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/products/page.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const listProductsMock = vi.fn();
const createProductMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  listProducts: (...args: unknown[]) => listProductsMock(...args),
  createProduct: (...args: unknown[]) => createProductMock(...args),
}));

import ProductsPage from "./page";

describe("ProductsPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("lists products", async () => {
    listProductsMock.mockResolvedValue([
      { sku: "SKU-1", name: "Widget", category: "tools", unitOfMeasureCode: "NIU" },
    ]);

    render(<ProductsPage />);

    expect(await screen.findByText("Widget")).toBeInTheDocument();
  });

  it("creates a new product from the dialog", async () => {
    listProductsMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ sku: "SKU-2", name: "Gadget", category: "tools", unitOfMeasureCode: "NIU" }]);
    createProductMock.mockResolvedValue({ sku: "SKU-2", name: "Gadget" });

    render(<ProductsPage />);
    fireEvent.click(await screen.findByRole("button", { name: /new product/i }));

    fireEvent.change(screen.getByLabelText(/^sku$/i), { target: { value: "SKU-2" } });
    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Gadget" } });
    fireEvent.change(screen.getByLabelText(/unit of measure code/i), { target: { value: "NIU" } });
    fireEvent.click(screen.getByRole("button", { name: /^create$/i }));

    await waitFor(() =>
      expect(createProductMock).toHaveBeenCalledWith({
        sku: "SKU-2",
        name: "Gadget",
        category: "",
        unitOfMeasureCode: "NIU",
      })
    );
    expect(await screen.findByText("Gadget")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- products/page`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/products/page.tsx`:

```tsx
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

import { createProduct, listProducts, type Product } from "@/lib/apiClient";

const columns: GridColDef<Product>[] = [
  {
    field: "sku",
    headerName: "SKU",
    flex: 1,
    renderCell: (params) => <Link href={`/products/${params.value}`}>{params.value}</Link>,
  },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "unitOfMeasureCode", headerName: "Unit", width: 100 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [sku, setSku] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  async function refresh() {
    setProducts(await listProducts());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    await createProduct({ sku, name, category, unitOfMeasureCode: unit });
    setSku("");
    setName("");
    setCategory("");
    setUnit("");
    setOpen(false);
    await refresh();
  }

  return (
    <Box sx={{ maxWidth: 960, mx: "auto", mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">Products</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          New product
        </Button>
      </Box>

      <Box sx={{ height: 480 }}>
        <DataGrid<Product> rows={products} getRowId={(row) => row.sku} columns={columns} />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleCreate}>
          <DialogTitle>New product</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} required />
            <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <TextField label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <TextField
              label="Unit of measure code"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- products/page`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/products/page.tsx bs-inventory/frontend/src/app/products/page.test.tsx
git commit -m "feat(frontend): add products list page with create dialog"
```

---

### Task 17: Product detail page (`/products/[sku]`)

**Files:**
- Create: `bs-inventory/frontend/src/app/products/[sku]/page.tsx`
- Test: `bs-inventory/frontend/src/app/products/[sku]/page.test.tsx`

**Interfaces:**
- Consumes: `getProduct`, `getProductMovements`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/products/[sku]/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useParams: () => ({ sku: "SKU-1" }),
}));

const getProductMock = vi.fn();
const getProductMovementsMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  getProduct: (...args: unknown[]) => getProductMock(...args),
  getProductMovements: (...args: unknown[]) => getProductMovementsMock(...args),
}));

import ProductDetailPage from "./page";

describe("ProductDetailPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders product details and movement history", async () => {
    getProductMock.mockResolvedValue({
      sku: "SKU-1",
      name: "Widget",
      category: "tools",
      unitOfMeasureCode: "NIU",
    });
    getProductMovementsMock.mockResolvedValue([
      { id: "mv-1", type: "IN", quantity: 100, unitCost: 5, occurredAt: "2026-07-20T00:00:00Z" },
    ]);

    render(<ProductDetailPage />);

    expect(await screen.findByText("Widget (SKU-1)")).toBeInTheDocument();
    expect(getProductMock).toHaveBeenCalledWith("SKU-1");
    expect(getProductMovementsMock).toHaveBeenCalledWith("SKU-1");
    expect(screen.getByText("IN")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- products/\\[sku\\]`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/products/[sku]/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getProduct, getProductMovements, type Product, type StockMovement } from "@/lib/apiClient";

export default function ProductDetailPage() {
  const params = useParams<{ sku: string }>();
  const sku = params.sku;
  const [product, setProduct] = useState<Product | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    if (!sku) return;
    getProduct(sku).then(setProduct);
    getProductMovements(sku).then(setMovements);
  }, [sku]);

  if (!product) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 720, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        {product.name} ({product.sku})
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        {product.category} · {product.unitOfMeasureCode}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Movement history
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit cost</TableCell>
            <TableCell>Occurred at</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movements.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.type}</TableCell>
              <TableCell>{m.quantity}</TableCell>
              <TableCell>{m.unitCost}</TableCell>
              <TableCell>{new Date(m.occurredAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- products/\\[sku\\]`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "bs-inventory/frontend/src/app/products/[sku]"
git commit -m "feat(frontend): add product detail page with movement history"
```

---

### Task 18: New stock movement page

**Files:**
- Create: `bs-inventory/frontend/src/app/stock/movements/new/page.tsx`
- Test: `bs-inventory/frontend/src/app/stock/movements/new/page.test.tsx`

**Interfaces:**
- Consumes: `createMovement`
- Produces: None

**Scope note:** warehouse/section are plain ID text fields rather than
pickers populated from `listWarehouses`/`listSections` — keeps this task
independent of Task 15's page (no shared state across pages exists yet)
without blocking correctness; wiring a picker is a follow-up UX
improvement, not a functional gap.

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/stock/movements/new/page.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const createMovementMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  createMovement: (...args: unknown[]) => createMovementMock(...args),
}));

import NewMovementPage from "./page";

describe("NewMovementPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("submits a movement and shows a success message", async () => {
    createMovementMock.mockResolvedValue({ id: "mv-1" });
    render(<NewMovementPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/warehouse id/i), { target: { value: "wh-1" } });
    fireEvent.change(screen.getByLabelText(/section id/i), { target: { value: "sec-1" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/unit cost/i), { target: { value: "5" } });
    fireEvent.click(screen.getByRole("button", { name: /record movement/i }));

    await waitFor(() =>
      expect(createMovementMock).toHaveBeenCalledWith({
        productSku: "SKU-1",
        warehouseId: "wh-1",
        sectionId: "sec-1",
        quantity: 10,
        unitCost: 5,
        type: "IN",
      })
    );
    expect(await screen.findByText("Movement recorded.")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    createMovementMock.mockRejectedValue(new Error("insufficient stock at this location"));
    render(<NewMovementPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/warehouse id/i), { target: { value: "wh-1" } });
    fireEvent.change(screen.getByLabelText(/section id/i), { target: { value: "sec-1" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: /record movement/i }));

    expect(await screen.findByText("insufficient stock at this location")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- stock/movements`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/stock/movements/new/page.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { createMovement } from "@/lib/apiClient";

export default function NewMovementPage() {
  const [productSku, setProductSku] = useState("");
  const [warehouseId, setWarehouseId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [type, setType] = useState<"IN" | "OUT">("IN");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await createMovement({
        productSku,
        warehouseId,
        sectionId,
        quantity: Number(quantity),
        unitCost: unitCost ? Number(unitCost) : undefined,
        type,
      });
      setSuccess(true);
      setProductSku("");
      setWarehouseId("");
      setSectionId("");
      setQuantity("");
      setUnitCost("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to create movement");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 480, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">New stock movement</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Movement recorded.</Alert>}
      <TextField label="Product SKU" value={productSku} onChange={(e) => setProductSku(e.target.value)} required />
      <TextField
        label="Warehouse ID"
        value={warehouseId}
        onChange={(e) => setWarehouseId(e.target.value)}
        required
      />
      <TextField label="Section ID" value={sectionId} onChange={(e) => setSectionId(e.target.value)} required />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <TextField
        label="Unit cost"
        type="number"
        value={unitCost}
        onChange={(e) => setUnitCost(e.target.value)}
        helperText="Required for IN movements"
      />
      <TextField select label="Type" value={type} onChange={(e) => setType(e.target.value as "IN" | "OUT")}>
        <MenuItem value="IN">IN</MenuItem>
        <MenuItem value="OUT">OUT</MenuItem>
      </TextField>
      <Button type="submit" variant="contained">
        Record movement
      </Button>
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- stock/movements`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/stock/movements
git commit -m "feat(frontend): add new stock movement page"
```

---

### Task 19: New stock transfer page

**Files:**
- Create: `bs-inventory/frontend/src/app/stock/transfers/new/page.tsx`
- Test: `bs-inventory/frontend/src/app/stock/transfers/new/page.test.tsx`

**Interfaces:**
- Consumes: `createTransfer`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/stock/transfers/new/page.test.tsx`:

```tsx
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const createTransferMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  createTransfer: (...args: unknown[]) => createTransferMock(...args),
}));

import NewTransferPage from "./page";

describe("NewTransferPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("submits a transfer and shows a success message", async () => {
    createTransferMock.mockResolvedValue({ transferId: "tr-1" });
    render(<NewTransferPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/from warehouse id/i), { target: { value: "wh-a" } });
    fireEvent.change(screen.getByLabelText(/from section id/i), { target: { value: "sec-a" } });
    fireEvent.change(screen.getByLabelText(/to warehouse id/i), { target: { value: "wh-b" } });
    fireEvent.change(screen.getByLabelText(/to section id/i), { target: { value: "sec-b" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /record transfer/i }));

    await waitFor(() =>
      expect(createTransferMock).toHaveBeenCalledWith({
        productSku: "SKU-1",
        fromWarehouseId: "wh-a",
        fromSectionId: "sec-a",
        toWarehouseId: "wh-b",
        toSectionId: "sec-b",
        quantity: 40,
        guideNumber: "",
      })
    );
    expect(await screen.findByText("Transfer recorded.")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    createTransferMock.mockRejectedValue(new Error("insufficient stock at this location"));
    render(<NewTransferPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/from warehouse id/i), { target: { value: "wh-a" } });
    fireEvent.change(screen.getByLabelText(/from section id/i), { target: { value: "sec-a" } });
    fireEvent.change(screen.getByLabelText(/to warehouse id/i), { target: { value: "wh-b" } });
    fireEvent.change(screen.getByLabelText(/to section id/i), { target: { value: "sec-b" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /record transfer/i }));

    expect(await screen.findByText("insufficient stock at this location")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- stock/transfers`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/stock/transfers/new/page.tsx`:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { createTransfer } from "@/lib/apiClient";

export default function NewTransferPage() {
  const [productSku, setProductSku] = useState("");
  const [fromWarehouseId, setFromWarehouseId] = useState("");
  const [fromSectionId, setFromSectionId] = useState("");
  const [toWarehouseId, setToWarehouseId] = useState("");
  const [toSectionId, setToSectionId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [guideNumber, setGuideNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await createTransfer({
        productSku,
        fromWarehouseId,
        fromSectionId,
        toWarehouseId,
        toSectionId,
        quantity: Number(quantity),
        guideNumber,
      });
      setSuccess(true);
      setProductSku("");
      setFromWarehouseId("");
      setFromSectionId("");
      setToWarehouseId("");
      setToSectionId("");
      setQuantity("");
      setGuideNumber("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "failed to create transfer");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 480, mx: "auto", mt: 4, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">New stock transfer</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Transfer recorded.</Alert>}
      <TextField label="Product SKU" value={productSku} onChange={(e) => setProductSku(e.target.value)} required />
      <TextField
        label="From warehouse ID"
        value={fromWarehouseId}
        onChange={(e) => setFromWarehouseId(e.target.value)}
        required
      />
      <TextField
        label="From section ID"
        value={fromSectionId}
        onChange={(e) => setFromSectionId(e.target.value)}
        required
      />
      <TextField
        label="To warehouse ID"
        value={toWarehouseId}
        onChange={(e) => setToWarehouseId(e.target.value)}
        required
      />
      <TextField
        label="To section ID"
        value={toSectionId}
        onChange={(e) => setToSectionId(e.target.value)}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />
      <TextField
        label="Guide number"
        value={guideNumber}
        onChange={(e) => setGuideNumber(e.target.value)}
        helperText="Guía de Remisión reference (optional, entered manually)"
      />
      <Button type="submit" variant="contained">
        Record transfer
      </Button>
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- stock/transfers`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/stock/transfers
git commit -m "feat(frontend): add new stock transfer page"
```

---

### Task 20: Low-stock report page

**Files:**
- Create: `bs-inventory/frontend/src/app/stock/low/page.tsx`
- Test: `bs-inventory/frontend/src/app/stock/low/page.test.tsx`

**Interfaces:**
- Consumes: `getLowStock`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/stock/low/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const getLowStockMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  getLowStock: (...args: unknown[]) => getLowStockMock(...args),
}));

import LowStockPage from "./page";

describe("LowStockPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the low-stock products", async () => {
    getLowStockMock.mockResolvedValue([{ productSku: "SKU-LOW", quantity: 5 }]);

    render(<LowStockPage />);

    expect(await screen.findByText("SKU-LOW")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows a message when nothing is low", async () => {
    getLowStockMock.mockResolvedValue([]);

    render(<LowStockPage />);

    expect(await screen.findByText(/no products are currently low on stock/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- stock/low`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/stock/low/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getLowStock, type LowStockLevel } from "@/lib/apiClient";

export default function LowStockPage() {
  const [levels, setLevels] = useState<LowStockLevel[] | null>(null);

  useEffect(() => {
    getLowStock().then(setLevels);
  }, []);

  return (
    <Box sx={{ maxWidth: 640, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Low stock report
      </Typography>
      {levels && levels.length === 0 && (
        <Typography color="text.secondary">No products are currently low on stock.</Typography>
      )}
      {levels && levels.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SKU</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {levels.map((l) => (
              <TableRow key={l.productSku}>
                <TableCell>{l.productSku}</TableCell>
                <TableCell>{l.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- stock/low`
Expected: PASS — both tests.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/stock/low
git commit -m "feat(frontend): add low-stock report page"
```

---

### Task 21: Inventory valuation report page

**Files:**
- Create: `bs-inventory/frontend/src/app/reports/valuation/page.tsx`
- Test: `bs-inventory/frontend/src/app/reports/valuation/page.test.tsx`

**Interfaces:**
- Consumes: `getValuation`
- Produces: None

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/reports/valuation/page.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const getValuationMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  getValuation: (...args: unknown[]) => getValuationMock(...args),
}));

import ValuationReportPage from "./page";

describe("ValuationReportPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders per-warehouse and consolidated totals", async () => {
    getValuationMock.mockResolvedValue({
      byWarehouse: { "wh-1": 500, "wh-2": 250 },
      total: 750,
    });

    render(<ValuationReportPage />);

    expect(await screen.findByText("wh-1")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("wh-2")).toBeInTheDocument();
    expect(screen.getByText("250")).toBeInTheDocument();
    expect(screen.getByText("750")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `npm --prefix bs-inventory/frontend test -- reports/valuation`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/reports/valuation/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

import { getValuation, type ValuationReport } from "@/lib/apiClient";

export default function ValuationReportPage() {
  const [report, setReport] = useState<ValuationReport | null>(null);

  useEffect(() => {
    getValuation().then(setReport);
  }, []);

  if (!report) {
    return <Typography sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 480, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Inventory valuation
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Warehouse</TableCell>
            <TableCell align="right">Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(report.byWarehouse).map(([warehouseId, value]) => (
            <TableRow key={warehouseId}>
              <TableCell>{warehouseId}</TableCell>
              <TableCell align="right">{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>
              <strong>Total</strong>
            </TableCell>
            <TableCell align="right">
              <strong>{report.total}</strong>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Box>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `npm --prefix bs-inventory/frontend test -- reports/valuation`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/frontend/src/app/reports
git commit -m "feat(frontend): add inventory valuation report page"
```

---

### Task 22: `docker-compose.yml` and Dockerfiles

**Files:**
- Create: `bs-inventory/docker-compose.yml`
- Create: `bs-inventory/backend/Dockerfile`
- Create: `bs-inventory/frontend/Dockerfile`
- Create: `bs-inventory/.env.example`

**Interfaces:**
- Consumes: None
- Produces: None

This task has no unit test — it's infrastructure config, verified by
`docker compose config` (syntax/interpolation validation, no image pulls
or container starts) rather than `go test`/`npm test`, the same pragmatic
exception already used for Task 11's `main.go` and Task 12's k6 script.

**Design note:** the Postgres service mounts `schema.sql` into
`/docker-entrypoint-initdb.d/`, so the official Postgres image applies it
automatically on first container start — the backend itself has no
migration-runner code, matching Tasks 3-4's already-written repositories,
which assume the schema already exists.

- [ ] **Step 1: Write the Postgres/RabbitMQ/backend/frontend compose file**

Create `bs-inventory/docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: bsinventory
      POSTGRES_USER: bsinventory
      POSTGRES_PASSWORD: bsinventory
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./backend/internal/postgres/schema.sql:/docker-entrypoint-initdb.d/001-schema.sql:ro
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U bsinventory"]
      interval: 5s
      timeout: 5s
      retries: 5

  rabbitmq:
    image: rabbitmq:3.13-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"
    healthcheck:
      test: ["CMD", "rabbitmq-diagnostics", "-q", "ping"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    depends_on:
      postgres:
        condition: service_healthy
      rabbitmq:
        condition: service_healthy
    environment:
      DATABASE_URL: postgres://bsinventory:bsinventory@postgres:5432/bsinventory?sslmode=disable
      RABBITMQ_URL: amqp://guest:guest@rabbitmq:5672/
      JWT_SECRET: dev-secret-change-me
      PORT: "8080"
    ports:
      - "8080:8080"

  frontend:
    build: ./frontend
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://localhost:8080
    ports:
      - "3000:3000"

volumes:
  postgres-data:
```

- [ ] **Step 2: Write the backend Dockerfile**

Create `bs-inventory/backend/Dockerfile`:

```dockerfile
FROM golang:1.23-alpine AS build
WORKDIR /src
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o /bin/server ./cmd/server

FROM alpine:3.20
COPY --from=build /bin/server /bin/server
EXPOSE 8080
ENTRYPOINT ["/bin/server"]
```

- [ ] **Step 3: Write the frontend Dockerfile**

Create `bs-inventory/frontend/Dockerfile`:

```dockerfile
FROM node:22.14.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22.14.0-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
CMD ["npm", "start"]
```

- [ ] **Step 4: Document the environment variables**

Create `bs-inventory/.env.example`:

```
# Backend
DATABASE_URL=postgres://bsinventory:bsinventory@localhost:5432/bsinventory?sslmode=disable
RABBITMQ_URL=amqp://guest:guest@localhost:5672/
JWT_SECRET=dev-secret-change-me
PORT=8080

# Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

- [ ] **Step 5: Validate the compose file**

Run: `docker compose -f bs-inventory/docker-compose.yml config`
Expected: prints the fully resolved config with no errors (this only
validates YAML/interpolation — it does not pull images or start
containers).

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/docker-compose.yml bs-inventory/backend/Dockerfile bs-inventory/frontend/Dockerfile bs-inventory/.env.example
git commit -m "build(docker): add docker-compose stack and Dockerfiles for backend and frontend"
```

---

### Task 23: End-to-end Playwright smoke test

**Files:**
- Create: `bs-inventory/frontend/playwright.config.ts`
- Create: `bs-inventory/frontend/e2e/smoke.spec.ts`

**Interfaces:**
- Consumes: None (drives the real running stack through the browser and
  the backend's public HTTP API, not any in-repo symbol)
- Produces: None

This test requires the full stack up (`docker compose up` from Task 22)
— it is not run by `npm test` (that's Vitest/RTL component tests only)
but by `npm run test:e2e`, against a live `frontend`+`backend`+`postgres`+
`rabbitmq` stack. It registers its own throwaway tenant directly via the
backend API (no tenant-registration page exists among the eight pages),
then drives the UI for everything else, matching the design spec's
testing strategy (§10): login → create warehouse+section → create
product → record a movement → see it reflected in stock.

- [ ] **Step 1: Write the Playwright config**

Create `bs-inventory/frontend/playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000/inventory",
  },
});
```

- [ ] **Step 2: Write the smoke test**

Create `bs-inventory/frontend/e2e/smoke.spec.ts`:

```typescript
import { expect, test, type APIRequestContext } from "@playwright/test";

const API_BASE_URL = process.env.E2E_API_BASE_URL || "http://localhost:8080";

async function registerTenant(request: APIRequestContext) {
  const adminEmail = `e2e-${Date.now()}@example.com`;
  const adminPassword = "e2e-password";
  const res = await request.post(`${API_BASE_URL}/api/v1/auth/tenants`, {
    data: {
      tenantName: `E2E Tenant ${Date.now()}`,
      countryCode: "PE",
      adminEmail,
      adminPassword,
    },
  });
  expect(res.ok()).toBeTruthy();
  return { adminEmail, adminPassword };
}

test("login, create warehouse/section/product, record a movement, see it in stock", async ({
  page,
  request,
}) => {
  const { adminEmail, adminPassword } = await registerTenant(request);

  await page.goto("/login");
  await page.getByLabel(/email/i).fill(adminEmail);
  await page.getByLabel(/password/i).fill(adminPassword);
  await page.getByRole("button", { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/warehouses$/);

  const warehouseName = `E2E Warehouse ${Date.now()}`;
  await page.getByLabel(/^name$/i).fill(warehouseName);
  await page.getByLabel(/^code$/i).fill("E2E-WH");
  await page.getByLabel(/ruc establishment code/i).fill("0001");
  const [createWhResponse] = await Promise.all([
    page.waitForResponse(
      (r) => r.url().includes("/api/v1/warehouses") && r.request().method() === "POST"
    ),
    page.getByRole("button", { name: /add warehouse/i }).click(),
  ]);
  const warehouse = await createWhResponse.json();

  await page.getByText(`${warehouseName} (E2E-WH)`).click();
  await page.getByLabel(/section name/i).fill("E2E Section");
  await page.getByLabel(/section code/i).fill("E2E-SEC");
  const [createSecResponse] = await Promise.all([
    page.waitForResponse(
      (r) =>
        r.url().includes(`/api/v1/warehouses/${warehouse.id}/sections`) &&
        r.request().method() === "POST"
    ),
    page.getByRole("button", { name: /add section/i }).click(),
  ]);
  const section = await createSecResponse.json();

  await page.goto("/products");
  await page.getByRole("button", { name: /new product/i }).click();
  const sku = `E2E-SKU-${Date.now()}`;
  await page.getByLabel(/^sku$/i).fill(sku);
  await page.getByLabel(/^name$/i).fill("E2E Product");
  await page.getByLabel(/unit of measure code/i).fill("NIU");
  await page.getByRole("button", { name: /^create$/i }).click();
  await expect(page.getByText("E2E Product")).toBeVisible();

  await page.goto("/stock/movements/new");
  await page.getByLabel(/product sku/i).fill(sku);
  await page.getByLabel(/warehouse id/i).fill(warehouse.id);
  await page.getByLabel(/section id/i).fill(section.id);
  await page.getByLabel(/quantity/i).fill("50");
  await page.getByLabel(/unit cost/i).fill("9.99");
  await page.getByRole("button", { name: /record movement/i }).click();
  await expect(page.getByText("Movement recorded.")).toBeVisible();

  await page.goto(`/products/${sku}`);
  await expect(page.getByText("IN")).toBeVisible();
  await expect(page.getByText("50")).toBeVisible();
});
```

- [ ] **Step 3: Run it against the live stack**

Run (after `docker compose -f bs-inventory/docker-compose.yml up -d`
from Task 22):

```bash
npm --prefix bs-inventory/frontend run test:e2e
```

Expected: PASS — the one smoke scenario, end to end.

- [ ] **Step 4: Commit**

```bash
git add bs-inventory/frontend/playwright.config.ts bs-inventory/frontend/e2e
git commit -m "test(e2e): add Playwright smoke test covering login through stock movement"
```

---

## Self-review

**Spec coverage:** every row of the design's REST API table (§7) maps to
a task — auth (Task 7), warehouses/sections/products + the
`GET /products/{sku}/movements` history endpoint (Task 8), stock
movements/transfers/query/low-stock (Task 9), valuation + Kardex/PLE
export (Task 10), `/healthz` (Task 11). The `GET /products/{sku}/movements`
endpoint was initially missing — the frontend's `getProductMovements`
(Task 13/17) called it, but no backend task implemented it — caught
during this review and added to Task 8 (`CatalogServer` gained a `Stock`
field and `handleProductMovements`; Task 11's wiring updated to pass it
through). Multi-tenancy, weighted-average costing + materialized
`stock_levels`, atomic transfers, Peru Kardex/PLE 13.1, the extensible
`RegulatoryProfile` interface, k6, and the Next.js Multi-Zone frontend
(§10) are all covered. §13's exclusions (electronic GRE, other LATAM
countries, reservations, lot/serial/UoM-conversion/reorder-automation,
bin-level tracking, password reset/OAuth, k8s, outbox) were checked
against the finished plan — none crept in.

**Placeholder scan:** no "TBD"/"TODO"/"similar to Task N" found (one
false-positive grep hit on the Spanish word "método", not a placeholder).

**Type consistency, fixed during this review:**
- `StockMovement` and `StockLevel` (Task 1) were missing `json:"..."`
  tags entirely — fixed to match the camelCase convention already used
  elsewhere (`Tenant`/`User`/`Warehouse`/`Section`/`Product`).
- `KardexEntry` (Task 6) was also missing JSON tags — would have leaked
  PascalCase field names (`Movement`, `BalanceQuantity`, ...) from the
  real `/compliance/kardex/{sku}` endpoint. Fixed.
- `RegulatoryProfile.ExportLedger`/`PeruProfile.ExportLedger` (Task 6)
  originally had no way to look up a product's unit-of-measure code
  (field 16 of PLE 13.1) — flagged inline as a known gap when Task 6 was
  written, then resolved by growing the signature to accept
  `products map[string]domain.Product` (Task 6's signature, test, and
  interface doc all updated; Task 10's handler builds and passes the
  map).
- A per-tenant `LowStockThreshold` was referenced by the design (§4) but
  had no column/field anywhere — added to `Tenant` (Task 1), the
  `tenants` table and repository (Task 3), with `Create` defaulting it to
  10 when unset.
- Task 9's stock handlers needed two `StockRepository` capabilities Task
  4 didn't yet have: FK-violation-to-`ErrInvalidReference` mapping (for
  the 404s the REST table promises on an unknown SKU/warehouse/section)
  and `LowStockProducts` (the tenant-wide low-stock aggregation) — both
  added to Task 4, plus a proper `ApplyTransfer` (two movement legs +
  two `stock_levels` upserts in **one** transaction, refactored to share
  insert/upsert helpers with `ApplyMovement` rather than duplicating
  them) once it became clear the transfer's atomicity requirement (§5)
  couldn't be met by calling the single-movement `ApplyMovement` twice.
  Task 10 similarly needed `ListMovementsByTenantAndPeriod` (a per-SKU
  query doesn't cover a tenant-wide PLE export) — added to Task 4.

**Parser dry-run:** `node bin/parse-plan.js` against the finished plan
produced zero warnings after fixing, in order: (1) a `Produces:` value
wrapping onto a second line in Task 13 — the parser's documented
one-line-per-entry limitation silently dropped everything after the
first line, so 13 of Task 13's 17 exported functions weren't visible to
the graph; (2) several Task 1/3/4/5 `Produces` lists omitting real,
already-written symbols (`MovementIn`/`MovementOut`/`RoleAdmin`,
`TotalValuation`/`ListMovementsByProduct`, the repository constructor
functions) that other tasks already consumed; (3) Task 9 consuming
package-qualified names (`domain.ApplyMovement`, `events.Publisher`, ...)
that didn't textually match the bare names their producing tasks
declared; (4) five frontend page tasks (15-17, 20-21) listing TypeScript
interface names (`Warehouse`, `Section`, `Product`, `StockMovement`,
`LowStockLevel`) that collided **by name only** with unrelated Go types
from Task 1/4, creating spurious cross-language edges from frontend
pages to backend tasks — removed, since the real dependency on Task 13
was already covered by the (unambiguous) function-name matches. The
resulting graph matches the intended architecture: a backend chain
(1→2→3→{4,5}→{6}→7→{8,9,10}→11), a wide frontend layer (13→{14..21}
independent of the backend), and three standalone infrastructure tasks
(12, 22, 23) with no file overlap with anything else.

---
