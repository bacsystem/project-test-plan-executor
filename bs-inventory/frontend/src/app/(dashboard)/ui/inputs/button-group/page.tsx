"use client";

import ButtonGroupColors from "./examples/button-group-colors";
import ButtonGroupIcons from "./examples/button-group-icons";
import ButtonGroupInactiveButton from "./examples/button-group-inactive-button";
import ButtonGroupLoading from "./examples/button-group-loading";
import ButtonGroupSizes from "./examples/button-group-sizes";
import ButtonGroupSplitButton from "./examples/button-group-split-button";
import ButtonGroupVariants from "./examples/button-group-variants";
import ButtonGroupVertical from "./examples/button-group-vertical";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function ButtonGroupPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Button Group
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
          <Typography variant="body2">Button Group</Typography>
        </Breadcrumbs>
      </Grid>

      <ButtonGroupVariants />
      <ButtonGroupSizes />
      <ButtonGroupColors />
      <ButtonGroupIcons />
      <ButtonGroupInactiveButton />
      <ButtonGroupSplitButton />
      <ButtonGroupVertical />
      <ButtonGroupLoading />
    </Grid>
  );
}
