import { Grid, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";

export default function Curve() {
  const chartPalette = useChartPalette();

  return (
    <Grid container spacing={4}>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="bumpX"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Bump X</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="bumpY"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Bump Y</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="catmullRom"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Catmull Rom</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="linear"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Linear</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="monotoneX"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Monotone X</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="monotoneY"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Monotone Y</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="natural"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Natural</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="step"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Step</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="stepAfter"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Step After</Typography>
      </Grid>
      <Grid size={4} className="flex flex-col items-center justify-center gap-2">
        <SparkLineChart
          curve="stepBefore"
          plotType="line"
          data={[3, -10, -2, 5, 7, -2, 4, 6]}
          slotProps={{ tooltip: { hideTitle: true } }}
          height={150}
          slots={{ tooltip: CustomChartTooltip }}
          showTooltip={true}
          showHighlight={true}
          color={chartPalette.colors[0]}
        />

        <Typography>Step Before</Typography>
      </Grid>
    </Grid>
  );
}
