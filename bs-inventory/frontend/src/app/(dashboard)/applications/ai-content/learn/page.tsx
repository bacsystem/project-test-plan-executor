"use client";

import LearnAdvanced from "./components/learn-advanced";
import LearnFeatures from "./components/learn-features";
import LearnHero from "./components/learn-hero";
import LearnTips from "./components/learn-tips";
import Link from "next/link";

import { Breadcrumbs, Grid, Typography } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Learn
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/ai-content">
              AI Content
            </Link>
            <Typography variant="body2">Learn</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid size={12}>
        <LearnHero />
      </Grid>

      <Grid size={12}>
        <LearnFeatures />
      </Grid>

      <Grid size={12}>
        <LearnTips />
      </Grid>

      <Grid size={12}>
        <LearnAdvanced />
      </Grid>
    </Grid>
  );
}
