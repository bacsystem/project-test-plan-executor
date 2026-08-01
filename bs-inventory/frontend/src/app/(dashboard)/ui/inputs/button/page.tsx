"use client";

import ButtonBasic from "./examples/button-basic";
import ButtonColors from "./examples/button-colors";
import ButtonContained from "./examples/button-contained";
import ButtonFocusable from "./examples/button-focusable";
import ButtonIconAndLabel from "./examples/button-icon-and-label";
import ButtonIconOnly from "./examples/button-icon-only";
import ButtonLink from "./examples/button-link";
import ButtonLoading from "./examples/button-loading";
import ButtonOutlined from "./examples/button-outlined";
import ButtonPastel from "./examples/button-pastel";
import ButtonSizes from "./examples/button-sizes";
import ButtonSurface from "./examples/button-surface";
import ButtonText from "./examples/button-text";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function ButtonPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Button
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
          <Typography variant="body2">Button</Typography>
        </Breadcrumbs>
      </Grid>

      <ButtonBasic />
      <ButtonContained />
      <ButtonOutlined />
      <ButtonPastel />
      <ButtonText />
      <ButtonSurface />
      <ButtonColors />
      <ButtonSizes />
      <ButtonIconAndLabel />
      <ButtonIconOnly />
      <ButtonFocusable />
      <ButtonLink />
      <ButtonLoading />
    </Grid>
  );
}
