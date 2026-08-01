"use client";

import SelectFilled from "./examples/select-filled";
import SelectGrouping from "./examples/select-grouping";
import SelectLabelsAndHelperText from "./examples/select-labels-and-helper-text";
import SelectMultiple from "./examples/select-multiple";
import SelectOtherProps from "./examples/select-other-props";
import SelectOutlined from "./examples/select-outlined";
import SelectStandard from "./examples/select-standard";
import SelectStandardOutlined from "./examples/select-standard-outlined";
import SelectStaticWidth from "./examples/select-static-width";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function SelectPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Select
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
          <Typography variant="body2">Select</Typography>
        </Breadcrumbs>
      </Grid>

      <SelectStandard />
      <SelectStandardOutlined />
      <SelectFilled />
      <SelectOutlined />
      <SelectMultiple />
      <SelectLabelsAndHelperText />
      <SelectStaticWidth />
      <SelectGrouping />
      <SelectOtherProps />
    </Grid>
  );
}
