# Factorial API Implementation Plan

> **For agentic workers:** execute this plan with the
> parallel-plan-executor Workflow (cys:run / the /cys:run-plan command).
> Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Node.js/Express HTTP API that calculates the factorial of a non-negative integer up to 10,000 using BigInt.

**Architecture:** A mathematical module (`math.js`) is used by an HTTP handler (`handler.js`), which is registered in an Express application (`app.js`) and run via a server listener (`server.js`). The math module is unit-tested, and the HTTP routes are integration-tested via `supertest`.

**Tech Stack:** Node.js, Express, ES Modules, `node:test` (native runner), `supertest`.

## Global Constraints

- Tech Stack: Node.js (ES Modules, pure JavaScript).
- Output: `{"n": <number>, "result": "<string>"}` on `GET /api/v1/factorial?n=<integer>`.
- Error validation:
  - Missing `n` returns `400 Bad Request` with `{"error": "El parámetro 'n' es requerido."}`.
  - Non-integer `n` returns `400 Bad Request` with `{"error": "El parámetro 'n' debe ser un número entero válido."}`.
  - Negative `n` returns `400 Bad Request` with `{"error": "El parámetro 'n' no puede ser negativo."}`.
  - `n` > 10,000 returns `400 Bad Request` with `{"error": "El parámetro 'n' excede el límite permitido de 10000."}`.
- Fallback route returns `404 Not Found` with `{"error": "Ruta no encontrada."}`.

---

### Task 1: Initialize Project and Dependencies

**Files:**
- Create: `factorial/package.json`

**Interfaces:**
- Consumes: None
- Produces: `factorial/package.json`

- [ ] **Step 1: Create package.json with ES Modules enabled**

Create `factorial/package.json` with the following contents:

```json
{
  "name": "factorial",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "node --test"
  },
  "dependencies": {
    "express": "^4.19.2"
  },
  "devDependencies": {
    "supertest": "^7.0.0"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run from the repository root:

```bash
cd factorial && npm install
```

Expected output: `package-lock.json` is created and all dependencies are successfully installed.

- [ ] **Step 3: Commit initial package setup**

Run:

```bash
git add factorial/package.json
git commit -m "chore(factorial): initialize package.json and project structure"
```

---

### Task 2: Math Logic Module

**Files:**
- Create: `factorial/math.js`
- Test: `factorial/test/math.test.js`

**Interfaces:**
- Consumes: `factorial/package.json`
- Produces: `factorial(n)`

- [ ] **Step 1: Write the failing unit tests for the factorial function**

Create `factorial/test/math.test.js`:

```javascript
import test from 'node:test';
import assert from 'node:assert';
import { factorial } from '../math.js';

test('Factorial math logic tests', async (t) => {
  await t.test('calculates factorial of 0 to be 1', () => {
    assert.strictEqual(factorial(0n).toString(), '1');
  });

  await t.test('calculates factorial of 1 to be 1', () => {
    assert.strictEqual(factorial(1n).toString(), '1');
  });

  await t.test('calculates factorial of a small number (5)', () => {
    assert.strictEqual(factorial(5n).toString(), '120');
  });

  await t.test('calculates factorial of a larger number exceeding safe integer limit (20)', () => {
    assert.strictEqual(factorial(20n).toString(), '2432902008176640000');
  });

  await t.test('throws an error for negative numbers', () => {
    assert.throws(() => factorial(-1n), /not defined for negative numbers/);
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run from the `factorial` directory:

```bash
npm test test/math.test.js
```

Expected error: `MODULE_NOT_FOUND` (Cannot find module '../math.js').

- [ ] **Step 3: Implement the iterative factorial function using BigInt**

Create `factorial/math.js`:

```javascript
/**
 * Calculates the factorial of a non-negative integer using BigInt.
 * @param {bigint} n
 * @returns {bigint}
 */
export function factorial(n) {
  const bigN = typeof n === 'bigint' ? n : BigInt(n);
  if (bigN < 0n) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  let result = 1n;
  for (let i = 2n; i <= bigN; i++) {
    result *= i;
  }
  return result;
}
```

- [ ] **Step 4: Run the test and verify it passes**

Run from the `factorial` directory:

```bash
npm test test/math.test.js
```

Expected output: `PASS` on all unit tests.

- [ ] **Step 5: Commit the math logic module**

Run:

```bash
git add factorial/math.js factorial/test/math.test.js
git commit -m "feat(factorial): implement math logic with BigInt support"
```

---

### Task 3: Express App and Handler

**Files:**
- Create: `factorial/handler.js`
- Create: `factorial/app.js`
- Test: `factorial/test/app.test.js`

**Interfaces:**
- Consumes: `factorial(n)`
- Produces: `app`
- Produces: `handleFactorial`

- [ ] **Step 1: Write integration tests covering all requirements**

Create `factorial/test/app.test.js`:

```javascript
import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../app.js';

test('HTTP API integration tests', async (t) => {
  await t.test('GET /api/v1/factorial?n=5 returns 200 with result "120"', async () => {
    const res = await request(app)
      .get('/api/v1/factorial?n=5')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.n, 5);
    assert.strictEqual(res.body.result, '120');
  });

  await t.test('GET /api/v1/factorial?n=20 returns 200 with precise BigInt result', async () => {
    const res = await request(app)
      .get('/api/v1/factorial?n=20')
      .expect('Content-Type', /json/)
      .expect(200);

    assert.strictEqual(res.body.n, 20);
    assert.strictEqual(res.body.result, '2432902008176640000');
  });

  await t.test('GET /api/v1/factorial without query param returns 400 error', async () => {
    const res = await request(app)
      .get('/api/v1/factorial')
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'El parámetro \'n\' es requerido.');
  });

  await t.test('GET /api/v1/factorial?n=abc (invalid format) returns 400 error', async () => {
    const res = await request(app)
      .get('/api/v1/factorial?n=abc')
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'El parámetro \'n\' debe ser un número entero válido.');
  });

  await t.test('GET /api/v1/factorial?n=5.5 (decimal) returns 400 error', async () => {
    const res = await request(app)
      .get('/api/v1/factorial?n=5.5')
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'El parámetro \'n\' debe ser un número entero válido.');
  });

  await t.test('GET /api/v1/factorial?n=-5 (negative) returns 400 error', async () => {
    const res = await request(app)
      .get('/api/v1/factorial?n=-5')
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'El parámetro \'n\' no puede ser negativo.');
  });

  await t.test('GET /api/v1/factorial?n=10001 (exceeds limit) returns 400 error', async () => {
    const res = await request(app)
      .get('/api/v1/factorial?n=10001')
      .expect('Content-Type', /json/)
      .expect(400);

    assert.strictEqual(res.body.error, 'El parámetro \'n\' excede el límite permitido de 10000.');
  });

  await t.test('GET /api/v1/factorial?n=10000 (at limit) returns 200 OK', async () => {
    await request(app)
      .get('/api/v1/factorial?n=10000')
      .expect(200);
  });

  await t.test('GET /invalid-route returns 404 error', async () => {
    const res = await request(app)
      .get('/invalid-route')
      .expect('Content-Type', /json/)
      .expect(404);

    assert.strictEqual(res.body.error, 'Ruta no encontrada.');
  });
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run from the `factorial` directory:

```bash
npm test test/app.test.js
```

Expected error: `MODULE_NOT_FOUND` (Cannot find module '../app.js').

- [ ] **Step 3: Create the HTTP handler module**

Create `factorial/handler.js`:

```javascript
import { factorial } from './math.js';

/**
 * Handles the factorial calculation request.
 * GET /api/v1/factorial?n=<integer>
 */
export function handleFactorial(req, res) {
  const { n } = req.query;

  if (n === undefined || n === '') {
    return res.status(400).json({ error: "El parámetro 'n' es requerido." });
  }

  // Regex checks for optional '+' followed by digits
  const integerRegex = /^\+?\d+$/;
  if (!integerRegex.test(n)) {
    // If it has negative sign, we return a more specific message if it's numeric negative
    if (n.startsWith('-') && /^\d+$/.test(n.substring(1))) {
      return res.status(400).json({ error: "El parámetro 'n' no puede ser negativo." });
    }
    return res.status(400).json({ error: "El parámetro 'n' debe ser un número entero válido." });
  }

  const parsedN = parseInt(n, 10);
  if (isNaN(parsedN)) {
    return res.status(400).json({ error: "El parámetro 'n' debe ser un número entero válido." });
  }

  if (parsedN > 10000) {
    return res.status(400).json({ error: "El parámetro 'n' excede el límite permitido de 10000." });
  }

  try {
    const result = factorial(parsedN);
    return res.status(200).json({
      n: parsedN,
      result: result.toString()
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}
```

- [ ] **Step 4: Create the Express App module**

Create `factorial/app.js`:

```javascript
import express from 'express';
import { handleFactorial } from './handler.js';

const app = express();

app.use(express.json());

app.get('/api/v1/factorial', handleFactorial);

// Fallback 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

export default app;
```

- [ ] **Step 5: Run the tests and verify they pass**

Run from the `factorial` directory:

```bash
npm test
```

Expected output: `PASS` on both `math.test.js` and `app.test.js`.

- [ ] **Step 6: Commit app and handler implementation**

Run:

```bash
git add factorial/handler.js factorial/app.js factorial/test/app.test.js
git commit -m "feat(factorial): implement HTTP handler and Express app with tests"
```

---

### Task 4: Server Listener Setup

**Files:**
- Create: `factorial/server.js`

**Interfaces:**
- Consumes: `app`
- Produces: None

- [ ] **Step 1: Implement the server listener entry point**

Create `factorial/server.js`:

```javascript
import app from './app.js';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

- [ ] **Step 2: Verify the server can start up and syntax check**

Run:

```bash
node -c factorial/server.js
```

Expected output: command exits cleanly with code 0 (no syntax errors).

- [ ] **Step 3: Run the full test suite one last time**

Run from the `factorial` directory:

```bash
npm test
```

Expected output: all tests pass.

- [ ] **Step 4: Commit server entry point**

Run:

```bash
git add factorial/server.js
git commit -m "feat(factorial): add server.js startup listener"
```
