"use client";

import CarouselBasic from "./examples/carousel-basic";
import CarouselFlow from "./examples/carousel-flow";
import CarouselGallery from "./examples/carousel-gallery";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Carousel
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/plugins">
            Plugins
          </Link>
          <Typography variant="body2">Carousel</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <CarouselBasic />
      </Grid>

      <Grid size={12}>
        <CarouselFlow />
      </Grid>

      <Grid size={{ xs: 12, sm: 8, xl: 6 }}>
        <CarouselGallery />
      </Grid>
    </Grid>
  );
}
