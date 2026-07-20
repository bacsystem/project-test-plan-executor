import { FunnelChart, FunnelSection } from "@mui/x-charts-pro/FunnelChart";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltipPro from "@/components/charts/tooltip/custom-chart-tooltip-pro";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function BasicFunnel() {
  const chartPalette = useChartPalette();

  return (
    <FunnelChart
      series={[
        {
          labelMarkType: CustomChartMark,
          data: [
            { value: 200, label: "A" },
            { value: 150, label: "B" },
            { value: 90, label: "C" },
            { value: 50, label: "D" },
          ],
        },
      ]}
      height={300}
      width={450}
      slots={{ tooltip: CustomChartTooltipPro, funnelSection: withChartElementStyle(FunnelSection) }}
      {...chartPalette}
    />
  );
}
