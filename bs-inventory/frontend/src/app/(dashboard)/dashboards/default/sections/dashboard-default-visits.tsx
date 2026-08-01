import { useMemo, useState } from "react";

import { Box, Card, CardContent, FormControl, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { CurveType, LineChart } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function DashboardDefaultVisits() {
  const theme = useTheme();
  const [curve, setCurve] = useState<CurveType>("bumpX");
  const [datePeriod, setDatePeriod] = useState<string>("lastWeek");

  const chartData = useMemo(() => {
    switch (datePeriod) {
      case "lastWeek":
        return {
          xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [2500, 3000, 2800, 3200, 3800, 3500, 3300],
        };
      case "lastMonth":
        return {
          xAxis: Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`),
          data: [11000, 12500, 11800, 13200],
        };
      case "lastQuarter":
        return {
          xAxis: ["January", "February", "March"],
          data: [42000, 45000, 43000],
        };
      case "lastYear":
        return {
          xAxis: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          data: [41000, 42500, 44000, 45500, 44500, 43500, 45000, 46000, 44750, 43250, 41750, 42250],
        };
      default:
        return { xAxis: [], data: [] };
    }
  }, [datePeriod]);

  return (
    <Box>
      <Box className="mt-2 mb-3 flex flex-wrap justify-between gap-4">
        <Typography variant="h6" component="h6">
          Visits
        </Typography>

        <Box className="-mt-1.5 flex gap-1">
          <FormControl size="small" variant="standard" className="outlined mb-0 w-34">
            <Select
              value={curve}
              onChange={(e) => setCurve(e.target.value)}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
              slotProps={{
                root: {
                  className: "[&>.MuiInputBase-input]:py-0! rounded-sm!",
                },
              }}
            >
              <MenuItem value="bumpX">Bump X</MenuItem>
              <MenuItem value="bumpY">Bump Y</MenuItem>
              <MenuItem value="catmullRom">Catmull Rom</MenuItem>
              <MenuItem value="linear">Linear</MenuItem>
              <MenuItem value="monotoneX">Monotone X</MenuItem>
              <MenuItem value="monotoneY">Monotone Y</MenuItem>
              <MenuItem value="natural">Natural</MenuItem>
              <MenuItem value="step">Step</MenuItem>
              <MenuItem value="stepAfter">Step After</MenuItem>
              <MenuItem value="stepBefore">Step Before</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" variant="standard" className="outlined mb-0 w-34">
            <Select
              value={datePeriod}
              onChange={(e) => setDatePeriod(e.target.value)}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
              slotProps={{
                root: {
                  className: "[&>.MuiInputBase-input]:py-0! rounded-sm!",
                },
              }}
            >
              <MenuItem value="lastWeek">Last Week</MenuItem>
              <MenuItem value="lastMonth">Last Month</MenuItem>
              <MenuItem value="lastQuarter">Last Quarter</MenuItem>
              <MenuItem value="lastYear">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Card>
        <CardContent>
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
                  return v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toLocaleString();
                },
              },
            ]}
            series={[{ curve, showMark: false, data: chartData.data, color: theme.palette.secondary.main }]}
            height={300}
            slots={{ tooltip: CustomChartTooltip }}
            grid={{ horizontal: true }}
            margin={{ bottom: 0, left: 0, right: 0 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
