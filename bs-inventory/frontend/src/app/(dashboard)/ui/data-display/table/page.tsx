"use client";

import TableBasic from "./examples/table-basic";
import TableCollapsible from "./examples/table-collapsible";
import TableColumnGrouping from "./examples/table-column-grouping";
import TableCustomActions from "./examples/table-custom-actions";
import TableDense from "./examples/table-dense";
import TableSortingSelecting from "./examples/table-sorting-selecting";
import TableSpanning from "./examples/table-spanning";
import TableSticky from "./examples/table-sticky";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Table
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/data-display">
            Data Display
          </Link>
          <Typography variant="body2">Table</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <TableBasic />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Dense
            </Typography>
            <TableDense />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <TableSortingSelecting />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Pagination Actions
            </Typography>
            <TableCustomActions />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Sticky Header
            </Typography>
            <TableSticky />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Column Grouping
            </Typography>
            <TableColumnGrouping />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Table Collapsible
            </Typography>
            <TableCollapsible />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Spanning Table
            </Typography>
            <TableSpanning />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
