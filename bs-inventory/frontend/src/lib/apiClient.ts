const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}) as { error?: string });
    throw new Error(body.error || `request to ${path} failed with status ${res.status}`);
  }
  if (res.status === 204) {
    return undefined as T;
  }
  return (await res.json()) as T;
}

export interface LoginResponse {
  token: string;
}
export function login(email: string, password: string): Promise<LoginResponse> {
  return request("/api/v1/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export interface RegisterTenantRequest {
  tenantName: string;
  countryCode: string;
  adminEmail: string;
  adminPassword: string;
}
export function registerTenant(req: RegisterTenantRequest): Promise<unknown> {
  return request("/api/v1/auth/tenants", { method: "POST", body: JSON.stringify(req) });
}

export interface Warehouse {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  rucEstablishmentCode: string;
  createdAt: string;
}
export function listWarehouses(): Promise<Warehouse[]> {
  return request("/api/v1/warehouses");
}
export function createWarehouse(req: {
  name: string;
  code: string;
  rucEstablishmentCode: string;
}): Promise<Warehouse> {
  return request("/api/v1/warehouses", { method: "POST", body: JSON.stringify(req) });
}

export interface Section {
  id: string;
  warehouseId: string;
  name: string;
  code: string;
  createdAt: string;
}
export function listSections(warehouseId: string): Promise<Section[]> {
  return request(`/api/v1/warehouses/${warehouseId}/sections`);
}
export function createSection(
  warehouseId: string,
  req: { name: string; code: string }
): Promise<Section> {
  return request(`/api/v1/warehouses/${warehouseId}/sections`, {
    method: "POST",
    body: JSON.stringify(req),
  });
}

export interface Product {
  tenantId: string;
  sku: string;
  name: string;
  category: string;
  unitOfMeasureCode: string;
  createdAt: string;
}
export function listProducts(): Promise<Product[]> {
  return request("/api/v1/products");
}
export function createProduct(req: {
  sku: string;
  name: string;
  category: string;
  unitOfMeasureCode: string;
}): Promise<Product> {
  return request("/api/v1/products", { method: "POST", body: JSON.stringify(req) });
}
export function getProduct(sku: string): Promise<Product> {
  return request(`/api/v1/products/${sku}`);
}

export interface StockMovement {
  id: string;
  tenantId: string;
  productSku: string;
  warehouseId: string;
  sectionId: string;
  quantity: number;
  unitCost: number;
  type: "IN" | "OUT";
  occurredAt: string;
}
export function getProductMovements(sku: string): Promise<StockMovement[]> {
  return request(`/api/v1/products/${sku}/movements`);
}

export interface CreateMovementRequest {
  productSku: string;
  warehouseId: string;
  sectionId: string;
  quantity: number;
  unitCost?: number;
  type: "IN" | "OUT";
  documentType?: string;
  documentSeries?: string;
  documentNumber?: string;
  guideNumber?: string;
}
export function createMovement(req: CreateMovementRequest): Promise<StockMovement> {
  return request("/api/v1/stock/movements", { method: "POST", body: JSON.stringify(req) });
}

export interface CreateTransferRequest {
  productSku: string;
  fromWarehouseId: string;
  fromSectionId: string;
  toWarehouseId: string;
  toSectionId: string;
  quantity: number;
  guideNumber?: string;
}
export function createTransfer(req: CreateTransferRequest): Promise<unknown> {
  return request("/api/v1/stock/transfers", { method: "POST", body: JSON.stringify(req) });
}

export interface StockLevel {
  productSku: string;
  warehouseId: string;
  sectionId: string;
  quantity: number;
  avgUnitCost: number;
  totalValue: number;
}
export interface AggregatedStock {
  sku: string;
  totalQuantity: number;
}
export function getStock(
  sku: string,
  warehouseId?: string,
  sectionId?: string
): Promise<StockLevel | AggregatedStock> {
  const query = warehouseId && sectionId ? `?warehouseId=${warehouseId}&sectionId=${sectionId}` : "";
  return request(`/api/v1/stock/${sku}${query}`);
}

export interface LowStockLevel {
  productSku: string;
  quantity: number;
}
export function getLowStock(): Promise<LowStockLevel[]> {
  return request("/api/v1/stock/low");
}

export interface ValuationReport {
  byWarehouse: Record<string, number>;
  total: number;
}
export function getValuation(): Promise<ValuationReport> {
  return request("/api/v1/reports/valuation");
}

export interface KardexEntry {
  movement: StockMovement;
  balanceQuantity: number;
  balanceUnitCost: number;
  balanceValue: number;
}
export function getKardex(sku: string): Promise<KardexEntry[]> {
  return request(`/api/v1/compliance/kardex/${sku}`);
}
