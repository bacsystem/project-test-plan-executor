"use client";

import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { PieArc, PieChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function LPCategoriesChart() {
  const { palette } = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Categories
        </Typography>

        <PieChart
          series={[
            {
              innerRadius: 40,
              paddingAngle: 4,
              cornerRadius: 4,
              data: [
                { label: "Toys", value: 50, color: palette.primary.main, labelMarkType: CustomChartMark },
                { label: "Books", value: 35, color: palette.secondary.main, labelMarkType: CustomChartMark },
                { label: "Games", value: 25, color: palette["accent-1"].main, labelMarkType: CustomChartMark },
              ],
            },
          ]}
          height={214}
          slots={{ pieArc: withChartElementStyle(PieArc), tooltip: CustomChartTooltip }}
          slotProps={{ legend: { direction: "horizontal", position: { horizontal: "center", vertical: "bottom" } } }}
        />
      </CardContent>
    </Card>
  );
}
