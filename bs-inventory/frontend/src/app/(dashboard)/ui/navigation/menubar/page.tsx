"use client";

import MenubarBasic from "./examples/menubar-basic";
import MenubarCheckbox from "./examples/menubar-checkbox";
import MenubarColors from "./examples/menubar-colors";
import MenubarGroupLabels from "./examples/menubar-group-labels";
import MenubarIcon from "./examples/menubar-icon";
import MenubarRadioGroup from "./examples/menubar-radio-group";
import MenubarShortcutHints from "./examples/menubar-shortcut-hints";
import Link from "next/link";
import * as React from "react";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Menubar
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/navigation">
            Navigation
          </Link>
          <Typography variant="body2">Menubar</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <MenubarBasic />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Shortcut Hints
            </Typography>
            <MenubarShortcutHints />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Checkbox
            </Typography>
            <MenubarCheckbox />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Radio Group
            </Typography>
            <MenubarRadioGroup />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Icon
            </Typography>
            <MenubarIcon />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Group Labels
            </Typography>
            <MenubarGroupLabels />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Colors
            </Typography>
            <MenubarColors />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
