import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Typography
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
          <Typography variant="body2">Typography</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Component
            </Typography>
            <Typography variant="h1" className="mb-2">
              Heading - H1
            </Typography>
            <Typography variant="h2" className="mb-2">
              Heading - H2
            </Typography>
            <Typography variant="h3" className="mb-2">
              Heading - H3
            </Typography>
            <Typography variant="h4" className="mb-2">
              Heading - H4
            </Typography>
            <Typography variant="h5" className="mb-2">
              Heading - H5
            </Typography>
            <Typography variant="h6" className="mb-2">
              Heading - H6
            </Typography>
            <Typography variant="subtitle1" className="mb-2">
              Subtitle 1
            </Typography>
            <Typography variant="subtitle2" className="mb-2">
              Subtitle 2
            </Typography>
            <Typography variant="body1" className="mb-2">
              Body 1
            </Typography>
            <Typography variant="body2" className="mb-2">
              Body 2
            </Typography>
            <Typography variant="button" className="mb-2 block">
              Button
            </Typography>
            <Typography variant="caption" className="mb-2 block">
              Caption
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Style, Weight and Decoration
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block italic">
              Italic
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block font-thin">
              Thin - 100
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block font-extralight">
              Extralight - 200
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block font-light">
              Light - 300
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block">
              Normal - 400
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block font-medium">
              Medium - 500
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block font-semibold">
              Semibold - 600
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block font-bold">
              Bold - 700
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block underline">
              Underline
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block line-through">
              Line Through
            </Typography>
            <Typography variant="body1" className="text-text-primary mb-1 block overline">
              Overline
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Colors
            </Typography>
            <Typography variant="button" className="text-primary mb-1 block">
              Primary
            </Typography>
            <Typography variant="button" className="text-secondary mb-1 block">
              Secondary
            </Typography>
            <Typography variant="button" className="text-accent-1 mb-1 block">
              Accent 1
            </Typography>
            <Typography variant="button" className="text-accent-2 mb-1 block">
              Accent 2
            </Typography>
            <Typography variant="button" className="text-accent-3 mb-1 block">
              Accent 3
            </Typography>
            <Typography variant="button" className="text-accent-4 mb-1 block">
              Accent 4
            </Typography>
            <Typography variant="button" className="text-text-primary mb-1 block">
              Text Primary
            </Typography>
            <Typography variant="button" className="text-text-secondary mb-1 block">
              Text Secondary
            </Typography>
            <Typography variant="button" className="text-text-disabled mb-1 block">
              Text Disabled
            </Typography>
            <Typography variant="button" className="text-info mb-1 block">
              Info
            </Typography>
            <Typography variant="button" className="text-success mb-1 block">
              Success
            </Typography>
            <Typography variant="button" className="text-warning mb-1 block">
              Warning
            </Typography>
            <Typography variant="button" className="text-error mb-1 block">
              Error
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
