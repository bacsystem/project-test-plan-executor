"use client";
import SmallTreeViewRich from "./examples/small-tree-view-rich";
import SmallTreeViewSimple from "./examples/small-tree-view-simple";
import TreeViewRich from "./examples/tree-view-rich";
import TreeViewSimple from "./examples/tree-view-simple";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Overview() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Overview
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
          <Typography variant="body2">Overview</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Tree View - Simple
            </Typography>
            <TreeViewSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Tree View - Rich
            </Typography>
            <TreeViewRich />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Small Tree View - Simple
            </Typography>
            <SmallTreeViewSimple />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Small Tree View - Rich
            </Typography>
            <SmallTreeViewRich />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
