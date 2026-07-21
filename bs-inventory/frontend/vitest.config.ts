import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mirrors the "@/*" -> "./src/*" path mapping from tsconfig.json, which
    // Next.js resolves natively but Vite/Vitest does not pick up on its own.
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
