import { PieArc, PieChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function BasicPie() {
  const chartPalette = useChartPalette();

  return (
    <PieChart
      series={[
        {
          data: [
            { label: "Group A", value: 400, labelMarkType: CustomChartMark },
            { label: "Group B", value: 300, labelMarkType: CustomChartMark },
            { label: "Group C", value: 300, labelMarkType: CustomChartMark },
            { label: "Group D", value: 200, labelMarkType: CustomChartMark },
            { label: "Group E", value: 278, labelMarkType: CustomChartMark },
            { label: "Group F", value: 189, labelMarkType: CustomChartMark },
          ],
          innerRadius: 16,
          paddingAngle: 4,
          cornerRadius: 4,
        },
      ]}
      height={300}
      width={300}
      slots={{ pieArc: withChartElementStyle(PieArc), tooltip: CustomChartTooltip }}
      {...chartPalette}
    />
  );
}
