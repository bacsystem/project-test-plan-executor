import TimelineAlternating from "./examples/timeline-alternating";
import TimelineAlternatingReverse from "./examples/timeline-alternating-reverse";
import TimelineBasic from "./examples/timeline-basic";
import TimelineColor from "./examples/timeline-color";
import TimelineIcons from "./examples/timeline-icons";
import TimelineLeftPositioned from "./examples/timeline-left-positioned";
import TimelineOutlined from "./examples/timeline-outlined";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Timeline() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Timeline
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/lab">
            Lab
          </Link>
          <Typography variant="body2">Timeline</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <TimelineBasic />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Left Positioned
            </Typography>
            <TimelineLeftPositioned />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Alternating Positioned
            </Typography>
            <TimelineAlternating />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Reverse Alternating Positioned
            </Typography>
            <TimelineAlternatingReverse />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Color
            </Typography>
            <TimelineColor />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Outlined
            </Typography>
            <TimelineOutlined />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Icons
            </Typography>
            <TimelineIcons />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
