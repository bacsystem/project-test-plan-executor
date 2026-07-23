import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const createMovementMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  createMovement: (...args: unknown[]) => createMovementMock(...args),
}));

import NewMovementPage from "./page";

describe("NewMovementPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("submits a movement and shows a success message", async () => {
    createMovementMock.mockResolvedValue({ id: "mv-1" });
    render(<NewMovementPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/warehouse id/i), { target: { value: "wh-1" } });
    fireEvent.change(screen.getByLabelText(/section id/i), { target: { value: "sec-1" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "10" } });
    fireEvent.change(screen.getByLabelText(/unit cost/i), { target: { value: "5" } });
    fireEvent.click(screen.getByRole("button", { name: /record movement/i }));

    await waitFor(() =>
      expect(createMovementMock).toHaveBeenCalledWith({
        productSku: "SKU-1",
        warehouseId: "wh-1",
        sectionId: "sec-1",
        quantity: 10,
        unitCost: 5,
        type: "IN",
      })
    );
    expect(await screen.findByText("Movement recorded.")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    createMovementMock.mockRejectedValue(new Error("insufficient stock at this location"));
    render(<NewMovementPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/warehouse id/i), { target: { value: "wh-1" } });
    fireEvent.change(screen.getByLabelText(/section id/i), { target: { value: "sec-1" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "10" } });
    fireEvent.click(screen.getByRole("button", { name: /record movement/i }));

    expect(await screen.findByText("insufficient stock at this location")).toBeInTheDocument();
  });
});
