# Subtract API — Design Spec

**Date:** 2026-07-17
**Status:** Approved

## 1. Goal

An HTTP API that subtracts two integers, self-contained in a `subtract/` directory
with its own Go module — the same shape as the earlier `factorial/` pilot, used here
as a smoke test for the `cys` plugin installed from its real GitHub marketplace
(no external skill dependency).

## 2. Architecture

Three layers, mirroring `factorial-api`:

- **`internal/subtract`** — pure computation package: `Compute(a, b int) int`.
- **`internal/handler`** — HTTP handler consuming `subtract.Compute`, parsing query
  params and writing JSON responses.
- **`cmd/server`** — wires the handler into a `net/http.ServeMux` via a `newMux()`
  function, tested directly (no live listener in tests).

Each layer is independently unit tested; the server layer is tested through
`newMux()` rather than a live network listener.

Because each layer consumes the previous one, the resulting plan is a mostly
sequential dependency chain (handler needs `subtract.Compute`; the server needs
the handler) — the same shape observed in the `factorial-api` pilot. This is
expected for a deliberately small scope; it still exercises the full
design → plan → parallel-run → merge → handoff pipeline end to end.

## 3. Interface

- **Endpoint:** `GET /subtract?a=<int>&b=<int>`
- **Success (200):** `{"result": <int>}`
- **Error (400):** `{"error": "<message>"}` for: missing `a` or `b`, or either
  value not a valid integer.
- No range limits: Go's `int` subtraction cannot overflow in a way that needs
  arbitrary-precision arithmetic (unlike the factorial pilot's `math/big` need).

## 4. Tech stack

Go (stdlib only: `net/http`, `encoding/json`, `strconv`). No external dependencies.
Module lives entirely under `subtract/` with its own `go.mod` (module name
`subtract`, `go 1.22` — required for `net/http`'s method-matching `ServeMux`
patterns like `"GET /subtract"`).

## 5. Testing

TDD per layer, same pattern as `factorial-api`:

- `internal/subtract`: table-driven unit tests covering positive/negative/zero
  results.
- `internal/handler`: `httptest`-based tests covering a valid request, missing
  `a`/`b`, and non-numeric values — status code and JSON body asserted for
  every case.
- `cmd/server`: a test exercising `newMux()` directly for the happy path and an
  unknown route (404).
- No manual smoke test step: this environment's Application Control policy
  blocks running a compiled Go binary (`go run`), observed in the factorial-api
  pilot; `httptest`-based tests give equivalent coverage without executing a
  standalone binary.

## 6. Out of scope

- No persistence, no auth, no additional endpoints beyond `/subtract`.
