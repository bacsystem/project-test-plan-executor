"use client";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Grid, Typography } from "@mui/material";

import BasicSparkline from "@/app/(dashboard)/ui/mui-x/charts/sparkline/examples/basic-sparkline";
import Curve from "@/app/(dashboard)/ui/mui-x/charts/sparkline/examples/curve";

export default function SparklineCharts() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Sparkline Charts
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
          <Typography variant="body2">Sparkline</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic Sparkline Charts
            </Typography>
            <BasicSparkline />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Curve Types
            </Typography>
            <Curve />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
