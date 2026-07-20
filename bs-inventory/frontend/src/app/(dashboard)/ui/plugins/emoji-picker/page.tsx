"use client";

import EmojiPickerBasic from "./examples/emoji-picker-basic";
import EmojiPickerPopover from "./examples/emoji-picker-popover";
import EmojiPickerReactions from "./examples/emoji-picker-reactions";
import EmojiPickerReactionsRender from "./examples/emoji-picker-reactions-render";
import EmojiPickerRender from "./examples/emoji-picker-render";
import EmojiPickerSingle from "./examples/emoji-picker-single";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Lightbox
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
          <Typography variant="body2">Lightbox</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <EmojiPickerReactions />
      </Grid>

      <Grid size={12}>
        <EmojiPickerReactionsRender />
      </Grid>

      <Grid size={12}>
        <EmojiPickerBasic />
      </Grid>

      <Grid size={12}>
        <EmojiPickerPopover />
      </Grid>

      <Grid size={12}>
        <EmojiPickerRender />
      </Grid>

      <Grid size={12}>
        <EmojiPickerSingle />
      </Grid>
    </Grid>
  );
}
