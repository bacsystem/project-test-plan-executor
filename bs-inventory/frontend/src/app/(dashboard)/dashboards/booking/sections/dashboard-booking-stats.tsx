import Link from "next/link";

import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import NiBuilding from "@/icons/nexture/ni-building";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiMoneyBag from "@/icons/nexture/ni-money-bag";
import NiPath from "@/icons/nexture/ni-path";
import NiPlane from "@/icons/nexture/ni-plane";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";
import { cn } from "@/lib/utils";

export default function DashboardBookingStats() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mb-3">
        Today's Stats
      </Typography>

      <Grid container size={12} spacing={5}>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center transition-transform hover:scale-[1.02]"
          >
            <CardContent className="flex w-full flex-col gap-4">
              <Box className="flex flex-row items-center justify-between gap-2.5">
                <Avatar className="bg-primary-light/10 large">
                  <NiPath className="text-primary" size="large" />
                </Avatar>
                <Button
                  size="tiny"
                  color="text-secondary"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"small"} />}
                  className={cn(
                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                  )}
                />
              </Box>
              <Box className="flex flex-col gap-1">
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Tours
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    452
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-success" size={"medium"} />
                    <Typography variant="body2" className="text-success">
                      2.4%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center transition-transform hover:scale-[1.02]"
          >
            <CardContent className="flex w-full flex-col gap-4">
              <Box className="flex flex-row items-center justify-between gap-2.5">
                <Avatar className="bg-secondary-light/10 large">
                  <NiBuilding className="text-secondary" size="large" />
                </Avatar>
                <Button
                  size="tiny"
                  color="text-secondary"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"small"} />}
                  className={cn(
                    "[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-secondary icon-only min-w-0",
                  )}
                />
              </Box>
              <Box className="flex flex-col gap-1">
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Hotels
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    743
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-success" size={"medium"} />
                    <Typography variant="body2" className="text-success">
                      4.2%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center transition-transform hover:scale-[1.02]"
          >
            <CardContent className="flex w-full flex-col gap-4">
              <Box className="flex flex-row items-center justify-between gap-2.5">
                <Avatar className="bg-accent-1-light/10 large">
                  <NiPlane className="text-accent-1" size="large" />
                </Avatar>
                <Button
                  size="tiny"
                  color="text-secondary"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"small"} />}
                  className={cn(
                    "[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-accent-1 icon-only min-w-0",
                  )}
                />
              </Box>
              <Box className="flex flex-col gap-1">
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Flights
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    690
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleUp className="text-error" size={"medium"} />
                    <Typography variant="body2" className="text-error">
                      1.2%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 3, md: 6, xs: 12 }}>
          <Card
            component={Link}
            href="#"
            className="flex flex-row items-center transition-transform hover:scale-[1.02]"
          >
            <CardContent className="flex w-full flex-col gap-4">
              <Box className="flex flex-row items-center justify-between gap-2.5">
                <Avatar className="bg-accent-2-light/10 large">
                  <NiMoneyBag className="text-accent-2" size="large" />
                </Avatar>
                <Button
                  size="tiny"
                  color="text-secondary"
                  variant="text"
                  startIcon={<NiEllipsisHorizontal size={"small"} />}
                  className={cn(
                    "[.active]:text-accent-2 [.active]:bg-grey-25 hover:text-accent-2 [.active:hover]:text-text-accent-2 icon-only min-w-0",
                  )}
                />
              </Box>
              <Box className="flex flex-col gap-1">
                <Typography variant="body1" className="text-text-secondary leading-5">
                  Earnings
                </Typography>
                <Box className="flex flex-row items-center gap-2">
                  <Typography variant="h5" className="text-leading-5">
                    $ 245,400.00
                  </Typography>
                  <Box className="flex flex-row items-center">
                    <NiTriangleDown className="text-success" size={"medium"} />
                    <Typography variant="body2" className="text-success">
                      6.8%
                    </Typography>
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
