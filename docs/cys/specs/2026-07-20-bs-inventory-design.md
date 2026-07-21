# bs-inventory — Design Spec (v2)

**Date:** 2026-07-20
**Status:** Approved (supersedes the v1 spec of the same date — scope grew
substantially through design conversation: multi-tenancy, auth, warehouses/
sections, transfers, Kardex/PLE compliance, k6. This version replaces v1
entirely rather than patching it, since the domain model changed at its
core, not just additively.)

## 1. Goal

`bs-inventory` — the first module of a larger BacSystem system whose
modules must be independently integrable, and the first real multi-tenant,
multi-user module. Manages product catalog, multi-warehouse stock with
weighted-average costing, and Peru-specific inventory compliance (Kardex +
SUNAT's PLE 13.1 electronic book), architected so other LATAM countries'
regulatory rules can be added later without a redesign. Self-contained in
`bs-inventory/`, split into `backend/` (Go REST API + event publisher) and
`frontend/` (Next.js admin UI, a Multi-Zone). Also serves as a pilot
validating the `parallel-plan-executor` engine against a new stack (Go)
and a substantially larger, real-world module.

Integration model for future BacSystem modules: **REST API** (JWT-secured)
for synchronous reads/writes, **RabbitMQ events** for async notifications.
No shared BacSystem shell exists yet — the frontend is an independently
deployable **Next.js Multi-Zone**.

## 2. Stack

**Backend:** Go, `net/http` + `chi` router, PostgreSQL 16 (real, via
Docker), RabbitMQ 3.13 (real, via Docker), `golang-jwt/jwt/v5` for auth
tokens, `bcrypt` for password hashing. Testing: Go's `testing` package +
`testcontainers-go` — no mocked database or broker anywhere, per the
lesson from the persons-crud pilot where a mocks-only strategy missed a
real bug.

**Frontend:** the "Acorn" Next.js 16 (App Router) + MUI 9 admin template,
**MUI X Premium/Pro packages removed** (no commercial license — Community
edition covers this UI's needs), integrated via Next.js's native
**Multi-Zones** (confirmed the supported approach — Module Federation's
Next.js plugin explicitly does not support the App Router and its
maintainers describe it as sunsetting).

**Load testing:** k6, one script exercising the read-heavy path
(`GET /stock/{sku}`, `GET /products`) under concurrent virtual users.

## 3. Multi-tenancy and scalability posture

- **Isolation model:** shared schema, every tenant-scoped table carries a
  `tenant_id` column; every query filters by it. Chosen over schema- or
  database-per-tenant specifically because it scales horizontally without
  per-tenant migration/connection-pool overhead growing with tenant count.
- **Enforcement:** a single HTTP middleware resolves `tenant_id` from the
  validated JWT and injects it into the request context; every repository
  method takes it as an explicit parameter (never inferred implicitly)
  so a missing-filter bug fails loudly (wrong/empty results) rather than
  silently leaking cross-tenant data.
- **Statelessness:** JWTs carry all auth state (no server-side session
  store), and the backend holds no in-process state beyond a DB
  connection pool — any number of backend replicas can run behind a load
  balancer without sticky sessions. **Explicit scope cut:** no Kubernetes
  manifests or autoscaling config in this version — the design is
  *stateless-ready*, but actual orchestration is deferred until there's a
  real need to run more than one replica.

## 4. Domain model

- **Tenant**: `id`, `name`, `countryCode` (e.g. `"PE"` — selects the
  regulatory profile, §8), `createdAt`.
- **User**: `id`, `tenantID`, `email` (unique per tenant), `passwordHash`
  (bcrypt), `role` (`admin` | `member`), `createdAt`.
- **Warehouse**: `id`, `tenantID`, `name`, `code`, `rucEstablishmentCode`
  — the address/establishment code as registered in the tenant's RUC;
  required for a transfer's Guía de Remisión reference to be valid
  (§8.3), `createdAt`.
- **Section**: `id`, `warehouseID`, `name`, `code`, `createdAt` — one
  level of subdivision inside a warehouse (e.g. "Electrónica"), not a
  full bin-level WMS hierarchy (explicit scope decision — a warehouse→
  section granularity is a well-attested middle ground for this class of
  system, not a corner cut; full bin/pick-path tracking is for
  high-volume 3PL/regulated operations this module doesn't need yet).
- **Product**: `tenantID` + `sku` (unique **per tenant**, not globally —
  multi-tenant), `name`, `category`, `unitOfMeasureCode` (SUNAT Tabla 6
  code, needed for PLE export), `createdAt`.
- **StockMovement** (append-only, the audit-trail source of truth — never
  updated or deleted): `id`, `tenantID`, `productSKU`, `warehouseID`,
  `sectionID`, `quantity` (positive int), `unitCost` (decimal), `type`
  (`IN` | `OUT`), `documentType`/`documentSeries`/`documentNumber` (the
  originating document, per PLE's required fields), `transferID`
  (nullable — links the paired OUT+IN rows of one atomic transfer),
  `guideNumber` (nullable — the Guía de Remisión reference for a
  transfer, entered manually; see §8.3 for why this is reference-only in
  this version), `occurredAt`.
- **StockLevel** (materialized, **new in this version** — see §5):
  one row per `(tenantID, productSKU, warehouseID, sectionID)`:
  `quantity`, `avgUnitCost`, `totalValue`, `updatedAt`.
- **Low-stock threshold**: a single configurable value per tenant (not
  yet per-product — no evidence different products need different
  thresholds).

## 5. Stock architecture: materialized balance + movement log

**Changed from v1.** The original design computed current stock by
replaying every movement on each read (`ComputeStock`). Verified against
real engineering practice before finalizing this version — not a stylistic
preference:

- Odoo (one of the most-deployed open-source inventory systems) maintains
  exactly this split: `stock.move` as the immutable historical ledger,
  `stock.quant` as a separate, live, updated-in-place current-balance
  table — explicitly for performance (a community answer states plainly
  that computing availability from full move history means reading up to
  a million-plus rows, versus 0–100 with quants).
- A published event-sourced-inventory benchmark measured ~310ms (full
  replay) vs. ~4ms (materialized snapshot + fold of only same-day
  events) at p95 — roughly 75x, and the gap widens as history grows,
  since replay is O(total history) while the materialized read is O(1).
- Salesforce's own inventory-availability engineering blog and Martin
  Fowler's canonical event-sourcing writeup converge on the same
  pattern: the event log is authoritative for audit/replay, but a
  materialized/cached current-state view is what serves reads at scale.

**This version's design:**

1. `stock_movements` stays the append-only audit trail (unchanged intent
   from v1).
2. **New**: `stock_levels`, one row per `(tenant, product, warehouse,
   section)`, updated **in the same Postgres transaction** as every
   movement insert — never via a separate async job, so there is no
   window where the two disagree.
3. `stock_levels` is treated as *derived*, not independently
   authoritative: a reconciliation query (recompute from
   `stock_movements`, compare against the stored row) exists for
   diagnosing drift, matching the "recompute-and-compare" pattern every
   source above converges on. **Explicit scope cut**: this reconciliation
   is a query/tool, not a scheduled job, for this version — no evidence
   yet of drift actually occurring.

### Weighted-average costing (moving average)

Applied on every movement via one pure function,
`ApplyMovement(current StockLevel, m StockMovement) (StockLevel, error)`:

- **IN**: `newQty = current.Quantity + m.Quantity`;
  `newAvgCost = (current.Quantity*current.AvgUnitCost + m.Quantity*m.UnitCost) / newQty`.
  This is the standard moving-average formula, verified against a worked
  numeric example (AccountingTools): the average **only changes on
  receipts**, never on an outgoing movement.
- **OUT**: `newQty = current.Quantity - m.Quantity` (rejected if this
  would go negative — see below); `avgUnitCost` **unchanged**;
  `totalValue = newQty * avgUnitCost`.
- **Negative stock**: **rejected outright** (`400`, "insufficient stock at
  this location") in this version — the simplest, safest default, and
  what most systems do absent a specific reason to allow it. Allowing
  negative stock would require a fallback-costing policy (e.g. "value at
  last known cost") and a later reconciliation step once a real receipt
  price is known — real but genuinely speculative complexity with no
  evidence yet that this module needs it.
- **Returns / corrections that add stock back**: recorded as an ordinary
  `IN` movement priced at the **current average cost at the time of the
  return**, not the original transaction's cost — verified directly
  against Odoo's documented behavior (a worked example: 2 units on hand
  at $12 average; returning 1 unit originally bought at $10 removes it
  at the *current* $12, and the average of the remaining unit stays
  $12 — recalculating on the original $10 would leave a nonsensical
  "value remaining with zero units"). This is a **documentation/
  operating-convention constraint** for whoever creates a "return"
  movement (there is no separate `ReturnMovement` type in this version —
  a return is just an `IN` movement, priced correctly by the caller),
  not new API surface.

### Warehouse transfers

A transfer is **two `StockMovement` rows in one Postgres transaction**,
sharing a `transferID`: an `OUT` from the source `(warehouseID,
sectionID)` and an `IN` to the destination, same product and quantity,
**`unitCost` = the source location's current average cost** (moving
already-owned, already-valued stock — not a new purchase at a new
price). Both `stock_levels` rows update atomically. Explicitly
**instantaneous** (no in-transit/pending-receipt state) — the atomic
"source decreases, destination increases in one transaction" model,
chosen over a multi-step transfer-order lifecycle since this module
doesn't yet model the geographically-separated, multi-day transit case
that lifecycle exists for.

## 6. Auth and multi-user

Self-contained in this version (no BacSystem-wide identity provider
exists yet):

| Method | Path | Purpose |
|---|---|---|
| POST | `/api/v1/auth/tenants` | Register a new tenant + its first `admin` user |
| POST | `/api/v1/auth/login` | Returns a JWT (claims: `userID`, `tenantID`, `role`) |

All other endpoints require `Authorization: Bearer <jwt>`; a middleware
validates the token and injects `tenantID`/`userID`/`role` into the
request context. Passwords hashed with bcrypt, never stored or logged in
plaintext. **Explicit scope cut**: no password-reset flow, no OAuth/SSO,
no per-endpoint role-based permission matrix beyond a basic
admin-vs-member distinction — revisit once BacSystem's real identity
strategy exists (this module's JWT approach is meant to be swappable
for a shared IdP later without changing the request-context contract).

## 7. Backend — REST API

All paths below except `/api/v1/auth/*` and `/healthz` require a valid
JWT and are implicitly scoped to the caller's `tenantID`.

| Method | Path | Success | Failure modes |
|---|---|---|---|
| POST | `/api/v1/auth/tenants` | 201, tenant + admin user | 400 validation, 409 duplicate email |
| POST | `/api/v1/auth/login` | 200, `{"token": "..."}` | 401 invalid credentials |
| POST | `/api/v1/warehouses` | 201, created warehouse | 400 validation |
| GET | `/api/v1/warehouses` | 200, list | — |
| POST | `/api/v1/warehouses/{id}/sections` | 201, created section | 400 validation, 404 unknown warehouse |
| GET | `/api/v1/warehouses/{id}/sections` | 200, list | 404 unknown warehouse |
| POST | `/api/v1/products` | 201, created product | 400 validation, 409 duplicate SKU (per tenant) |
| GET | `/api/v1/products` | 200, paginated list | — |
| GET | `/api/v1/products/{sku}` | 200, product | 404 not found |
| GET | `/api/v1/products/{sku}/movements` | 200, movement history | 404 unknown SKU |
| POST | `/api/v1/stock/movements` | 201, created movement | 400 validation, 404 unknown SKU/warehouse/section, 409 insufficient stock (OUT) |
| POST | `/api/v1/stock/transfers` | 201, both movements + updated levels | 400 validation, 404 unknown SKU/warehouse/section, 409 insufficient stock |
| GET | `/api/v1/stock/{sku}` | 200, level(s) — by warehouse or aggregated total | 404 unknown SKU |
| GET | `/api/v1/stock/low` | 200, products at/below tenant's threshold | — |
| GET | `/api/v1/reports/valuation` | 200, total inventory value, by warehouse + consolidated | — |
| GET | `/api/v1/compliance/kardex/{sku}` | 200, valorized ledger for the product | 404 unknown SKU |
| GET | `/api/v1/compliance/ple-export` | 200, PLE 13.1 file (`text/plain`, pipe-delimited) | 400 if tenant's country has no implemented profile |
| GET | `/healthz` | 200, `{"status": "ok"}` | — |

### Events published (RabbitMQ)

Exchange: `bs-inventory.events` (topic exchange), all payloads carry
`tenantID`.

- `stock.updated` — after every movement (including each half of a
  transfer). Payload: `{"tenantId", "sku", "warehouseId", "sectionId", "quantity", "avgUnitCost", "movementType", "occurredAt"}`.
- `stock.low` — on the crossing (not every movement while already low).
  Payload: `{"tenantId", "sku", "quantity", "threshold"}`.

### Error handling

- Every movement (including a transfer's two rows) commits inside one
  Postgres transaction, updating `stock_movements` and `stock_levels`
  together — never partially.
- A failed RabbitMQ publish after a successful commit does **not** fail
  the HTTP response (the movement is real and committed) — logged, not
  surfaced. **Explicit scope cut, unchanged from v1**: no outbox pattern
  yet — no real consumer exists to depend on guaranteed delivery.
- `400` for validation and insufficient-stock-on-OUT; `404` for unknown
  SKU/warehouse/section; `409` for duplicate SKU/email; `401` for bad
  credentials or a missing/invalid JWT.

## 8. Compliance (Peru, extensible to other LATAM countries)

### 8.1 Regulatory profile abstraction

```go
type RegulatoryProfile interface {
    ExportLedger(ctx context.Context, tenantID string, period string) ([]byte, error)
}
```

Selected per-tenant by `Tenant.CountryCode`. **Only Peru is implemented**
in this version; adding Colombia/Chile/Mexico/etc. later means writing a
new implementation of this interface, not redesigning the domain model —
there is no evidence yet of a second country's tenant to build against,
so nothing beyond the interface itself is spent on them now.

### 8.2 Peru: Kardex + PLE 13.1

- **Kardex** (`GET /compliance/kardex/{sku}`): a per-product ledger
  showing, for each movement in order: date, document reference, entry
  quantity/unit cost/total, exit quantity/unit cost/total, and running
  balance quantity/unit cost/total — i.e. exactly the `stock_levels`
  progression over time, reconstructed by replaying that product's
  movements once for the export (the one place a full replay remains
  correct and appropriate: an on-demand compliance report, not a
  hot read path).
- **PLE 13.1** ("Registro de Inventario Permanente Valorizado — Detalle
  del método de valuación"): verified directly against SUNAT's own
  published structure (Anexo 2, base norm RS 286-2009/SUNAT, amended by
  RS 361-2015 and RS 315-2018 — not the older, superseded
  `234_formato131.xls`), not transcribed from a secondary summary.
  Pipe-delimited (`|`) plain text, 27 mandatory fields per row: período,
  CUO, correlativo del asiento, código de establecimiento anexo (→ this
  module's `Warehouse.rucEstablishmentCode`), código de catálogo de
  existencias, tipo de existencia, código propio de la existencia
  (→ `Product.sku`), código UNSPSC/GTIN catalog fields, fecha de emisión
  del documento, tipo/serie/número de documento (→ `StockMovement`'s
  document fields), tipo de operación, descripción de la existencia,
  código de unidad de medida (→ `Product.unitOfMeasureCode`), método de
  valuación, entrada (cantidad/costo unitario/costo total), salida
  (cantidad/costo unitario/costo total), saldo final (cantidad/costo
  unitario/costo total), estado de la operación. Filename convention:
  `LE` + RUC(11) + período + `00` + `130100` + `00` + operation/content/
  currency indicators + `1` + `.TXT` (33 chars total) — implemented as a
  documented constant-building function, not hand-typed per export.
- **Valuation method**: Peru's tax rules (Directiva N° 002-2000-SUNAT,
  art. 62 Ley del Impuesto a la Renta) permit several methods and do
  **not** mandate one; weighted average (`promedio ponderado`) is
  squarely among the accepted set (LIFO is the one explicitly excluded,
  consistent with the IFRS/IAS 2 ban) — this module's already-chosen
  method needs no special-casing to be compliant.

### 8.3 Guía de Remisión — reference only in this version

Verified directly against SUNAT's Reglamento de Comprobantes de Pago
(RS 007-99/SUNAT, Cap. V): **moving goods between a tenant's own
warehouses is explicitly a covered case** ("traslado entre
establecimiento de la misma empresa"), with no minimum value/distance
threshold exempting it, and **both the origin and destination addresses
must be registered as establishments in the tenant's RUC** for the guide
to be valid — this is exactly why `Warehouse.rucEstablishmentCode` exists
in this version's domain model (§4).

**Explicit scope cut**: this version does **not** integrate SUNAT's
electronic GRE (`cpe.sunat.gob.pe`) — that requires digital-certificate
signing and its own API integration, a distinct subsystem. A transfer
instead carries a `guideNumber` **reference** field (entered manually,
guide issued outside this system for now) — the data model is ready to
attach real GRE issuance later without a schema change, but building
that issuance flow now would be speculative (no tenant has hit this
requirement in practice yet inside this module).

## 9. Backend architecture

```
bs-inventory/backend/
  go.mod
  cmd/server/main.go        — wiring: config, DB pool, RabbitMQ conn, router, listen
  internal/domain/          — Tenant, User, Warehouse, Section, Product,
                               StockMovement, StockLevel, ApplyMovement (pure)
  internal/auth/            — JWT issuance/validation, bcrypt hashing, tenant-context middleware
  internal/postgres/        — repository implementations, tenant_id-scoped
  internal/events/          — RabbitMQ publisher, event payload types
  internal/compliance/      — RegulatoryProfile interface + Peru (Kardex/PLE) implementation
  internal/http/            — handlers, router, request/response DTOs
  internal/http/middleware/ — auth/tenant context, request logging, recover
  k6/                       — load test script(s)
```

## 10. Frontend

### Starting point

Seeded from the Acorn Next.js admin template (App Router, MUI theming,
layout/navigation, auth scaffolding kept; MUI X Premium/Pro removed;
Node version reconciled to the template's own `.nvmrc`, `22.14.0`, and
mechanically enforced via `engine-strict=true`, since it and
`package.json`'s `engines.node` disagreed and neither was enforced).

### Pages

- `/login` — email/password, stores the JWT.
- `/warehouses` — list/create warehouses and their sections.
- `/products` — list (MUI X Community `DataGrid`), create/edit dialog.
- `/products/[sku]` — detail + movement history.
- `/stock/movements/new` — record an IN/OUT movement (warehouse + section
  required).
- `/stock/transfers/new` — transfer form (source + destination
  warehouse/section, quantity, optional guide number reference).
- `/stock/low` — low-stock report.
- `/reports/valuation` — total inventory value, by warehouse + consolidated.

### Multi-Zone setup

Unchanged from v1: `basePath: '/inventory'`, deployed as its own
standalone Next.js server; cross-zone links use plain `<a>` tags per
Multi-Zones' own requirement (noted in a code comment so a future
contributor doesn't "fix" it into a `<Link>`).

### Testing strategy

Component/unit tests (Vitest + RTL) for forms/validation; one end-to-end
Playwright smoke test against the real backend (via Docker Compose):
login, create a warehouse+section, create a product, record a movement,
see it reflected in stock.

## 11. Load testing (k6)

One script, `k6/stock-read.js`, simulating concurrent virtual users
hitting `GET /api/v1/stock/{sku}` and `GET /api/v1/products` (the
read-heavy path most inventory systems see in practice) against a real
running stack (Docker Compose), with latency thresholds (e.g. p95 under
a set bound) as pass/fail criteria — not just a smoke run.

## 12. Local development

`docker-compose.yml` at `bs-inventory/` starts Postgres, RabbitMQ, the
Go backend, and the Next.js frontend — one command
(`docker compose up`) for the whole module.

## 13. Out of scope (explicit YAGNI)

- Electronic GRE integration with SUNAT (§8.3) — reference field only.
- Any regulatory profile beyond Peru (§8.1) — architecture is extensible,
  no second country implemented without evidence one is needed.
- Stock reservations / on-hand-vs-available distinction — relevant once
  a sales/order module exists; this module has no orders yet.
- Lot/serial/expiration-date tracking, unit-of-measure conversions
  between purchase/storage/sale units, automatic reorder-point
  replenishment, backorders, cycle counting — all real, well-attested
  features of mature inventory systems (confirmed via Odoo/NetSuite/SAP/
  Zoho documentation), each a genuine scope addition with no evidence
  yet that this module's actual tenants need them.
- Bin-level warehouse location tracking (only warehouse→section) —
  a well-attested, deliberate middle ground for this class of system,
  not a corner cut; full bin/pick-path optimization is for high-volume
  3PL/regulated operations.
- Password reset, OAuth/SSO, fine-grained role/permission matrix beyond
  admin/member (§6).
- Kubernetes manifests / autoscaling config (§3) — stateless-ready, not
  deployed at that scale yet.
- Outbox pattern / guaranteed event delivery (§7) — no real event
  consumer exists yet.
- A scheduled `stock_levels` reconciliation job (§5) — the
  recompute-and-compare capability exists as a query/tool, not
  automated, absent evidence of real drift.
