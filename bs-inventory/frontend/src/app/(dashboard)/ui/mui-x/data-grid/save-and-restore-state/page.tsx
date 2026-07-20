"use client";
import SaveAndRestoreStateBasic from "./examples/save-and-restore-state-basic";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function SaveAndRestoreStatePage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Save and Restore State
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/mui-x">
            MUI X
          </Link>
          <Link color="inherit" href="/ui/mui-x/data-grid">
            Data Grid
          </Link>
          <Typography variant="body2">Save and Restore State</Typography>
        </Breadcrumbs>
      </Grid>
      <SaveAndRestoreStateBasic />
    </Grid>
  );
}
