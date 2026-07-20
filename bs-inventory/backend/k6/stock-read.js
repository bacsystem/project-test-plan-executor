import http from 'k6/http';
import { check, sleep } from 'k6';

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
    http_req_duration: ['p(95)<300'], // adjust once a real baseline exists
    http_req_failed: ['rate<0.01'],
  },
};

// setup() runs once, outside the VU loop: registers a throwaway tenant,
// seeds one product with stock, and hands the VUs a ready-to-use token
// and SKU — the load test measures reads, not the setup cost.
export function setup() {
  const adminEmail = `k6-${Date.now()}@example.com`;
  const tenantBody = JSON.stringify({
    tenantName: `k6-load-${Date.now()}`,
    countryCode: 'PE',
    adminEmail: adminEmail,
    adminPassword: 'k6-password',
  });
  const tenantRes = http.post(`${BASE_URL}/api/v1/auth/tenants`, tenantBody, {
    headers: { 'Content-Type': 'application/json' },
  });
  check(tenantRes, { 'tenant created': (r) => r.status === 201 });

  const loginBody = JSON.stringify({ email: adminEmail, password: 'k6-password' });
  const loginRes = http.post(`${BASE_URL}/api/v1/auth/login`, loginBody, {
    headers: { 'Content-Type': 'application/json' },
  });
  const token = loginRes.json('token');
  const authHeaders = {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  };

  const whRes = http.post(
    `${BASE_URL}/api/v1/warehouses`,
    JSON.stringify({ name: 'k6 Warehouse', code: 'K6-WH', rucEstablishmentCode: '0001' }),
    authHeaders
  );
  const warehouseId = whRes.json('id');

  const secRes = http.post(
    `${BASE_URL}/api/v1/warehouses/${warehouseId}/sections`,
    JSON.stringify({ name: 'k6 Section', code: 'K6-SEC' }),
    authHeaders
  );
  const sectionId = secRes.json('id');

  const sku = 'K6-SKU-1';
  http.post(
    `${BASE_URL}/api/v1/products`,
    JSON.stringify({ sku: sku, name: 'k6 Load Test Product', category: 'load-test', unitOfMeasureCode: 'NIU' }),
    authHeaders
  );
  http.post(
    `${BASE_URL}/api/v1/stock/movements`,
    JSON.stringify({ productSku: sku, warehouseId: warehouseId, sectionId: sectionId, quantity: 1000, unitCost: 1.0, type: 'IN' }),
    authHeaders
  );

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
