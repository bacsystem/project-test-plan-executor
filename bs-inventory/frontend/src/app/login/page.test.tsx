import { afterEach, describe, expect, it, vi } from "vitest";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const loginMock = vi.fn();
const setAuthTokenMock = vi.fn();
vi.mock("@/lib/apiClient", () => ({
  login: (...args: unknown[]) => loginMock(...args),
  setAuthToken: (...args: unknown[]) => setAuthTokenMock(...args),
}));

import LoginPage from "./page";

describe("LoginPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("logs in and redirects to /warehouses on success", async () => {
    loginMock.mockResolvedValue({ token: "jwt-123" });
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "admin@acme.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "s3cr3t" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/warehouses"));
    expect(loginMock).toHaveBeenCalledWith("admin@acme.com", "s3cr3t");
    expect(setAuthTokenMock).toHaveBeenCalledWith("jwt-123");
  });

  it("shows an error message on failed login", async () => {
    loginMock.mockRejectedValue(new Error("invalid email or password"));
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "admin@acme.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "wrong" } });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(await screen.findByText("invalid email or password")).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
