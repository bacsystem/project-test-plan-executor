"use client";

import TabsBasic from "./examples/tabs-basic";
import TabsCentered from "./examples/tabs-centered";
import TabsColored from "./examples/tabs-colored";
import TabsDisabled from "./examples/tabs-disabled";
import TabsFullWidth from "./examples/tabs-full-width";
import TabsIcons from "./examples/tabs-icons";
import TabsIconsIconOnly from "./examples/tabs-icons-icon-only";
import TabsIconsLabels from "./examples/tabs-icons-labels";
import TabsScrollable from "./examples/tabs-scrollable";
import TabsSize from "./examples/tabs-size";
import TabsWrapped from "./examples/tabs-wrapped";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Tabs
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
          <Typography variant="body2">Tabs</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <TabsBasic></TabsBasic>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Wrapped Label
            </Typography>
            <TabsWrapped></TabsWrapped>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Colors
            </Typography>
            <TabsColored></TabsColored>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Disabled
            </Typography>
            <TabsDisabled></TabsDisabled>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Full Width
            </Typography>
            <TabsFullWidth></TabsFullWidth>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Centered
            </Typography>
            <TabsCentered></TabsCentered>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Scrollable
            </Typography>
            <TabsScrollable></TabsScrollable>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Icon Tabs
            </Typography>
            <TabsIconsIconOnly></TabsIconsIconOnly>
            <TabsIcons></TabsIcons>
            <TabsIconsLabels></TabsIconsLabels>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Size
            </Typography>
            <TabsSize></TabsSize>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
