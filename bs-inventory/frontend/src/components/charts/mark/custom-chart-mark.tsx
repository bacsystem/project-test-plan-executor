import { Box } from "@mui/material";
import { ChartsLabelCustomMarkProps } from "@mui/x-charts";

import { colorWithOpacity } from "@/lib/chart-helper";

export default function CustomChartMark({ color }: Readonly<ChartsLabelCustomMarkProps>) {
  return (
    <Box
      style={{
        border: `2px solid ${color}`,
        backgroundColor: colorWithOpacity(color),
      }}
      className="custom-chart-mark h-4 w-4 flex-none translate-y-0.25 rounded-full"
    />
  );
}
