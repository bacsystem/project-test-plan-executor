"use client";

import RatingBasic from "./examples/rating-basic";
import RatingColors from "./examples/rating-colors";
import RatingCustomIcons from "./examples/rating-custom-icons";
import RatingHover from "./examples/rating-hover";
import RatingPrecision from "./examples/rating-precision";
import RatingRadioGroup from "./examples/rating-radio-group";
import RatingSizes from "./examples/rating-sizes";
import RatingVariants from "./examples/rating-variants";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function CheckboxPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Rating
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
          <Typography variant="body2">Rating</Typography>
        </Breadcrumbs>
      </Grid>

      <RatingBasic />
      <RatingVariants />
      <RatingPrecision />
      <RatingHover />
      <RatingColors />
      <RatingCustomIcons />
      <RatingSizes />
      <RatingRadioGroup />
    </Grid>
  );
}
