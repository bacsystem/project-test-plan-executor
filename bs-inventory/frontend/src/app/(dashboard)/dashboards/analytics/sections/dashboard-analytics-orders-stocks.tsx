import { Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { RadarChart } from "@mui/x-charts";

import CustomChartMark from "@/components/charts/mark/custom-chart-mark";
import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";

export default function DashboardAnalyticsOrdersStocks() {
  const { palette } = useTheme();

  return (
    <Grid size={{ lg: 3, xs: 12 }}>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Orders vs Stocks
      </Typography>

      <Card className="h-80">
        <CardContent>
          <RadarChart
            series={[
              {
                label: "Order",
                data: [200, 300, 600],
                color: palette.primary.main,
                fillArea: true,
                labelMarkType: CustomChartMark,
              },
              {
                label: "Stock",
                data: [700, 600, 200],
                color: palette["accent-1"].main,
                fillArea: true,
                labelMarkType: CustomChartMark,
              },
            ]}
            className="radar-chart order-first min-w-40"
            shape="sharp"
            radar={{ labelGap: 6, max: 1000, metrics: ["Books", "Games", "Toys"] }}
            divisions={3}
            height={240}
            margin={{ left: 36, right: 36 }}
            slots={{ tooltip: CustomChartTooltip }}
            stripeColor={null}
            slotProps={{
              legend: {
                className: "order-2",
                direction: "horizontal",
                position: { horizontal: "center", vertical: "bottom" },
              },
            }}
          />
        </CardContent>
      </Card>
    </Grid>
  );
}
