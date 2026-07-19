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
