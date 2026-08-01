import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import type { Screens } from "@/types";

const config: Config = {
  important: "html",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif"],
        heading: ["var(--font-heading)", "ui-sans-serif"],
        body: ["var(--font-body)", "ui-sans-serif"],
      },
      screens: {
        sm: "480px",
        md: "960px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1640px",
        "3xl": "1900px",
      } satisfies Screens,
      backgroundImage: {
        waves: "var(--bg-waves)",
        spheres: "var(--bg-spheres)",
      },

      borderRadius: {
        "4xs": "var(--border-radius-4xs)",
        "3xs": "var(--border-radius-3xs)",
        "2xs": "var(--border-radius-2xs)",
        xs: "var(--border-radius-xs)",
        sm: "var(--border-radius-sm)",
        DEFAULT: "var(--border-radius-sm)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
        "2xl": "var(--border-radius-2xl)",
        "3xl": "var(--border-radius-3xl)",
        "4xl": "var(--border-radius-4xl)",
      },
      fontSize: {
        xs: "0.6875rem",
        sm: "0.75rem",
        base: "0.875rem",
        lg: "1rem",
        xl: "1.125rem",
        "2xl": "1.25rem",
        "3xl": "1.375rem",
        "4xl": "1.5rem",
        "5xl": "1.625rem",
      },
      spacing: {
        0.25: "0.0625rem",
        0.75: "0.1875rem",
        1.25: "0.3125rem",
        1.75: "0.4375rem",
      },
      opacity: {
        disabled: "0.5",
      },
      svgOpacity: {
        10: "0.1",
        100: "1",
      },
      circleRadius: {
        5: "5",
      },
      textAnchor: {
        start: "start",
        middle: "middle",
        end: "end",
      },
      dominantBaseline: {
        auto: "auto",
        hanging: "hanging",
        textAfterEdge: "text-after-edge",
        textBeforeEdge: "text-before-edge",
      },
      colors: {
        foreground: "color-mix(in oklab, hsl(var(--background)) var(--foreground-opacity), transparent)",
        // ---------- Text Colors ---------- // //
        "text-primary": {
          DEFAULT: "hsl(var(--text-primary))",
          light: "hsl(var(--text-primary-light))",
          dark: "hsl(var(--text-primary-dark))",
        },
        "text-secondary": {
          DEFAULT: "hsl(var(--text-secondary))",
          light: "hsl(var(--text-secondary-light))",
          dark: "hsl(var(--text-secondary-dark))",
        },
        "text-disabled": {
          DEFAULT: "hsl(var(--text-disabled))",
          light: "hsl(var(--text-disabled-light))",
          dark: "hsl(var(--text-disabled-dark))",
        },
        "text-muted": {
          DEFAULT: "hsl(var(--text-muted))",
          light: "hsl(var(--text-muted-light))",
          dark: "hsl(var(--text-muted-dark))",
        },
        "text-contrast": {
          DEFAULT: "hsl(var(--text-contrast))",
          alternative: "hsl(var(--text-contrast-alternative))",
        },
        // ---------- Text Colors ---------- // //

        // ---------- Background Colors ---------- //
        background: {
          DEFAULT: "hsl(var(--background))",
          paper: "hsl(var(--background-paper))",
        },
        // ---------- Background Colors ---------- //

        // ---------- Theme Colors ---------- //

        primary: {
          DEFAULT: "hsl(var(--primary))",
          light: "hsl(var(--primary-light))",
          dark: "hsl(var(--primary-dark))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          light: "hsl(var(--secondary-light))",
          dark: "hsl(var(--secondary-dark))",
        },

        "accent-1": {
          DEFAULT: "hsl(var(--accent-1))",
          light: "hsl(var(--accent-1-light))",
          dark: "hsl(var(--accent-1-dark))",
        },
        "accent-2": {
          DEFAULT: "hsl(var(--accent-2))",
          light: "hsl(var(--accent-2-light))",
          dark: "hsl(var(--accent-2-dark))",
        },
        "accent-3": {
          DEFAULT: "hsl(var(--accent-3))",
          light: "hsl(var(--accent-3-light))",
          dark: "hsl(var(--accent-3-dark))",
        },
        "accent-4": {
          DEFAULT: "hsl(var(--accent-4))",
          light: "hsl(var(--accent-4-light))",
          dark: "hsl(var(--accent-4-dark))",
        },
        "accent-5": {
          DEFAULT: "hsl(var(--accent-5))",
          light: "hsl(var(--accent-5-light))",
          dark: "hsl(var(--accent-5-dark))",
        },
        "accent-6": {
          DEFAULT: "hsl(var(--accent-6))",
          light: "hsl(var(--accent-6-light))",
          dark: "hsl(var(--accent-6-dark))",
        },
        // ---------- Theme Colors ---------- //

        // ---------- Feedback Colors ---------- //
        error: {
          DEFAULT: "hsl(var(--error))",
          light: "hsl(var(--error-light))",
          dark: "hsl(var(--error-dark))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          light: "hsl(var(--info-light))",
          dark: "hsl(var(--info-dark))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          light: "hsl(var(--success-light))",
          dark: "hsl(var(--success-dark))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          light: "hsl(var(--warning-light))",
          dark: "hsl(var(--warning-dark))",
        },
        rating: {
          DEFAULT: "hsl(var(--rating))",
          light: "hsl(var(--rating-light))",
          dark: "hsl(var(--rating-dark))",
        },
        // ---------- Feedback Colors ---------- //

        // ---------- Grey Scales ---------- //
        // MUI using grey instead of gray
        grey: {
          20: "hsl(var(--grey-20))",
          25: "hsl(var(--grey-25))",
          50: "hsl(var(--grey-50))",
          100: "hsl(var(--grey-100))",
          200: "hsl(var(--grey-200))",
          300: "hsl(var(--grey-300))",
          400: "hsl(var(--grey-400))",
          500: "hsl(var(--grey-500))",
          600: "hsl(var(--grey-600))",
          700: "hsl(var(--grey-700))",
          800: "hsl(var(--grey-800))",
          900: "hsl(var(--grey-900))",
        },
        // Sync with MUI grey with tailwind gray
        gray: {
          20: "hsl(var(--grey-20))",
          25: "hsl(var(--grey-25))",
          50: "hsl(var(--grey-50))",
          100: "hsl(var(--grey-100))",
          200: "hsl(var(--grey-200))",
          300: "hsl(var(--grey-300))",
          400: "hsl(var(--grey-400))",
          500: "hsl(var(--grey-500))",
          600: "hsl(var(--grey-600))",
          700: "hsl(var(--grey-700))",
          800: "hsl(var(--grey-800))",
          900: "hsl(var(--grey-900))",
        },
        // ---------- Grey Scales ---------- //

        // ---------- Line ---------- //
        line: "var(--line)",
        // ---------- Line ---------- //
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "stroke-opacity": (value) => ({
            "stroke-opacity": value,
          }),
          "fill-opacity": (value) => ({
            "fill-opacity": value,
          }),
        },
        { values: theme("svgOpacity") },
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "circle-radius": (value) => ({
            r: value,
          }),
        },
        { values: theme("circleRadius") },
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-anchor": (value) => ({
            "text-anchor": value,
          }),
        },
        { values: theme("textAnchor") },
      );
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "dominant-baseline": (value) => ({
            "dominant-baseline": value,
          }),
        },
        { values: theme("dominantBaseline") },
      );
    }),
  ],
};
export default config;
