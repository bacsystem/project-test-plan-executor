"use client";

import SwitchBasic from "./examples/switch-basic";
import SwitchColor from "./examples/switch-color";
import SwitchControlled from "./examples/switch-controlled";
import SwitchFormGroup from "./examples/switch-form-group";
import SwitchLabel from "./examples/switch-label";
import SwitchLabelPlacement from "./examples/switch-label-placement";
import SwitchSizeAndVariants from "./examples/switch-size-and-variants";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function SwitchPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Switch
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
          <Typography variant="body2">Switch</Typography>
        </Breadcrumbs>
      </Grid>

      <SwitchBasic />
      <SwitchLabel />
      <SwitchSizeAndVariants />
      <SwitchColor />
      <SwitchControlled />
      <SwitchFormGroup />
      <SwitchLabelPlacement />
    </Grid>
  );
}
