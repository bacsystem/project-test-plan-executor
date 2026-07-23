import { afterEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const createTransferMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  createTransfer: (...args: unknown[]) => createTransferMock(...args),
}));

import NewTransferPage from "./page";

describe("NewTransferPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("submits a transfer and shows a success message", async () => {
    createTransferMock.mockResolvedValue({ transferId: "tr-1" });
    render(<NewTransferPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/from warehouse id/i), { target: { value: "wh-a" } });
    fireEvent.change(screen.getByLabelText(/from section id/i), { target: { value: "sec-a" } });
    fireEvent.change(screen.getByLabelText(/to warehouse id/i), { target: { value: "wh-b" } });
    fireEvent.change(screen.getByLabelText(/to section id/i), { target: { value: "sec-b" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /record transfer/i }));

    await waitFor(() =>
      expect(createTransferMock).toHaveBeenCalledWith({
        productSku: "SKU-1",
        fromWarehouseId: "wh-a",
        fromSectionId: "sec-a",
        toWarehouseId: "wh-b",
        toSectionId: "sec-b",
        quantity: 40,
        guideNumber: "",
      }),
    );
    expect(await screen.findByText("Transfer recorded.")).toBeInTheDocument();
  });

  it("shows an error message when the API call fails", async () => {
    createTransferMock.mockRejectedValue(new Error("insufficient stock at this location"));
    render(<NewTransferPage />);

    fireEvent.change(screen.getByLabelText(/product sku/i), { target: { value: "SKU-1" } });
    fireEvent.change(screen.getByLabelText(/from warehouse id/i), { target: { value: "wh-a" } });
    fireEvent.change(screen.getByLabelText(/from section id/i), { target: { value: "sec-a" } });
    fireEvent.change(screen.getByLabelText(/to warehouse id/i), { target: { value: "wh-b" } });
    fireEvent.change(screen.getByLabelText(/to section id/i), { target: { value: "sec-b" } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: "40" } });
    fireEvent.click(screen.getByRole("button", { name: /record transfer/i }));

    expect(await screen.findByText("insufficient stock at this location")).toBeInTheDocument();
  });
});
