import Link from "next/link";

import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";

export default function DashboardAnalyticsAppStatus() {
  return (
    <Grid size={{ lg: 6, xs: 12 }}>
      <Box className="flex flex-row items-center justify-between">
        <Typography variant="h6" component="h6" className="mt-2 mb-3">
          Application Status
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

      <Card className="h-80">
        <CardContent>
          <Box className="flex flex-col gap-5">
            <Box className="flex flex-col gap-2">
              <Box className="flex flex-row items-center justify-between">
                <Link href="#" color="textPrimary" className="link-underline-hover font-semibold">
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
                <Link href="#" color="textPrimary" className="link-underline-hover font-semibold">
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
                <Link href="#" color="textPrimary" className="link-underline-hover font-semibold">
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
                <Link href="#" color="textPrimary" className="link-underline-hover font-semibold">
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
                <Link href="#" color="textPrimary" className="link-underline-hover font-semibold">
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
    </Grid>
  );
}
