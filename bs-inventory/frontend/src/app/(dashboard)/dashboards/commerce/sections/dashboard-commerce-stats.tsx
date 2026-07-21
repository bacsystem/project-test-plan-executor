import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiArrowHistory from "@/icons/nexture/ni-arrow-history";
import NiBasket from "@/icons/nexture/ni-basket";
import NiMoneyBag from "@/icons/nexture/ni-money-bag";
import NiScreen from "@/icons/nexture/ni-screen";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

export default function DashboardCommerceStats() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mb-3">
        Today's Stats
      </Typography>

      <Grid container size={12} spacing={2.5}>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-primary-light/10 flex h-28 w-16 flex-none items-center justify-center rounded-2xl">
              <NiMoneyBag className="text-primary" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="body1" className="text-text-secondary leading-5">
                Earnings
              </Typography>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h5" className="text-leading-5">
                  $640.50
                </Typography>
                <Box className="flex flex-row items-center">
                  <NiTriangleUp className="text-success" size={"medium"} />
                  <Typography variant="body2" className="text-success">
                    14.8%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-secondary-light/10 flex h-28 w-16 flex-none items-center justify-center rounded-2xl">
              <NiBasket className="text-secondary" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="body1" className="text-text-secondary leading-5">
                Orders
              </Typography>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h5" className="text-leading-5">
                  25
                </Typography>
                <Box className="flex flex-row items-center">
                  <NiTriangleDown className="text-error" size={"medium"} />
                  <Typography variant="body2" className="text-error">
                    2.2%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-accent-1-light/10 flex h-28 w-16 flex-none items-center justify-center rounded-2xl">
              <NiScreen className="text-accent-1" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="body1" className="text-text-secondary leading-5">
                Visits
              </Typography>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h5" className="text-leading-5">
                  690
                </Typography>
                <Box className="flex flex-row items-center">
                  <NiTriangleUp className="text-success" size={"medium"} />
                  <Typography variant="body2" className="text-success">
                    3.8%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-accent-2-light/10 flex h-28 w-16 flex-none items-center justify-center rounded-2xl">
              <NiArrowHistory className="text-accent-2" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="body1" className="text-text-secondary leading-5">
                Returns
              </Typography>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h5" className="text-leading-5">
                  2
                </Typography>
                <Box className="flex flex-row items-center">
                  <NiTriangleUp className="text-error" size={"medium"} />
                  <Typography variant="body2" className="text-error">
                    64%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
