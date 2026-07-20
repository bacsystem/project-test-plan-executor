"use client";

import RadioGroupBasic from "./examples/radio-group-basic";
import RadioGroupColor from "./examples/radio-group-color";
import RadioGroupControlled from "./examples/radio-group-controlled";
import RadioGroupLabel from "./examples/radio-group-label";
import RadioGroupLabelPlacement from "./examples/radio-group-label-placement";
import RadioGroupShowError from "./examples/radio-group-show-error";
import RadioGroupSizeAndVariants from "./examples/radio-group-size-and-variants";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function CheckboxPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Radio Group
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
          <Typography variant="body2">Radio Group</Typography>
        </Breadcrumbs>
      </Grid>

      <RadioGroupBasic />
      <RadioGroupLabel />
      <RadioGroupSizeAndVariants />
      <RadioGroupColor />
      <RadioGroupControlled />
      <RadioGroupLabelPlacement />
      <RadioGroupShowError />
    </Grid>
  );
}
