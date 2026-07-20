# bs-inventory Implementation Plan

> **For agentic workers:** execute this plan with the
> parallel-plan-executor Workflow (cys:run / the /cys:run-plan command).
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** build `bs-inventory` — a Go REST + events backend and a Next.js
admin frontend, the first independently-integrable module of BacSystem —
per the approved design at `docs/cys/specs/2026-07-20-bs-inventory-design.md`.

**Architecture:** two independent branches that join at the end — a Go
backend (domain → {postgres repo, RabbitMQ publisher} → HTTP handlers →
server wiring) and a Next.js frontend (trim template + API client → four
independent pages) — merging into a docker-compose stack and an
end-to-end smoke test.

**Tech Stack:** Go 1.23, PostgreSQL 16, RabbitMQ 3.13, Next.js 16 (App
Router), React 19, MUI 9 (Community edition only), TypeScript, Vitest +
React Testing Library, Playwright.

## Global Constraints

- Go >= 1.23. Node >= 22.14.0 (the frontend template's own `.nvmrc`;
  its `package.json` `engines.node` field disagreed — `>=24.15.0` — and
  neither was actually enforced since `.npmrc` had no `engine-strict`;
  Task 6 reconciles both to 22.14.0 and turns on `engine-strict=true`
  so a mismatched Node version fails `npm install` instead of silently
  proceeding).
- Docker required for all backend integration tests (Postgres, RabbitMQ
  via `testcontainers-go`) and the end-to-end smoke test — confirmed
  available and running on the dev machine before this plan was written;
  no mocked database or broker anywhere in this plan, per the lesson
  from the persons-crud pilot where a mocks-only strategy missed a real
  bug.
- No MUI X Premium/Pro packages anywhere in the frontend — Community
  edition only (no commercial license).
- Commit messages: Conventional Commits, in English.

---

### Task 1: Domain types and stock logic

**Files:**
- Create: `bs-inventory/backend/go.mod`
- Create: `bs-inventory/backend/internal/domain/product.go`
- Create: `bs-inventory/backend/internal/domain/movement.go`
- Create: `bs-inventory/backend/internal/domain/stock.go`
- Test: `bs-inventory/backend/internal/domain/stock_test.go`

**Interfaces:**
- Consumes: None
- Produces: `Product`, `StockMovement`, `MovementType`, `ComputeStock`, `IsLowStockCrossing`

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

func TestComputeStock(t *testing.T) {
	movements := []domain.StockMovement{
		{Type: domain.MovementIn, Quantity: 100},
		{Type: domain.MovementOut, Quantity: 30},
		{Type: domain.MovementIn, Quantity: 5},
	}
	got := domain.ComputeStock(movements)
	if got != 75 {
		t.Errorf("ComputeStock() = %d, want 75", got)
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
Expected: FAIL — `domain.Product`, `domain.StockMovement`, `domain.ComputeStock`, `domain.IsLowStockCrossing` don't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/domain/product.go`:

```go
package domain

import "time"

type Product struct {
	SKU       string
	Name      string
	Category  string
	CreatedAt time.Time
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
	ID         string
	ProductSKU string
	Quantity   int
	Type       MovementType
	OccurredAt time.Time
}
```

Create `bs-inventory/backend/internal/domain/stock.go`:

```go
package domain

// ComputeStock returns the current quantity for a product from its full
// movement history: sum of IN minus sum of OUT. Movements are the single
// source of truth — there is no separately-stored mutable stock level to
// drift from them.
func ComputeStock(movements []StockMovement) int {
	total := 0
	for _, m := range movements {
		switch m.Type {
		case MovementIn:
			total += m.Quantity
		case MovementOut:
			total -= m.Quantity
		}
	}
	return total
}

// IsLowStockCrossing reports whether a movement's resulting quantity newly
// crosses at/below threshold, given the quantity before it was applied —
// used to publish stock.low only once per crossing, not on every movement
// while already low.
func IsLowStockCrossing(previousQty, newQty, threshold int) bool {
	return previousQty > threshold && newQty <= threshold
}
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/domain/...`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/go.mod backend/internal/domain
git commit -m "feat(domain): add Product, StockMovement, and stock computation logic"
```

---

### Task 2: PostgreSQL repositories

**Files:**
- Create: `bs-inventory/backend/internal/postgres/schema.sql`
- Create: `bs-inventory/backend/internal/postgres/products.go`
- Create: `bs-inventory/backend/internal/postgres/movements.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/postgres/postgres_test.go`

**Interfaces:**
- Consumes: `Product`, `StockMovement`
- Produces: `ProductRepository`, `MovementRepository`, `ErrDuplicateSKU`, `ErrProductNotFound`

- [ ] **Step 1: Add dependencies**

```bash
go -C bs-inventory/backend get github.com/jackc/pgx/v5 github.com/google/uuid
go -C bs-inventory/backend get github.com/testcontainers/testcontainers-go github.com/testcontainers/testcontainers-go/modules/postgres
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/postgres/postgres_test.go`:

```go
package postgres_test

import (
	"context"
	"os"
	"testing"
	"time"

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

func TestProductRepository_CreateAndGet(t *testing.T) {
	pool := setupTestDB(t)
	repo := postgres.NewProductRepository(pool)
	ctx := context.Background()

	p := domain.Product{SKU: "SKU-1", Name: "Widget", Category: "tools", CreatedAt: time.Now().UTC().Truncate(time.Second)}
	if err := repo.Create(ctx, p); err != nil {
		t.Fatalf("Create() error = %v", err)
	}

	got, err := repo.GetBySKU(ctx, "SKU-1")
	if err != nil {
		t.Fatalf("GetBySKU() error = %v", err)
	}
	if got.Name != "Widget" {
		t.Errorf("GetBySKU().Name = %q, want %q", got.Name, "Widget")
	}
}

func TestProductRepository_DuplicateSKU(t *testing.T) {
	pool := setupTestDB(t)
	repo := postgres.NewProductRepository(pool)
	ctx := context.Background()

	p := domain.Product{SKU: "SKU-DUP", Name: "Widget", Category: "tools", CreatedAt: time.Now().UTC()}
	if err := repo.Create(ctx, p); err != nil {
		t.Fatalf("first Create() error = %v", err)
	}
	if err := repo.Create(ctx, p); err != postgres.ErrDuplicateSKU {
		t.Errorf("second Create() error = %v, want ErrDuplicateSKU", err)
	}
}

func TestProductRepository_GetBySKU_NotFound(t *testing.T) {
	pool := setupTestDB(t)
	repo := postgres.NewProductRepository(pool)

	_, err := repo.GetBySKU(context.Background(), "DOES-NOT-EXIST")
	if err != postgres.ErrProductNotFound {
		t.Errorf("GetBySKU() error = %v, want ErrProductNotFound", err)
	}
}

func TestMovementRepository_InsertAndListByProduct(t *testing.T) {
	pool := setupTestDB(t)
	products := postgres.NewProductRepository(pool)
	movements := postgres.NewMovementRepository(pool)
	ctx := context.Background()

	p := domain.Product{SKU: "SKU-2", Name: "Gadget", Category: "tools", CreatedAt: time.Now().UTC()}
	if err := products.Create(ctx, p); err != nil {
		t.Fatalf("Create() error = %v", err)
	}

	m := domain.StockMovement{ProductSKU: "SKU-2", Quantity: 50, Type: domain.MovementIn, OccurredAt: time.Now().UTC()}
	if _, err := movements.Insert(ctx, m); err != nil {
		t.Fatalf("Insert() error = %v", err)
	}

	list, err := movements.ListByProduct(ctx, "SKU-2")
	if err != nil {
		t.Fatalf("ListByProduct() error = %v", err)
	}
	if len(list) != 1 || list[0].Quantity != 50 {
		t.Errorf("ListByProduct() = %+v, want one movement with quantity 50", list)
	}
}
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/postgres/...`
Expected: FAIL — `schema.sql`, `postgres.NewProductRepository`, and `postgres.NewMovementRepository` don't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/postgres/schema.sql`:

```sql
CREATE TABLE IF NOT EXISTS products (
    sku TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID PRIMARY KEY,
    product_sku TEXT NOT NULL REFERENCES products(sku),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    type TEXT NOT NULL CHECK (type IN ('IN', 'OUT')),
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stock_movements_product_sku ON stock_movements(product_sku);
```

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
		`INSERT INTO products (sku, name, category, created_at) VALUES ($1, $2, $3, $4)`,
		p.SKU, p.Name, p.Category, p.CreatedAt,
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

func (r *ProductRepository) GetBySKU(ctx context.Context, sku string) (domain.Product, error) {
	var p domain.Product
	err := r.pool.QueryRow(ctx,
		`SELECT sku, name, category, created_at FROM products WHERE sku = $1`, sku,
	).Scan(&p.SKU, &p.Name, &p.Category, &p.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return domain.Product{}, ErrProductNotFound
	}
	return p, err
}

func (r *ProductRepository) List(ctx context.Context, limit, offset int) ([]domain.Product, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT sku, name, category, created_at FROM products ORDER BY created_at LIMIT $1 OFFSET $2`,
		limit, offset,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var products []domain.Product
	for rows.Next() {
		var p domain.Product
		if err := rows.Scan(&p.SKU, &p.Name, &p.Category, &p.CreatedAt); err != nil {
			return nil, err
		}
		products = append(products, p)
	}
	return products, rows.Err()
}
```

Create `bs-inventory/backend/internal/postgres/movements.go`:

```go
package postgres

import (
	"context"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/domain"
)

type MovementRepository struct {
	pool *pgxpool.Pool
}

func NewMovementRepository(pool *pgxpool.Pool) *MovementRepository {
	return &MovementRepository{pool: pool}
}

func (r *MovementRepository) Insert(ctx context.Context, m domain.StockMovement) (domain.StockMovement, error) {
	m.ID = uuid.NewString()
	_, err := r.pool.Exec(ctx,
		`INSERT INTO stock_movements (id, product_sku, quantity, type, occurred_at) VALUES ($1, $2, $3, $4, $5)`,
		m.ID, m.ProductSKU, m.Quantity, m.Type, m.OccurredAt,
	)
	return m, err
}

func (r *MovementRepository) ListByProduct(ctx context.Context, sku string) ([]domain.StockMovement, error) {
	rows, err := r.pool.Query(ctx,
		`SELECT id, product_sku, quantity, type, occurred_at FROM stock_movements WHERE product_sku = $1 ORDER BY occurred_at`,
		sku,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var movements []domain.StockMovement
	for rows.Next() {
		var m domain.StockMovement
		if err := rows.Scan(&m.ID, &m.ProductSKU, &m.Quantity, &m.Type, &m.OccurredAt); err != nil {
			return nil, err
		}
		movements = append(movements, m)
	}
	return movements, rows.Err()
}
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/postgres/...`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/postgres backend/go.mod backend/go.sum
git commit -m "feat(postgres): add product and movement repositories"
```

---

### Task 3: RabbitMQ event publisher

**Files:**
- Create: `bs-inventory/backend/internal/events/events.go`
- Create: `bs-inventory/backend/internal/events/publisher.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/events/publisher_test.go`

**Interfaces:**
- Consumes: None
- Produces: `Publisher`, `StockUpdatedPayload`, `StockLowPayload`

- [ ] **Step 1: Add dependencies**

```bash
go -C bs-inventory/backend get github.com/rabbitmq/amqp091-go
go -C bs-inventory/backend get github.com/testcontainers/testcontainers-go/modules/rabbitmq
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

	payload := events.StockUpdatedPayload{SKU: "SKU-1", Quantity: 42, MovementType: "IN", OccurredAt: "2026-07-20T00:00:00Z"}
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
Expected: FAIL — `events.NewPublisher`, `events.StockUpdatedPayload`, and `events.ExchangeName` don't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/events/events.go`:

```go
package events

type StockUpdatedPayload struct {
	SKU          string `json:"sku"`
	Quantity     int    `json:"quantity"`
	MovementType string `json:"movementType"`
	OccurredAt   string `json:"occurredAt"`
}

type StockLowPayload struct {
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
git add bs-inventory/backend/internal/events backend/go.mod backend/go.sum
git commit -m "feat(events): add RabbitMQ publisher for stock.updated and stock.low"
```

---

### Task 4: HTTP handlers

**Files:**
- Create: `bs-inventory/backend/internal/http/router.go`
- Modify: `bs-inventory/backend/go.mod`
- Test: `bs-inventory/backend/internal/http/router_test.go`

**Interfaces:**
- Consumes: `ProductRepository`, `MovementRepository`, `Publisher`, `ComputeStock`, `IsLowStockCrossing`, `ErrDuplicateSKU`, `ErrProductNotFound`
- Produces: `Server`, `Router`

- [ ] **Step 1: Add dependencies**

```bash
go -C bs-inventory/backend get github.com/go-chi/chi/v5
```

- [ ] **Step 2: Write the failing tests**

Create `bs-inventory/backend/internal/http/router_test.go`:

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

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/jackc/pgx/v5/pgxpool"
	tcpostgres "github.com/testcontainers/testcontainers-go/modules/postgres"
	tcrabbitmq "github.com/testcontainers/testcontainers-go/modules/rabbitmq"

	"bs-inventory/internal/events"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/postgres"
)

func setupTestServer(t *testing.T) *bshttp.Server {
	t.Helper()
	ctx := context.Background()

	pgContainer, err := tcpostgres.Run(ctx, "postgres:16",
		tcpostgres.WithDatabase("bsinventory_test"),
		tcpostgres.WithUsername("test"),
		tcpostgres.WithPassword("test"),
		tcpostgres.BasicWaitStrategies(),
	)
	if err != nil {
		t.Fatalf("failed to start postgres: %v", err)
	}
	t.Cleanup(func() { _ = pgContainer.Terminate(ctx) })

	connStr, err := pgContainer.ConnectionString(ctx, "sslmode=disable")
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

	rmqContainer, err := tcrabbitmq.Run(ctx, "rabbitmq:3.13-management-alpine")
	if err != nil {
		t.Fatalf("failed to start rabbitmq: %v", err)
	}
	t.Cleanup(func() { _ = rmqContainer.Terminate(ctx) })

	amqpURL, err := rmqContainer.AmqpURL(ctx)
	if err != nil {
		t.Fatalf("failed to get amqp url: %v", err)
	}
	conn, err := amqp.Dial(amqpURL)
	if err != nil {
		t.Fatalf("failed to dial rabbitmq: %v", err)
	}
	t.Cleanup(func() { _ = conn.Close() })

	publisher, err := events.NewPublisher(conn)
	if err != nil {
		t.Fatalf("failed to create publisher: %v", err)
	}

	return &bshttp.Server{
		Products:          postgres.NewProductRepository(pool),
		Movements:         postgres.NewMovementRepository(pool),
		Publisher:         publisher,
		LowStockThreshold: 10,
	}
}

func TestCreateProduct_AndGetIt(t *testing.T) {
	server := setupTestServer(t)
	ts := httptest.NewServer(server.Router())
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-1", "name": "Widget", "category": "tools"})
	resp, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("POST error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	resp2, err := http.Get(ts.URL + "/api/v1/products/SKU-1")
	if err != nil {
		t.Fatalf("GET error = %v", err)
	}
	if resp2.StatusCode != http.StatusOK {
		t.Fatalf("GET status = %d, want %d", resp2.StatusCode, http.StatusOK)
	}
}

func TestCreateProduct_DuplicateSKU(t *testing.T) {
	server := setupTestServer(t)
	ts := httptest.NewServer(server.Router())
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-DUP", "name": "Widget", "category": "tools"})
	if _, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body)); err != nil {
		t.Fatalf("first POST error = %v", err)
	}
	resp, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body))
	if err != nil {
		t.Fatalf("second POST error = %v", err)
	}
	if resp.StatusCode != http.StatusConflict {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusConflict)
	}
}

func TestCreateMovement_UpdatesStockAndListsMovements(t *testing.T) {
	server := setupTestServer(t)
	ts := httptest.NewServer(server.Router())
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-2", "name": "Gadget", "category": "tools"})
	if _, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body)); err != nil {
		t.Fatalf("create product error = %v", err)
	}

	movBody, _ := json.Marshal(map[string]any{"productSku": "SKU-2", "quantity": 5, "type": "IN"})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(movBody))
	if err != nil {
		t.Fatalf("POST movement error = %v", err)
	}
	if resp.StatusCode != http.StatusCreated {
		t.Fatalf("POST movement status = %d, want %d", resp.StatusCode, http.StatusCreated)
	}

	stockResp, err := http.Get(ts.URL + "/api/v1/stock/SKU-2")
	if err != nil {
		t.Fatalf("GET stock error = %v", err)
	}
	var stock map[string]any
	if err := json.NewDecoder(stockResp.Body).Decode(&stock); err != nil {
		t.Fatalf("decode error = %v", err)
	}
	if int(stock["quantity"].(float64)) != 5 {
		t.Errorf("stock quantity = %v, want 5", stock["quantity"])
	}

	movResp, err := http.Get(ts.URL + "/api/v1/products/SKU-2/movements")
	if err != nil {
		t.Fatalf("GET movements error = %v", err)
	}
	var movements []map[string]any
	if err := json.NewDecoder(movResp.Body).Decode(&movements); err != nil {
		t.Fatalf("decode error = %v", err)
	}
	if len(movements) != 1 {
		t.Errorf("movements = %v, want 1 entry", movements)
	}
}

func TestCreateMovement_UnknownSKU(t *testing.T) {
	server := setupTestServer(t)
	ts := httptest.NewServer(server.Router())
	defer ts.Close()

	movBody, _ := json.Marshal(map[string]any{"productSku": "DOES-NOT-EXIST", "quantity": 5, "type": "IN"})
	resp, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(movBody))
	if err != nil {
		t.Fatalf("POST error = %v", err)
	}
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("status = %d, want %d", resp.StatusCode, http.StatusNotFound)
	}
}

func TestLowStock_ReportsProductsAtOrBelowThreshold(t *testing.T) {
	server := setupTestServer(t)
	ts := httptest.NewServer(server.Router())
	defer ts.Close()

	body, _ := json.Marshal(map[string]string{"sku": "SKU-LOW", "name": "Low Item", "category": "tools"})
	if _, err := http.Post(ts.URL+"/api/v1/products", "application/json", bytes.NewReader(body)); err != nil {
		t.Fatalf("create product error = %v", err)
	}
	movBody, _ := json.Marshal(map[string]any{"productSku": "SKU-LOW", "quantity": 3, "type": "IN"})
	if _, err := http.Post(ts.URL+"/api/v1/stock/movements", "application/json", bytes.NewReader(movBody)); err != nil {
		t.Fatalf("create movement error = %v", err)
	}

	resp, err := http.Get(ts.URL + "/api/v1/stock/low")
	if err != nil {
		t.Fatalf("GET low stock error = %v", err)
	}
	var low []map[string]any
	if err := json.NewDecoder(resp.Body).Decode(&low); err != nil {
		t.Fatalf("decode error = %v", err)
	}
	found := false
	for _, item := range low {
		if item["sku"] == "SKU-LOW" {
			found = true
		}
	}
	if !found {
		t.Errorf("low stock report = %v, want SKU-LOW present (quantity 3 <= default threshold 10)", low)
	}
}
```

- [ ] **Step 3: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: FAIL — `bshttp.Server` doesn't exist yet.

- [ ] **Step 4: Write the minimal implementation**

Create `bs-inventory/backend/internal/http/router.go`:

```go
package http

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"

	"bs-inventory/internal/domain"
	"bs-inventory/internal/events"
	"bs-inventory/internal/postgres"
)

type Server struct {
	Products          *postgres.ProductRepository
	Movements         *postgres.MovementRepository
	Publisher         *events.Publisher
	LowStockThreshold int
}

func (s *Server) Router() chi.Router {
	r := chi.NewRouter()
	r.Get("/healthz", s.handleHealth)
	r.Post("/api/v1/products", s.handleCreateProduct)
	r.Get("/api/v1/products", s.handleListProducts)
	r.Get("/api/v1/products/{sku}", s.handleGetProduct)
	r.Get("/api/v1/products/{sku}/movements", s.handleListMovements)
	r.Post("/api/v1/stock/movements", s.handleCreateMovement)
	r.Get("/api/v1/stock/{sku}", s.handleGetStock)
	r.Get("/api/v1/stock/low", s.handleLowStock)
	return r
}

func (s *Server) handleHealth(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

type createProductRequest struct {
	SKU      string `json:"sku"`
	Name     string `json:"name"`
	Category string `json:"category"`
}

func (s *Server) handleCreateProduct(w http.ResponseWriter, r *http.Request) {
	var req createProductRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.SKU == "" || req.Name == "" {
		writeError(w, http.StatusBadRequest, "sku and name are required")
		return
	}

	p := domain.Product{SKU: req.SKU, Name: req.Name, Category: req.Category, CreatedAt: time.Now().UTC()}
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

func (s *Server) handleListProducts(w http.ResponseWriter, r *http.Request) {
	products, err := s.Products.List(r.Context(), 100, 0)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list products")
		return
	}
	writeJSON(w, http.StatusOK, products)
}

func (s *Server) handleGetProduct(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	p, err := s.Products.GetBySKU(r.Context(), sku)
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

func (s *Server) handleListMovements(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	if _, err := s.Products.GetBySKU(r.Context(), sku); err != nil {
		writeError(w, http.StatusNotFound, "unknown product sku")
		return
	}
	movements, err := s.Movements.ListByProduct(r.Context(), sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list movements")
		return
	}
	writeJSON(w, http.StatusOK, movements)
}

type createMovementRequest struct {
	ProductSKU string `json:"productSku"`
	Quantity   int    `json:"quantity"`
	Type       string `json:"type"`
}

func (s *Server) handleCreateMovement(w http.ResponseWriter, r *http.Request) {
	var req createMovementRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}
	if req.Quantity <= 0 || (req.Type != string(domain.MovementIn) && req.Type != string(domain.MovementOut)) {
		writeError(w, http.StatusBadRequest, "quantity must be positive and type must be IN or OUT")
		return
	}

	if _, err := s.Products.GetBySKU(r.Context(), req.ProductSKU); err != nil {
		writeError(w, http.StatusNotFound, "unknown product sku")
		return
	}

	previous, err := s.Movements.ListByProduct(r.Context(), req.ProductSKU)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read stock history")
		return
	}
	previousQty := domain.ComputeStock(previous)

	m := domain.StockMovement{
		ProductSKU: req.ProductSKU,
		Quantity:   req.Quantity,
		Type:       domain.MovementType(req.Type),
		OccurredAt: time.Now().UTC(),
	}
	saved, err := s.Movements.Insert(r.Context(), m)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to record movement")
		return
	}

	newQty := domain.ComputeStock(append(previous, saved))

	// Publish runs after the commit; if it fails, the request still returns
	// success (the movement is real and already committed) — see spec §4,
	// no outbox pattern until a real consumer exists that needs one.
	_ = s.Publisher.PublishStockUpdated(r.Context(), events.StockUpdatedPayload{
		SKU:          saved.ProductSKU,
		Quantity:     newQty,
		MovementType: string(saved.Type),
		OccurredAt:   saved.OccurredAt.Format(time.RFC3339),
	})
	if domain.IsLowStockCrossing(previousQty, newQty, s.LowStockThreshold) {
		_ = s.Publisher.PublishStockLow(r.Context(), events.StockLowPayload{
			SKU: saved.ProductSKU, Quantity: newQty, Threshold: s.LowStockThreshold,
		})
	}

	writeJSON(w, http.StatusCreated, saved)
}

func (s *Server) handleGetStock(w http.ResponseWriter, r *http.Request) {
	sku := chi.URLParam(r, "sku")
	if _, err := s.Products.GetBySKU(r.Context(), sku); err != nil {
		writeError(w, http.StatusNotFound, "unknown product sku")
		return
	}
	movements, err := s.Movements.ListByProduct(r.Context(), sku)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to read stock history")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"sku": sku, "quantity": domain.ComputeStock(movements)})
}

func (s *Server) handleLowStock(w http.ResponseWriter, r *http.Request) {
	products, err := s.Products.List(r.Context(), 1000, 0)
	if err != nil {
		writeError(w, http.StatusInternalServerError, "failed to list products")
		return
	}

	var low []map[string]any
	for _, p := range products {
		movements, err := s.Movements.ListByProduct(r.Context(), p.SKU)
		if err != nil {
			writeError(w, http.StatusInternalServerError, "failed to read stock history")
			return
		}
		qty := domain.ComputeStock(movements)
		if qty <= s.LowStockThreshold {
			low = append(low, map[string]any{"sku": p.SKU, "name": p.Name, "quantity": qty})
		}
	}
	writeJSON(w, http.StatusOK, low)
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}
```

- [ ] **Step 5: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./internal/http/...`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/backend/internal/http backend/go.mod backend/go.sum
git commit -m "feat(http): add REST handlers for products, stock movements, and low-stock report"
```

---

### Task 5: Server wiring

**Files:**
- Create: `bs-inventory/backend/cmd/server/main.go`
- Test: `bs-inventory/backend/cmd/server/main_test.go`

**Interfaces:**
- Consumes: `Server`, `Router`
- Produces: `RunServer`, `LoadConfig`

- [ ] **Step 1: Write the failing tests**

Create `bs-inventory/backend/cmd/server/main_test.go`:

```go
package main

import (
	"os"
	"testing"
)

func TestLoadConfig_Defaults(t *testing.T) {
	os.Unsetenv("PORT")
	os.Unsetenv("DATABASE_URL")
	os.Unsetenv("RABBITMQ_URL")

	cfg := LoadConfig()
	if cfg.Port != "8080" {
		t.Errorf("Port = %q, want %q", cfg.Port, "8080")
	}
	if cfg.LowStockThreshold != 10 {
		t.Errorf("LowStockThreshold = %d, want 10", cfg.LowStockThreshold)
	}
}

func TestLoadConfig_EnvOverride(t *testing.T) {
	os.Setenv("PORT", "9090")
	defer os.Unsetenv("PORT")

	cfg := LoadConfig()
	if cfg.Port != "9090" {
		t.Errorf("Port = %q, want %q", cfg.Port, "9090")
	}
}
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `go -C bs-inventory/backend test ./cmd/server/...`
Expected: FAIL — `LoadConfig` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/backend/cmd/server/main.go`:

```go
package main

import (
	"context"
	"log"
	"net/http"
	"os"

	amqp "github.com/rabbitmq/amqp091-go"
	"github.com/jackc/pgx/v5/pgxpool"

	"bs-inventory/internal/events"
	bshttp "bs-inventory/internal/http"
	"bs-inventory/internal/postgres"
)

type Config struct {
	Port              string
	PostgresURL       string
	RabbitMQURL       string
	LowStockThreshold int
}

func LoadConfig() Config {
	return Config{
		Port:              getEnv("PORT", "8080"),
		PostgresURL:       getEnv("DATABASE_URL", "postgres://localhost:5432/bsinventory"),
		RabbitMQURL:       getEnv("RABBITMQ_URL", "amqp://guest:guest@localhost:5672/"),
		LowStockThreshold: 10,
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

// RunServer wires every dependency and starts listening — kept separate
// from main() so it's callable without needing a real OS process to exit,
// and so the compose-based end-to-end test (Task 12) has one clear entry
// point to reason about.
func RunServer(cfg Config) error {
	ctx := context.Background()

	pool, err := pgxpool.New(ctx, cfg.PostgresURL)
	if err != nil {
		return err
	}
	defer pool.Close()

	conn, err := amqp.Dial(cfg.RabbitMQURL)
	if err != nil {
		return err
	}
	defer conn.Close()

	publisher, err := events.NewPublisher(conn)
	if err != nil {
		return err
	}

	server := &bshttp.Server{
		Products:          postgres.NewProductRepository(pool),
		Movements:         postgres.NewMovementRepository(pool),
		Publisher:         publisher,
		LowStockThreshold: cfg.LowStockThreshold,
	}

	log.Printf("bs-inventory listening on :%s", cfg.Port)
	return http.ListenAndServe(":"+cfg.Port, server.Router())
}

func main() {
	if err := RunServer(LoadConfig()); err != nil {
		log.Fatal(err)
	}
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `go -C bs-inventory/backend test ./cmd/server/...`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add bs-inventory/backend/cmd
git commit -m "feat(server): wire config, repositories, and publisher into a runnable server"
```

---

### Task 6: Frontend template trim and API client

**Files:**
- Create: `bs-inventory/frontend/` (seeded by extracting `acorn-next-mui-admin.zip`, see Step 1)
- Modify: `bs-inventory/frontend/package.json`
- Modify: `bs-inventory/frontend/next.config.mjs`
- Modify: `bs-inventory/frontend/.nvmrc`
- Modify: `bs-inventory/frontend/.npmrc`
- Delete: `bs-inventory/frontend/src/app/landing-page`
- Create: `bs-inventory/frontend/src/lib/api-client.ts`
- Test: `bs-inventory/frontend/src/lib/api-client.test.ts`

**Interfaces:**
- Consumes: None
- Produces: `apiClient`

- [ ] **Step 1: Seed the frontend from the template**

```bash
mkdir -p bs-inventory/frontend
# Extract the previously-downloaded acorn-next-mui-admin.zip into bs-inventory/frontend/
# (contents of the zip's acorn-next-mui-admin/ folder, not the zip itself)
```

- [ ] **Step 2: Remove MUI X Premium/Pro dependencies**

In `bs-inventory/frontend/package.json`, remove these lines from `dependencies`
(Community-only per the design spec, no commercial MUI X license):

```json
"@mui/x-charts-premium": "9.3.0",
"@mui/x-charts-pro": "9.3.0",
"@mui/x-data-grid-premium": "9.3.0",
"@mui/x-data-grid-pro": "9.3.0",
"@mui/x-date-pickers-pro": "9.3.0",
```

Keep `@mui/x-data-grid`, `@mui/x-date-pickers`, `@mui/x-charts` (Community
editions, already present).

- [ ] **Step 3: Reconcile and enforce the Node version**

The template's `.nvmrc` (`22.14.0`) and `package.json`'s `engines.node`
(`>=24.15.0`) disagree, and neither was actually enforced (`.npmrc` had
no `engine-strict`). Fix both:

In `bs-inventory/frontend/package.json`, change:

```json
"engines": {
  "node": ">=24.15.0",
  "npm": ">=11.12.0"
},
```

to:

```json
"engines": {
  "node": ">=22.14.0",
  "npm": ">=10.0.0"
},
```

Append to `bs-inventory/frontend/.npmrc`:

```
engine-strict=true
```

- [ ] **Step 4: Remove demo content unrelated to inventory**

```bash
rm -rf bs-inventory/frontend/src/app/landing-page
```

- [ ] **Step 5: Add dev dependencies for testing**

```bash
(cd bs-inventory/frontend && npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @playwright/test)
```

- [ ] **Step 6: Write the failing test**

Create `bs-inventory/frontend/src/lib/api-client.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiClient } from "./api-client";

describe("apiClient", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("getProducts calls the products endpoint and returns parsed JSON", async () => {
    const mockProducts = [{ sku: "SKU-1", name: "Widget", category: "tools", createdAt: "2026-07-20T00:00:00Z" }];
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const result = await apiClient.getProducts();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/v1/products"),
      expect.objectContaining({ headers: expect.objectContaining({ "Content-Type": "application/json" }) })
    );
    expect(result).toEqual(mockProducts);
  });

  it("throws with the server's error message on a non-ok response", async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 409,
      json: async () => ({ error: "a product with this SKU already exists" }),
    });

    await expect(apiClient.createProduct({ sku: "SKU-1", name: "Widget", category: "tools" })).rejects.toThrow(
      "a product with this SKU already exists"
    );
  });
});
```

- [ ] **Step 7: Run it, expect FAIL**

Run: `cd bs-inventory/frontend && npx vitest run src/lib/api-client.test.ts`
Expected: FAIL — `./api-client` doesn't exist yet.

- [ ] **Step 8: Write the minimal implementation**

Create `bs-inventory/frontend/src/lib/api-client.ts`:

```ts
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export interface Product {
  sku: string;
  name: string;
  category: string;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  productSku: string;
  quantity: number;
  type: "IN" | "OUT";
  occurredAt: string;
}

export interface StockLevel {
  sku: string;
  quantity: number;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error ?? `Request to ${path} failed with status ${res.status}`);
  }
  return res.json();
}

export const apiClient = {
  getProducts: () => request<Product[]>("/api/v1/products"),
  getProduct: (sku: string) => request<Product>(`/api/v1/products/${sku}`),
  getMovements: (sku: string) => request<StockMovement[]>(`/api/v1/products/${sku}/movements`),
  createProduct: (data: { sku: string; name: string; category: string }) =>
    request<Product>("/api/v1/products", { method: "POST", body: JSON.stringify(data) }),
  createMovement: (data: { productSku: string; quantity: number; type: "IN" | "OUT" }) =>
    request<StockMovement>("/api/v1/stock/movements", { method: "POST", body: JSON.stringify(data) }),
  getStock: (sku: string) => request<StockLevel>(`/api/v1/stock/${sku}`),
  getLowStock: () => request<Array<Product & { quantity: number }>>("/api/v1/stock/low"),
};
```

- [ ] **Step 9: Run it, expect PASS**

Run: `cd bs-inventory/frontend && npx vitest run src/lib/api-client.test.ts`
Expected: PASS.

- [ ] **Step 10: Commit**

```bash
git add bs-inventory/frontend
git commit -m "feat(frontend): trim template to Community-only MUI X, add typed API client"
```

---

### Task 7: Products page

**Files:**
- Create: `bs-inventory/frontend/src/app/(dashboard)/products/page.tsx`
- Test: `bs-inventory/frontend/src/app/(dashboard)/products/page.test.tsx`

**Interfaces:**
- Consumes: `apiClient`
- Produces: `ProductsPage`

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/(dashboard)/products/page.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductsPage from "./page";
import { apiClient } from "@/lib/api-client";

vi.mock("@/lib/api-client", () => ({
  apiClient: {
    getProducts: vi.fn(),
    createProduct: vi.fn(),
  },
}));

describe("ProductsPage", () => {
  beforeEach(() => {
    vi.mocked(apiClient.getProducts).mockResolvedValue([
      { sku: "SKU-1", name: "Widget", category: "tools", createdAt: "2026-07-20T00:00:00Z" },
    ]);
  });

  it("loads and displays products on mount", async () => {
    render(<ProductsPage />);
    await waitFor(() => expect(screen.getByText("Widget")).toBeInTheDocument());
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/products/page.test.tsx"`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/(dashboard)/products/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { apiClient, type Product } from "@/lib/api-client";

const columns: GridColDef[] = [
  { field: "sku", headerName: "SKU", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "category", headerName: "Category", flex: 1 },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ sku: "", name: "", category: "" });

  const loadProducts = () => {
    apiClient.getProducts().then(setProducts).catch(() => setProducts([]));
  };

  useEffect(loadProducts, []);

  const handleCreate = async () => {
    await apiClient.createProduct(form);
    setOpen(false);
    setForm({ sku: "", name: "", category: "" });
    loadProducts();
  };

  return (
    <Stack spacing={2}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New product
      </Button>
      <DataGrid rows={products} columns={columns} getRowId={(row) => row.sku} autoHeight />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>New product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <TextField label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Button variant="contained" onClick={handleCreate}>
              Save
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/products/page.test.tsx"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "bs-inventory/frontend/src/app/(dashboard)/products"
git commit -m "feat(frontend): add products list page with create dialog"
```

---

### Task 8: Product detail page

**Files:**
- Create: `bs-inventory/frontend/src/app/(dashboard)/products/[sku]/page.tsx`
- Test: `bs-inventory/frontend/src/app/(dashboard)/products/[sku]/page.test.tsx`

**Interfaces:**
- Consumes: `apiClient`
- Produces: `ProductDetailPage`

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/(dashboard)/products/[sku]/page.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductDetailPage from "./page";
import { apiClient } from "@/lib/api-client";

vi.mock("next/navigation", () => ({ useParams: () => ({ sku: "SKU-1" }) }));
vi.mock("@/lib/api-client", () => ({
  apiClient: {
    getProduct: vi.fn(),
    getStock: vi.fn(),
    getMovements: vi.fn(),
  },
}));

describe("ProductDetailPage", () => {
  beforeEach(() => {
    vi.mocked(apiClient.getProduct).mockResolvedValue({ sku: "SKU-1", name: "Widget", category: "tools", createdAt: "2026-07-20T00:00:00Z" });
    vi.mocked(apiClient.getStock).mockResolvedValue({ sku: "SKU-1", quantity: 25 });
    vi.mocked(apiClient.getMovements).mockResolvedValue([
      { id: "m1", productSku: "SKU-1", quantity: 25, type: "IN", occurredAt: "2026-07-20T00:00:00Z" },
    ]);
  });

  it("shows the product, its current stock, and its movement history", async () => {
    render(<ProductDetailPage />);
    await waitFor(() => expect(screen.getByText("Widget")).toBeInTheDocument());
    expect(await screen.findByText("Current stock: 25")).toBeInTheDocument();
    expect(await screen.findByText("IN 25")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/products/[sku]/page.test.tsx"`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/(dashboard)/products/[sku]/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { apiClient, type Product, type StockMovement } from "@/lib/api-client";

export default function ProductDetailPage() {
  const params = useParams<{ sku: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [movements, setMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    apiClient.getProduct(params.sku).then(setProduct);
    apiClient.getStock(params.sku).then((s) => setStock(s.quantity));
    apiClient.getMovements(params.sku).then(setMovements);
  }, [params.sku]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <div>
      <Typography variant="h5">{product.name}</Typography>
      <Typography color="text.secondary">
        {product.sku} · {product.category}
      </Typography>
      <Typography sx={{ mt: 2 }}>Current stock: {stock ?? "..."}</Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>
        Movement history
      </Typography>
      <List>
        {movements.map((m) => (
          <ListItem key={m.id}>
            <ListItemText primary={`${m.type} ${m.quantity}`} secondary={m.occurredAt} />
          </ListItem>
        ))}
      </List>
    </div>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/products/[sku]/page.test.tsx"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "bs-inventory/frontend/src/app/(dashboard)/products/[sku]"
git commit -m "feat(frontend): add product detail page with stock and movement history"
```

---

### Task 9: New stock movement page

**Files:**
- Create: `bs-inventory/frontend/src/app/(dashboard)/stock/movements/new/page.tsx`
- Test: `bs-inventory/frontend/src/app/(dashboard)/stock/movements/new/page.test.tsx`

**Interfaces:**
- Consumes: `apiClient`
- Produces: `NewMovementPage`

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/(dashboard)/stock/movements/new/page.test.tsx`:

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NewMovementPage from "./page";
import { apiClient } from "@/lib/api-client";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
vi.mock("@/lib/api-client", () => ({ apiClient: { createMovement: vi.fn() } }));

describe("NewMovementPage", () => {
  it("rejects a non-positive quantity without calling the API", async () => {
    render(<NewMovementPage />);
    fireEvent.change(screen.getByLabelText("Quantity"), { target: { value: "-5" } });
    fireEvent.click(screen.getByText("Record movement"));

    expect(await screen.findByText("Quantity must be a positive integer")).toBeInTheDocument();
    expect(apiClient.createMovement).not.toHaveBeenCalled();
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/stock/movements/new/page.test.tsx"`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/(dashboard)/stock/movements/new/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { apiClient } from "@/lib/api-client";

export default function NewMovementPage() {
  const router = useRouter();
  const [form, setForm] = useState({ productSku: "", quantity: "", type: "IN" as "IN" | "OUT" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const quantity = Number(form.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      setError("Quantity must be a positive integer");
      return;
    }
    try {
      await apiClient.createMovement({ productSku: form.productSku, quantity, type: form.type });
      router.push(`/products/${form.productSku}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to record movement");
    }
  };

  return (
    <Stack spacing={2} sx={{ maxWidth: 400 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Product SKU" value={form.productSku} onChange={(e) => setForm({ ...form, productSku: e.target.value })} />
      <TextField label="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
      <TextField select label="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "IN" | "OUT" })}>
        <MenuItem value="IN">IN</MenuItem>
        <MenuItem value="OUT">OUT</MenuItem>
      </TextField>
      <Button variant="contained" onClick={handleSubmit}>
        Record movement
      </Button>
    </Stack>
  );
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/stock/movements/new/page.test.tsx"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "bs-inventory/frontend/src/app/(dashboard)/stock/movements"
git commit -m "feat(frontend): add new stock movement form with client-side validation"
```

---

### Task 10: Low-stock report page

**Files:**
- Create: `bs-inventory/frontend/src/app/(dashboard)/stock/low/page.tsx`
- Test: `bs-inventory/frontend/src/app/(dashboard)/stock/low/page.test.tsx`

**Interfaces:**
- Consumes: `apiClient`
- Produces: `LowStockPage`

- [ ] **Step 1: Write the failing test**

Create `bs-inventory/frontend/src/app/(dashboard)/stock/low/page.test.tsx`:

```tsx
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LowStockPage from "./page";
import { apiClient } from "@/lib/api-client";

vi.mock("@/lib/api-client", () => ({ apiClient: { getLowStock: vi.fn() } }));

describe("LowStockPage", () => {
  beforeEach(() => {
    vi.mocked(apiClient.getLowStock).mockResolvedValue([
      { sku: "SKU-LOW", name: "Low Item", category: "tools", createdAt: "2026-07-20T00:00:00Z", quantity: 3 },
    ]);
  });

  it("loads and displays low-stock products", async () => {
    render(<LowStockPage />);
    await waitFor(() => expect(screen.getByText("Low Item")).toBeInTheDocument());
  });
});
```

- [ ] **Step 2: Run it, expect FAIL**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/stock/low/page.test.tsx"`
Expected: FAIL — `./page` doesn't exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `bs-inventory/frontend/src/app/(dashboard)/stock/low/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { apiClient } from "@/lib/api-client";

const columns: GridColDef[] = [
  { field: "sku", headerName: "SKU", flex: 1 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "quantity", headerName: "Quantity", flex: 1 },
];

export default function LowStockPage() {
  const [rows, setRows] = useState<Array<{ sku: string; name: string; quantity: number }>>([]);

  useEffect(() => {
    apiClient.getLowStock().then(setRows);
  }, []);

  return <DataGrid rows={rows} columns={columns} getRowId={(row) => row.sku} autoHeight />;
}
```

- [ ] **Step 4: Run it, expect PASS**

Run: `cd bs-inventory/frontend && npx vitest run "src/app/(dashboard)/stock/low/page.test.tsx"`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add "bs-inventory/frontend/src/app/(dashboard)/stock/low"
git commit -m "feat(frontend): add low-stock report page"
```

---

### Task 11: Local development stack (docker-compose)

**Files:**
- Create: `bs-inventory/docker-compose.yml`
- Create: `bs-inventory/backend/Dockerfile`
- Create: `bs-inventory/frontend/Dockerfile`

**Interfaces:**
- Consumes: `RunServer`, `apiClient`
- Produces: `ComposeStack`

Not TDD in the usual sense — this is infrastructure config, verified by
booting the real stack, not a unit test.

- [ ] **Step 1: Write `bs-inventory/backend/Dockerfile`**

```dockerfile
FROM golang:1.23-alpine AS build
WORKDIR /app
COPY . .
RUN go build -o server ./cmd/server

FROM alpine:3.20
COPY --from=build /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]
```

- [ ] **Step 2: Write `bs-inventory/frontend/Dockerfile`**

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app ./
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
```

- [ ] **Step 3: Write `bs-inventory/docker-compose.yml`**

```yaml
version: "3.9"
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
      - ./backend/internal/postgres/schema.sql:/docker-entrypoint-initdb.d/schema.sql

  rabbitmq:
    image: rabbitmq:3.13-management-alpine
    ports:
      - "5672:5672"
      - "15672:15672"

  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgres://bsinventory:bsinventory@postgres:5432/bsinventory?sslmode=disable
      RABBITMQ_URL: amqp://guest:guest@rabbitmq:5672/
      PORT: "8080"
    ports:
      - "8080:8080"
    depends_on:
      - postgres
      - rabbitmq

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_BASE_URL: http://localhost:8080
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

- [ ] **Step 4: Validate the compose file**

Run: `docker compose -f bs-inventory/docker-compose.yml config`
Expected: prints the resolved config with no errors (validates YAML +
service references). Note `-f` points at the compose file explicitly
rather than `cd`-ing into `bs-inventory/`, since Docker resolves the
`build:` context paths (`./backend`, `./frontend`) relative to the
compose file's own directory regardless of the shell's current
directory.

- [ ] **Step 5: Boot the real stack and verify health**

Run: `docker compose -f bs-inventory/docker-compose.yml up -d --build && curl -sf http://localhost:8080/healthz`
Expected: `{"status":"ok"}`. Then `docker compose -f bs-inventory/docker-compose.yml down`.

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/docker-compose.yml bs-inventory/backend/Dockerfile bs-inventory/frontend/Dockerfile
git commit -m "chore: add docker-compose stack for local development"
```

---

### Task 12: End-to-end smoke test

**Files:**
- Create: `bs-inventory/frontend/playwright.config.ts`
- Create: `bs-inventory/frontend/e2e/inventory-flow.spec.ts`

**Interfaces:**
- Consumes: `ProductsPage`, `ProductDetailPage`, `NewMovementPage`, `LowStockPage`, `ComposeStack`
- Produces: None

- [ ] **Step 1: Write `bs-inventory/frontend/playwright.config.ts`**

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:3000",
  },
});
```

- [ ] **Step 2: Write the end-to-end test**

Create `bs-inventory/frontend/e2e/inventory-flow.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("create a product, record a movement, see it reflected in stock", async ({ page }) => {
  await page.goto("/products");
  await page.getByText("New product").click();
  await page.getByLabel("SKU").fill("E2E-SKU-1");
  await page.getByLabel("Name").fill("E2E Widget");
  await page.getByLabel("Category").fill("tools");
  await page.getByText("Save").click();

  await expect(page.getByText("E2E Widget")).toBeVisible();

  await page.goto("/stock/movements/new");
  await page.getByLabel("Product SKU").fill("E2E-SKU-1");
  await page.getByLabel("Quantity").fill("25");
  await page.getByText("Record movement").click();

  await expect(page).toHaveURL(/\/products\/E2E-SKU-1/);
  await expect(page.getByText("Current stock: 25")).toBeVisible();
});
```

- [ ] **Step 3: Run it against the real stack, expect FAIL first**

```bash
docker compose -f bs-inventory/docker-compose.yml up -d --build
```

Run: `cd bs-inventory/frontend && npx playwright test`
Expected: at this point in a from-scratch run this should already PASS,
since Tasks 1–11 are done — this step exists to catch integration gaps
between independently-built backend and frontend branches (e.g., a field
name mismatch) that no single task's own tests could see.

- [ ] **Step 4: If it fails, fix the integration gap it surfaces**

Any failure here is a real cross-branch integration bug — the backend
and frontend were each fully tested in isolation (Tasks 1–10), so a
failure here means something in how they fit together was missed
(e.g., a JSON field name mismatch between the Go handler and the
TypeScript client). Fix it in whichever side is wrong, re-run.

- [ ] **Step 5: Tear down**

```bash
docker compose -f bs-inventory/docker-compose.yml down
```

- [ ] **Step 6: Commit**

```bash
git add bs-inventory/frontend/playwright.config.ts frontend/e2e
git commit -m "test(e2e): add end-to-end smoke test for the product/stock flow"
```

---

## Self-review

- **Spec coverage:** every section of the design spec maps to a task —
  domain (1), Postgres (2), RabbitMQ (3), HTTP API including the
  movement-history endpoint the spec's own frontend section implied but
  its API table initially omitted (4, fixed during this plan's writing),
  server wiring (5), frontend trim + Node version reconciliation (6),
  all four pages (7–10), the local dev stack (11), and the end-to-end
  smoke test (12).
- **Placeholder scan:** none — every step's content is complete and
  ready to paste.
- **Type consistency:** `apiClient`'s methods (Task 6) match exactly the
  routes `Server.Router()` registers (Task 4) — `/api/v1/products`,
  `/api/v1/products/{sku}`, `/api/v1/products/{sku}/movements`,
  `/api/v1/stock/movements`, `/api/v1/stock/{sku}`, `/api/v1/stock/low`.
  JSON field names match between the Go request/response structs and
  the TypeScript interfaces (`sku`, `name`, `category`, `productSku`,
  `quantity`, `type`, `occurredAt`).
- **Version/toolchain enforcement:** Node's pinned version (Task 6, Step
  3) is mechanically enforced via `engine-strict=true` in `.npmrc`, not
  just declared — a plain declaration was exactly the gap that caused a
  real finding in an earlier pilot (JDK enforcer plugin, persons-crud).
- **Exhaustive-coverage claims:** none of this plan's language claims
  full enumeration of a table beyond what's shown, so no per-row test
  obligation applies here.
- **A known, accepted parallelism loss:** Tasks 2 and 3 both modify
  `bs-inventory/backend/go.mod` (adding `pgx`/`testcontainers-go/postgres` vs.
  `amqp091-go`/`testcontainers-go/rabbitmq`, respectively). The
  executor's same-file chaining will therefore serialize them even
  though they are logically independent (neither's code imports the
  other). This is a realistic property of any real Go module — `go.mod`
  is inherently a shared, evolving file — not a flaw in this plan's task
  boundaries; Task 4 already depended on both via `Consumes` regardless.
- **Path fix:** the plan was first drafted with `backend/`/`frontend/` at
  the repo root, missing the user's explicit instruction that this
  module lives under `bs-inventory/` (matching the `persons/`,
  `subtract/`, `factorial/` sibling-pilot convention). Fixed every
  `Files:` entry and shell command to the `bs-inventory/` prefix; along
  the way, replaced two `cd X; ...; cd ..` sequences (Tasks 1 and 6)
  with `(cd X && ...)` subshells, since the extra directory level meant
  a bare `cd ..` would land in `bs-inventory/` instead of back at the
  repo root — subshells sidestep that class of bug entirely rather than
  needing the right number of `..` segments.
- **Parser dry-run:** ran `node <parallel-plan-executor
  clone>/bin/parse-plan.js docs/cys/plans/2026-07-20-bs-inventory.md`.
  First pass used `` `bs-inventory/docker-compose.yml` `` as Task 11's produced
  symbol — the parser split it into two separate symbols (`docker` and
  `compose.yml`), apparently not handling a hyphen inside a backtick-
  quoted symbol. The `11 → 12` edge still formed correctly by
  coincidence (both fragments matched on both sides), but relying on
  that would be fragile, so the symbol was renamed to a plain
  identifier, `` `ComposeStack` ``, with no special characters. Every
  other edge matched the intended design exactly on the first try,
  including the accepted `2 → 3` chaining from shared `go.mod` writes
  noted above. See the graph below (post-rename).
