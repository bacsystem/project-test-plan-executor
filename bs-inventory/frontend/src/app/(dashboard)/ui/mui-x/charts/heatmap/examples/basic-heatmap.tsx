"use client";
import { useTheme } from "@mui/material";
import { Heatmap, type HeatmapTooltipProps } from "@mui/x-charts-pro";

import CustomChartTooltipPro from "@/components/charts/tooltip/custom-chart-tooltip-pro";
import { cssVariableColorToRgb } from "@/lib/chart-helper";

export default function BasicHeatmap() {
  const { palette } = useTheme();

  const HeatmapTooltip = (props: HeatmapTooltipProps) => <CustomChartTooltipPro {...(props as any)} />;

  return (
    <Heatmap
      xAxis={[{ data: [1, 2, 3, 4] }]}
      yAxis={[{ data: ["A", "B", "C", "D", "E"] }]}
      series={[
        {
          data: [
            [0, 0, 10],
            [0, 1, 20],
            [0, 2, 40],
            [0, 3, 90],
            [0, 4, 70],
            [1, 0, 30],
            [1, 1, 50],
            [1, 2, 10],
            [1, 3, 70],
            [1, 4, 40],
            [2, 0, 50],
            [2, 1, 20],
            [2, 2, 90],
            [2, 3, 20],
            [2, 4, 70],
            [3, 0, 40],
            [3, 1, 50],
            [3, 2, 20],
            [3, 3, 70],
            [3, 4, 90],
          ],
        },
      ]}
      zAxis={[
        {
          min: 0,
          max: 100,
          colorMap: {
            type: "continuous",
            color: [cssVariableColorToRgb(palette.background.paper), cssVariableColorToRgb(palette.secondary.main)],
          },
        },
      ]}
      margin={{ left: 0, right: 10, bottom: 10, top: 0 }}
      height={300}
      hideLegend={false}
      slotProps={{ legend: { direction: "vertical", position: { vertical: "middle" } }, tooltip: { trigger: "item" } }}
      slots={{ tooltip: HeatmapTooltip }}
    />
  );
}
