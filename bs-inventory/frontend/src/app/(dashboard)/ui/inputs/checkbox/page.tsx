"use client";

import CheckboxBasic from "./examples/checkbox-basic";
import CheckboxColor from "./examples/checkbox-color";
import CheckboxControlled from "./examples/checkbox-controlled";
import CheckboxFormGroup from "./examples/checkbox-form-group";
import CheckboxIndeterminate from "./examples/checkbox-indeterminate";
import CheckboxLabel from "./examples/checkbox-label";
import CheckboxLabelPlacement from "./examples/checkbox-label-placement";
import CheckboxSizeAndVariants from "./examples/checkbox-size-and-variants";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function CheckboxPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Checkbox
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
          <Typography variant="body2">Checkbox</Typography>
        </Breadcrumbs>
      </Grid>

      <CheckboxBasic />
      <CheckboxLabel />
      <CheckboxSizeAndVariants />
      <CheckboxColor />
      <CheckboxControlled />
      <CheckboxIndeterminate />
      <CheckboxFormGroup />
      <CheckboxLabelPlacement />
    </Grid>
  );
}
