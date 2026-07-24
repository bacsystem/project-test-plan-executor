CREATE TABLE signing_keys (
    id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kid              VARCHAR(64) NOT NULL UNIQUE,
    algorithm        VARCHAR(10) NOT NULL,
    private_key_pem  TEXT NOT NULL,
    public_key_pem   TEXT NOT NULL,
    status           VARCHAR(20) NOT NULL,
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
    retire_at        TIMESTAMPTZ,
    retired_at       TIMESTAMPTZ
);
