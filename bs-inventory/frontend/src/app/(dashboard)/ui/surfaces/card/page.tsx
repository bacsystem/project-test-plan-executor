"use client";

import CardActiveState from "./examples/card-active-state";
import CardComplex from "./examples/card-complex";
import CardImage from "./examples/card-image";
import CardPrimaryAction from "./examples/card-primary-action";
import CardSupplementalAction from "./examples/card-supplemental-actions";
import CardUIControls from "./examples/card-ui-controls";
import Link from "next/link";

import { Breadcrumbs, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Card
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/surfaces">
            Surfaces
          </Link>
          <Typography variant="body2">Card</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Default Card
            </Typography>
            <Typography className="text-text-secondary mb-1 text-base">Word of the Day</Typography>
            <Typography variant="h5" component="div">
              be•nev•o•lent
            </Typography>
            <Typography className="text-text-secondary mb-1">adjective</Typography>
            <Typography variant="body1">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="pastel" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card elevation={1}>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Shadow Card
            </Typography>
            <Typography className="text-text-secondary mb-1 text-base">Word of the Day</Typography>
            <Typography variant="h5" component="div">
              be•nev•o•lent
            </Typography>
            <Typography className="text-text-secondary mb-1">adjective</Typography>
            <Typography variant="body1">
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="pastel" size="small">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Grid size={12}>
        <CardComplex />
      </Grid>

      <Grid size={12}>
        <CardImage />
      </Grid>

      <Grid size={12}>
        <CardPrimaryAction />
      </Grid>

      <Grid size={12}>
        <CardSupplementalAction />
      </Grid>

      <Grid size={12}>
        <CardUIControls />
      </Grid>

      <Grid size={12}>
        <CardActiveState />
      </Grid>
    </Grid>
  );
}
