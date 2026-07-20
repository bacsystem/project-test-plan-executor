"use client";
import DateCalendars from "./examples/date-calendars";
import DateClear from "./examples/date-clear";
import DateComponents from "./examples/date-components";
import DateFilled from "./examples/date-filled";
import DateOutlined from "./examples/date-outlined";
import DateStandard from "./examples/date-standard";
import DateStandardOutlined from "./examples/date-standard-outlined";
import DateViews from "./examples/date-views";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function DateAndTimePicker() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Date
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
          <Typography variant="body2">Date</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard
            </Typography>
            <DateStandard />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard Outlined
            </Typography>
            <DateStandardOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Filled
            </Typography>
            <DateFilled />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <DateOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Components
            </Typography>
            <DateComponents />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Views
            </Typography>
            <DateViews />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Clear
            </Typography>
            <DateClear />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Calendar
            </Typography>
            <DateCalendars />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
