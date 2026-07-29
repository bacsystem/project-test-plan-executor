-- Backstops the "at most one ACTIVE signing key" invariant at the database level so that two
-- concurrent callers racing to bootstrap/rotate the key (TOCTOU on a SELECT-then-INSERT in
-- application code) cannot both succeed in inserting an ACTIVE row.
CREATE UNIQUE INDEX signing_keys_one_active_idx ON signing_keys (status) WHERE status = 'ACTIVE';
