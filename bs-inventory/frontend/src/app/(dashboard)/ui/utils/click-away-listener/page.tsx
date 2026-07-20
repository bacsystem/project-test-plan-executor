"use client";

import ClickAwayIntroduction from "./examples/click-away-introduction";
import ClickAwayTrigger from "./examples/click-away-trigger";
import UseWithPortal from "./examples/use-with-portal";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Click-away Listener
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/utils">
            Utils
          </Link>
          <Typography variant="body2">Click-away Listener</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <ClickAwayIntroduction />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Use with Portal
            </Typography>
            <UseWithPortal />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Click Away Event
            </Typography>
            <ClickAwayTrigger />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
