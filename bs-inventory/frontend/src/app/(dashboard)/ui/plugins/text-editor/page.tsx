"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

const TextEditorStandardDynamic = dynamic(() => import("./examples/text-editor-standard"), { ssr: false });
const TextEditorStandardMinimalDynamic = dynamic(() => import("./examples/text-editor-standard-minimal"), {
  ssr: false,
});
const TextEditorStandardOutlinedDynamic = dynamic(() => import("./examples/text-editor-standard-outlined"), {
  ssr: false,
});
const TextEditorStandardOutlinedMinimalDynamic = dynamic(
  () => import("./examples/text-editor-standard-outlined-minimal"),
  { ssr: false },
);

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Text Editor
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
          <Typography variant="body2">Text Editor</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <TextEditorStandardDynamic />
      </Grid>
      <Grid size={12}>
        <TextEditorStandardMinimalDynamic />
      </Grid>
      <Grid size={12}>
        <TextEditorStandardOutlinedDynamic />
      </Grid>
      <Grid size={12}>
        <TextEditorStandardOutlinedMinimalDynamic />
      </Grid>
    </Grid>
  );
}
