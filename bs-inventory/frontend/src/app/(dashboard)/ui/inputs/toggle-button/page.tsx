"use client";

import ToggleButtonBasic from "./examples/toggle-button-basic";
import ToggleButtonColor from "./examples/toggle-button-color";
import ToggleButtonMultiple from "./examples/toggle-button-multiple";
import ToggleButtonSetValue from "./examples/toggle-button-set-value";
import ToggleButtonSizeAndVariants from "./examples/toggle-button-size-and-variants";
import ToggleButtonStandalone from "./examples/toggle-button-standalone";
import ToggleButtonVertical from "./examples/toggle-button-vertical";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function ToggleButtonPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Toggle Button
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/inputs">
            Inputs
          </Link>
          <Typography variant="body2">Toggle Button</Typography>
        </Breadcrumbs>
      </Grid>

      <ToggleButtonBasic />
      <ToggleButtonMultiple />
      <ToggleButtonSizeAndVariants />
      <ToggleButtonColor />
      <ToggleButtonVertical />
      <ToggleButtonSetValue />
      <ToggleButtonStandalone />
    </Grid>
  );
}
