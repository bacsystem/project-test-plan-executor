"use client";
import EditingCallback from "./examples/editing-callback";
import EditingLeavesOnly from "./examples/editing-leaves-onyl";
import EditingValidation from "./examples/editing-validation";
import EditingWithIcons from "./examples/editing-with-icons";
import EnableEditing from "./examples/enable-editing";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Overview() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Editing
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
          <Typography variant="body2">Editing</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Enable Editing
            </Typography>
            <EnableEditing />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Editing Leaves Only
            </Typography>
            <EditingLeavesOnly />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Editing Callback
            </Typography>
            <EditingCallback />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Editing Validation
            </Typography>
            <EditingValidation />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Editing with Icons
            </Typography>
            <EditingWithIcons />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
