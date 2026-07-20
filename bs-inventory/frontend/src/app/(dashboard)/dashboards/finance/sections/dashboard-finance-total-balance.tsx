import { useMemo } from "react";

import { Card, CardContent, Typography } from "@mui/material";
import { PieArc, PieChart, useDrawingArea } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import useChartPalette from "@/hooks/use-chart-palette";
import { withChartElementStyle } from "@/lib/chart-element-hoc";

export default function DashboardFinanceTotalBalance() {
  const chartPalette = useChartPalette();
  const StyledPie = useMemo(() => withChartElementStyle(PieArc), []);

  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3 lg:mt-0">
        Total Balance
      </Typography>
      <Card>
        <CardContent>
          <PieChart
            series={[
              {
                data: [
                  { value: 18254, label: "Cash", labelMarkType: CustomChartMark },
                  { value: 8200, label: "Gold", labelMarkType: CustomChartMark },
                  { value: 6400, label: "Stocks", labelMarkType: CustomChartMark },
                ],
                innerRadius: 100,
                paddingAngle: 4,
                cornerRadius: 4,
              },
            ]}
            height={280}
            width={280}
            slots={{ pieArc: StyledPie, tooltip: CustomChartTooltip }}
            slotProps={{ legend: { direction: "horizontal", position: { horizontal: "center", vertical: "bottom" } } }}
            {...chartPalette}
            margin={{ bottom: 20, left: 0, right: 0 }}
          >
            <PieCenterLabel>$ 29,548.30</PieCenterLabel>
          </PieChart>
        </CardContent>
      </Card>
    </>
  );
}

const PieCenterLabel = ({ children }: { children: React.ReactNode }) => {
  const { width, height, left, top } = useDrawingArea();
  return (
    <Typography
      component="text"
      variant="h5"
      x={left + width / 2}
      y={top + height / 2}
      className="fill-text-primary text-anchor-middle domain-baseline-central"
    >
      {children}
    </Typography>
  );
};
