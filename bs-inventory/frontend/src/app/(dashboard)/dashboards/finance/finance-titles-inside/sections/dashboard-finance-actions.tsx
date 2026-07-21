import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiChartCandleSticks from "@/icons/nexture/ni-chart-candle-sticks";

export default function DashboardFinanceActions() {
  return (
    <Box>
      <Grid size={{ xs: 12 }} container spacing={2.5}>
        <Grid size={{ lg: 12, md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiArrowInDown className="text-primary" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Receive Money
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                Request a payment to your account
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 12, md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiArrowOutUp className="text-secondary" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Send Money
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                Transfer money to another account
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 12, md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-accent-1-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiChartCandleSticks className="text-accent-1" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Invest in Stocks
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                Buy company shares to invest
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
