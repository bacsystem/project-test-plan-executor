import { BarChart, BarElement } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function BasicBar() {
  const chartPalette = useChartPalette();

  return (
    <BarChart
      series={[
        { data: [4, 3, 5], labelMarkType: CustomChartMark },
        { data: [1, 5, 3], labelMarkType: CustomChartMark },
        { data: [2, 5, 3], labelMarkType: CustomChartMark },
      ]}
      xAxis={[
        {
          data: ["Group A", "Group B", "Group C"],
          categoryGapRatio: 0.5,
          barGapRatio: 0.2,
          disableLine: true,
          disableTicks: true,
        },
      ]}
      yAxis={[
        { domainLimit: (min, max) => ({ min, max: (max as number) + 1 }), disableLine: true, disableTicks: true },
      ]}
      height={300}
      slots={{ tooltip: CustomChartTooltip, bar: withChartElementStyle(BarElement, { rx: 10, ry: 10 }) }}
      grid={{ horizontal: true }}
      {...chartPalette}
      margin={{ bottom: 20, left: 0, right: 0 }}
      slotProps={{
        legend: {
          position: {
            vertical: "bottom",
          },
        },
      }}
    />
  );
}
