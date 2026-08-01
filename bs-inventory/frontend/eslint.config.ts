import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  // Base JS & environment settings
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: globals.browser,
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      react: { version: "detect" },
      next: { rootDir: ["./src"] },
    },
    ignores: [
      ".cache",
      ".next",
      ".wrangler",
      "bun.lock",
      "next-env.d.ts",
      "next-eslint-plugin-next.d.ts",
      "next.config.ts",
      "node_modules",
      "package-lock.json",
      "public",
      "public/initial-loader.js",
      "yarn.lock",
    ],
  },
  // Recommended rules
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  // Plugins and custom rules
  {
    plugins: {
      prettier: prettierPlugin,
      "simple-import-sort": simpleImportSort,
      "@next/next": nextPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "prefer-const": "warn",
      "no-var": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "none",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "object-shorthand": "warn",
      "quote-props": ["warn", "as-needed"],
      "@typescript-eslint/array-type": [
        "warn",
        {
          default: "array",
        },
      ],
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        {
          assertionStyle: "as",
          objectLiteralTypeAssertions: "allow",
        },
      ],
      "react/jsx-fragments": ["warn", "syntax"],
      "react/jsx-filename-extension": [
        "warn",
        {
          extensions: ["ts", "tsx"],
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-html-link-for-pages": "off",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [["^\\u0000"], ["^"], ["^@mui"], ["^@/*"]],
        },
      ],
      "prettier/prettier": "warn",
      "@next/next/google-font-display": "error",
    },
  },
];
