"use client";

import Link from "next/link";

import { Box, Breadcrumbs, Card, CardContent, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Paper
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
          <Typography variant="body2">Paper</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card className="outline-grey-100 bg-transparent">
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Elevation
            </Typography>
            <Box className="flex flex-col gap-4">
              <Paper elevation={2} className="h-20 w-20" />
              <Paper elevation={3} className="h-20 w-20" />
              <Paper elevation={4} className="h-20 w-20" />
              <Paper elevation={5} className="h-20 w-20" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card className="outline-grey-100 bg-transparent">
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Variants
            </Typography>
            <Box className="flex flex-col gap-4">
              <Paper elevation={2} className="h-20 w-20" />
              <Paper elevation={2} variant="outlined" className="h-20 w-20" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card className="outline-grey-100 bg-transparent">
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Corners
            </Typography>
            <Box className="flex flex-col gap-4">
              <Paper elevation={3} square={true} className="h-20 w-20" />
              <Paper elevation={3} square={false} className="h-20 w-20" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
