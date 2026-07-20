import { Grid, Typography } from "@mui/material";
import { RadarChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";

export default function BasicRadar() {
  const chartPalette = useChartPalette();

  return (
    <Grid container spacing={4}>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <RadarChart
          shape="sharp"
          series={[{ labelMarkType: CustomChartMark, label: "Lisa", data: [120, 98, 86, 99, 85, 65] }]}
          radar={{ max: 120, metrics: ["Math", "Chinese", "English", "Geography", "Physics", "History"] }}
          height={300}
          width={300}
          slots={{ tooltip: CustomChartTooltip }}
          stripeColor={null}
          className="radar-chart"
          {...chartPalette}
        />
        <Typography className="capitalize">Sharp</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <RadarChart
          shape="circular"
          series={[{ labelMarkType: CustomChartMark, label: "Bob", data: [98, 86, 99, 85, 65, 77] }]}
          radar={{ max: 120, metrics: ["Math", "Chinese", "English", "Geography", "Physics", "History"] }}
          height={300}
          width={300}
          slots={{ tooltip: CustomChartTooltip }}
          stripeColor={null}
          className="radar-chart"
          {...chartPalette}
        />
        <Typography className="capitalize">Circular</Typography>
      </Grid>
    </Grid>
  );
}
