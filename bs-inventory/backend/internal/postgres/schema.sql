CREATE TABLE IF NOT EXISTS tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country_code TEXT NOT NULL DEFAULT 'PE',
    low_stock_threshold INTEGER NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'member')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS warehouses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    ruc_establishment_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (tenant_id, code)
);

CREATE TABLE IF NOT EXISTS sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (warehouse_id, code)
);

CREATE TABLE IF NOT EXISTS products (
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    sku TEXT NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    unit_of_measure_code TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (tenant_id, sku)
);

CREATE TABLE IF NOT EXISTS stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    product_sku TEXT NOT NULL,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    section_id UUID NOT NULL REFERENCES sections(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_cost NUMERIC(14,4) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('IN', 'OUT')),
    document_type TEXT NOT NULL DEFAULT '',
    document_series TEXT NOT NULL DEFAULT '',
    document_number TEXT NOT NULL DEFAULT '',
    transfer_id UUID,
    guide_number TEXT NOT NULL DEFAULT '',
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (tenant_id, product_sku) REFERENCES products(tenant_id, sku)
);
CREATE INDEX IF NOT EXISTS idx_stock_movements_lookup ON stock_movements(tenant_id, product_sku, warehouse_id, section_id);

CREATE TABLE IF NOT EXISTS stock_levels (
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    product_sku TEXT NOT NULL,
    warehouse_id UUID NOT NULL REFERENCES warehouses(id),
    section_id UUID NOT NULL REFERENCES sections(id),
    quantity INTEGER NOT NULL DEFAULT 0,
    avg_unit_cost NUMERIC(14,4) NOT NULL DEFAULT 0,
    total_value NUMERIC(14,4) NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (tenant_id, product_sku, warehouse_id, section_id),
    FOREIGN KEY (tenant_id, product_sku) REFERENCES products(tenant_id, sku)
);
