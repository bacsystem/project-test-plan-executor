"use client";
import BorderedStylingRich from "./examples/bordered-styling-rich";
import BorderedStylingSimple from "./examples/bordered-styling-simple";
import CustomAnimationRich from "./examples/custom-animation-rich";
import CustomAnimationSimple from "./examples/custom-animation-simple";
import CustomIconRich from "./examples/custom-icon-rich";
import CustomIconSimple from "./examples/custom-icon-simple";
import CustomTreeItemRich from "./examples/custom-tree-item-rich";
import CustomTreeItemSimple from "./examples/custom-tree-item-simple";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Overview() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Customization
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/mui-x">
            MUI X
          </Link>
          <Link color="inherit" href="/ui/mui-x/tree-view">
            Tree View
          </Link>
          <Typography variant="body2">Customization</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Icon - Simple
            </Typography>
            <CustomIconSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Icon - Rich
            </Typography>
            <CustomIconRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Animation - Simple
            </Typography>
            <CustomAnimationSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Animation - Rich
            </Typography>
            <CustomAnimationRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Border Styling - Simple
            </Typography>
            <BorderedStylingSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Border Styling - Rich
            </Typography>
            <BorderedStylingRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Tree Item - Simple
            </Typography>
            <CustomTreeItemSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Tree Item - Rich
            </Typography>
            <CustomTreeItemRich />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
