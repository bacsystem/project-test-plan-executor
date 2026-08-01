"use client";

import ProgressCircularDeterminate from "./examples/progress-circular-determinate";
import ProgressCircularLabel from "./examples/progress-circular-label";
import ProgressCustom from "./examples/progress-custom";
import ProgressDelaying from "./examples/progress-delaying";
import ProgressInteractiveIntegration from "./examples/progress-interactive-integration";
import ProgressLinearBuffer from "./examples/progress-linear-buffer";
import ProgressLinearDeterminate from "./examples/progress-linear-determinate";
import ProgressLinearLabel from "./examples/progress-linear-label";
import Link from "next/link";
import React from "react";

import { Box, Breadcrumbs, Card, CardContent, CircularProgress, LinearProgress, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Progress
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/feedback">
            Feedback
          </Link>
          <Typography variant="body2">Progress</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Circular
            </Typography>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular Indeterminate
              </Typography>
              <CircularProgress />
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular Color
              </Typography>
              <Box className="flex flex-row gap-2">
                <CircularProgress color="primary" />
                <CircularProgress color="secondary" />
                <CircularProgress color="accent-1" />
                <CircularProgress color="accent-2" />
                <CircularProgress color="accent-3" />
                <CircularProgress color="accent-4" />
                <CircularProgress color="text-primary" />
                <CircularProgress color="text-secondary" />
                <CircularProgress color="text-disabled" />
                <CircularProgress color="info" />
                <CircularProgress color="success" />
                <CircularProgress color="warning" />
                <CircularProgress color="error" />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular Size
              </Typography>
              <Box className="flex flex-row gap-2">
                <CircularProgress color="primary" className="small" />
                <CircularProgress color="primary" className="medium" />
                <CircularProgress color="primary" className="large" />
                <CircularProgress color="primary" className="xlarge" />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular Determinate
              </Typography>
              <Box className="flex flex-row gap-2">
                <CircularProgress color="primary" className="small" />
                <CircularProgress color="primary" className="medium" />
                <CircularProgress color="primary" className="large" />
                <CircularProgress color="primary" className="xlarge" />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular Determinate
              </Typography>
              <ProgressCircularDeterminate />
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Interactive Integration
              </Typography>
              <ProgressInteractiveIntegration />
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular with Label
              </Typography>
              <ProgressCircularLabel />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Linear
            </Typography>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Circular Indeterminate
              </Typography>
              <Box className="w-1/4">
                <LinearProgress />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Linear Color
              </Typography>
              <Box className="flex w-1/4 flex-col gap-4">
                <LinearProgress color="primary" />
                <LinearProgress color="secondary" />
                <LinearProgress color="accent-1" />
                <LinearProgress color="accent-2" />
                <LinearProgress color="accent-3" />
                <LinearProgress color="accent-4" />
                <LinearProgress color="text-primary" />
                <LinearProgress color="text-secondary" />
                <LinearProgress color="text-disabled" />
                <LinearProgress color="info" />
                <LinearProgress color="success" />
                <LinearProgress color="warning" />
                <LinearProgress color="error" />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Linear Determinate
              </Typography>
              <Box className="flex w-1/4 flex-col gap-4">
                <ProgressLinearDeterminate />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Linear Buffer
              </Typography>
              <Box className="flex w-1/4 flex-col gap-4">
                <ProgressLinearBuffer />
              </Box>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Linear Buffer
              </Typography>
              <Box className="flex w-1/4 flex-col gap-4">
                <ProgressLinearBuffer />
              </Box>
            </Box>

            <Box className="mb-0">
              <Typography variant="h6" component="h6" className="mb-2">
                Linear Buffer
              </Typography>
              <Box className="flex w-1/4 flex-col gap-4">
                <ProgressLinearLabel />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom
            </Typography>
            <ProgressCustom />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom
            </Typography>
            <ProgressDelaying />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
