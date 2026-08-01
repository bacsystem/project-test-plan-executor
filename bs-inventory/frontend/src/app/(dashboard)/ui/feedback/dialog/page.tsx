"use client";

import DialogAlert from "./examples/dialog-alert";
import DialogConfirmation from "./examples/dialog-confirmation";
import DialogCustom from "./examples/dialog-custom";
import DialogDraggable from "./examples/dialog-draggable";
import DialogForm from "./examples/dialog-form";
import DialogFullScreen from "./examples/dialog-full-screen";
import DialogIntroduction from "./examples/dialog-introduction";
import DialogNonModal from "./examples/dialog-non-modal";
import DialogResponsive from "./examples/dialog-responsive";
import DialogScroll from "./examples/dialog-scroll";
import DialogSizes from "./examples/dialog-sizes";
import DialogSlide from "./examples/dialog-slide";
import Link from "next/link";
import React from "react";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Dialog
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
          <Typography variant="body2">Dialog</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Introduction
            </Typography>
            <DialogIntroduction />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Alerts
            </Typography>
            <DialogAlert />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Transitions
            </Typography>
            <DialogSlide />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Form Dialogs
            </Typography>
            <DialogForm />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Dialog
            </Typography>
            <DialogCustom />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Full-screen Dialogs
            </Typography>
            <DialogFullScreen />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Optional Sizes
            </Typography>
            <DialogSizes />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Responsive
            </Typography>
            <DialogResponsive />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Confirmation Dialogs
            </Typography>
            <DialogConfirmation />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Non-modal Dialog
            </Typography>
            <DialogNonModal />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Draggable Dialog
            </Typography>
            <DialogDraggable />
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Scrolling Long Content
            </Typography>
            <DialogScroll />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
