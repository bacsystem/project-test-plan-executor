"use client";
import DataGridCommunityVersion from "./examples/data-grid-community-version";
import DataGridPremiumVersion from "./examples/data-grid-premium-version";
import DataGridProVersion from "./examples/data-grid-pro-version";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function OverviewPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Overview
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
          <Typography variant="body2">Overview</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Community Version
            </Typography>
            <DataGridCommunityVersion />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Pro Version
            </Typography>
            <DataGridProVersion />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <DataGridPremiumVersion />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
