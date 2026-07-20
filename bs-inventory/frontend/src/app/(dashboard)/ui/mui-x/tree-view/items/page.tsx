"use client";
import FocusScrollRich from "./examples/focus-scroll-rich";
import FocusScrollSimple from "./examples/focus-scroll-simple";
import GetItemChildren from "./examples/get-item-children";
import GetItemTree from "./examples/get-item-tree";
import TrackingClicksRich from "./examples/tracking-clicks-rich";
import TrackingClicksSimple from "./examples/tracking-clicks-simple";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Overview() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Items
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
          <Typography variant="body2">Items</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Tracking Clicks - Simple
            </Typography>
            <TrackingClicksSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Tracking Clicks - Rich
            </Typography>
            <TrackingClicksRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Focus Scroll - Simple
            </Typography>
            <FocusScrollSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Focus Scroll - Rich
            </Typography>
            <FocusScrollRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Get Item Tree - Rich
            </Typography>
            <GetItemTree />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Get Item Children - Rich
            </Typography>
            <GetItemChildren />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
