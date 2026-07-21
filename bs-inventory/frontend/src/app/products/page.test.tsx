import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const listProductsMock = vi.fn();
const createProductMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  listProducts: (...args: unknown[]) => listProductsMock(...args),
  createProduct: (...args: unknown[]) => createProductMock(...args),
}));

import ProductsPage from "./page";

describe("ProductsPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("lists products", async () => {
    listProductsMock.mockResolvedValue([
      { sku: "SKU-1", name: "Widget", category: "tools", unitOfMeasureCode: "NIU" },
    ]);

    render(<ProductsPage />);

    expect(await screen.findByText("Widget")).toBeInTheDocument();
  });

  it("creates a new product from the dialog", async () => {
    listProductsMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ sku: "SKU-2", name: "Gadget", category: "tools", unitOfMeasureCode: "NIU" }]);
    createProductMock.mockResolvedValue({ sku: "SKU-2", name: "Gadget" });

    render(<ProductsPage />);
    fireEvent.click(await screen.findByRole("button", { name: /new product/i }));

    // Required MUI TextFields append a visible "*" to the label text (and
    // the DataGrid's own "SKU column menu" aria-label also starts with
    // "sku"), so match the field label exactly including the optional "*"
    // rather than a bare prefix.
    fireEvent.change(screen.getByLabelText(/^sku\s*\*?$/i), { target: { value: "SKU-2" } });
    fireEvent.change(screen.getByLabelText(/^name\s*\*?$/i), { target: { value: "Gadget" } });
    fireEvent.change(screen.getByLabelText(/unit of measure code/i), { target: { value: "NIU" } });
    fireEvent.click(screen.getByRole("button", { name: /^create$/i }));

    await waitFor(() =>
      expect(createProductMock).toHaveBeenCalledWith({
        sku: "SKU-2",
        name: "Gadget",
        category: "",
        unitOfMeasureCode: "NIU",
      })
    );
    expect(await screen.findByText("Gadget")).toBeInTheDocument();
  });
});
