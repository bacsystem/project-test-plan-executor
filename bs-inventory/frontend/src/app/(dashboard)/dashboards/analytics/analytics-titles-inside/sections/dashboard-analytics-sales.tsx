import { useMemo } from "react";

import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { BarChart, BarElement, BarSeriesType } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function DashboardAnalyticsSales() {
  const { palette } = useTheme();

  const series = useMemo(() => {
    const books: Omit<BarSeriesType, "type"> = {
      data: [280, 340, 310, 355, 295, 320, 305],
      label: "Books",
      stack: "all",
      color: palette.primary.main,
    };
    const toys: Omit<BarSeriesType, "type"> = {
      data: [180, 230, 170, 220, 185, 210, 190],
      label: "Toys",
      stack: "all",
      color: palette.secondary.main,
    };
    const games: Omit<BarSeriesType, "type"> = {
      data: [140, 120, 160, 130, 120, 115, 110],
      label: "Games",
      stack: "all",
      color: palette["accent-1"].main,
    };
    return [books, toys, games];
  }, [palette]);

  const StyledBar = useMemo(() => withChartElementStyle(BarElement, { rx: 10, ry: 10 }), []);

  return (
    <Card className="h-80">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Sales
        </Typography>

        <BarChart
          series={series}
          xAxis={[
            {
              disableLine: true,
              disableTicks: true,
              data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              scaleType: "band",
              categoryGapRatio: 0.65,
            },
          ]}
          yAxis={[{ disableLine: true, disableTicks: true, valueFormatter: (value: number) => `$${value}`, width: 40 }]}
          slots={{ tooltip: CustomChartTooltip, bar: StyledBar }}
          height={220}
          hideLegend
          grid={{ horizontal: true }}
          axisHighlight={{ x: "line" }}
          margin={{ bottom: 0, left: 0, right: 0 }}
        />
      </CardContent>
    </Card>
  );
}
