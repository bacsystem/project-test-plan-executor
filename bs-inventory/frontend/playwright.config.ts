import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  use: {
    // Trailing slash matters: Next's basePath ("/inventory") only survives
    // relative navigation (page.goto("login"), no leading slash) when
    // baseURL itself ends in "/" — new URL("/x", base) always resolves
    // against the origin and silently drops any path baseURL had.
    baseURL: process.env.E2E_BASE_URL || "http://localhost:3000/inventory/",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
});
