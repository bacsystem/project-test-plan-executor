"use client";
import RowPinningBasic from "./examples/row-pinning-basic";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function RowPinningPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Row Pinning
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
          <Typography variant="body2">Row Pinning</Typography>
        </Breadcrumbs>
      </Grid>
      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <RowPinningBasic />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
