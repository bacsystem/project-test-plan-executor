import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiArrowHistory from "@/icons/nexture/ni-arrow-history";
import NiBrushArt from "@/icons/nexture/ni-brush-art";
import NiDrop from "@/icons/nexture/ni-drop";
import NiFlask from "@/icons/nexture/ni-flask";
import NiGraduation from "@/icons/nexture/ni-graduation";
import NiPath from "@/icons/nexture/ni-path";
import NiStars from "@/icons/nexture/ni-stars";
import NiTree from "@/icons/nexture/ni-tree";

export default function DashboardLearningLevels() {
  return (
    <>
      <Grid size={{ xs: 12 }} container spacing={2.5} className="w-full">
        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiTree className="text-primary" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Tree Guardian
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                6/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiDrop className="text-primary" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Eco Toy Designer
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                3/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiArrowHistory className="text-secondary" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Legacy Builder
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                7/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiPath className="text-secondary" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Blueprint Builder
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                3/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-accent-1-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiGraduation className="text-accent-1" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Eco Educator
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                2/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-accent-1-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiBrushArt className="text-accent-1" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Green Artisan
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                6/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-accent-2-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFlask className="text-accent-2" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Lab Patron
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                6/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ md: 6, xs: 12 }}>
          <Card component={Link} href="#" className="flex flex-row p-1 transition-transform hover:scale-[1.02]">
            <Box className="bg-accent-2-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiStars className="text-accent-2" size={"large"} />
            </Box>
            <CardContent className="py-3.75!">
              <Typography variant="body1" className="text-text-secondary leading-5">
                Trend Setter
              </Typography>
              <Typography variant="h6" className="text-leading-5">
                2/10
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
