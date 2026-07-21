import Link from "next/link";

import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import NiChartCandleSticks from "@/icons/nexture/ni-chart-candle-sticks";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiDollar from "@/icons/nexture/ni-dollar";
import NiGold from "@/icons/nexture/ni-gold";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

export default function DashboardFinanceAccounts() {
  return (
    <Box>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Accounts
        </Typography>
        <Button
          component={Link}
          href="#"
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
        >
          View All
        </Button>
      </Box>
      <Grid container spacing={2.5} className="flex flex-row">
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card className="group flex p-1 transition-transform hover:scale-[1.02]" component={Link} href="#">
            <CardContent className="from-primary-light/3 to-primary-light/10 flex h-80 w-full flex-col justify-between rounded-xl bg-gradient-to-b p-6!">
              <Box className="bg-primary-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-lg">
                <NiDollar size={"large"} className="text-primary" />
              </Box>

              <Box>
                <Typography className="card-title text-primary" variant="h6">
                  USD
                </Typography>
                <Box className="mb-2 flex flex-row">
                  <Typography className="flex-1">$ 20,400.50</Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleUp className="text-success" size={"medium"} />
                    <Typography variant="body2" className="text-success">
                      14.8%
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="pastel"
                  size="tiny"
                  color="primary"
                  component="div"
                  className="group-hover:bg-primary-light/20"
                >
                  View
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card className="group flex p-1 transition-transform hover:scale-[1.02]" component={Link} href="#">
            <CardContent className="from-secondary-light/3 to-secondary-light/10 flex h-80 w-full flex-col justify-between rounded-xl bg-gradient-to-b p-6!">
              <Box className="bg-secondary-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-lg">
                <NiGold size={"large"} className="text-secondary" />
              </Box>

              <Box>
                <Typography className="card-title text-secondary" variant="h6">
                  Gold
                </Typography>

                <Box className="mb-2 flex flex-row">
                  <Typography className="flex-1">$ 3,600.00</Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleUp className="text-success" size={"medium"} />
                    <Typography variant="body2" className="text-success">
                      2.4%
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="pastel"
                  size="tiny"
                  color="secondary"
                  component="div"
                  className="group-hover:bg-secondary-light/20"
                >
                  View
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 4, xs: 12 }}>
          <Card className="group flex p-1 transition-transform hover:scale-[1.02]" component={Link} href="#">
            <CardContent className="from-accent-1-light/3 to-accent-1-light/10 flex h-80 w-full flex-col justify-between rounded-xl bg-gradient-to-b p-6!">
              <Box className="bg-accent-1-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-lg">
                <NiChartCandleSticks size={"large"} className="text-accent-1" />
              </Box>

              <Box>
                <Typography className="card-title text-accent-1" variant="h6">
                  Stocks
                </Typography>
                <Box className="mb-2 flex flex-row">
                  <Typography className="flex-1">$ 5,200.00</Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-error" size={"medium"} />
                    <Typography variant="body2" className="text-error">
                      2.8%
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="pastel"
                  size="tiny"
                  color="accent-1"
                  component="div"
                  className="group-hover:bg-accent-1-light/20"
                >
                  View
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
