"use client";

import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import ListingPageContent from "@/components/layout/listing-page-content";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Miscellaneous
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/pages">
            Pages
          </Link>
          <Typography variant="body2">Miscellaneous</Typography>
        </Breadcrumbs>
      </Grid>

      <ListingPageContent />
    </Grid>
  );
}
