-- Realistic volume per §17.2 (thousands of users, dozens of roles) so query
-- plans in the k6 load test resemble production, not a handful of rows.

INSERT INTO tenants (id, slug, name)
VALUES ('00000000-0000-0000-0000-000000000001', 'k6-tenant', 'K6 Load Test Tenant')
ON CONFLICT DO NOTHING;

INSERT INTO users (tenant_id, email, password_hash, status)
SELECT '00000000-0000-0000-0000-000000000001', 'k6-user-' || g || '@test.com',
       '$argon2id$v=19$m=19456,t=2,p=1$AAAAAAAAAAAAAAAAAAAAAA$FAKEFORLOADTEST', 'ACTIVE'
FROM generate_series(1, 5000) g
ON CONFLICT DO NOTHING;

INSERT INTO roles (tenant_id, name, is_template)
SELECT '00000000-0000-0000-0000-000000000001', 'k6-role-' || g, false
FROM generate_series(1, 30) g
ON CONFLICT DO NOTHING;
