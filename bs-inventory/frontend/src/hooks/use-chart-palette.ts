import { useTheme } from "@mui/material";
import { UseChartSeriesParameters } from "@mui/x-charts/internals";

import { useThemeContext } from "@/theme/theme-provider";

const useChartPalette = () => {
  const { palette } = useTheme();
  const { isDarkMode } = useThemeContext();

  return {
    colors: [
      palette.primary.main,
      palette.secondary.main,
      palette["accent-1"].main,
      palette["accent-2"].main,
      palette["accent-3"].main,
      palette["accent-4"].main,
    ],
    theme: isDarkMode ? "dark" : "light",
  } satisfies Pick<UseChartSeriesParameters, "colors" | "theme">;
};

export default useChartPalette;
