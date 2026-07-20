import { Typography } from "@mui/material";
import { PieArc, PieChart, useDrawingArea } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function Doughnut() {
  const chartPalette = useChartPalette();

  return (
    <PieChart
      series={[
        {
          data: [
            { value: 5, label: "A", labelMarkType: CustomChartMark },
            { value: 10, label: "B", labelMarkType: CustomChartMark },
            { value: 15, label: "C", labelMarkType: CustomChartMark },
            { value: 20, label: "D", labelMarkType: CustomChartMark },
          ],
          innerRadius: 100,
          paddingAngle: 4,
          cornerRadius: 4,
        },
      ]}
      height={300}
      width={300}
      slots={{ pieArc: withChartElementStyle(PieArc), tooltip: CustomChartTooltip }}
      {...chartPalette}
    >
      <PieCenterLabel>Center Label</PieCenterLabel>
    </PieChart>
  );
}

const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <Typography
      component="text"
      x={left + width / 2}
      y={top + height / 2}
      className="fill-text-secondary"
      style={{ textAnchor: "middle", dominantBaseline: "central" }}
    >
      {children}
    </Typography>
  );
};
