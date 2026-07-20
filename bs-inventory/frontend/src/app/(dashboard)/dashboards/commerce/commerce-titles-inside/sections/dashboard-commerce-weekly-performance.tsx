import { useMemo, useState } from "react";

import { Card, CardContent, Typography, useTheme } from "@mui/material";
import { CurveType, LineChart } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";

export default function DashboardCommerceWeeklyPerformance() {
  const theme = useTheme();
  const [curve] = useState<CurveType>("bumpX");
  const [datePeriod] = useState<string>("lastWeek");

  const chartData = useMemo(() => {
    switch (datePeriod) {
      case "lastWeek":
        return {
          xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [500, 600, 500, 600, 800, 500, 700],
        };
      case "lastMonth":
        return {
          xAxis: Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`),
          data: [2200, 2500, 2100, 2700],
        };
      case "lastQuarter":
        return {
          xAxis: ["January", "February", "March"],
          data: [8500, 9200, 8800],
        };
      case "lastYear":
        return {
          xAxis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [8200, 8500, 8800, 9100, 8900, 8700, 9000, 9200, 8950, 8650, 8350, 8450],
        };
      default:
        return { xAxis: [], data: [] };
    }
  }, [datePeriod]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Weekly Performance
        </Typography>
        <LineChart
          xAxis={[{ data: chartData.xAxis, scaleType: "band", disableLine: true, disableTicks: true }]}
          yAxis={[
            {
              disableLine: true,
              disableTicks: true,
              min: Math.min(...chartData.data) - 100,
              max: Math.max(...chartData.data) + 100,
              width: 40,
              valueFormatter: (v: number | null) => {
                if (typeof v !== "number") return "-";
                return v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v.toLocaleString()}`;
              },
            },
          ]}
          series={[{ curve, showMark: false, data: chartData.data, color: theme.palette.primary.main }]}
          height={318}
          slots={{ tooltip: CustomChartTooltip }}
          grid={{ horizontal: true }}
          margin={{ bottom: 0, left: 0, right: 0 }}
        />
      </CardContent>
    </Card>
  );
}
