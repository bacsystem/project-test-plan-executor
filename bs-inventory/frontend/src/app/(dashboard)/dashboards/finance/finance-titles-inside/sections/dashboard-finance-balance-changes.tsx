import { useMemo, useState } from "react";

import { Box, Card, CardContent, FormControl, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { CurveType, LineChart } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function DashboardFinanceBalanceChanges() {
  const theme = useTheme();
  const curve = "bumpX" as CurveType;
  const [datePeriod, setDatePeriod] = useState<string>("lastWeek");

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
      <Box className="card-title flex flex-wrap justify-between gap-4 px-4 pt-4">
        <Typography variant="h6" component="h6">
          Balance Changes
        </Typography>

        <Box className="flex gap-1">
          <FormControl size="small" variant="standard" className="outlined w-34">
            <Select
              value={datePeriod}
              onChange={(e) => setDatePeriod(e.target.value)}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              <MenuItem value="lastWeek">Last Week</MenuItem>
              <MenuItem value="lastMonth">Last Month</MenuItem>
              <MenuItem value="lastQuarter">Last Quarter</MenuItem>
              <MenuItem value="lastYear">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <CardContent className="pt-0!">
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
          height={284}
          slots={{ tooltip: CustomChartTooltip }}
          grid={{ horizontal: true }}
          margin={{ bottom: 0, left: 0, right: 0 }}
        />
      </CardContent>
    </Card>
  );
}
