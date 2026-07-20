import { ScatterChart, ScatterMarker } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function MultipleYAxis() {
  const chartPalette = useChartPalette();

  return (
    <ScatterChart
      series={[
        {
          data: [
            { x: 100, y: 200, id: 1 },
            { x: 120, y: 100, id: 2 },
            { x: 170, y: 300, id: 3 },
            { x: 140, y: 250, id: 4 },
            { x: 150, y: 400, id: 5 },
            { x: 110, y: 280, id: 6 },
          ],
          label: "Class A",
          yAxisId: "leftAxis",
          valueFormatter: (value) => value && `${value.x}cm, ${value.y}kg`,
          labelMarkType: CustomChartMark,
          markerSize: 6,
          highlightScope: { highlight: "item" },
        },
        {
          data: [
            { x: 300, y: 300, id: 1 },
            { x: 400, y: 500, id: 2 },
            { x: 200, y: 700, id: 3 },
            { x: 340, y: 350, id: 4 },
            { x: 560, y: 500, id: 5 },
            { x: 230, y: 780, id: 6 },
            { x: 500, y: 480, id: 7 },
            { x: 300, y: 500, id: 8 },
            { x: 240, y: 300, id: 9 },
            { x: 320, y: 550, id: 10 },
            { x: 500, y: 400, id: 11 },
            { x: 420, y: 280, id: 12 },
          ],
          label: "Class B",
          yAxisId: "rightAxis",
          valueFormatter: (value) => value && `${value.x}cm, ${value.y}kg`,
          labelMarkType: CustomChartMark,
          markerSize: 6,
          highlightScope: { highlight: "item" },
        },
      ]}
      xAxis={[{ min: 0 }]}
      yAxis={[
        { id: "leftAxis", min: 0 },
        { id: "rightAxis", min: 0, position: "right" },
      ]}
      height={300}
      slots={{ marker: withChartElementStyle(ScatterMarker), tooltip: CustomChartTooltip }}
      grid={{ horizontal: true, vertical: true }}
      {...chartPalette}
    />
  );
}
