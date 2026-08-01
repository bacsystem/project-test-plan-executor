"use client";

import LightboxCaptions from "./examples/lightbox-captions";
import LightboxCounter from "./examples/lightbox-counter";
import LightboxDownload from "./examples/lightbox-download";
import LightboxFullScreen from "./examples/lightbox-full-screen";
import LightboxGallery from "./examples/lightbox-gallery";
import LightboxInline from "./examples/lightbox-inline";
import LightboxShare from "./examples/lightbox-share";
import LightboxSingleImage from "./examples/lightbox-single-image";
import LightboxSlideshow from "./examples/lightbox-slideshow";
import LightboxThumbnails from "./examples/lightbox-thumbnails";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Lightbox
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
          <Typography variant="body2">Lightbox</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <LightboxSingleImage />
      </Grid>

      <Grid size={12}>
        <LightboxGallery />
      </Grid>

      <Grid size={12}>
        <LightboxInline />
      </Grid>

      <Grid size={12}>
        <LightboxCaptions />
      </Grid>

      <Grid size={12}>
        <LightboxCounter />
      </Grid>

      <Grid size={12}>
        <LightboxDownload />
      </Grid>

      <Grid size={12}>
        <LightboxFullScreen />
      </Grid>

      <Grid size={12}>
        <LightboxShare />
      </Grid>

      <Grid size={12}>
        <LightboxSlideshow />
      </Grid>

      <Grid size={12}>
        <LightboxThumbnails />
      </Grid>
    </Grid>
  );
}
