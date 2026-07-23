import { afterEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

vi.mock("next/navigation", () => ({
  useParams: () => ({ sku: "SKU-1" }),
}));

const getProductMock = vi.fn();
const getProductMovementsMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  getProduct: (...args: unknown[]) => getProductMock(...args),
  getProductMovements: (...args: unknown[]) => getProductMovementsMock(...args),
}));

import ProductDetailPage from "./page";

describe("ProductDetailPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders product details and movement history", async () => {
    getProductMock.mockResolvedValue({
      sku: "SKU-1",
      name: "Widget",
      category: "tools",
      unitOfMeasureCode: "NIU",
    });
    getProductMovementsMock.mockResolvedValue([
      { id: "mv-1", type: "IN", quantity: 100, unitCost: 5, occurredAt: "2026-07-20T00:00:00Z" },
    ]);

    render(<ProductDetailPage />);

    expect(await screen.findByText("Widget (SKU-1)")).toBeInTheDocument();
    expect(getProductMock).toHaveBeenCalledWith("SKU-1");
    expect(getProductMovementsMock).toHaveBeenCalledWith("SKU-1");
    expect(screen.getByText("IN")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });
});
