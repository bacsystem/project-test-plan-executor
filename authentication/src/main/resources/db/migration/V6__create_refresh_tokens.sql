CREATE TABLE refresh_tokens (
    id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id               UUID NOT NULL REFERENCES users(id),
    token_hash            VARCHAR(255) NOT NULL UNIQUE,
    application_client_id VARCHAR(100) NOT NULL,
    replaced_by           UUID REFERENCES refresh_tokens(id),
    revoked_at            TIMESTAMPTZ,
    expires_at            TIMESTAMPTZ NOT NULL,
    created_at            TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
