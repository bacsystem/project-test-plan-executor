"use client";

import MuiLayerOverride from "./mui-layer-override";
import { useLocale } from "next-intl";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";

import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { DEFAULTS } from "@/config";
import {
  LOCAL_STORAGE_KEYS as LS_KEYS,
  ModeVariant,
  THEME_MODE_OPTIONS,
  THEME_OPTIONS,
  ThemeVariant,
} from "@/constants";
import {
  CheckboxSmallChecked,
  CheckboxSmallEmptyOutlined,
  CheckboxSmallIndeterminate,
} from "@/icons/form/mui-checkbox";
import { BackgroundShape, ContentType } from "@/types";

type ThemeContextType = {
  theme: ThemeVariant;
  setTheme: (theme: ThemeVariant) => void;
  mode: ModeVariant;
  setMode: (mode: ModeVariant) => void;
  content: ContentType;
  setContent: (content: ContentType) => void;
  backgroundShape: BackgroundShape;
  setBackgroundShape: (shape: BackgroundShape) => void;
  innerShadowOpacity: number;
  setInnerShadowOpacity: (opacity: number) => void;
  foregroundOpacity: number;
  setForegroundOpacity: (opacity: number) => void;
  bgOpacity: number;
  setBgOpacity: (opacity: number) => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const createMuiTheme = (direction: "ltr" | "rtl" = "ltr") =>
  createTheme({
    direction,
    spacing: 4,
    breakpoints: {
      values: {
        xs: 0,
        sm: 480,
        md: 960,
        lg: 1280,
        xl: 1440,
        "2xl": 1640,
        "3xl": 1900,
      },
    },
    cssVariables: {
      colorSchemeSelector: "class",
    },
    palette: {
      // ---------- Background Colors ---------- //
      background: {
        default: "hsl(var(--background))",
        paper: "hsl(var(--background-paper))",
      },
      // ---------- Background Colors ---------- //

      // ---------- Divider Colors ---------- //
      divider: "hsl(var(--grey-100))",
      // ---------- Divider Colors ---------- //

      // ---------- Text Colors ---------- //
      text: {
        primary: "hsl(var(--text-primary))",
        secondary: "hsl(var(--text-secondary))",
        disabled: "hsl(var(--text-disabled))",
      },
      // ---------- Text Colors ---------- //

      // ---------- Theme Colors ---------- //
      primary: {
        main: "hsl(var(--primary))",
        light: "hsl(var(--primary-light))",
        dark: "hsl(var(--primary-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      secondary: {
        main: "hsl(var(--secondary))",
        light: "hsl(var(--secondary-light))",
        dark: "hsl(var(--secondary-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      action: {
        disabled: "hsla(var(--text-disabled) / .95)", // disabled text color
        disabledBackground: "hsla(var(--text-disabled) / .5)",
        active: "hsl(var(--text-primary))",
      },
      "accent-1": {
        main: "hsl(var(--accent-1))",
        light: "hsl(var(--accent-1-light))",
        dark: "hsl(var(--accent-1-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      "accent-2": {
        main: "hsl(var(--accent-2))",
        light: "hsl(var(--accent-2-light))",
        dark: "hsl(var(--accent-2-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      "accent-3": {
        main: "hsl(var(--accent-3))",
        light: "hsl(var(--accent-3-light))",
        dark: "hsl(var(--accent-3-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      "accent-4": {
        main: "hsl(var(--accent-4))",
        light: "hsl(var(--accent-4-light))",
        dark: "hsl(var(--accent-4-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      "accent-5": {
        main: "hsl(var(--accent-5))",
        light: "hsl(var(--accent-5-light))",
        dark: "hsl(var(--accent-5-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      "accent-6": {
        main: "hsl(var(--accent-6))",
        light: "hsl(var(--accent-6-light))",
        dark: "hsl(var(--accent-6-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      "text-primary": {
        main: "hsl(var(--text-primary))",
        light: "hsl(var(--text-primary-light))",
        dark: "hsl(var(--text-primary-dark))",
        contrastText: "hsl(var(--text-contrast-alternative))",
      },
      "text-secondary": {
        main: "hsl(var(--text-secondary))",
        light: "hsl(var(--text-secondary-light))",
        dark: "hsl(var(--text-secondary-dark))",
        contrastText: "hsl(var(--text-contrast-alternative))",
      },
      "text-disabled": {
        main: "hsl(var(--text-disabled))",
        light: "hsl(var(--text-disabled-light))",
        dark: "hsl(var(--text-disabled-dark))",
        contrastText: "hsl(var(--text-contrast-alternative))",
      },
      "text-muted": {
        main: "hsl(var(--text-muted))",
        light: "hsl(var(--text-muted-light))",
        dark: "hsl(var(--text-muted-dark))",
        contrastText: "hsl(var(--text-contrast-alternative))",
      },

      // ---------- Theme Colors ---------- //

      // ---------- Grey Scales ---------- //
      grey: {
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

      // ---------- Feedback Colors ---------- //
      error: {
        main: "hsl(var(--error))",
        light: "hsl(var(--error-light))",
        dark: "hsl(var(--error-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      info: {
        main: "hsl(var(--info))",
        light: "hsl(var(--info-light))",
        dark: "hsl(var(--info-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      success: {
        main: "hsl(var(--success))",
        light: "hsl(var(--success-light))",
        dark: "hsl(var(--success-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      warning: {
        main: "hsl(var(--warning))",
        light: "hsl(var(--warning-light))",
        dark: "hsl(var(--warning-dark))",
        contrastText: "hsl(var(--text-contrast))",
      },
      // ---------- Feedback Colors ---------- //
    },
    components: {
      MuiCircularProgress: {
        defaultProps: {
          size: "1.5rem",
        },
      },
      MuiCheckbox: {
        defaultProps: {
          icon: <CheckboxSmallEmptyOutlined />,
          checkedIcon: <CheckboxSmallChecked />,
          indeterminateIcon: <CheckboxSmallIndeterminate />,
        },
      },
      MuiSwitch: {
        defaultProps: {
          disableRipple: true,
          disableFocusRipple: true,
          disableTouchRipple: true,
        },
      },
      MuiInput: {
        defaultProps: {
          disableUnderline: true,
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          disableTouchRipple: true,
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          disableRipple: true,
        },
      },
      MuiButtonGroup: {
        defaultProps: {
          disableElevation: true,
          disableRipple: true,
        },
      },
      MuiAccordion: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiCard: {
        defaultProps: {
          elevation: 0,
        },
      },
    },
  });

export const muiTheme = createMuiTheme();

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useLocalStorage<ThemeVariant>(LS_KEYS.themeColor, DEFAULTS.themeColor);
  const [mode, setMode] = useLocalStorage<ModeVariant>(LS_KEYS.themeMode, DEFAULTS.themeMode);

  const locale = useLocale();

  // Determine direction based on language
  const direction = locale === "ar" ? "rtl" : "ltr";
  const muiThemeInstance = useMemo(() => createMuiTheme(direction), [direction]);
  // Update MUI theme when direction changes

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set the theme and mode on the document element
  useEffect(() => {
    if (mounted) {
      const classList = document.documentElement.classList;

      const preferredSystemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const finalMode = mode === "system" ? preferredSystemMode : (mode ?? preferredSystemMode);
      classList.add(theme ?? DEFAULTS.themeColor, finalMode);

      const removeList = [...Object.values(THEME_OPTIONS), ...THEME_MODE_OPTIONS].filter(
        (x) => x !== theme && x !== finalMode,
      );
      classList.remove(...removeList);
    }
  }, [theme, mode, mounted]);

  const [innerShadowOpacity, setInnerShadowOpacity] = useLocalStorage<number>(
    LS_KEYS.innerShadowOpacity,
    DEFAULTS.innerShadowOpacity,
  );
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--inner-shadow-opacity",
      `${(innerShadowOpacity ?? DEFAULTS.innerShadowOpacity) / 100}`,
    );
  }, [innerShadowOpacity]);

  const [backgroundShape, setBackgroundShape] = useLocalStorage<BackgroundShape>(
    LS_KEYS.bgShapes,
    DEFAULTS.backgroundShape,
  );

  const [foregroundOpacity, setForegroundOpacity] = useLocalStorage<number>(
    LS_KEYS.foregroundOpacity,
    DEFAULTS.foregroundOpacity,
  );
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--foreground-opacity",
      `${foregroundOpacity ?? DEFAULTS.foregroundOpacity}%`,
    );
  }, [foregroundOpacity]);

  const [content, setContent] = useLocalStorage<ContentType>(LS_KEYS.contentType, DEFAULTS.contentType);

  const isDarkMode = useMemo(() => {
    if (mounted) {
      const preferredSystemMode = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      const finalMode = mode === "system" ? preferredSystemMode : (mode ?? preferredSystemMode);
      return finalMode === "dark";
    } else {
      return false;
    }
  }, [mode, mounted]);

  const [bgOpacity, setBgOpacity] = useLocalStorage<number>(LS_KEYS.bgOpacity, DEFAULTS.bgOpacity);
  useEffect(() => {
    document.documentElement.style.setProperty("--bg-opacity", `${bgOpacity ?? DEFAULTS.bgOpacity}%`);
  }, [bgOpacity]);

  useEffect(() => {
    setTimeout(
      () => document.documentElement.style.setProperty("--layout-duration", `${DEFAULTS.transitionDuration}ms`),
      200,
    );
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme ?? DEFAULTS.themeColor,
        setTheme,
        mode: mode ?? DEFAULTS.themeMode,
        setMode,
        content: content ?? DEFAULTS.contentType,
        setContent,
        backgroundShape: backgroundShape ?? DEFAULTS.backgroundShape,
        setBackgroundShape,
        innerShadowOpacity: innerShadowOpacity ?? DEFAULTS.innerShadowOpacity,
        setInnerShadowOpacity,
        foregroundOpacity: foregroundOpacity ?? DEFAULTS.foregroundOpacity,
        setForegroundOpacity,
        bgOpacity: bgOpacity ?? DEFAULTS.bgOpacity,
        setBgOpacity,
        isDarkMode,
      }}
    >
      <MuiLayerOverride />
      <MuiThemeProvider theme={muiThemeInstance} defaultMode={mode || DEFAULTS.themeMode}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
