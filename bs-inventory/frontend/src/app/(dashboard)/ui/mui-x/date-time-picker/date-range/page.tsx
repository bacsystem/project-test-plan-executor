"use client";
import DateRangeCalendarCount from "./examples/date-range-calendar-count";
import DateRangeComponents from "./examples/date-range-components";
import DateRangeFilled from "./examples/date-range-filled";
import DateRangeOutlined from "./examples/date-range-outlined";
import DateRangeShortcuts from "./examples/date-range-shortcuts";
import DateRangeStandard from "./examples/date-range-standard";
import DateRangeStandardOutlined from "./examples/date-range-standard-outlined";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function DateAndTimePicker() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Date Range
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
          <Link color="inherit" href="/ui/mui-x/date-time-picker">
            Date Time Picker
          </Link>
          <Typography variant="body2">Date Range</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard
            </Typography>
            <DateRangeStandard />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard Outlined
            </Typography>
            <DateRangeStandardOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Filled
            </Typography>
            <DateRangeFilled />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <DateRangeOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Components
            </Typography>
            <DateRangeComponents />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Calendar Count
            </Typography>
            <DateRangeCalendarCount />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Shortcuts
            </Typography>
            <DateRangeShortcuts />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
