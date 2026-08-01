CREATE TABLE login_attempts (
    id                UUID NOT NULL DEFAULT gen_random_uuid(),
    user_id           UUID REFERENCES users(id),
    email_attempted   VARCHAR(255) NOT NULL,
    ip_address        VARCHAR(45) NOT NULL,
    success           BOOLEAN NOT NULL,
    attempted_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    -- attempted_at (the partition key) must be part of the primary key —
    -- PostgreSQL rejects a unique/PK index that doesn't include it.
    PRIMARY KEY (id, attempted_at)
) PARTITION BY RANGE (attempted_at);

CREATE INDEX idx_login_attempts_ip ON login_attempts(ip_address, attempted_at);
CREATE INDEX idx_login_attempts_email ON login_attempts(email_attempted, attempted_at);

-- Initial partitions; the retention job (later task) creates future
-- months ahead of time and drops partitions past the 90-day window (§6).
CREATE TABLE login_attempts_2026_07 PARTITION OF login_attempts
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE login_attempts_2026_08 PARTITION OF login_attempts
    FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
-- Safety net: catches any row outside the pre-created ranges instead of
-- failing the insert outright if the retention job falls behind.
CREATE TABLE login_attempts_default PARTITION OF login_attempts DEFAULT;
