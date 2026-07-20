import { Grid } from "@mui/material";
import { BarElement, SparkLineChart } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";
import { colorWithOpacity } from "@/lib/chart-helper";

export default function BasicSparkline() {
  const chartPalette = useChartPalette();

  return (
    <Grid container spacing={4}>
      <Grid size={4}>
        <SparkLineChart
          plotType="line"
          curve="bumpX"
          data={[1, 4, 2, 5, 7, 2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />
      </Grid>
      <Grid size={4}>
        <SparkLineChart
          plotType="line"
          curve="bumpX"
          area
          data={[1, 4, 2, 5, 7, 2, 4, 6]}
          slotProps={{ area: { fill: colorWithOpacity(chartPalette.colors[0]) }, tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />
      </Grid>
      <Grid size={4}>
        <SparkLineChart
          plotType="bar"
          data={[1, 4, 2, 5, 7, 2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip, bar: withChartElementStyle(BarElement, { rx: 5, ry: 5 }) }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />
      </Grid>
    </Grid>
  );
}
