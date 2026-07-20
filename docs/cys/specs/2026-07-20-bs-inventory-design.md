# bs-inventory — Design Spec

**Date:** 2026-07-20
**Status:** Approved

## 1. Goal

`bs-inventory`, the first module of a larger BacSystem system whose modules
must be independently integrable. Manages product catalog (SKUs) and stock
(quantities, movements, low-stock alerts). Self-contained in a
`bs-inventory/` directory, split into `backend/` (Go REST API + event
publisher) and `frontend/` (Next.js admin UI). Serves both as a real
BacSystem deliverable and as a pilot validating the `parallel-plan-executor`
engine against a new stack (Go) and a two-service module for the first time.

Integration model for future BacSystem modules: **REST API** for
synchronous reads/writes, **RabbitMQ events** for asynchronous
notifications (`stock.updated`, `stock.low`) other modules can subscribe
to. No shared BacSystem shell exists yet — the frontend is built as an
independently deployable **Next.js Multi-Zone**, ready to be composed
under a shared domain later via rewrites, without a rewrite of its own
code when that shell exists.

## 2. Stack

**Backend:**
- **Language:** Go.
- **HTTP:** standard `net/http` + a lightweight router (`chi`) — no
  full framework needed for this scope.
- **Database:** PostgreSQL (already running locally via Docker, confirmed
  available — real integration tests, not mocks).
- **Messaging:** RabbitMQ (already decided; real broker via Docker, not
  a stub).
- **Testing:** Go's standard `testing` package + `testcontainers-go` for
  Postgres/RabbitMQ integration tests.

**Frontend:**
- **Base:** the "Acorn" Next.js 16 (App Router) + MUI 9 admin template
  (already present at `frontend/`, see Section 5). **MUI X Premium/Pro
  packages removed** from `package.json` (`@mui/x-data-grid-premium`,
  `@mui/x-charts-premium`, `@mui/x-charts-pro`, `@mui/x-data-grid-pro`,
  `@mui/x-date-pickers-pro`) — no commercial MUI X license; only the
  Community edition (`@mui/x-data-grid`, `@mui/x-date-pickers`,
  `@mui/x-charts`) covers everything this UI needs (product/stock
  tables, a low-stock chart).
- **Multi-Zone integration:** Next.js's native
  [Multi-Zones](https://nextjs.org/docs/app/guides/multi-zones) feature —
  confirmed this is the supported approach for the App Router (Module
  Federation's Next.js plugin explicitly does not support the App
  Router, and its own maintainers describe it as sunsetting). No shared
  client-side state across zone boundaries is assumed; navigating to
  another future BacSystem module is a full page navigation via a plain
  `<a>`, not a `<Link>`.

## 3. Domain model

- **Product**: `sku` (string, unique), `name`, `category`, `createdAt`.
- **StockMovement**: `id`, `productSku`, `quantity` (positive int),
  `type` (`IN` | `OUT`), `occurredAt`. Append-only — never updated or
  deleted, so stock history is always reconstructible.
- **StockLevel** (derived, not its own table): current quantity for a
  `productSku` = sum of `IN` movements − sum of `OUT` movements. Computed
  in a query, not maintained as duplicated mutable state, so it can
  never drift from the movements that are its source of truth.
- **Low-stock threshold**: a single configurable value (env var,
  `LOW_STOCK_THRESHOLD`, default `10`) applied to every product for this
  first version — not a per-product setting (YAGNI: no evidence yet that
  different products need different thresholds).

## 4. Backend — REST API

| Method | Path | Success | Failure modes |
|---|---|---|---|
| POST | `/api/v1/products` | 201, body = created product | 400 validation, 409 duplicate SKU |
| GET | `/api/v1/products` | 200, paginated list | — |
| GET | `/api/v1/products/{sku}` | 200, product | 404 not found |
| POST | `/api/v1/stock/movements` | 201, body = created movement | 400 validation, 404 unknown SKU |
| GET | `/api/v1/stock/{sku}` | 200, `{"sku": "...", "quantity": N}` | 404 unknown SKU |
| GET | `/api/v1/stock/low` | 200, list of products at/below threshold | — |
| GET | `/healthz` | 200, `{"status": "ok"}` | — |

### Events published (RabbitMQ)

Exchange: `bs-inventory.events` (topic exchange).

- `stock.updated` — published after every successful stock movement.
  Payload: `{"sku", "quantity", "movementType", "occurredAt"}`.
- `stock.low` — published when a movement causes `quantity` to cross at
  or below `LOW_STOCK_THRESHOLD` (not on every movement while already
  low — only on the crossing, so subscribers aren't flooded). Payload:
  `{"sku", "quantity", "threshold"}`.

### Error handling

- A stock movement is written inside one Postgres transaction (insert
  movement row, no separate mutable stock-level row to keep consistent).
- If the RabbitMQ publish after a successful commit fails (broker
  unreachable, etc.), the HTTP request still returns success (the
  movement is real and committed) — the failure is logged, not
  surfaced to the caller. **Explicit scope cut**: no outbox pattern /
  guaranteed delivery in this first version — no other module exists
  yet to depend on receiving every event, so building that guarantee
  now would be speculative. Revisit once a real consumer exists and a
  missed event has actually caused a problem.
- Validation errors (missing/invalid fields, unknown SKU) return `400`;
  duplicate SKU on create returns `409`; unknown SKU on lookup returns
  `404`.

### Architecture

```
bs-inventory/backend/
  go.mod
  cmd/server/main.go        — wiring: config, DB pool, RabbitMQ conn, router, listen
  internal/domain/          — Product, StockMovement, StockLevel (pure types + rules)
  internal/postgres/        — repository implementations (products, movements)
  internal/events/          — RabbitMQ publisher, event payload types
  internal/http/            — handlers, router, request/response DTOs
  internal/http/middleware/ — request logging, recover
  test/integration/         — testcontainers-go tests against real Postgres + RabbitMQ
```

### Testing strategy

- `internal/domain`: pure unit tests (stock-level computation, low-stock
  crossing detection) — no I/O.
- `test/integration`: `testcontainers-go` spins up real Postgres +
  RabbitMQ containers (Docker confirmed available) for each test run —
  no mocked database or broker, per the lesson from the persons-crud
  pilot where a mocks-only strategy missed a real bug.
- HTTP handler tests using `httptest` against the real repository/event
  implementations wired to the test containers, not fakes.

## 5. Frontend

### Starting point

`frontend/` is seeded from the Acorn Next.js admin template already
downloaded (`acorn-next-mui-admin.zip`). Kept: the App Router structure,
MUI theming, layout/navigation shell, auth scaffolding. Removed: MUI X
Premium/Pro dependencies (Section 2) and any demo content unrelated to
inventory (landing page, unrelated dashboard widgets) — trimmed as part
of the first implementation task, not left in as dead weight.

### Pages

- `/products` — list (MUI X Community `DataGrid`), create/edit dialog.
- `/products/[sku]` — product detail + its stock movement history.
- `/stock/movements/new` — form to record a stock movement (in/out).
- `/stock/low` — table of products at/below the low-stock threshold.

### Multi-Zone setup

- `next.config.mjs` gains a `basePath: '/inventory'` and the app is
  deployed as its own standalone Next.js server — no changes needed
  beyond what Multi-Zones documents, since this module has no other
  zones to rewrite *to* yet (it's the first one). The future BacSystem
  shell will add the rewrite rule pointing at this app's URL; nothing in
  `bs-inventory` needs to know that shell exists in advance.
- Cross-zone links (once a shell/other modules exist) use plain `<a>`
  tags per Multi-Zones' own requirement — noted in a code comment at the
  navigation component so a future contributor doesn't "fix" it into a
  `<Link>` and reintroduce a client-side navigation error across the
  zone boundary.

### Testing strategy

- Component/unit tests with Vitest + React Testing Library for
  forms/validation (e.g., the stock-movement form rejects a negative
  quantity).
- One end-to-end smoke test (Playwright) against the real backend
  (started via the same Docker Compose used for backend integration
  tests): create a product, record a movement, see it reflected in the
  stock table.

## 6. Local development

A `docker-compose.yml` at `bs-inventory/` root starts Postgres, RabbitMQ,
the Go backend, and the Next.js frontend together — one command
(`docker compose up`) to run the whole module locally, matching how a
future BacSystem developer would expect to spin up any module.

## 7. Out of scope (explicit YAGNI)

- Authentication/authorization on the API (no BacSystem-wide auth
  scheme exists yet to integrate with — revisit when one does).
- Outbox pattern / guaranteed event delivery (Section 4 — no real
  consumer exists yet).
- Per-product low-stock thresholds (Section 3 — single global threshold
  for now).
- The actual BacSystem shell/host application — out of scope for this
  module; `bs-inventory` is built to be composed into one later without
  needing changes.
- MUI X Premium/Pro features (pivoting, advanced grouping) — Community
  edition covers this module's needs.
- Kubernetes manifests / production deployment config beyond the local
  `docker-compose.yml`.
