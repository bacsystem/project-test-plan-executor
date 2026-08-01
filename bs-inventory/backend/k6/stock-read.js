import http from 'k6/http';
import { check, fail, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';

export const options = {
  scenarios: {
    read_heavy: {
      executor: 'constant-vus',
      vus: 20,
      duration: '30s',
    },
  },
  thresholds: {
    // TODO(bs-inventory Task 22): adjust once a k6 run against the live
    // docker-compose stack (docs/cys/plans/2026-07-20-bs-inventory.md)
    // establishes a real p95 baseline.
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01'],
  },
};

function postJSON(url, body, headers) {
  return http.post(url, JSON.stringify(body), headers);
}

function createTenant() {
  const adminEmail = `k6-${Date.now()}@example.com`;
  const adminPassword = 'k6-password';
  const res = postJSON(
    `${BASE_URL}/api/v1/auth/tenants`,
    {
      tenantName: `k6-load-${Date.now()}`,
      countryCode: 'PE',
      adminEmail: adminEmail,
      adminPassword: adminPassword,
    },
    { headers: { 'Content-Type': 'application/json' } }
  );
  if (!check(res, { 'tenant created': (r) => r.status === 201 })) {
    fail(`setup: tenant creation failed with status ${res.status}: ${res.body}`);
  }
  return { adminEmail: adminEmail, adminPassword: adminPassword };
}

function login(adminEmail, adminPassword) {
  const res = postJSON(
    `${BASE_URL}/api/v1/auth/login`,
    { email: adminEmail, password: adminPassword },
    { headers: { 'Content-Type': 'application/json' } }
  );
  const token = res.json('token');
  if (!check(res, { 'login OK': (r) => r.status === 200 && !!token })) {
    fail(`setup: login failed with status ${res.status}: ${res.body}`);
  }
  return token;
}

function createWarehouse(authHeaders) {
  const res = postJSON(
    `${BASE_URL}/api/v1/warehouses`,
    { name: 'k6 Warehouse', code: 'K6-WH', rucEstablishmentCode: '0001' },
    authHeaders
  );
  const warehouseId = res.json('id');
  if (!check(res, { 'warehouse created': (r) => r.status === 201 && !!warehouseId })) {
    fail(`setup: warehouse creation failed with status ${res.status}: ${res.body}`);
  }
  return warehouseId;
}

function createSection(authHeaders, warehouseId) {
  const res = postJSON(
    `${BASE_URL}/api/v1/warehouses/${warehouseId}/sections`,
    { name: 'k6 Section', code: 'K6-SEC' },
    authHeaders
  );
  const sectionId = res.json('id');
  if (!check(res, { 'section created': (r) => r.status === 201 && !!sectionId })) {
    fail(`setup: section creation failed with status ${res.status}: ${res.body}`);
  }
  return sectionId;
}

function seedProduct(authHeaders, warehouseId, sectionId) {
  const sku = 'K6-SKU-1';
  const productRes = postJSON(
    `${BASE_URL}/api/v1/products`,
    { sku: sku, name: 'k6 Load Test Product', category: 'load-test', unitOfMeasureCode: 'NIU' },
    authHeaders
  );
  if (!check(productRes, { 'product created': (r) => r.status === 201 })) {
    fail(`setup: product creation failed with status ${productRes.status}: ${productRes.body}`);
  }

  const movementRes = postJSON(
    `${BASE_URL}/api/v1/stock/movements`,
    { productSku: sku, warehouseId: warehouseId, sectionId: sectionId, quantity: 1000, unitCost: 1.0, type: 'IN' },
    authHeaders
  );
  if (!check(movementRes, { 'stock seeded': (r) => r.status === 201 })) {
    fail(`setup: stock seeding failed with status ${movementRes.status}: ${movementRes.body}`);
  }

  return sku;
}

// setup() runs once, outside the VU loop: registers a throwaway tenant,
// seeds one product with stock, and hands the VUs a ready-to-use token
// and SKU — the load test measures reads, not the setup cost. Each step
// is a single-responsibility helper; setup() only sequences them and
// fails loudly (via fail()) the moment any one of them doesn't succeed,
// so a broken setup step names itself instead of surfacing later as an
// opaque "Authorization: Bearer undefined" or a bad-id VU-loop failure.
export function setup() {
  const { adminEmail, adminPassword } = createTenant();
  const token = login(adminEmail, adminPassword);
  const authHeaders = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  const warehouseId = createWarehouse(authHeaders);
  const sectionId = createSection(authHeaders, warehouseId);
  const sku = seedProduct(authHeaders, warehouseId, sectionId);

  return { token: token, sku: sku };
}

export default function (data) {
  const authHeaders = { headers: { Authorization: `Bearer ${data.token}` } };

  const stockRes = http.get(`${BASE_URL}/api/v1/stock/${data.sku}`, authHeaders);
  check(stockRes, { 'stock read OK': (r) => r.status === 200 });

  const productsRes = http.get(`${BASE_URL}/api/v1/products`, authHeaders);
  check(productsRes, { 'products read OK': (r) => r.status === 200 });

  sleep(1);
}
