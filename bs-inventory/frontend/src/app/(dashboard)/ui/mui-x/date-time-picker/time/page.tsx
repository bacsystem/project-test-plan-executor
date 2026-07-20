"use client";
import TimeClear from "./examples/time-clear";
import TimeClocks from "./examples/time-clocks";
import TimeClocksDigital from "./examples/time-clocks-digital";
import TimeComponents from "./examples/time-components";
import TimeFilled from "./examples/time-filled";
import TimeOutlined from "./examples/time-outlined";
import TimeStandard from "./examples/time-standard";
import TimeStandardOutlined from "./examples/time-standard-outlined";
import TimeViews from "./examples/time-views";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function DateAndTimePicker() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Time
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
          <Typography variant="body2">Time</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard
            </Typography>
            <TimeStandard />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Standard Outlined
            </Typography>
            <TimeStandardOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Filled
            </Typography>
            <TimeFilled />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <TimeOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Components
            </Typography>
            <TimeComponents />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Clear
            </Typography>
            <TimeClear />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Views
            </Typography>
            <TimeViews />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Clocks
            </Typography>
            <TimeClocks />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Digital Clocks
            </Typography>
            <TimeClocksDigital />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
