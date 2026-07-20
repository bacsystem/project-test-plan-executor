import { ScatterChart, ScatterMarker } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function BasicScatter() {
  const chartPalette = useChartPalette();

  return (
    <ScatterChart
      series={[
        {
          label: "Series A",
          data: [
            { x: 329.39, y: 443.28, id: "data-0" },
            { x: 96.94, y: 110.5, id: "data-1" },
            { x: 336.35, y: 175.23, id: "data-2" },
            { x: 159.44, y: 195.97, id: "data-3" },
            { x: 188.86, y: 351.77, id: "data-4" },
            { x: 143.86, y: 43.253, id: "data-5" },
            { x: 202.02, y: 376.34, id: "data-6" },
            { x: 384.41, y: 31.514, id: "data-7" },
            { x: 256.76, y: 231.31, id: "data-8" },
            { x: 143.79, y: 108.04, id: "data-9" },
            { x: 103.48, y: 321.77, id: "data-10" },
            { x: 272.39, y: 120.18, id: "data-11" },
            { x: 23.57, y: 366.2, id: "data-12" },
            { x: 219.73, y: 451.45, id: "data-13" },
            { x: 54.99, y: 294.8, id: "data-14" },
            { x: 134.13, y: 121.83, id: "data-15" },
            { x: 12.7, y: 287.7, id: "data-16" },
            { x: 176.51, y: 134.06, id: "data-17" },
            { x: 65.05, y: 104.5, id: "data-18" },
            { x: 162.25, y: 413.07, id: "data-19" },
            { x: 68.88, y: 74.68, id: "data-20" },
            { x: 95.29, y: 360.6, id: "data-21" },
            { x: 390.62, y: 330.72, id: "data-22" },
          ],
          labelMarkType: CustomChartMark,
          markerSize: 6,
          highlightScope: { highlight: "item" },
        },
        {
          label: "Series B",
          data: [
            { x: 329.39, y: 153.9, id: "data-0" },
            { x: 96.94, y: 217.8, id: "data-1" },
            { x: 336.35, y: 286.32, id: "data-2" },
            { x: 159.44, y: 325.12, id: "data-3" },
            { x: 188.86, y: 144.58, id: "data-4" },
            { x: 143.86, y: 146.51, id: "data-5" },
            { x: 202.02, y: 309.69, id: "data-6" },
            { x: 384.41, y: 236.38, id: "data-7" },
            { x: 256.76, y: 440.72, id: "data-8" },
            { x: 143.79, y: 20.29, id: "data-9" },
            { x: 103.48, y: 484.17, id: "data-10" },
            { x: 272.39, y: 54.962, id: "data-11" },
            { x: 23.57, y: 418.5, id: "data-12" },
            { x: 219.73, y: 181.32, id: "data-13" },
            { x: 54.99, y: 440.9, id: "data-14" },
            { x: 134.13, y: 273.52, id: "data-15" },
            { x: 12.7, y: 346.7, id: "data-16" },
            { x: 176.51, y: 74.528, id: "data-17" },
            { x: 65.05, y: 150.9, id: "data-18" },
            { x: 162.25, y: 26.483, id: "data-19" },
            { x: 68.88, y: 333.2, id: "data-20" },
            { x: 95.29, y: 422, id: "data-21" },
            { x: 390.62, y: 488.06, id: "data-22" },
          ],
          labelMarkType: CustomChartMark,
          markerSize: 6,
          highlightScope: { highlight: "item" },
        },
      ]}
      height={300}
      slots={{ marker: withChartElementStyle(ScatterMarker), tooltip: CustomChartTooltip }}
      grid={{ horizontal: true, vertical: true }}
      {...chartPalette}
    />
  );
}
