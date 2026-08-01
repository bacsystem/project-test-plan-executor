import { useLayoutContext } from "../../layout-context";
import { useTranslations } from "next-intl";

import { Box, Button, Divider, Typography } from "@mui/material";

import { DEFAULTS } from "@/config";
import { ModeVariant, THEME_OPTIONS } from "@/constants";
import { RadiobuttonSmallChecked, RadiobuttonSmallEmptyOutlined } from "@/icons/form/mui-radiobutton";
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiChevronLeftRightReverseSmall from "@/icons/nexture/ni-chevron-left-right-reverse-small";
import NiChevronLeftRightSmall from "@/icons/nexture/ni-chevron-left-right-small";
import NiMenuSplit from "@/icons/nexture/ni-menu-split";
import NiMenuSplitDot from "@/icons/nexture/ni-menu-split-dot";
import NiMenuSplitDotReverse from "@/icons/nexture/ni-menu-split-dot-reverse";
import NiMenuSplitReverse from "@/icons/nexture/ni-menu-split-reverse";
import NiMoon from "@/icons/nexture/ni-moon";
import NiPalette from "@/icons/nexture/ni-palette";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSun from "@/icons/nexture/ni-sun";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";
import { ContentType, MenuType } from "@/types";

const themeModeOptions = [
  { value: "system" as ModeVariant, icon: <NiScreen /> },
  { value: "light" as ModeVariant, icon: <NiSun /> },
  { value: "dark" as ModeVariant, icon: <NiMoon /> },
];

const leftMenuOptions = [
  { value: MenuType.Minimal, icon: <NiMenuSplitDot /> },
  { value: MenuType.Comfort, icon: <NiMenuSplit /> },
];

const rightMenuOptions = [
  { value: MenuType.Minimal, icon: <NiMenuSplitDotReverse /> },
  { value: MenuType.Comfort, icon: <NiMenuSplitReverse /> },
];

const contentOptions = [
  { value: ContentType.Boxed, icon: <NiChevronLeftRightReverseSmall /> },
  { value: ContentType.Fluid, icon: <NiChevronLeftRightSmall /> },
];

export function ThemeContent() {
  const t = useTranslations("dashboard");

  const { theme, setTheme, mode, setMode, content, setContent } = useThemeContext();
  const { leftMenuType, setLeftMenuType, rightMenuType, setRightMenuType } = useLayoutContext();

  const handleResetTheme = () => {
    setTheme(DEFAULTS.themeColor);
    setMode(DEFAULTS.themeMode);
    setContent(DEFAULTS.contentType);
    setLeftMenuType(DEFAULTS.leftMenuType);
    setRightMenuType(DEFAULTS.rightMenuType);
  };

  return (
    <>
      <Box className="flex flex-1 flex-col gap-2 px-5">
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("palette")}
        </Typography>
        <Box className="flex flex-col gap-2">
          {Object.values(THEME_OPTIONS).map((option) => (
            <Button
              key={`theme-color-${option}`}
              className={cn("full-width-button flex justify-between", option, theme === option && "active")}
              variant="paper"
              startIcon={<NiPalette />}
              onClick={() => setTheme(option)}
              color="primary"
            >
              {t(option)}
              <span className={cn("flex flex-1 justify-end", theme !== option && "text-grey-200")}>
                {theme === option && <RadiobuttonSmallChecked />}
                {theme !== option && <RadiobuttonSmallEmptyOutlined />}
              </span>
            </Button>
          ))}
        </Box>
        <Divider />
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("mode")}
        </Typography>
        <Box className="flex flex-col gap-2">
          {themeModeOptions.map((option) => (
            <Button
              key={`theme-mode-${option.value}`}
              className={cn("full-width-button flex justify-between", mode === option.value && "active")}
              variant="paper"
              color={mode === option.value ? "primary" : "text-primary"}
              startIcon={option.icon}
              onClick={() => setMode(option.value)}
            >
              {t(`mode-${option.value}`)}
              <span className={cn("flex flex-1 justify-end", mode !== option.value && "text-grey-200")}>
                {mode === option.value && <RadiobuttonSmallChecked />}
                {mode !== option.value && <RadiobuttonSmallEmptyOutlined />}
              </span>
            </Button>
          ))}
        </Box>

        <Divider />
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("left-menu")}
        </Typography>
        <Box className="flex flex-col gap-2">
          {leftMenuOptions.map((option) => (
            <Button
              key={`theme-left-menu-${option.value}`}
              className={cn("full-width-button flex justify-between", leftMenuType === option.value && "active")}
              variant="paper"
              color={leftMenuType === option.value ? "primary" : "text-primary"}
              startIcon={option.icon}
              onClick={() => setLeftMenuType(option.value)}
            >
              {t(`menu-${option.value}`)}
              <span className={cn("flex flex-1 justify-end", leftMenuType !== option.value && "text-grey-200")}>
                {leftMenuType === option.value && <RadiobuttonSmallChecked />}
                {leftMenuType !== option.value && <RadiobuttonSmallEmptyOutlined />}
              </span>
            </Button>
          ))}
        </Box>
        <Divider />
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("right-menu")}
        </Typography>
        <Box className="flex flex-col gap-2">
          {rightMenuOptions.map((option) => (
            <Button
              key={`theme-right-menu-${option.value}`}
              className={cn("full-width-button flex justify-between", rightMenuType === option.value && "active")}
              variant="paper"
              color={rightMenuType === option.value ? "primary" : "text-primary"}
              startIcon={option.icon}
              onClick={() => setRightMenuType(option.value)}
            >
              {t(`menu-${option.value}`)}
              <span className={cn("flex flex-1 justify-end", rightMenuType !== option.value && "text-grey-200")}>
                {rightMenuType === option.value && <RadiobuttonSmallChecked />}
                {rightMenuType !== option.value && <RadiobuttonSmallEmptyOutlined />}
              </span>
            </Button>
          ))}
        </Box>
        <Divider />
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("content")}
        </Typography>
        <Box className="flex flex-col gap-2">
          {contentOptions.map((option) => (
            <Button
              key={`theme-content-${option.value}`}
              className={cn("full-width-button flex justify-between", content === option.value && "active")}
              variant="paper"
              color={content === option.value ? "primary" : "text-primary"}
              startIcon={option.icon}
              onClick={() => setContent(option.value)}
            >
              {t(`content-${option.value}`)}
              <span className={cn("flex flex-1 justify-end", content !== option.value && "text-grey-200")}>
                {content === option.value && <RadiobuttonSmallChecked />}
                {content !== option.value && <RadiobuttonSmallEmptyOutlined />}
              </span>
            </Button>
          ))}
        </Box>
      </Box>
      <Box className="flex w-full px-5">
        <Button
          variant="outlined"
          size="small"
          color="grey"
          startIcon={<NiArrowCircleLeft size="small" />}
          className="w-full"
          onClick={() => handleResetTheme()}
        >
          {t("reset-theme")}
        </Button>
      </Box>
    </>
  );
}
