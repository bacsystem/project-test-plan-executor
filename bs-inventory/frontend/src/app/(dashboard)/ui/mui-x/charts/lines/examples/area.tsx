import { LineChart } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { colorWithOpacity } from "@/lib/chart-helper";

export default function Area() {
  const chartPalette = useChartPalette();

  return (
    <LineChart
      series={[{ curve: "bumpX", data: [2, 5.5, 2, 8.5, 1.5, 5], area: true }]}
      xAxis={[{ min: 0.9, data: [1, 2, 3, 5, 8, 10], disableLine: true, disableTicks: true }]}
      yAxis={[{ disableLine: true, disableTicks: true }]}
      height={300}
      slots={{ tooltip: CustomChartTooltip }}
      slotProps={{ area: ({ color }) => ({ fill: colorWithOpacity(color) }) }}
      grid={{ horizontal: true }}
      {...chartPalette}
    />
  );
}
