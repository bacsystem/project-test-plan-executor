import { Box, Card, CardContent, Chip, Link, Typography } from "@mui/material";

export default function DashboardAnalyticsAppStatus() {
  return (
    <Card className="h-96">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Application Status
        </Typography>
        <Box className="flex flex-col gap-5">
          <Box className="flex flex-col gap-2">
            <Box className="flex flex-row items-center justify-between">
              <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                Social Media
              </Link>
              <Chip label="2/12" variant="outlined" />
            </Box>
            <Box className="bg-grey-50 h-0.5 w-full">
              <Box className="bg-primary h-0.5" style={{ width: "25%" }}></Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-2">
            <Box className="flex flex-row items-center justify-between">
              <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                Basic Information
              </Link>
              <Chip label="5/12" variant="outlined" />
            </Box>
            <Box className="bg-grey-50 h-0.5 w-full">
              <Box className="bg-primary h-0.5" style={{ width: "45%" }}></Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-2">
            <Box className="flex flex-row items-center justify-between">
              <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                Portfolio
              </Link>
              <Chip label="4/12" variant="outlined" />
            </Box>
            <Box className="bg-grey-50 h-0.5 w-full">
              <Box className="bg-primary h-0.5" style={{ width: "30%" }}></Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-2">
            <Box className="flex flex-row items-center justify-between">
              <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                Legal
              </Link>
              <Chip label="8/12" variant="outlined" />
            </Box>
            <Box className="bg-grey-50 h-0.5 w-full">
              <Box className="bg-primary h-0.5" style={{ width: "75%" }}></Box>
            </Box>
          </Box>

          <Box className="flex flex-col gap-2">
            <Box className="flex flex-row items-center justify-between">
              <Link href="#" variant="subtitle2" color="textPrimary" underline="hover">
                Search Optimization
              </Link>
              <Chip label="4/12" variant="outlined" />
            </Box>
            <Box className="bg-grey-50 h-0.5 w-full">
              <Box className="bg-primary h-0.5" style={{ width: "68%" }}></Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
