"use client";
import StepperHorizontalAlternativeLabel from "./examples/stepper-horizontal-alternative-label";
import StepperHorizontalLinear from "./examples/stepper-horizontal-linear";
import StepperHorizontalNonLinear from "./examples/stepper-horizontal-non-linear";
import StepperMobileDots from "./examples/stepper-mobile-dots";
import StepperMobileProgress from "./examples/stepper-mobile-progress";
import StepperMobileText from "./examples/stepper-mobile-text";
import StepperVertical from "./examples/stepper-vertical";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Stepper
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/navigation">
            Navigation
          </Link>
          <Typography variant="body2">Stepper</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Horizontal Linear
            </Typography>
            <StepperHorizontalLinear></StepperHorizontalLinear>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Horizontal Non-linear
            </Typography>
            <StepperHorizontalNonLinear></StepperHorizontalNonLinear>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Alternative Label
            </Typography>
            <StepperHorizontalAlternativeLabel></StepperHorizontalAlternativeLabel>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Vertical Stepper
            </Typography>
            <StepperVertical></StepperVertical>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Mobile Stepper
            </Typography>
            <StepperMobileDots className="mb-4"></StepperMobileDots>
            <StepperMobileText className="mb-4"></StepperMobileText>
            <StepperMobileProgress className="mb-4"></StepperMobileProgress>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
