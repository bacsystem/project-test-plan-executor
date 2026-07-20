import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { RadarChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";

export default function UserOverviewActivity() {
  const { palette } = useTheme();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Activity
        </Typography>

        <RadarChart
          series={[
            {
              label: "Activity",
              data: [43, 5, 22, 30],
              color: palette.primary.main,
              fillArea: true,
              labelMarkType: CustomChartMark,
            },
          ]}
          className="radar-chart radar-label-center"
          shape="sharp"
          radar={{
            labelGap: 24,
            max: 50,
            metrics: [`43%\nCode Review`, `5%\nIssues`, `22%\nPull requests`, `30%\nCommits`],
          }}
          divisions={0}
          height={250}
          margin={{ bottom: 54, top: 50, left: 0, right: 0 }}
          hideLegend
          slotProps={{ tooltip: { trigger: "none" } }}
        />
      </CardContent>
    </Card>
  );
}
