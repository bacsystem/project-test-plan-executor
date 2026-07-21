export const LOCALES = ["de", "en", "fr", "es", "ar"] as const;
export type LocaleOption = (typeof LOCALES)[number];

export const THEME_OPTIONS = {
  BLUE: "theme-blue",
  GREEN: "theme-green",
  ORANGE: "theme-orange",
  PURPLE: "theme-purple",
} as const;

export type ThemeVariant = (typeof THEME_OPTIONS)[keyof typeof THEME_OPTIONS];

export type ModeVariant = (typeof THEME_MODE_OPTIONS)[number];
export const THEME_MODE_OPTIONS = ["light", "dark", "system"] as const;

export const MIN_LOGO_CONTAINER_WIDTH = 100;

const storagePrefix = process.env.NEXT_PUBLIC_STORAGE_PREFIX || "";
export const COOKIE_KEYS = { locale: `${storagePrefix}-locale` };

export const LOCAL_STORAGE_KEYS = {
  themeColor: `${storagePrefix}-theme-color`,
  themeMode: `${storagePrefix}-theme-mode`,
  leftMenuType: `${storagePrefix}-left-menu-type`,
  rightMenuType: `${storagePrefix}-right-menu-type`,
  contentType: `${storagePrefix}-content-type`,
  bgShapes: `${storagePrefix}-bg-shapes`,
  innerShadowOpacity: `${storagePrefix}-inner-shadow-opacity`,
  foregroundOpacity: `${storagePrefix}-foreground-opacity`,
  bgOpacity: `${storagePrefix}-bg-opacity`,
};

export const LINKS = {
  figma:
    "https://www.figma.com/design/dtrNXiyXGyfcl7xIIzByXz/prod-acorn-design-8.3.0?node-id=9242-145711&t=SUfOnygABHb4z7cs-4",
  purchase: "https://1.envato.market/QYPmYP",
  purchase_extended: "https://1.envato.market/jRXoRe",
  docs: "/docs/welcome/introduction",
  view: "/auth/sign-in",
  signup: "/auth/sign-up",
  login: "/auth/sign-in",
  components: "/ui",
  dashboard: "/dashboards/default",
} as const;
