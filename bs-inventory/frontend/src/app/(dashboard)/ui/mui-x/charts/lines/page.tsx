"use client";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Grid, Typography } from "@mui/material";

import Area from "@/app/(dashboard)/ui/mui-x/charts/lines/examples/area";
import BasicLine from "@/app/(dashboard)/ui/mui-x/charts/lines/examples/basic-line";
import Stacking from "@/app/(dashboard)/ui/mui-x/charts/lines/examples/stacking";

export default function LinesCharts() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Lines Charts
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
          <Typography variant="body2">Lines</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic Line Chart
            </Typography>
            <BasicLine />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Area
            </Typography>
            <Area />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Stacking
            </Typography>
            <Stacking />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
