"use client";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import ListingPageContent from "@/components/layout/listing-page-content";

export default function TreeView() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          MUI X
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Typography variant="body2">MUI X</Typography>
        </Breadcrumbs>
      </Grid>

      <ListingPageContent />
    </Grid>
  );
}
