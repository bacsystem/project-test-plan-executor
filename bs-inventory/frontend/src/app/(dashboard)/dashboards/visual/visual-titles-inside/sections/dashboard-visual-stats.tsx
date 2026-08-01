import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiAirBalloon from "@/icons/nexture/ni-air-balloon";
import NiBag from "@/icons/nexture/ni-bag";
import NiCells from "@/icons/nexture/ni-cells";
import NiPath from "@/icons/nexture/ni-path";
import NiStars from "@/icons/nexture/ni-stars";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";
import NiUsers from "@/icons/nexture/ni-users";

export default function DashboardVisualStats() {
  return (
    <Grid container size={12} spacing={2.5}>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card
          component={Link}
          href="#"
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-primary-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiBag className="text-primary" size={"large"} />
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
                  8.2%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card
          component={Link}
          href="#"
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-secondary-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiAirBalloon className="text-secondary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Products
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                64
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleUp className="text-success" size={"medium"} />
                <Typography variant="body2" className="text-success">
                  12.6%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card
          component={Link}
          href="#"
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-accent-1-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiCells className="text-accent-1" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Categories
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                13
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
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card
          component={Link}
          href="#"
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-accent-2-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiUsers className="text-accent-2" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Users
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                14
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleDown className="text-error" size={"medium"} />
                <Typography variant="body2" className="text-error">
                  6.4%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card
          component={Link}
          href="#"
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-accent-3-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiStars className="text-accent-3" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Reviews
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                41
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
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card
          component={Link}
          href="#"
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-accent-4-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiPath className="text-accent-4" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Visits
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                53
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleUp className="text-success" size={"medium"} />
                <Typography variant="body2" className="text-success">
                  10.4%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
