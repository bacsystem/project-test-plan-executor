import { useMemo, useState } from "react";

import { Box, Button, Card, CardContent, Typography, useTheme } from "@mui/material";
import { LineChart, LineSeriesType } from "@mui/x-charts";

import CustomChartTooltip from "@/components/charts/tooltip/custom-chart-tooltip";
import NiBookmark from "@/icons/nexture/ni-bookmark";
import NiController from "@/icons/nexture/ni-controller";
import NiRocket from "@/icons/nexture/ni-rocket";
import NiStructure from "@/icons/nexture/ni-structure";
import { colorWithOpacity } from "@/lib/chart-helper";

export default function DashboardAnalyticsDuration() {
  const { palette } = useTheme();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const series = useMemo(() => {
    const books: Omit<LineSeriesType, "type"> = {
      data: [180, 120, 310, 580, 295, 320, 220],
      label: "Books",
      stack: "all",
      area: true,
      showMark: false,
      color: palette["primary"].main,
      curve: "bumpX",
    };
    const toys: Omit<LineSeriesType, "type"> = {
      data: [160, 60, 170, 100, 185, 210, 150],
      label: "Toys",
      stack: "all",
      area: true,
      showMark: false,
      color: palette["secondary"].main,
      curve: "bumpX",
    };
    const games: Omit<LineSeriesType, "type"> = {
      data: [20, 40, 95, 60, 90, 115, 40],
      label: "Games",
      stack: "all",
      area: true,
      showMark: false,
      color: palette["accent-1"].main,
      curve: "bumpX",
    };

    switch (activeIndex) {
      case 1:
        return [books];
      case 2:
        return [toys];
      case 3:
        return [games];
      case 0:
      default:
        return [books, toys, games];
    }
  }, [activeIndex, palette]);

  return (
    <Card className="h-96">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Duration
        </Typography>

        <Box className="mb-1 flex gap-1">
          <Button
            variant="outlined"
            size="medium"
            startIcon={<NiStructure size="medium" />}
            color={activeIndex === 0 ? "primary" : "grey"}
            onClick={() => setActiveIndex(0)}
          >
            All
          </Button>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<NiBookmark size="medium" />}
            color={activeIndex === 1 ? "primary" : "grey"}
            onClick={() => setActiveIndex(1)}
          >
            Books
          </Button>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<NiRocket size="medium" />}
            color={activeIndex === 2 ? "primary" : "grey"}
            onClick={() => setActiveIndex(2)}
          >
            Toys
          </Button>
          <Button
            variant="outlined"
            size="medium"
            startIcon={<NiController size="medium" />}
            color={activeIndex === 3 ? "primary" : "grey"}
            onClick={() => setActiveIndex(3)}
          >
            Games
          </Button>
        </Box>

        <LineChart
          series={series}
          xAxis={[
            {
              disableLine: true,
              disableTicks: true,
              data: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              scaleType: "band",
            },
          ]}
          yAxis={[{ disableLine: true, disableTicks: true, valueFormatter: (value: number) => `${value}m`, width: 40 }]}
          slots={{ tooltip: CustomChartTooltip }}
          slotProps={{
            area: ({ color }) => ({ fill: colorWithOpacity(color) }),
          }}
          height={250}
          hideLegend
          grid={{ horizontal: true }}
          margin={{ bottom: 0, left: 0, right: 0 }}
        />
      </CardContent>
    </Card>
  );
}
