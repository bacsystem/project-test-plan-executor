import { useMemo, useState } from "react";

import { Box, Card, CardContent, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import { colorWithOpacity } from "@/lib/chart-helper";

export default function DashboardFinanceBalanceChanges() {
  const [datePeriod, setDatePeriod] = useState<string>("lastWeek");
  const chartPalette = useChartPalette();

  const chartData = useMemo(() => {
    switch (datePeriod) {
      case "lastWeek":
        return {
          data: [
            { date: "Mon", income: 300, spending: 100 },
            { date: "Tue", income: 400, spending: 140 },
            { date: "Wed", income: 800, spending: 180 },
            { date: "Thu", income: 200, spending: 100 },
            { date: "Fri", income: 600, spending: 150 },
            { date: "Sat", income: 100, spending: 50 },
            { date: "Sun", income: 300, spending: 50 },
          ],
          min: 0,
          max: 1000,
        };
      case "lastMonth":
        return {
          data: [
            { date: "Week 1", income: 1600, spending: 400 },
            { date: "Week 2", income: 2200, spending: 540 },
            { date: "Week 3", income: 1400, spending: 680 },
            { date: "Week 4", income: 1000, spending: 400 },
          ],
          min: 0,
          max: 3000,
        };
      case "lastQuarter":
        return {
          data: [
            { date: "January", income: 3600, spending: 1200 },
            { date: "February", income: 6200, spending: 2040 },
            { date: "March", income: 4400, spending: 1800 },
          ],
          min: 0,
          max: 10000,
        };
      case "lastYear":
        return {
          data: [
            { date: "Jan", income: 3600, spending: 1200 },
            { date: "Feb", income: 7200, spending: 4240 },
            { date: "Mar", income: 4400, spending: 1800 },
            { date: "Apr", income: 3000, spending: 800 },
            { date: "May", income: 4200, spending: 1400 },
            { date: "Jun", income: 4200, spending: 1400 },
            { date: "Jul", income: 5200, spending: 1200 },
            { date: "Aug", income: 3600, spending: 1200 },
            { date: "Sep", income: 2600, spending: 1600 },
            { date: "Oct", income: 2600, spending: 1600 },
            { date: "Nov", income: 3400, spending: 1100 },
            { date: "Dec", income: 3800, spending: 1200 },
          ],
          min: 0,
          max: 10000,
        };
      default:
        return { data: [], min: 0, max: 0 };
    }
  }, [datePeriod]);

  return (
    <Box>
      <Box className="mt-2 mb-3 flex flex-wrap justify-between gap-4 lg:mt-0">
        <Typography variant="h6" component="h6">
          Balance Changes
        </Typography>

        <Box className="-mt-1.5 flex gap-1">
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
            dataset={chartData.data}
            series={[
              {
                dataKey: "income",
                label: "Income",
                showMark: false,
                curve: "bumpX",
                labelMarkType: CustomChartMark,
              },
              {
                dataKey: "spending",
                label: "Spending",
                showMark: false,
                curve: "bumpX",
                labelMarkType: CustomChartMark,
              },
            ]}
            xAxis={[
              {
                id: "Date",
                dataKey: "date",
                scaleType: "band",
                disableLine: true,
                disableTicks: true,
              },
            ]}
            yAxis={[
              {
                disableLine: true,
                disableTicks: true,
                min: chartData.min,
                max: chartData.max,
                width: 40,
                valueFormatter: (v: number | null) => {
                  if (typeof v !== "number") return "-";
                  return v >= 1000 ? `$${(v / 1000).toFixed(1)}K` : `$${v.toLocaleString()}`;
                },
              },
            ]}
            height={280}
            slots={{ tooltip: CustomChartTooltip }}
            slotProps={{
              area: ({ color }) => ({ fill: colorWithOpacity(color) }),
              legend: { direction: "horizontal", position: { horizontal: "center", vertical: "bottom" } },
            }}
            grid={{ horizontal: true }}
            axisHighlight={{ x: "band" }}
            margin={{ bottom: 20, left: 0, right: 0 }}
            {...chartPalette}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
