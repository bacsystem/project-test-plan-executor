import { afterEach, describe, expect, it, vi } from "vitest";

import { render, screen } from "@testing-library/react";

const getValuationMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  getValuation: (...args: unknown[]) => getValuationMock(...args),
}));

import ValuationReportPage from "./page";

describe("ValuationReportPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders per-warehouse and consolidated totals", async () => {
    getValuationMock.mockResolvedValue({
      byWarehouse: { "wh-1": 500, "wh-2": 250 },
      total: 750,
    });

    render(<ValuationReportPage />);

    expect(await screen.findByText("wh-1")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("wh-2")).toBeInTheDocument();
    expect(screen.getByText("250")).toBeInTheDocument();
    expect(screen.getByText("750")).toBeInTheDocument();
  });
});
