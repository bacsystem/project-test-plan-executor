CREATE TABLE email_outbox (
    id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient      VARCHAR(255) NOT NULL,
    template_name  VARCHAR(100) NOT NULL,
    body           TEXT NOT NULL,
    status         VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    attempts       INTEGER NOT NULL DEFAULT 0,
    last_error     TEXT,
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    sent_at        TIMESTAMPTZ
);

CREATE INDEX idx_email_outbox_status ON email_outbox(status);
