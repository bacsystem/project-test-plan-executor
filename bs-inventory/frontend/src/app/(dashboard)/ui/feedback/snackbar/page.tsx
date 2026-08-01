"use client";

import SnackbarAutoDismiss from "./examples/snackbar-auto-dismiss";
import SnackbarConsecutive from "./examples/snackbar-consecutive";
import SnackbarContents from "./examples/snackbar-contents";
import SnackbarCustomization from "./examples/snackbar-customization";
import SnackbarIntroduction from "./examples/snackbar-introduction";
import SnackbarPositionAbsolute from "./examples/snackbar-position-absolute";
import SnackbarPositionRelative from "./examples/snackbar-position-relative";
import SnackbarStacking from "./examples/snackbar-stacking";
import SnackbarTransitions from "./examples/snackbar-transitions";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Snackbar
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/feedback">
            Feedback
          </Link>
          <Typography variant="body2">Snackbar</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Introduction
            </Typography>
            <SnackbarIntroduction />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Position Relative
            </Typography>
            <SnackbarPositionRelative />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Position Absolute
            </Typography>
            <SnackbarPositionAbsolute />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Content
            </Typography>
            <SnackbarContents />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Auto Dismiss
            </Typography>
            <SnackbarAutoDismiss />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Transitions
            </Typography>
            <SnackbarTransitions />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Customization
            </Typography>
            <SnackbarCustomization />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Consecutive Snackbars
            </Typography>
            <SnackbarConsecutive />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Stacking Snackbars
            </Typography>
            <SnackbarStacking />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
