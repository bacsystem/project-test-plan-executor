import { BarChart, BarElement } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function Stacking() {
  const chartPalette = useChartPalette();

  return (
    <BarChart
      dataset={[
        {
          year: "2020",
          currAss: 9761580,
          nCurrAss: 29518779,
          curLia: 7805785,
          nCurLia: 20409334,
        },
        {
          year: "2021",
          currAss: 8069825,
          nCurrAss: 36514838,
          curLia: 8488966,
          nCurLia: 20246449,
        },
        {
          year: "2022",
          currAss: 9266473,
          nCurrAss: 39328295,
          curLia: 7930974,
          nCurLia: 19886393,
        },
        {
          year: "2023",
          currAss: 9918133,
          nCurrAss: 38813859,
          curLia: 8860655,
          nCurLia: 19283024,
        },
      ]}
      series={[
        {
          dataKey: "currAss",
          stack: "assets",
          label: "Current Assets",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `$${v.toLocaleString()}K` : "-"),
          labelMarkType: CustomChartMark,
        },
        {
          dataKey: "nCurrAss",
          stack: "assets",
          label: "Non-Cur Assets",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `$${v.toLocaleString()}K` : "-"),
          labelMarkType: CustomChartMark,
        },
        {
          dataKey: "curLia",
          stack: "liability",
          label: "Current Liabilities",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `$${v.toLocaleString()}K` : "-"),
          labelMarkType: CustomChartMark,
        },
        {
          dataKey: "nCurLia",
          stack: "liability",
          label: "Non-Cur Liabilities",
          valueFormatter: (v: number | null) => (typeof v === "number" ? `$${v.toLocaleString()}K` : "-"),
          labelMarkType: CustomChartMark,
        },
      ]}
      xAxis={[{ categoryGapRatio: 0.5, barGapRatio: 0.4, disableLine: true, disableTicks: true, dataKey: "year" }]}
      yAxis={[
        { disableLine: true, disableTicks: true, valueFormatter: (value: number) => `${Math.round(value / 1000000)}M` },
      ]}
      height={300}
      slots={{ tooltip: CustomChartTooltip, bar: withChartElementStyle(BarElement, { rx: 10, ry: 10 }) }}
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
