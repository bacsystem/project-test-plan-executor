"use client";

import DropzoneStandard from "./examples/dropzone-standard";
import DropzoneStandardOutlined from "./examples/dropzone-standard-outlined";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Dropzone
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/plugins">
            Plugins
          </Link>
          <Typography variant="body2">Dropzone</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <DropzoneStandard />
      </Grid>
      <Grid size={12}>
        <DropzoneStandardOutlined />
      </Grid>
    </Grid>
  );
}
