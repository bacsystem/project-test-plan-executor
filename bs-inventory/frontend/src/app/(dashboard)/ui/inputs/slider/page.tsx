"use client";

import SliderColor from "./examples/slider-color";
import SliderDiscrete from "./examples/slider-discrete";
import SliderInput from "./examples/slider-input";
import SliderMarks from "./examples/slider-marks";
import SliderNonLinear from "./examples/slider-non-linear";
import SliderRange from "./examples/slider-range";
import SliderSizes from "./examples/slider-sizes";
import SliderStandard from "./examples/slider-standard";
import SliderTrack from "./examples/slider-track";
import SliderVertical from "./examples/slider-vertical";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function SliderPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Slider
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
          <Typography variant="body2">Slider</Typography>
        </Breadcrumbs>
      </Grid>

      <SliderStandard />
      <SliderSizes />
      <SliderDiscrete />
      <SliderRange />
      <SliderInput />
      <SliderColor />
      <SliderVertical />
      <SliderMarks />
      <SliderTrack />
      <SliderNonLinear />
    </Grid>
  );
}
