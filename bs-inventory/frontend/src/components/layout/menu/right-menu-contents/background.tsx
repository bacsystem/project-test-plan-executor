import { useTranslations } from "next-intl";

import { Box, Button, Chip, Divider, FormGroup, Slider, Typography } from "@mui/material";

import { DEFAULTS } from "@/config";
import { RadiobuttonSmallChecked, RadiobuttonSmallEmptyOutlined } from "@/icons/form/mui-radiobutton";
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiCircle from "@/icons/nexture/ni-circle";
import NiSlashHexagon from "@/icons/nexture/ni-slash-hexagon";
import NiWave from "@/icons/nexture/ni-wave";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";
import { BackgroundShape } from "@/types";

const shapeOptions = [
  { value: BackgroundShape.Waves, icon: <NiWave /> },
  { value: BackgroundShape.Spheres, icon: <NiCircle /> },
  { value: BackgroundShape.None, icon: <NiSlashHexagon /> },
];

export function BackgroundContent() {
  const t = useTranslations("dashboard");
  const {
    setBackgroundShape,
    backgroundShape,
    setInnerShadowOpacity,
    innerShadowOpacity,
    setForegroundOpacity,
    foregroundOpacity,
    setBgOpacity,
    bgOpacity,
  } = useThemeContext();

  const handleResetBackground = () => {
    setBackgroundShape(DEFAULTS.backgroundShape);
    setInnerShadowOpacity(DEFAULTS.innerShadowOpacity);
    setForegroundOpacity(DEFAULTS.foregroundOpacity);
    setBgOpacity(DEFAULTS.bgOpacity);
  };

  return (
    <>
      <Box className="flex flex-1 flex-col gap-2 px-5">
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("shapes")}
        </Typography>
        <Box className="flex flex-col gap-2">
          {shapeOptions.map((option) => (
            <Button
              key={`shape-${option.value}`}
              className={cn(
                "full-width-button flex justify-between",
                option,
                backgroundShape === option.value && "active text-primary",
              )}
              variant="paper"
              startIcon={option.icon}
              onClick={() => setBackgroundShape(option.value)}
              color="text-primary"
            >
              {t(`shapes-${option.value}`)}
              <span className={cn("flex flex-1 justify-end", backgroundShape !== option.value && "text-grey-200")}>
                {backgroundShape === option.value && <RadiobuttonSmallChecked />}
                {backgroundShape !== option.value && <RadiobuttonSmallEmptyOutlined />}
              </span>
            </Button>
          ))}
        </Box>

        <Divider />
        <Typography variant="body2" className="text-text-disabled font-medium" component="div">
          {t("settings")}
        </Typography>
        <Box className="flex flex-col">
          <FormGroup>
            <Box className="flex w-full flex-row items-center justify-between">
              <Typography variant="subtitle2">{t("background-opacity")}</Typography>
              <Chip label={bgOpacity} variant="outlined" />
            </Box>
            <Slider
              className="w-full"
              value={typeof bgOpacity === "number" ? bgOpacity : 0}
              onChange={(_, newValue) => setBgOpacity(newValue as number)}
              size="small"
              step={10}
            />
          </FormGroup>

          <FormGroup>
            <Box className="flex w-full flex-row items-center justify-between">
              <Typography variant="subtitle2">{t("foreground-opacity")}</Typography>
              <Chip label={foregroundOpacity} variant="outlined" />
            </Box>
            <Slider
              className="w-full"
              value={typeof foregroundOpacity === "number" ? foregroundOpacity : 0}
              onChange={(_, newValue) => setForegroundOpacity(newValue as number)}
              size="small"
              step={10}
            />
          </FormGroup>
          <FormGroup>
            <Box className="flex w-full flex-row items-center justify-between">
              <Typography variant="subtitle2">{t("inner-shadow-opacity")}</Typography>
              <Chip label={innerShadowOpacity} variant="outlined" />
            </Box>
            <Slider
              className="w-full"
              value={typeof innerShadowOpacity === "number" ? innerShadowOpacity : 0}
              onChange={(_, newValue) => setInnerShadowOpacity(newValue as number)}
              size="small"
              step={10}
            />
          </FormGroup>
        </Box>
      </Box>
      <Box className="flex w-full px-5">
        <Button
          variant="outlined"
          size="small"
          color="grey"
          startIcon={<NiArrowCircleLeft size="small" />}
          className="w-full"
          onClick={() => handleResetBackground()}
        >
          {t("reset-background")}
        </Button>
      </Box>
    </>
  );
}
