"use client";

import dayjs from "dayjs";
import { useTranslations } from "use-intl";

import { Box, Card, CardContent, Typography, useTheme } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";

import useHighlightedSparkline from "@/hooks/use-highlighted-sparkline";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

const earningsData = [60, 140, 140, 140, 220, 340, 340, 100, 60, 120, 340];

export default function LPStatEarnings() {
  const t = useTranslations("dashboard");

  const { palette } = useTheme();

  const earningsSparkline = useHighlightedSparkline({
    data: earningsData,
    plotType: "line",
    color: palette.primary.main,
  });

  return (
    <Card className="w-56">
      <CardContent className="flex flex-col gap-6">
        <Box className="flex flex-col">
          <Typography variant="body1" className="text-text-secondary-dark text-nowrap">
            {t("landing-earnings")}
            <Typography variant="body1" component="span" className="text-text-secondary-light">
              {" - "}
              {dayjs()
                .subtract(earningsSparkline.props.data.length - earningsSparkline.item.index - 1, "day")
                .format("ddd")}
            </Typography>
          </Typography>

          <Box className="flex flex-row items-center justify-start gap-2 lg:justify-between lg:gap-0">
            <Typography variant="h5" className="text-text-primary">
              ${earningsSparkline.item.value}
            </Typography>
            <ChangeStatus change={earningsSparkline.item.change} />
          </Box>
        </Box>

        <SparkLineChart {...earningsSparkline.props} />
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
