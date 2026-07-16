# Personas CRUD — Design Spec

## Purpose

A backend CRUD service for managing "personas" (people records), built as the first
real-world production run of `parallel-plan-executor` — Anthropic Claude Code's
DAG-parallel Workflow that executes a `superpowers:writing-plans` implementation plan
with independent tasks running in parallel via isolated git worktrees, adversarial
review, and a git-flow-style handoff.

## Stack

- **Language**: Go 1.26 (module target: Go 1.22+ for native method routing).
- **HTTP**: `net/http` standard library only — no router framework. Go 1.22+ supports
  method + path-parameter patterns natively (`"GET /api/v1/personas/{id}"`).
- **Persistence**: MongoDB via the official `go.mongodb.org/mongo-driver`, running
  locally in Docker (`docker run -d --name personas-mongo -p 27017:27017 mongo:7`) —
  must be up before the implementation run so integration tests can exercise it.
- **Zero other runtime dependencies.**

## Domain model

```go
type Person struct {
    ID              string    // Mongo ObjectID as hex string
    Nombres         string    // required
    Apellidos       string    // required
    Documento       string    // required, unique across all persons
    Email           string    // required, valid email format
    FechaNacimiento string    // required, "YYYY-MM-DD", must not be in the future
    Telefono        string    // optional
}
```

Validation rules live in the domain package and are the single source of truth for
"is this Person valid" — both the service layer and any future caller use them.

## REST API

| Method | Path                     | Success | Failure modes |
|--------|--------------------------|---------|----------------|
| POST   | `/api/v1/personas`       | 201, body = created person, `Location` header | 400 validation, 409 duplicate `documento` |
| GET    | `/api/v1/personas/{id}`  | 200, body = person | 404 not found |
| GET    | `/api/v1/personas?page=1&size=20` | 200, body = `{data: [...], page, size, total}` | 400 invalid pagination params |
| PUT    | `/api/v1/personas/{id}`  | 200, body = updated person | 400 validation, 404 not found, 409 duplicate `documento` |
| DELETE | `/api/v1/personas/{id}`  | 204 | 404 not found |

Errors are always JSON: `{"error": {"code": "VALIDATION_ERROR", "message": "..."}}` —
`code` is one of `VALIDATION_ERROR`, `NOT_FOUND`, `DUPLICATE_DOCUMENTO`,
`INVALID_PAGINATION`, `INTERNAL_ERROR`. Pagination defaults: `page=1`, `size=20`,
`size` capped at 100.

## Architecture

Layered design (handler → service → repository interface → implementation), chosen so
each layer is independently testable and the DAG can parallelize real work:

```
cmd/server/main.go
    Wires everything together: reads MONGO_URI and PORT from env (with defaults),
    connects to Mongo, constructs the repository → service → handlers chain, starts
    the HTTP server.

internal/domain/person.go
    Person struct + Validate() error. Domain-level sentinel errors are NOT here —
    those belong to the repository (they're about storage, not shape).

internal/repository/repository.go
    type PersonRepository interface {
        Create(ctx, Person) (Person, error)
        GetByID(ctx, id string) (Person, error)
        List(ctx, page, size int) ([]Person, int, error)  // returns items, total
        Update(ctx, id string, Person) (Person, error)
        Delete(ctx, id string) error
    }
    Sentinel errors: ErrNotFound, ErrDuplicateDocumento — both interface consumers
    (service) and both implementations depend on these being the SAME errors.

internal/repository/memory.go
    In-memory implementation (map + mutex) satisfying PersonRepository. Used by
    service and handler unit tests — no real dependency needed to test business logic.

internal/repository/mongo.go
    Real implementation. Ensures a unique index on `documento` at startup; maps Mongo's
    duplicate-key error to ErrDuplicateDocumento, "no documents" to ErrNotFound.

internal/service/person_service.go
    Business rules: validates via domain.Person.Validate(), normalizes pagination
    params (defaults, size cap), delegates storage to PersonRepository. This is where
    "what does an update even mean" (partial vs full replace — full replace, see below)
    is decided.

internal/httpapi/handlers.go
    net/http handlers: decode JSON, call service, encode JSON, map service/repository
    errors to HTTP status codes and the error envelope above.
```

**Update semantics**: PUT is a full replace (matches plan's PUT verb) — the client
sends the complete Person; the service does not merge partial fields.

## Error handling

Errors flow up as typed Go errors (`domain` validation errors, repository sentinels)
and are translated to HTTP status **only** at the handler layer — service and
repository stay HTTP-agnostic. `errors.Is` is used for the sentinel comparisons so
wrapping (`fmt.Errorf("...: %w", err)`) doesn't break the mapping.

## Testing strategy

- **Unit tests (no Mongo required, always run)**: `domain` validation table tests;
  `service` and `httpapi` tests using the in-memory repository — including
  `httptest.NewRecorder()` for handler tests covering every status code in the table
  above.
- **Integration tests (`internal/repository/mongo_test.go`)**: exercise the real Mongo
  implementation against `localhost:27017`. Skip automatically (`t.Skip`) if Mongo is
  unreachable at test start, so `go test ./...` never fails on a machine without the
  container running.

## Execution plan (parallel-plan-executor)

Six tasks, DAG:

```
1 domain ──→ 2 repo (interface + memory) ──┬→ 3 repo mongo ──┐
                                            └→ 4 service ──→ 5 handlers ──┴→ 6 main wiring
```

Task 3 (Mongo) and Task 4 (service) are independent once Task 2 lands — real
parallelism. Task 6 joins everything for `main.go` wiring + a smoke-test-level
integration check.

- Repo: `github.com/bacsystem/project-test-plan-executor` (cloned to
  `D:/github/project-test-plan-executor`).
- Branches: `main` (release) ← `develop` (integration) ← `feature/personas-crud`
  (**integrationBranch** — task branches merge here, per the workflow's recommended
  topology; `develop`/`main` are never touched by agents).
- `openPr: true`, `pr: { base: "develop" }` — first live exercise of the workflow's
  automatic PR creation (Handoff phase, v0.5.0).

## Out of scope (explicit YAGNI)

- Authentication/authorization.
- Soft-delete, audit fields (`createdAt`/`updatedAt`).
- Search/filter beyond pagination.
- Rate limiting, request logging middleware, OpenAPI spec generation.
- Docker Compose / deployment manifests for the service itself (only the Mongo
  dependency is containerized, for local dev/test).
