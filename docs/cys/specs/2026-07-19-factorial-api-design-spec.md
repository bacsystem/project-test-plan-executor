# Factorial API — Design Spec

**Date:** 2026-07-19
**Status:** Approved

## 1. Goal

An HTTP API that calculates the factorial of a non-negative integer, self-contained in a `factorial/` directory with its own Node.js package. This serves as a Node.js/Express-based pilot to test the integration and testing capabilities within the project.

## 2. Stack

- **Language:** Node.js (Pure JavaScript, ES Modules).
- **Framework:** Express.
- **Testing:** Node.js native test runner (`node:test` and `node:assert`) + `supertest` for HTTP integration tests.
- **Dependencies:** `express`, `supertest` (dev dependency). No other runtime dependencies.

## 3. Math Logic (Factorial)

The math logic will be placed in a dedicated module `math.js`.

- **Function signature:** `factorial(n)` where `n` is a non-negative integer or `BigInt`.
- **Implementation:** An iterative loop (`O(N)` time complexity, `O(1)` space complexity) to prevent stack overflow.
- **BigInt Support:** The calculation must use `BigInt` internally to prevent integer overflow beyond `Number.MAX_SAFE_INTEGER` (which happens at `n > 18`).
- **Return value:** A `BigInt` representing the factorial.

## 4. REST API

| Method | Path                     | Success | Failure modes |
|--------|--------------------------|---------|----------------|
| GET    | `/api/v1/factorial`      | 200, body = `{"n": <number>, "result": "<string>"}` | 400 validation |

### API Serialization of BigInt
Because JSON does not natively support `BigInt` (calling `JSON.stringify` on a `BigInt` throws a TypeError), the result will be converted to a **string** representation in the JSON payload:
- Input: `n = 5`
- Output: `{"n": 5, "result": "120"}`

## 5. Architecture

A layered structure to allow unit testing of math logic independent of HTTP routing:

```
factorial/
  package.json         — npm configuration ("type": "module" enabled)
  server.js            — app listener setup (listens on PORT, separate from app definition)
  app.js               — Express application configuration and routing definition
  math.js              — pure computation module
  handler.js           — HTTP handler for validation, calling math, and sending JSON response
  test/
    math.test.js       — unit tests for math.js (using node:test)
    app.test.js        — HTTP integration tests for app.js (using supertest)
```

## 6. Error handling

Any validation failure returns a `400 Bad Request` status code and a JSON response with an `error` key.

Validations:
- **Missing `n`**: Return `400 Bad Request` with `{"error": "El parámetro 'n' es requerido."}`. We will use Spanish error messages as the user requested in Spanish. Let's list the Spanish messages:
  - Missing `n`: `{"error": "El parámetro 'n' es requerido."}`
  - Not an integer: `{"error": "El parámetro 'n' debe ser un número entero válido."}`
  - Negative number: `{"error": "El parámetro 'n' no puede ser negativo."}`
  - Value exceeds limit: `{"error": "El parámetro 'n' excede el límite permitido de 10000."}`
- **Fallback (404)**: Return `404 Not Found` with `{"error": "Ruta no encontrada."}`

## 7. Testing strategy

Tests will run via the native Node.js test runner using `node --test`.

- `test/math.test.js` covers:
  - Factorial of `0` and `1` (edge cases).
  - Factorial of small numbers (e.g. `5`).
  - Factorial of larger numbers exceeding safe integer limits (e.g. `20`, `100`) asserting exact string match of results.
- `test/app.test.js` covers:
  - `GET /api/v1/factorial?n=5` returns `200 OK` with `{"n": 5, "result": "120"}`.
  - Query parameter validations return `400 Bad Request` with correct error messages.
  - Invalid route returns `404 Not Found`.

## 8. Out of scope (explicit YAGNI)

- Authentication/authorization.
- Database persistence.
- CORS configuration (unless explicitly needed later).
- Advanced logging libraries.
- Docker files or Kubernetes manifests.
