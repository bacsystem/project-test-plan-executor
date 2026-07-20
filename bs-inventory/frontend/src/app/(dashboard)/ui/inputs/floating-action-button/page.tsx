import FabBasic from "./examples/fab-basic";
import FabColors from "./examples/fab-colors";
import FabSize from "./examples/fab-size";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function CheckboxPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Floating Action Button
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
          <Typography variant="body2">Floating Action Button</Typography>
        </Breadcrumbs>
      </Grid>

      <FabBasic />
      <FabSize />
      <FabColors />
    </Grid>
  );
}
