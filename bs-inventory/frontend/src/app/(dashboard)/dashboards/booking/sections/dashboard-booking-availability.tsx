import { Box, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";

export default function DashboardBookingAvailability() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Availability
      </Typography>

      <Grid container size={12} spacing={2.5}>
        <Grid size={{ xs: 12 }}>
          <Card className="h-24">
            <CardContent className="flex flex-row items-start justify-between">
              <Box>
                <Typography variant="subtitle2" className="text-text-secondary leading-5 transition-colors">
                  Tours
                </Typography>
                <Typography variant="h5" className="text-leading-5">
                  180 / 240
                </Typography>
              </Box>
              <Box className="relative inline-flex w-10">
                <CircularProgress variant="determinate" value={75} className="relative z-1 h-10! w-10!" />
                <Box className="absolute inset-s-0 inset-e-0 top-0 bottom-0 flex items-center justify-center">
                  <Typography variant="caption" component="div" className="text-text-secondary">
                    75%
                  </Typography>
                </Box>
                <Box className="outline-grey-100 absolute inset-s-0 inset-e-0 top-0 bottom-0 z-0 rounded-full outline -outline-offset-2"></Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card className="h-24">
            <CardContent className="flex flex-row items-start justify-between">
              <Box>
                <Typography variant="subtitle2" className="text-text-secondary leading-5 transition-colors">
                  Hotels
                </Typography>
                <Typography variant="h5" className="text-leading-5">
                  240 / 480
                </Typography>
              </Box>
              <Box className="relative inline-flex w-10">
                <CircularProgress variant="determinate" value={50} className="relative z-1 h-10! w-10!" />
                <Box className="absolute inset-s-0 inset-e-0 top-0 bottom-0 flex items-center justify-center">
                  <Typography variant="caption" component="div" className="text-text-secondary">
                    50%
                  </Typography>
                </Box>
                <Box className="outline-grey-100 absolute inset-s-0 inset-e-0 top-0 bottom-0 z-0 rounded-full outline -outline-offset-2"></Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <Card className="h-24">
            <CardContent className="flex flex-row items-start justify-between">
              <Box>
                <Typography variant="subtitle2" className="text-text-secondary leading-5 transition-colors">
                  Flights
                </Typography>
                <Typography variant="h5" className="text-leading-5">
                  210 / 360
                </Typography>
              </Box>
              <Box className="relative inline-flex w-10">
                <CircularProgress variant="determinate" value={33} className="relative z-1 h-10! w-10!" />
                <Box className="absolute inset-s-0 inset-e-0 top-0 bottom-0 flex items-center justify-center">
                  <Typography variant="caption" component="div" className="text-text-secondary">
                    33%
                  </Typography>
                </Box>
                <Box className="outline-grey-100 absolute inset-s-0 inset-e-0 top-0 bottom-0 z-0 rounded-full outline -outline-offset-2"></Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
