import { AxisValueFormatterContext, BarElement } from "@mui/x-charts";
import { BarChartPremium } from "@mui/x-charts-premium/BarChartPremium";
import { RangeBarValueType } from "@mui/x-charts-premium/models";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";
export default function RangeBar() {
  const chartPalette = useChartPalette();

  return (
    <BarChartPremium
      xAxis={[
        {
          data: temperatureBerlinPorto.months,
          valueFormatter: (v: string, context: AxisValueFormatterContext) =>
            context.location === "tick" ? v.slice(0, 3) : v,
          categoryGapRatio: 0.35,
          barGapRatio: 0.3,
          disableLine: true,
          disableTicks: true,
        },
      ]}
      yAxis={[
        {
          valueFormatter: (value: number) => `${value}°C`,
          disableLine: true,
          disableTicks: true,
        },
      ]}
      series={[
        {
          id: "porto",
          type: "rangeBar",
          label: "Porto, Portugal",
          valueFormatter: (value) => (value === null ? null : `${value[0]}°C - ${value[1]}°C`),
          data: temperatureBerlinPorto.porto,
          labelMarkType: CustomChartMark,
        },
        {
          id: "berlin",
          type: "rangeBar",
          label: "Berlin, Germany",
          valueFormatter: (value) => (value === null ? null : `${value[0]}°C - ${value[1]}°C`),
          data: temperatureBerlinPorto.berlin,
          labelMarkType: CustomChartMark,
        },
      ]}
      slots={{ tooltip: CustomChartTooltip, bar: withChartElementStyle(BarElement, { rx: 10, ry: 10 }) }}
      {...chartPalette}
      height={300}
      grid={{ horizontal: true }}
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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const berlin = [
  [-1.9, 2.8],
  [-1.4, 4.4],
  [0.6, 8.4],
  [4.6, 14.4],
  [9.4, 18.9],
  [12.9, 22.1],
  [15.2, 24.0],
  [14.9, 23.9],
  [11.4, 19.6],
  [7.3, 13.8],
  [3.2, 8.0],
  [0.1, 4.2],
] satisfies RangeBarValueType[];

const porto = [
  [6.4, 14.0],
  [6.8, 15.0],
  [8.8, 17.0],
  [10.1, 18.1],
  [12.3, 20.3],
  [14.5, 22.7],
  [15.5, 24.3],
  [15.7, 24.8],
  [14.8, 23.5],
  [12.9, 20.7],
  [9.4, 16.8],
  [7.6, 14.7],
] satisfies RangeBarValueType[];

const temperatureBerlinPorto = { months, berlin, porto };
