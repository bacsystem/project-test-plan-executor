"use client";
import DateTimeRangeCalendarCount from "./examples/date-time-range-calendar-count";
import DateTimeRangeComponents from "./examples/date-time-range-components";
import DateTimeRangeFilled from "./examples/date-time-range-filled";
import DateTimeRangeOutlined from "./examples/date-time-range-outlined";
import DateTimeRangeStandard from "./examples/date-time-range-standard";
import DateTimeRangeStandardOutlined from "./examples/date-time-range-standard-outlined";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function DateAndTimePicker() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Date Time Range
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
          <Typography variant="body2">Date Time Range</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard
            </Typography>
            <DateTimeRangeStandard />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard
            </Typography>
            <DateTimeRangeStandardOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Filled
            </Typography>
            <DateTimeRangeFilled />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <DateTimeRangeOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Components
            </Typography>
            <DateTimeRangeComponents />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Calendar Count
            </Typography>
            <DateTimeRangeCalendarCount />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
