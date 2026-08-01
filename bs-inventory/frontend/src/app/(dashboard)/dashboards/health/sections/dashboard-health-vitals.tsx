import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiBloodCells from "@/icons/nexture/ni-blood-cells";
import NiCheck from "@/icons/nexture/ni-check";
import NiCholesterol from "@/icons/nexture/ni-cholesterol";
import NiDashboard from "@/icons/nexture/ni-dashboard";
import NiHeartRate from "@/icons/nexture/ni-heart-rate";
import NiLungs from "@/icons/nexture/ni-lungs";
import NiOxygen from "@/icons/nexture/ni-oxygen";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";
import NiTubes from "@/icons/nexture/ni-tubes";
import NiWeightScale from "@/icons/nexture/ni-weight-scale";

export default function DashboardHealthVitals() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Vitals and Biometrics
      </Typography>
      <Grid container size={12} spacing={2.5}>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiHeartRate className="text-primary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Heart Rate
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    58
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-error" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiDashboard className="text-secondary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Blood Pressure
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    124/86
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiCheck className="text-success" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiTubes className="text-primary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Blood Glucose
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    128
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleUp className="text-error" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiCholesterol className="text-secondary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Cholesterol Levels
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    260
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleUp className="text-error" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiWeightScale className="text-primary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Body Mass Index
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    20.2
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiCheck className="text-success" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiOxygen className="text-secondary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Respiratory Rate
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    12
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-error" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiBloodCells className="text-primary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Hemoglobin
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    3.8
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiCheck className="text-success" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiLungs className="text-secondary" size={"large"} />
            </Box>
            <CardContent className="flex w-full flex-row justify-between">
              <Box>
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Oxygen Saturation
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    92
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-error" size={"medium"} />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
