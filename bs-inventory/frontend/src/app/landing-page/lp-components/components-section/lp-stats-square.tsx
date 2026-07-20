import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiBasket from "@/icons/nexture/ni-basket";
import NiCatalog from "@/icons/nexture/ni-catalog";
import NiCells from "@/icons/nexture/ni-cells";
import NiPercent from "@/icons/nexture/ni-percent";
import NiStars from "@/icons/nexture/ni-stars";
import NiUsers from "@/icons/nexture/ni-users";

export default function LPStatsSquare() {
  return (
    <Grid container size={12} spacing={2.5} className="flex-none">
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-secondary-light/10 flex h-30 w-full flex-none items-center justify-center rounded-2xl">
            <NiBasket className="text-secondary" size={"large"} />
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
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-accent-1-light/10 flex h-30 w-full flex-none items-center justify-center rounded-2xl">
            <NiCells className="text-accent-1" size={"large"} />
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
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-secondary-light/10 flex h-30 w-full flex-none items-center justify-center rounded-2xl">
            <NiCatalog className="text-secondary" size={"large"} />
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
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-secondary-light/10 flex h-30 w-full flex-none items-center justify-center rounded-2xl">
            <NiUsers className="text-secondary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-primary text-center leading-5 transition-colors">
              Users
            </Typography>
            <Typography variant="h5" className="text-leading-5 text-center">
              1,487
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-accent-1-light/10 flex h-30 w-full flex-none items-center justify-center rounded-2xl">
            <NiPercent className="text-accent-1" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary text-center leading-5 transition-colors">
              Discounts
            </Typography>
            <Typography variant="h5" className="text-leading-5 text-center">
              4
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 6, sm: 4 }}>
        <Card component={Link} href="#" className="flex flex-col p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-secondary-light/10 flex h-30 w-full flex-none items-center justify-center rounded-2xl">
            <NiStars className="text-secondary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-primary text-center leading-5 transition-colors">
              Reviews
            </Typography>
            <Typography variant="h5" className="text-leading-5 text-center">
              124
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
