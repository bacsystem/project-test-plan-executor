import dayjs from "dayjs";

import { Box, Card, CardContent, Grid, Typography, useTheme } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";

import useHighlightedSparkline from "@/hooks/use-highlighted-sparkline";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

const earningsData = [60, 140, 140, 140, 220, 340, 340, 100, 60, 60, 340];
const ordersData = [40, 70, 70, 210, 140, 70, 163];
const sessionsData = [120, 300, 300, 500, 700, 750, 750, 500, 350, 200, 742];
const commentsData = [50, 240, 120, 130, 200, 110, 182];

export default function DashboardDefaultStats() {
  const { palette } = useTheme();

  const earningsSparkline = useHighlightedSparkline({
    data: earningsData,
    plotType: "line",
    color: palette.primary.main,
  });
  const ordersSparkline = useHighlightedSparkline({
    data: ordersData,
    plotType: "bar",
    color: palette.secondary.main,
  });
  const sessionsSparkline = useHighlightedSparkline({
    data: sessionsData,
    plotType: "line",
    color: palette.primary.main,
  });
  const commentsSparkline = useHighlightedSparkline({
    data: commentsData,
    plotType: "bar",
    color: palette.secondary.main,
  });

  return (
    <>
      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card>
          <CardContent className="flex flex-col gap-5">
            <Box className="flex flex-col">
              <Typography variant="body1" className="text-text-secondary-dark text-nowrap">
                Earnings
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
      </Grid>
      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card>
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
      </Grid>
      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card>
          <CardContent className="flex flex-col gap-5">
            <Box className="flex flex-col">
              <Typography variant="body1" className="text-text-secondary-dark text-nowrap">
                Sessions
                <Typography variant="body1" component="span" className="text-text-secondary-light">
                  {" - "}
                  {dayjs()
                    .subtract(sessionsSparkline.props.data.length - sessionsSparkline.item.index - 1, "day")
                    .format("ddd")}
                </Typography>
              </Typography>
              <Box className="flex flex-row items-center justify-start gap-2 lg:justify-between lg:gap-0">
                <Typography variant="h5" className="text-text-primary">
                  {sessionsSparkline.item.value}
                </Typography>
                <ChangeStatus change={sessionsSparkline.item.change} />
              </Box>
            </Box>
            <SparkLineChart {...sessionsSparkline.props} />
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card>
          <CardContent className="flex flex-col gap-5">
            <Box className="flex flex-col">
              <Typography variant="body1" className="text-text-secondary-dark text-nowrap">
                Comments
                <Typography variant="body1" component="span" className="text-text-secondary-light">
                  {" - "}
                  {dayjs()
                    .subtract(commentsSparkline.props.data.length - commentsSparkline.item.index - 1, "day")
                    .format("ddd")}
                </Typography>
              </Typography>
              <Box className="flex flex-row items-center justify-start gap-2 lg:justify-between lg:gap-0">
                <Typography variant="h5" className="text-text-primary">
                  {commentsSparkline.item.value}
                </Typography>
                <ChangeStatus change={commentsSparkline.item.change} />
              </Box>
            </Box>
            <SparkLineChart {...commentsSparkline.props} />
          </CardContent>
        </Card>
      </Grid>
    </>
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
