"use client";

import dayjs from "dayjs";

import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";

import useHighlightedSparkline from "@/hooks/use-highlighted-sparkline";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

const ordersData = [40, 70, 70, 210, 140, 70, 163];

export default function LPStatOrders() {
  const { palette } = useTheme();
  const ordersSparkline = useHighlightedSparkline({
    data: ordersData,
    plotType: "bar",
    color: palette.secondary.main,
  });

  return (
    <Card className="w-56">
      <CardContent className="flex flex-col gap-5">
        <Box className="flex flex-col">
          <Typography variant="body1" className="text-text-secondary-dark text-nowrap">
            Orders
            <Typography variant="body1" component="span" className="text-text-secondary-light">
              {" - "}
              {dayjs()
                .subtract(ordersSparkline.props.data.length - ordersSparkline.item.index - 1, "day")
                .format("ddd")}
            </Typography>
          </Typography>
          <Box className="flex flex-row items-center justify-start gap-2 lg:justify-between lg:gap-0">
            <Typography variant="h5" className="text-text-primary">
              {ordersSparkline.item.value}
            </Typography>
            <ChangeStatus change={ordersSparkline.item.change} />
          </Box>
        </Box>
        <SparkLineChart {...ordersSparkline.props} />
      </CardContent>
    </Card>
  );
}

const ChangeStatus = ({ change }: { change: number | string }) => {
  return (
    <Box className="flex">
      {Number(change) < 0 ? (
        <NiTriangleDown size="tiny" className={"text-error"} />
      ) : (
        <NiTriangleUp size="tiny" className="text-success" />
      )}
      <Typography variant="body2" className={Number(change) < 0 ? "text-error" : "text-success"}>
        {Math.abs(Number(change))}%
      </Typography>
    </Box>
  );
};
