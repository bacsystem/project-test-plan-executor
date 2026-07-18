# Subtract API Implementation Plan

> **For agentic workers:** execute this plan with the
> parallel-plan-executor Workflow (cys:run / the /cys:run-plan command).
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an HTTP API that subtracts two integers, self-contained in a `subtract/` directory with its own Go module.

**Architecture:** A pure computation package (`internal/subtract`) is consumed by an HTTP handler (`internal/handler`), which is wired into a `net/http` server in `cmd/server`. Each layer is independently unit tested; the server layer is tested via its route-registration function rather than a live network listener.

**Tech Stack:** Go (stdlib only: `net/http`, `encoding/json`, `strconv`). No external dependencies.

## Global Constraints

- Module lives entirely under `subtract/` with its own `go.mod` (module name `subtract`, `go 1.22` — required for `net/http`'s method-matching `ServeMux` patterns like `"GET /subtract"`).
- Endpoint: `GET /subtract?a=<int>&b=<int>`.
- Success response (200): `{"result": <int>}`.
- Error response (400): `{"error": "<message>"}` for: missing `a` or `b`, or either value not a valid integer.
- No range limits — Go's `int` subtraction cannot overflow in a way requiring arbitrary-precision arithmetic.
- No external dependencies — stdlib only.

---

### Task 1: Subtraction computation logic

**Files:**
- Create: `subtract/go.mod`
- Create: `subtract/internal/subtract/subtract.go`
- Test: `subtract/internal/subtract/subtract_test.go`

**Interfaces:**
- Produces: `subtract.Compute(a int, b int) int` — returns `a - b`.

- [ ] **Step 1: Initialize the Go module**

Run these commands from the repo root:

```bash
mkdir -p subtract/internal/subtract
```

```bash
go -C subtract mod init subtract
```

Expected: creates `subtract/go.mod` containing `module subtract` and a `go` directive. Then edit `subtract/go.mod` so the `go` directive reads exactly:

```
module subtract

go 1.22
```

- [ ] **Step 2: Write the failing test**

Create `subtract/internal/subtract/subtract_test.go`:

```go
package subtract

import "testing"

func TestCompute(t *testing.T) {
	tests := []struct {
		name string
		a, b int
		want int
	}{
		{name: "positive_result", a: 5, b: 3, want: 2},
		{name: "negative_result", a: 3, b: 5, want: -2},
		{name: "zero", a: 4, b: 4, want: 0},
		{name: "subtract_zero", a: 7, b: 0, want: 7},
		{name: "both_negative", a: -3, b: -5, want: 2},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got := Compute(tt.a, tt.b)
			if got != tt.want {
				t.Errorf("Compute(%d, %d) = %d, want %d", tt.a, tt.b, got, tt.want)
			}
		})
	}
}
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `go -C subtract test ./internal/subtract/... -v`
Expected: FAIL — build error, `Compute` is undefined.

- [ ] **Step 4: Write the minimal implementation**

Create `subtract/internal/subtract/subtract.go`:

```go
package subtract

// Compute returns a - b.
func Compute(a, b int) int {
	return a - b
}
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `go -C subtract test ./internal/subtract/... -v`
Expected: PASS, all subtests green.

- [ ] **Step 6: Commit**

```bash
git add subtract/go.mod subtract/internal/subtract/subtract.go subtract/internal/subtract/subtract_test.go
```

```bash
git commit -m "feat(subtract): add Compute(a, b int) int"
```

---

### Task 2: HTTP handler

**Files:**
- Create: `subtract/internal/handler/handler.go`
- Test: `subtract/internal/handler/handler_test.go`

**Interfaces:**
- Consumes: `subtract.Compute(a int, b int) int` (from Task 1, package `subtract/internal/subtract`).
- Produces: `handler.Subtract` — a function with signature `func(w http.ResponseWriter, r *http.Request)`, usable directly as an `http.HandlerFunc`.

- [ ] **Step 1: Write the failing test**

Create `subtract/internal/handler/handler_test.go`:

```go
package handler

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestSubtract_Valid(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5&b=3", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Result int `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Result != 2 {
		t.Errorf("Result = %d, want 2", body.Result)
	}
}

func TestSubtract_NegativeResult(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=3&b=5", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	var body struct {
		Result int `json:"result"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Result != -2 {
		t.Errorf("Result = %d, want -2", body.Result)
	}
}

func TestSubtract_MissingA(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?b=3", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}

	var body struct {
		Error string `json:"error"`
	}
	if err := json.NewDecoder(rec.Body).Decode(&body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body.Error == "" {
		t.Error("expected a non-empty error message")
	}
}

func TestSubtract_MissingB(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestSubtract_NonNumericA(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=abc&b=3", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}

func TestSubtract_NonNumericB(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5&b=xyz", nil)
	rec := httptest.NewRecorder()

	Subtract(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusBadRequest)
	}
}
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `go -C subtract test ./internal/handler/... -v`
Expected: FAIL — build error, package `handler` and `Subtract` do not exist yet.

- [ ] **Step 3: Write the minimal implementation**

Create `subtract/internal/handler/handler.go`:

```go
package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"subtract/internal/subtract"
)

type successResponse struct {
	Result int `json:"result"`
}

type errorResponse struct {
	Error string `json:"error"`
}

// Subtract handles GET /subtract?a=<int>&b=<int>, returning a-b as JSON.
func Subtract(w http.ResponseWriter, r *http.Request) {
	rawA := r.URL.Query().Get("a")
	if rawA == "" {
		writeError(w, http.StatusBadRequest, "missing required query parameter 'a'")
		return
	}
	rawB := r.URL.Query().Get("b")
	if rawB == "" {
		writeError(w, http.StatusBadRequest, "missing required query parameter 'b'")
		return
	}

	a, err := strconv.Atoi(rawA)
	if err != nil {
		writeError(w, http.StatusBadRequest, "'a' must be a valid integer")
		return
	}
	b, err := strconv.Atoi(rawB)
	if err != nil {
		writeError(w, http.StatusBadRequest, "'b' must be a valid integer")
		return
	}

	writeJSON(w, http.StatusOK, successResponse{Result: subtract.Compute(a, b)})
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

Run: `go -C subtract test ./internal/handler/... -v`
Expected: PASS, all subtests green.

- [ ] **Step 5: Commit**

```bash
git add subtract/internal/handler/handler.go subtract/internal/handler/handler_test.go
```

```bash
git commit -m "feat(handler): add GET /subtract handler with JSON responses"
```

---

### Task 3: Server wiring

**Files:**
- Create: `subtract/cmd/server/main.go`
- Test: `subtract/cmd/server/main_test.go`

**Interfaces:**
- Consumes: `handler.Subtract` (from Task 2, package `subtract/internal/handler`), signature `func(w http.ResponseWriter, r *http.Request)`.
- Produces: `newMux() *http.ServeMux` — unexported route-registration function, used by `main()` and tested directly.

- [ ] **Step 1: Write the failing test**

Create `subtract/cmd/server/main_test.go`:

```go
package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestNewMux_RoutesSubtract(t *testing.T) {
	req := httptest.NewRequest(http.MethodGet, "/subtract?a=5&b=3", nil)
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

Run: `go -C subtract test ./cmd/server/... -v`
Expected: FAIL — build error, `newMux` is undefined (package `main` has no other files yet).

- [ ] **Step 3: Write the minimal implementation**

Create `subtract/cmd/server/main.go`:

```go
package main

import (
	"log"
	"net/http"
	"os"

	"subtract/internal/handler"
)

func newMux() *http.ServeMux {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /subtract", handler.Subtract)
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

Run: `go -C subtract test ./cmd/server/... -v`
Expected: PASS, both subtests green.

- [ ] **Step 5: Run the full module test suite**

Run: `go -C subtract test ./...`
Expected: `ok` for all three packages (`internal/subtract`, `internal/handler`, `cmd/server`).

- [ ] **Step 6: Commit**

```bash
git add subtract/cmd/server/main.go subtract/cmd/server/main_test.go
```

```bash
git commit -m "feat(server): wire GET /subtract into net/http server"
```
