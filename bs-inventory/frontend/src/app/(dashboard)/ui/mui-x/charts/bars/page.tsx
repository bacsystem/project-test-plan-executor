"use client";
import RangeBar from "./examples/range-bar";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Grid, Typography } from "@mui/material";

import BasicBar from "@/app/(dashboard)/ui/mui-x/charts/bars/examples/basic-bar";
import Stacking from "@/app/(dashboard)/ui/mui-x/charts/bars/examples/stacking";
import UsingADataset from "@/app/(dashboard)/ui/mui-x/charts/bars/examples/using-a-dataset";

export default function BarsCharts() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Bars Charts
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
          <Typography variant="body2">Bars</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic Bar Chart
            </Typography>
            <BasicBar />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Using a Dataset
            </Typography>
            <UsingADataset />
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

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Range Bar
            </Typography>
            <RangeBar />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
