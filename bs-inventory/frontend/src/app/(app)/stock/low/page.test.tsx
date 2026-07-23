import { afterEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

const getLowStockMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  getLowStock: (...args: unknown[]) => getLowStockMock(...args),
}));

import LowStockPage from "./page";

describe("LowStockPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the low-stock products", async () => {
    getLowStockMock.mockResolvedValue([{ productSku: "SKU-LOW", quantity: 5 }]);

    render(<LowStockPage />);

    expect(await screen.findByText("SKU-LOW")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("shows a message when nothing is low", async () => {
    getLowStockMock.mockResolvedValue([]);

    render(<LowStockPage />);

    expect(await screen.findByText(/no products are currently low on stock/i)).toBeInTheDocument();
  });
});
