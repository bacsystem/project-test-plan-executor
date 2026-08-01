import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  createMovement,
  createWarehouse,
  getStock,
  getValuation,
  listWarehouses,
  login,
  setAuthToken,
} from "./apiClient";

describe("apiClient", () => {
  beforeEach(() => {
    setAuthToken(null);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    window.localStorage.clear();
  });

  it("setAuthToken() persists the token so a hard navigation doesn't drop it", () => {
    setAuthToken("jwt-abc");
    expect(window.localStorage.getItem("bs-inventory-token")).toBe("jwt-abc");

    setAuthToken(null);
    expect(window.localStorage.getItem("bs-inventory-token")).toBeNull();
  });

  it("rehydrates the token from localStorage when the module is (re)loaded", async () => {
    window.localStorage.setItem("bs-inventory-token", "jwt-persisted");
    vi.resetModules();
    const fresh = await import("./apiClient");
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

    await fresh.listWarehouses();

    const [, options] = fetchMock.mock.calls[0];
    const headers = options?.headers as Record<string, string>;
    expect(headers.Authorization).toBe(
      "Bearer jwt-persisted"
    );
  });

  it("login() posts credentials and returns the token", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ token: "jwt-123" }), { status: 200 })
    );

    const result = await login("admin@acme.com", "s3cr3t");

    expect(result).toEqual({ token: "jwt-123" });
    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/auth/login");
    expect(options?.method).toBe("POST");
    expect(JSON.parse(options?.body as string)).toEqual({
      email: "admin@acme.com",
      password: "s3cr3t",
    });
  });

  it("attaches the Authorization header once a token is set", async () => {
    setAuthToken("jwt-123");
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify([]), { status: 200 }));

    await listWarehouses();

    const [, options] = fetchMock.mock.calls[0];
    const headers = options?.headers as Record<string, string>;
    expect(headers.Authorization).toBe("Bearer jwt-123");
  });

  it("createWarehouse() posts to /api/v1/warehouses", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "wh-1", name: "Lima Norte" }), { status: 201 })
    );

    await createWarehouse({ name: "Lima Norte", code: "LIM-N", rucEstablishmentCode: "0001" });

    const [url, options] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/warehouses");
    expect(options?.method).toBe("POST");
  });

  it("createMovement() posts to /api/v1/stock/movements", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "mv-1" }), { status: 201 })
    );

    await createMovement({
      productSku: "SKU-1",
      warehouseId: "wh-1",
      sectionId: "sec-1",
      quantity: 10,
      unitCost: 5,
      type: "IN",
    });

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/stock/movements");
  });

  it("getStock() includes warehouseId/sectionId query params when given", async () => {
    const fetchMock = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ quantity: 5 }), { status: 200 }));

    await getStock("SKU-1", "wh-1", "sec-1");

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/stock/SKU-1?warehouseId=wh-1&sectionId=sec-1");
  });

  it("getValuation() reads /api/v1/reports/valuation", async () => {
    const fetchMock = vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ byWarehouse: {}, total: 0 }), { status: 200 })
    );

    await getValuation();

    const [url] = fetchMock.mock.calls[0];
    expect(String(url)).toContain("/api/v1/reports/valuation");
  });

  it("throws with the server's error message on a non-2xx response", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ error: "invalid email or password" }), { status: 401 })
    );

    await expect(login("admin@acme.com", "wrong")).rejects.toThrow(
      "invalid email or password"
    );
  });
});
