import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mirrors tsconfig.json's "@/*" -> "./src/*" path mapping — Vite/Vitest
    // don't read tsconfig `paths` on their own, so tests importing via "@/"
    // (e.g. `vi.mock("@/lib/apiClient", ...)`) fail to resolve without this.
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    // e2e/ holds Playwright specs (run via `npm run test:e2e`), not Vitest
    // tests — without this, Vitest tries to collect them too and fails on
    // @playwright/test's import (a different test runner's API).
    exclude: ["**/node_modules/**", "**/e2e/**"],
  },
});
