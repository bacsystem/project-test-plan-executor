import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    role_permission_race: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 1,
      maxDuration: '30s',
    },
  },
  thresholds: {
    // binary, not percentage-based (§17.2): a single 5xx or a wrong final
    // state fails the whole run.
    'checks{check:no_5xx}': ['rate==1'],
  },
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
const ROLE_ID = __ENV.ROLE_ID;
const STARTING_VERSION = __ENV.STARTING_VERSION;
const TOKEN = __ENV.ACCESS_TOKEN;

export default function () {
  const permissionId = __ENV['PERMISSION_ID_' + __VU];
  const res = http.put(
    `${BASE_URL}/v1/roles/${ROLE_ID}/permissions`,
    JSON.stringify({ version: Number(STARTING_VERSION), permissionIds: [permissionId] }),
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` } },
  );
  check(res, {
    'no_5xx': (r) => r.status < 500,
    'is 200 or 409': (r) => r.status === 200 || r.status === 409,
  });
}
