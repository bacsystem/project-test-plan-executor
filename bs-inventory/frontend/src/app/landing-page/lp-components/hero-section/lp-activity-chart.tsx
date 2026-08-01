"use client";

import { Card, CardContent, useTheme } from "@mui/material";
import { RadarChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";

export default function LPActivityChart() {
  const { palette } = useTheme();

  return (
    <Card className="w-64">
      <CardContent>
        <RadarChart
          series={[
            {
              label: "Activity",
              data: [67, 24, 36, 75],
              color: palette.primary.main,
              fillArea: true,
              labelMarkType: CustomChartMark,
            },
          ]}
          className="radar-chart radar-label-center"
          shape="sharp"
          radar={{
            labelGap: 24,
            max: 100,
            metrics: [`43%\nCode Review`, `5%\nIssues`, `22%\nPull requests`, `30%\nCommits`],
          }}
          divisions={0}
          height={200}
          margin={{ bottom: 60, top: 50, left: 0, right: 0 }}
          hideLegend
          slotProps={{ tooltip: { trigger: "none" } }}
        />
      </CardContent>
    </Card>
  );
}
