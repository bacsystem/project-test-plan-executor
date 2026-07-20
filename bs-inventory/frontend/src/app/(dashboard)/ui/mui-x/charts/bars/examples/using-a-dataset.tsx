import { BarChart, BarElement } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function UsingADataset() {
  const chartPalette = useChartPalette();

  return (
    <BarChart
      dataset={[
        { london: 59, paris: 57, newYork: 86, seoul: 21, month: "Jan" },
        { london: 50, paris: 52, newYork: 78, seoul: 28, month: "Feb" },
        { london: 47, paris: 53, newYork: 106, seoul: 41, month: "Mar" },
        { london: 54, paris: 56, newYork: 92, seoul: 73, month: "Apr" },
        { london: 57, paris: 69, newYork: 92, seoul: 99, month: "May" },
        { london: 60, paris: 63, newYork: 103, seoul: 144, month: "June" },
        { london: 59, paris: 60, newYork: 105, seoul: 319, month: "July" },
        { london: 65, paris: 60, newYork: 106, seoul: 249, month: "Aug" },
        { london: 51, paris: 51, newYork: 95, seoul: 131, month: "Sept" },
        { london: 60, paris: 65, newYork: 97, seoul: 55, month: "Oct" },
        { london: 67, paris: 64, newYork: 76, seoul: 48, month: "Nov" },
        { london: 61, paris: 70, newYork: 103, seoul: 25, month: "Dec" },
      ]}
      series={[
        {
          dataKey: "london",
          label: "London",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `${v.toLocaleString()}mm` : "-"),
          labelMarkType: CustomChartMark,
        },
        {
          dataKey: "paris",
          label: "Paris",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `${v.toLocaleString()}mm` : "-"),
          labelMarkType: CustomChartMark,
        },
        {
          dataKey: "newYork",
          label: "New York",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `${v.toLocaleString()}mm` : "-"),
          labelMarkType: CustomChartMark,
        },
        {
          dataKey: "seoul",
          label: "Seoul",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `${v.toLocaleString()}mm` : "-"),
          labelMarkType: CustomChartMark,
        },
      ]}
      xAxis={[{ dataKey: "month", disableLine: true, disableTicks: true }]}
      yAxis={[{ label: "rainfall (mm)", disableLine: true, disableTicks: true }]}
      height={300}
      slots={{ tooltip: CustomChartTooltip, bar: withChartElementStyle(BarElement, { rx: 5, ry: 5 }) }}
      grid={{ horizontal: true }}
      {...chartPalette}
      margin={{ bottom: 20, left: 0, right: 0 }}
      slotProps={{
        legend: {
          position: {
            vertical: "bottom",
          },
        },
      }}
    />
  );
}
