"use client";

import Link from "next/link";
import React from "react";

import {
  Backdrop,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Portal,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Backdrop
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
          <Typography variant="body2">Backdrop</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Example
            </Typography>
            <Box>
              <Button onClick={handleOpen} variant="pastel">
                Show Backdrop
              </Button>
              <Portal>
                <Backdrop className="text-text-contrast z-1201" open={open} onClick={handleClose}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              </Portal>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
