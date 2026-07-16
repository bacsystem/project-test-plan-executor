# Design: Factorial API

## Purpose

Expose an HTTP API that, given a non-negative integer `n`, returns `n!`
(the factorial of `n`). This is a standalone feature, unrelated to the
Personas CRUD work on `feature/personas-crud`.

## Stack

- Go, standard library `net/http` (no external router/framework).
- `math/big` for arbitrary-precision arithmetic, since factorials grow
  past `int64` range quickly (21! already overflows a 64-bit integer).

## Project Layout

The API lives entirely inside a `factorial/` directory with its own Go
module, independent of the rest of the repo:

```
factorial/
  go.mod                          module "factorial"
  cmd/server/main.go              starts http.Server, registers routes
  internal/factorial/
    factorial.go                  Compute(n int) (*big.Int, error)
    factorial_test.go
  internal/handler/
    handler.go                    HTTP handler for GET /factorial
    handler_test.go
```

`internal/factorial` contains the pure computation logic (no HTTP
concerns), so it can be unit tested independently of the transport
layer. `internal/handler` depends on `internal/factorial` and translates
HTTP request/response semantics.

## API Contract

- `GET /factorial?n=<integer>`
- Success (200):
  ```json
  {"n": 5, "result": "120"}
  ```
  `result` is a string (not a JSON number) because it can exceed the
  precision/range of JSON numbers for large `n`.
- Error (400), body `{"error": "<message>"}`, for:
  - `n` query param missing
  - `n` not a valid integer
  - `n` negative
  - `n` greater than `MaxN`
- `0! = 1`.

## Limits

- `MaxN = 10000`, defined as a constant in `internal/factorial`. Requests
  with `n > MaxN` are rejected with 400 to avoid unbounded CPU/memory use
  from arbitrarily large computations. Adjustable later by changing the
  constant.

## Validation & Error Handling

- The handler parses `n` from the query string via `strconv.Atoi`. A
  parse failure (missing or non-numeric) returns 400 with a descriptive
  message.
- `internal/factorial.Compute` validates the range `0 <= n <= MaxN` and
  returns a typed error when out of range; the handler maps this to 400.
- Any other unexpected error falls back to a generic 500 (should not
  occur given the validation above).

## Testing Plan

- `factorial_test.go`: table-driven tests covering `n = 0, 1, 5, 20`
  (past int64 overflow), `10000` (boundary, accepted), `10001`
  (boundary, rejected), and negative `n` (rejected).
- `handler_test.go`: HTTP-level tests for a valid `n`, missing `n`,
  non-numeric `n`, negative `n`, and `n` exceeding `MaxN` — asserting
  status code and JSON response body for each.
