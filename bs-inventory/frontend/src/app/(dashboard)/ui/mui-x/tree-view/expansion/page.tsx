"use client";
import ControlledExpansionRich from "./examples/controlled-expansion-rich";
import ControlledExpansionSimple from "./examples/controlled-expansion-simple";
import SetExpansionSimple from "./examples/set-expansion-simple";
import TrackItemExpansionRich from "./examples/track-expansion-rich";
import TrackExpansionSimple from "./examples/track-expansion-simple";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Grid, Typography } from "@mui/material";

import SetExpansionRich from "@/app/(dashboard)/ui/mui-x/tree-view/expansion/examples/set-expansion-rich";

export default function Overview() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Expansion
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
          <Typography variant="body2">Expansion</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Controlled Expansion - Simple
            </Typography>
            <ControlledExpansionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Controlled Expansion - Rich
            </Typography>
            <ControlledExpansionRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Track Expansion - Simple
            </Typography>
            <TrackExpansionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Track Expansion - Rich
            </Typography>
            <TrackItemExpansionRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Icon Expansion - Simple
            </Typography>
            <SetExpansionSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Icon Expansion - Rich
            </Typography>
            <SetExpansionRich />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
