import { Grid, Typography } from "@mui/material";
import { RadarChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";

export default function MultiSeries() {
  const chartPalette = useChartPalette();

  return (
    <Grid container spacing={4}>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <RadarChart
          series={[
            { labelMarkType: CustomChartMark, label: "Lisa", data: [120, 98, 86, 99, 85, 65] },
            { labelMarkType: CustomChartMark, label: "Bob", data: [98, 86, 99, 85, 65, 77] },
            { labelMarkType: CustomChartMark, label: "John", data: [88, 76, 89, 75, 55, 67] },
            { labelMarkType: CustomChartMark, label: "Jane", data: [78, 66, 79, 65, 45, 57] },
            { labelMarkType: CustomChartMark, label: "Jim", data: [68, 56, 69, 55, 35, 47] },
            { labelMarkType: CustomChartMark, label: "Jill", data: [58, 46, 59, 45, 25, 37] },
          ]}
          radar={{ max: 120, metrics: ["Math", "Chinese", "English", "Geography", "Physics", "History"] }}
          slotProps={{ tooltip: { trigger: "axis" } }}
          highlight="axis"
          height={300}
          slots={{ tooltip: CustomChartTooltip }}
          stripeColor={null}
          className="radar-chart"
          {...chartPalette}
        />
        <Typography className="capitalize">Axis Highlight</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <RadarChart
          series={[
            { labelMarkType: CustomChartMark, label: "Lisa", data: [120, 98, 86, 99, 85, 65] },
            { labelMarkType: CustomChartMark, label: "Bob", data: [98, 86, 99, 85, 65, 77] },
            { labelMarkType: CustomChartMark, label: "John", data: [88, 76, 89, 75, 55, 67] },
            { labelMarkType: CustomChartMark, label: "Jane", data: [78, 66, 79, 65, 45, 57] },
            { labelMarkType: CustomChartMark, label: "Jim", data: [68, 56, 69, 55, 35, 47] },
            { labelMarkType: CustomChartMark, label: "Jill", data: [58, 46, 59, 45, 25, 37] },
          ]}
          radar={{ max: 120, metrics: ["Math", "Chinese", "English", "Geography", "Physics", "History"] }}
          slotProps={{ tooltip: { trigger: "item" } }}
          highlight="series"
          height={300}
          slots={{ tooltip: CustomChartTooltip }}
          stripeColor={null}
          className="radar-chart"
          {...chartPalette}
        />
        <Typography className="capitalize">Series Highlight</Typography>
      </Grid>
    </Grid>
  );
}
