CREATE TABLE one_time_tokens (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID NOT NULL REFERENCES users(id),
    purpose      VARCHAR(30) NOT NULL,
    token_hash   VARCHAR(255) NOT NULL UNIQUE,
    redeemed_at  TIMESTAMPTZ,
    expires_at   TIMESTAMPTZ NOT NULL,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
