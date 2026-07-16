# Factorial API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an HTTP API that returns the factorial of a non-negative integer `n`, self-contained in a `factorial/` directory with its own Go module.

**Architecture:** A pure computation package (`internal/factorial`, `math/big`-based) is consumed by an HTTP handler (`internal/handler`), which is wired into a `net/http` server in `cmd/server`. Each layer is independently unit tested; the server layer is tested via its route-registration function rather than a live network listener.

**Tech Stack:** Go (stdlib only: `net/http`, `math/big`, `encoding/json`, `strconv`). No external dependencies.

## Global Constraints

- Module lives entirely under `factorial/` with its own `go.mod` (module name `factorial`, `go 1.22` — required for `net/http`'s method-matching `ServeMux` patterns like `"GET /factorial"`).
- Endpoint: `GET /factorial?n=<integer>`.
- Success response (200): `{"n": <int>, "result": "<string>"}` — `result` is a JSON string, not a number, because it can exceed JSON-safe integer range.
- Error response (400): `{"error": "<message>"}` for: missing `n`, non-integer `n`, negative `n`, `n > MaxN`.
- `MaxN = 10000`, defined as a constant in `internal/factorial`.
- `0! = 1`.
- No external dependencies — stdlib only.

---

### Task 1: Factorial computation logic

**Files:**
- Create: `factorial/go.mod`
- Create: `factorial/internal/factorial/factorial.go`
- Test: `factorial/internal/factorial/factorial_test.go`

**Interfaces:**
- Produces: `factorial.Compute(n int) (*big.Int, error)` — returns `n!` or an error if `n` is negative or exceeds `factorial.MaxN`.
- Produces: `factorial.MaxN` — exported `const int`, value `10000`.
- Produces: `factorial.ErrNegative` — exported sentinel `error`, returned when `n < 0`.

- [ ] **Step 1: Initialize the Go module**

Run these commands from the repo root:

```bash
mkdir -p factorial/internal/factorial
```

```bash
go -C factorial mod init factorial
```

Expected: creates `factorial/go.mod` containing `module factorial` and a `go` directive. Then edit `factorial/go.mod` so the `go` directive reads exactly:

```
module factorial

go 1.22
```

- [ ] **Step 2: Write the failing test**

Create `factorial/internal/factorial/factorial_test.go`:

```go
package factorial

import (
	"testing"
)

func TestCompute(t *testing.T) {
	tests := []struct {
		name    string
		n       int
		want    string
		wantErr bool
	}{
		{name: "zero", n: 0, want: "1"},
		{name: "one", n: 1, want: "1"},
		{name: "five", n: 5, want: "120"},
		{name: "twenty_past_int64_overflow", n: 20, want: "2432902008176640000"},
		{name: "negative", n: -1, wantErr: true},
		{name: "boundary_rejected", n: MaxN + 1, wantErr: true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Compute(tt.n)

			if tt.wantErr {
				if err == nil {
					t.Fatalf("Compute(%d): expected error, got nil", tt.n)
				}
				return
			}

			if err != nil {
				t.Fatalf("Compute(%d): unexpected error: %v", tt.n, err)
			}

			if got.String() != tt.want {
				t.Errorf("Compute(%d) = %s, want %s", tt.n, got.String(), tt.want)
			}
		})
	}
}

func TestCompute_NegativeReturnsErrNegative(t *testing.T) {
	_, err := Compute(-1)
	if err != ErrNegative {
		t.Errorf("Compute(-1) error = %v, want ErrNegative", err)
	}
}

func TestCompute_MaxNBoundaryAccepted(t *testing.T) {
	got, err := Compute(MaxN)
	if err != nil {
		t.Fatalf("Compute(%d): unexpected error: %v", MaxN, err)
	}
	if got.Sign() <= 0 {
		t.Errorf("Compute(%d) = %s, want a positive number", MaxN, got.String())
	}
}
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `go -C factorial test ./internal/factorial/... -v`
Expected: FAIL — build error, `Compute`, `MaxN`, and `ErrNegative` are undefined.

- [ ] **Step 4: Write the minimal implementation**

Create `factorial/internal/factorial/factorial.go`:

```go
package factorial

import (
	"errors"
	"fmt"
	"math/big"
)

// MaxN is the largest n accepted by Compute, bounding CPU/memory use per request.
const MaxN = 10000

// ErrNegative is returned by Compute when n is negative.
var ErrNegative = errors.New("n must not be negative")

// Compute returns n! as an arbitrary-precision integer.
// It returns ErrNegative if n < 0, or an error if n > MaxN.
func Compute(n int) (*big.Int, error) {
	if n < 0 {
		return nil, ErrNegative
	}
	if n > MaxN {
		return nil, fmt.Errorf("n must not exceed %d", MaxN)
	}

	result := big.NewInt(1)
	for i := 2; i <= n; i++ {
		result.Mul(result, big.NewInt(int64(i)))
	}
	return result, nil
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `go -C factorial test ./internal/factorial/... -v`
Expected: PASS, all subtests green.

- [ ] **Step 6: Commit**

```bash
git add factorial/go.mod factorial/internal/factorial/factorial.go factorial/internal/factorial/factorial_test.go
```

```bash
git commit -m "feat(factorial): add Compute with math/big and MaxN guard"
```

---

### Task 2: HTTP handler

**Files:**
- Create: `factorial/internal/handler/handler.go`
- Test: `factorial/internal/handler/handler_test.go`

**Interfaces:**
- Consumes: `factorial.Compute(n int) (*big.Int, error)`, `factorial.MaxN`, `factorial.ErrNegative` (from Task 1, package `factorial/internal/factorial`).
- Produces: `handler.Factorial` — a function with signature `func(w http.ResponseWriter, r *http.Request)`, usable directly as an `http.HandlerFunc`.

- [ ] **Step 1: Write the failing test**

Create `factorial/internal/handler/handler_test.go`:

```go
package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestFactorial_Valid(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=5", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		N      int    `json:"n"`
		Result string `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.N != 5 || body.Result != "120" {
		t.Errorf("body = %+v, want {N:5 Result:120}", body)
	}
}

func TestFactorial_Zero(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=0", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Result string `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Result != "1" {
		t.Errorf("Result = %q, want %q", body.Result, "1")
	}
}

func TestFactorial_MissingParam(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestFactorial_NonNumeric(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=abc", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestFactorial_Negative(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=-1", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestFactorial_ExceedsMax(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=10001", nil)
	rec := httptest.NewRecorder()

	Factorial(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `go -C factorial test ./internal/handler/... -v`
Expected: FAIL — build error, package `handler` and `Factorial` do not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `factorial/internal/handler/handler.go`:

```go
package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"factorial/internal/factorial"
)

type successResponse struct {
	N      int    `json:"n"`
	Result string `json:"result"`
}

type errorResponse struct {
	Error string `json:"error"`
}

// Factorial handles GET /factorial?n=<integer>, returning n! as JSON.
func Factorial(w http.ResponseWriter, r *http.Request) {
	raw := r.URL.Query().Get("n")
	if raw == "" {
		writeError(w, http.StatusBadRequest, "missing required query parameter 'n'")
		return
	}

	n, err := strconv.Atoi(raw)
	if err != nil {
		writeError(w, http.StatusBadRequest, "'n' must be a valid integer")
		return
	}

	result, err := factorial.Compute(n)
	if err != nil {
		writeError(w, http.StatusBadRequest, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, successResponse{N: n, Result: result.String()})
}

func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, errorResponse{Error: message})
}

func writeJSON(w http.ResponseWriter, status int, body any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(body)
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `go -C factorial test ./internal/handler/... -v`
Expected: PASS, all subtests green.

- [ ] **Step 5: Commit**

```bash
git add factorial/internal/handler/handler.go factorial/internal/handler/handler_test.go
```

```bash
git commit -m "feat(handler): add GET /factorial handler with JSON responses"
```

---

### Task 3: Server wiring

**Files:**
- Create: `factorial/cmd/server/main.go`
- Test: `factorial/cmd/server/main_test.go`

**Interfaces:**
- Consumes: `handler.Factorial` (from Task 2, package `factorial/internal/handler`), signature `func(w http.ResponseWriter, r *http.Request)`.
- Produces: `newMux() *http.ServeMux` — unexported route-registration function, used by `main()` and tested directly.

- [ ] **Step 1: Write the failing test**

Create `factorial/cmd/server/main_test.go`:

```go
package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewMux_RoutesFactorial(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/factorial?n=5", nil)
	rec := httptest.NewRecorder()

	newMux().ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}
}

func TestNewMux_UnknownRouteReturns404(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/unknown", nil)
	rec := httptest.NewRecorder()

	newMux().ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusNotFound)
	}
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `go -C factorial test ./cmd/server/... -v`
Expected: FAIL — build error, `newMux` is undefined (package `main` has no other files yet).

- [ ] **Step 3: Write the minimal implementation**

Create `factorial/cmd/server/main.go`:

```go
package main

import (
	"log"
	"net/http"
	"os"

	"factorial/internal/handler"
)

func newMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /factorial", handler.Factorial)
	return mux
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	addr := ":" + port
	log.Printf("listening on %s", addr)
	if err := http.ListenAndServe(addr, newMux()); err != nil {
		log.Fatal(err)
	}
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `go -C factorial test ./cmd/server/... -v`
Expected: PASS, both subtests green.

- [ ] **Step 5: Run the full module test suite**

Run: `go -C factorial test ./...`
Expected: `ok` for all three packages (`internal/factorial`, `internal/handler`, `cmd/server`).

- [ ] **Step 6: Manual smoke test**

Start the server in the background:

```bash
go -C factorial run ./cmd/server &
```

Wait a moment for it to start, then exercise it:

```bash
curl -s "http://localhost:8080/factorial?n=5"
```

Expected: `{"n":5,"result":"120"}`

```bash
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:8080/factorial?n=-1"
```

Expected: `400`

Stop the background server:

```bash
kill %1
```

- [ ] **Step 7: Commit**

```bash
git add factorial/cmd/server/main.go factorial/cmd/server/main_test.go
```

```bash
git commit -m "feat(server): wire GET /factorial into net/http server"
```
