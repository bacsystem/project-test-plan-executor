import { BackgroundShape, ContentType, MenuType } from "./types";

import { ModeVariant, ThemeVariant } from "@/constants";

export const DEFAULTS = {
  appRoot: "/dashboards/default",
  locale: "en",
  themeColor: "theme-orange" as ThemeVariant,
  themeMode: "system" as ModeVariant,
  contentType: ContentType.Boxed,
  backgroundShape: BackgroundShape.Waves,
  innerShadowOpacity: 10,
  foregroundOpacity: 50,
  bgOpacity: 80,
  leftMenuType: MenuType.Minimal,
  leftMenuWidth: {
    [MenuType.Minimal]: { primary: 40, secondary: 280 },
    [MenuType.Comfort]: { primary: 80, secondary: 280 },
    [MenuType.SingleLayer]: { primary: 280, secondary: 0 },
  },
  rightMenuType: MenuType.Minimal,
  rightMenuWidth: {
    [MenuType.Minimal]: { primary: 40, secondary: 280 },
    [MenuType.Comfort]: { primary: 80, secondary: 280 },
    [MenuType.SingleLayer]: { primary: 280, secondary: 0 },
  },
  transitionDuration: 150,
  rightMenuAlwaysHidden: false,
};
