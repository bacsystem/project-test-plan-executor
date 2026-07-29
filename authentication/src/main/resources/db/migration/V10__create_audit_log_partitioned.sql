CREATE TABLE audit_log (
    id             UUID NOT NULL DEFAULT gen_random_uuid(),
    actor_user_id  UUID REFERENCES users(id),
    action         VARCHAR(50) NOT NULL,
    target_type    VARCHAR(100) NOT NULL,
    target_id      VARCHAR(100) NOT NULL,
    detail         TEXT NOT NULL,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

CREATE INDEX idx_audit_log_target ON audit_log(target_type, target_id);
CREATE INDEX idx_audit_log_actor ON audit_log(actor_user_id);

-- Initial partitions; the retention job (later task) creates future
-- months ahead of time and drops partitions past the 24-month window (§6).
CREATE TABLE audit_log_2026_07 PARTITION OF audit_log
    FOR VALUES FROM ('2026-07-01') TO ('2026-08-01');
CREATE TABLE audit_log_2026_08 PARTITION OF audit_log
    FOR VALUES FROM ('2026-08-01') TO ('2026-09-01');
CREATE TABLE audit_log_default PARTITION OF audit_log DEFAULT;
