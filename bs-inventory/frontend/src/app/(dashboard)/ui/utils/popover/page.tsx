"use client";

import PopoverAnchorOrigin from "./examples/popover-anchor-origin";
import PopoverBasic from "./examples/popover-basic";
import PopoverHover from "./examples/popover-hover";
import PopoverTransformOrigin from "./examples/popover-transform-origin";
import PopoverUncontrolled from "./examples/popover-uncontrolled";
import PopoverVirtual from "./examples/popover-virtual";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Popover
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
          <Typography variant="body2">Popover</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <PopoverBasic />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Anchor Origin
            </Typography>
            <PopoverAnchorOrigin />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Transform Origin
            </Typography>
            <PopoverTransformOrigin />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Hover
            </Typography>
            <PopoverHover />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Virtual Element
            </Typography>
            <PopoverVirtual />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Uncontrolled
            </Typography>
            <PopoverUncontrolled />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
