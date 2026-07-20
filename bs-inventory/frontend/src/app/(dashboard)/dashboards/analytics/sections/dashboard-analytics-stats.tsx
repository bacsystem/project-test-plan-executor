import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiBasket from "@/icons/nexture/ni-basket";
import NiCatalog from "@/icons/nexture/ni-catalog";
import NiCells from "@/icons/nexture/ni-cells";
import NiUser from "@/icons/nexture/ni-user";

export default function DashboardAnalyticsStats() {
  return (
    <>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h6" component="h6" className="mb-3">
          Stats
        </Typography>

        <Grid container size={12} spacing={2.5} className="flex-none">
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
              <Box className="bg-primary-light/10 flex h-28 w-full flex-none items-center justify-center rounded-2xl">
                <NiBasket className="text-primary" size={"large"} />
              </Box>
              <CardContent>
                <Typography variant="body1" className="text-text-secondary text-center leading-5 transition-colors">
                  Orders
                </Typography>
                <Typography variant="h5" className="text-leading-5 text-center">
                  182
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
              <Box className="bg-secondary-light/10 flex h-28 w-full flex-none items-center justify-center rounded-2xl">
                <NiCells className="text-secondary" size={"large"} />
              </Box>
              <CardContent>
                <Typography variant="body1" className="text-text-secondary text-center leading-5 transition-colors">
                  Products
                </Typography>
                <Typography variant="h5" className="text-leading-5 text-center">
                  264
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
              <Box className="bg-primary-light/10 flex h-28 w-full flex-none items-center justify-center rounded-2xl">
                <NiCatalog className="text-primary" size={"large"} />
              </Box>
              <CardContent>
                <Typography variant="body1" className="text-text-secondary text-center leading-5 transition-colors">
                  Categories
                </Typography>
                <Typography variant="h5" className="text-leading-5 text-center">
                  42
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
              <Box className="bg-secondary-light/10 flex h-28 w-full flex-none items-center justify-center rounded-2xl">
                <NiUser className="text-secondary" size={"large"} />
              </Box>
              <CardContent>
                <Typography variant="body1" className="text-text-secondary text-center leading-5 transition-colors">
                  Users
                </Typography>
                <Typography variant="h5" className="text-leading-5 text-center">
                  1,487
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
