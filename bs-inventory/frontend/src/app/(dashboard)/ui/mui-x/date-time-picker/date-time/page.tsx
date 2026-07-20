"use client";
import DateTimeClear from "./examples/date-time-clear";
import DateTimeComponents from "./examples/date-time-components";
import DateTimeFilled from "./examples/date-time-filled";
import DateTimeOutlined from "./examples/date-time-outlined";
import DateTimeStandard from "./examples/date-time-standard";
import DateTimeStandardOutlined from "./examples/date-time-standard-outlined";
import DateTimeViews from "./examples/date-views";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function DateAndTimePicker() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Date Time
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
          <Typography variant="body2">Date Time</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard
            </Typography>
            <DateTimeStandard />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard Outlined
            </Typography>
            <DateTimeStandardOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Filled
            </Typography>
            <DateTimeFilled />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <DateTimeOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Components
            </Typography>
            <DateTimeComponents />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Views
            </Typography>
            <DateTimeViews />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Clear
            </Typography>
            <DateTimeClear />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
