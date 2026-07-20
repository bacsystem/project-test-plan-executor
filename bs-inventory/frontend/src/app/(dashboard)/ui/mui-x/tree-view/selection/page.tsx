"use client";
import CheckboxSelectionRich from "./examples/checkbox-selection-rich";
import CheckboxSelectionSimple from "./examples/checkbox-selection-simple";
import ControlledSelectionRich from "./examples/controlled-selection-rich";
import ControlledSelectionSimple from "./examples/controlled-selection-simple";
import MultiSelectionRich from "./examples/multi-selection-rich";
import MultiSelectionSimple from "./examples/multi-selection-simple";
import SingleSelectionRich from "./examples/single-selection-rich";
import SingleSelectionSimple from "./examples/single-selection-simple";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Overview() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Selection
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
          <Link color="inherit" href="/ui/mui-x/tree-view">
            Tree View
          </Link>
          <Typography variant="body2">Selection</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Single Selection - Simple
            </Typography>
            <SingleSelectionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Single Selection - Rich
            </Typography>
            <SingleSelectionRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Multi Selection - Simple
            </Typography>
            <MultiSelectionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Multi Selection - Rich
            </Typography>
            <MultiSelectionRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Checkbox Selection - Simple
            </Typography>
            <CheckboxSelectionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Checkbox Selection - Rich
            </Typography>
            <CheckboxSelectionRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Controlled Selection - Simple
            </Typography>
            <ControlledSelectionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Controlled Selection - Rich
            </Typography>
            <ControlledSelectionRich />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
