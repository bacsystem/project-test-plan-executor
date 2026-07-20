"use client";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Grid, Typography } from "@mui/material";

import BasicPie from "@/app/(dashboard)/ui/mui-x/charts/pie/examples/basic-pie";
import Doughnut from "@/app/(dashboard)/ui/mui-x/charts/pie/examples/doughnut";

export default function PieCharts() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Pie Charts
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
          <Typography variant="body2">Pie</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic Pie Chart
            </Typography>
            <BasicPie />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Doughnut Chart
            </Typography>
            <Doughnut />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
