import { Grid, Typography } from "@mui/material";
import { FunnelSection, Unstable_FunnelChart as FunnelChart } from "@mui/x-charts-pro/FunnelChart";

import CustomChartTooltipPro from "@/components/charts/tooltip/custom-chart-tooltip-pro";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function Curves() {
  const chartPalette = useChartPalette();

  return (
    <Grid container spacing={4}>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <FunnelChart
          series={[{ curve: "bump", data: [{ value: 30 }, { value: 90 }, { value: 180 }, { value: 400 }] }]}
          height={300}
          slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
          {...chartPalette}
        />
        <Typography>Bump</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <FunnelChart
          series={[{ curve: "linear", data: [{ value: 30 }, { value: 90 }, { value: 180 }, { value: 400 }] }]}
          height={300}
          slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
          {...chartPalette}
        />
        <Typography>Linear</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <FunnelChart
          series={[{ curve: "linear-sharp", data: [{ value: 30 }, { value: 90 }, { value: 180 }, { value: 400 }] }]}
          height={300}
          slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
          {...chartPalette}
        />
        <Typography>Linear Sharp</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <FunnelChart
          series={[{ curve: "pyramid", data: [{ value: 30 }, { value: 90 }, { value: 180 }, { value: 400 }] }]}
          height={300}
          slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
          {...chartPalette}
        />
        <Typography>Pyramid</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <FunnelChart
          series={[{ curve: "step", data: [{ value: 30 }, { value: 90 }, { value: 180 }, { value: 400 }] }]}
          height={300}
          slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
          {...chartPalette}
        />
        <Typography>Step</Typography>
      </Grid>
      <Grid size={6} className="flex flex-col items-center justify-center gap-2">
        <FunnelChart
          series={[{ curve: "step-pyramid", data: [{ value: 30 }, { value: 90 }, { value: 180 }, { value: 400 }] }]}
          height={300}
          slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
          {...chartPalette}
        />
        <Typography>Step Pyramid</Typography>
      </Grid>
    </Grid>
  );
}
