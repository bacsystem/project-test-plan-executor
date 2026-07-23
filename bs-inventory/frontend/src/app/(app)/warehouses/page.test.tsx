import { afterEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const listWarehousesMock = vi.fn();
const createWarehouseMock = vi.fn();
const listSectionsMock = vi.fn();
const createSectionMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  listWarehouses: (...args: unknown[]) => listWarehousesMock(...args),
  createWarehouse: (...args: unknown[]) => createWarehouseMock(...args),
  listSections: (...args: unknown[]) => listSectionsMock(...args),
  createSection: (...args: unknown[]) => createSectionMock(...args),
}));

import WarehousesPage from "./page";

describe("WarehousesPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("lists warehouses and creates a new one", async () => {
    listWarehousesMock
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([{ id: "wh-1", name: "Lima Norte", code: "LIM-N" }]);
    createWarehouseMock.mockResolvedValue({ id: "wh-1", name: "Lima Norte", code: "LIM-N" });

    render(<WarehousesPage />);
    await waitFor(() => expect(listWarehousesMock).toHaveBeenCalledTimes(1));

    fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: "Lima Norte" } });
    fireEvent.change(screen.getByLabelText(/^code$/i), { target: { value: "LIM-N" } });
    fireEvent.change(screen.getByLabelText(/ruc establishment code/i), { target: { value: "0001" } });
    fireEvent.click(screen.getByRole("button", { name: /add warehouse/i }));

    expect(await screen.findByText("Lima Norte (LIM-N)")).toBeInTheDocument();
    expect(createWarehouseMock).toHaveBeenCalledWith({
      name: "Lima Norte",
      code: "LIM-N",
      rucEstablishmentCode: "0001",
    });
  });

  it("loads sections when a warehouse is selected", async () => {
    listWarehousesMock.mockResolvedValue([{ id: "wh-1", name: "Lima Norte", code: "LIM-N" }]);
    listSectionsMock.mockResolvedValue([{ id: "sec-1", name: "Electrónica", code: "ELEC" }]);

    render(<WarehousesPage />);
    fireEvent.click(await screen.findByText("Lima Norte (LIM-N)"));

    expect(await screen.findByText("Electrónica (ELEC)")).toBeInTheDocument();
    expect(listSectionsMock).toHaveBeenCalledWith("wh-1");
  });
});
