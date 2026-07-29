import http from 'k6/http';

export const options = {
  scenarios: {
    mostly_reads: {
      executor: 'constant-vus',
      vus: 200,
      duration: '2m',
      exec: 'refreshOrRead',
    },
    occasional_logins: {
      executor: 'constant-arrival-rate',
      rate: 5,
      timeUnit: '1s',
      duration: '2m',
      preAllocatedVUs: 20,
      exec: 'login',
    },
  },
  // Reported as a trend, not a CI gate (§17.2) — the blocking assertions
  // live in correctness.js. ARGON2_COST_MS is read from the environment
  // because it must be calibrated on the target hardware, never assumed.
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
const ARGON2_COST_MS = Number(__ENV.ARGON2_COST_MS || 300);
const LOGIN_THRESHOLD_MS = ARGON2_COST_MS + 150;

export function login() {
  const res = http.post(`${BASE_URL}/oauth2/token`,
    'grant_type=password&tenant=k6-tenant&username=k6-user-1@test.com&password=WrongOnPurpose!1',
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
  if (res.timings.duration > LOGIN_THRESHOLD_MS) {
    console.warn(`login p95 candidate exceeded ${LOGIN_THRESHOLD_MS}ms: ${res.timings.duration}ms`);
  }
}

export function refreshOrRead() {
  http.get(`${BASE_URL}/oauth2/jwks`);
}
