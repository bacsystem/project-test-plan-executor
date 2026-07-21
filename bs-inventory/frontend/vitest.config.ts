import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

import react from "@vitejs/plugin-react";

const srcDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src");

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mirrors tsconfig.json's "@/*" -> "./src/*" path mapping, which Vite/Vitest
    // does not read on its own.
    alias: {
      "@": srcDir,
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
