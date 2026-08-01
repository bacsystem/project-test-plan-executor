"use client";

import VideoPlayerBasic from "./examples/video-player-basic";
import VideoPlayerVimeo from "./examples/video-player-vimeo";
import VideoPlayerYoutube from "./examples/video-player-youtube";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Video Player
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
          <Typography variant="body2">Video Player</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <VideoPlayerBasic />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <VideoPlayerYoutube />
      </Grid>

      <Grid size={{ xs: 12, lg: 8 }}>
        <VideoPlayerVimeo />
      </Grid>
    </Grid>
  );
}
