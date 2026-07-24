CREATE TABLE applications (
    id                          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id                   VARCHAR(100) NOT NULL UNIQUE,
    client_secret_hash          VARCHAR(255) NOT NULL,
    client_name                 VARCHAR(255) NOT NULL,
    scopes                      VARCHAR(500) NOT NULL,
    authorization_grant_types   VARCHAR(255) NOT NULL,
    client_authentication_methods VARCHAR(255) NOT NULL,
    access_token_ttl_seconds    INTEGER NOT NULL DEFAULT 900,
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now()
);
