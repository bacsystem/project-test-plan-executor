"use client";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Grid, Typography } from "@mui/material";

import BasicRadar from "@/app/(dashboard)/ui/mui-x/charts/radar/examples/basic-radar";
import MultiSeries from "@/app/(dashboard)/ui/mui-x/charts/radar/examples/multi-series";

export default function RadarCharts() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Radar Charts
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui/mui-x">
            MUI X
          </Link>
          <Link color="inherit" href="/ui/mui-x/charts">
            Charts
          </Link>
          <Typography variant="body2">Radar</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic Radar Charts
            </Typography>
            <BasicRadar />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Multi Series
            </Typography>
            <MultiSeries />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
