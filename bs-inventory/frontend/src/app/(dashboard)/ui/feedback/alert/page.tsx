"use client";

import Link from "next/link";
import React from "react";

import { Alert, AlertTitle, Box, Breadcrumbs, Button, Card, CardContent, Collapse, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiCheck from "@/icons/nexture/ni-check";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiCross from "@/icons/nexture/ni-cross";
import NiCrossSquare from "@/icons/nexture/ni-cross-square";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiInfoSquare from "@/icons/nexture/ni-info-square";

export default function Page() {
  const [open, setOpen] = React.useState(true);

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Alert
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
          <Typography variant="body2">Alert</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Introduction
            </Typography>
            <Alert icon={<NiCheckSquare />} severity="success">
              Here is a gentle confirmation that your action was successful.
            </Alert>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basics
            </Typography>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Severity
              </Typography>
              <Box className="flex flex-col gap-2">
                <Alert severity="success" icon={<NiCheckSquare />}>
                  This is a success Alert.
                </Alert>
                <Alert severity="info" icon={<NiInfoSquare />}>
                  This is an info Alert.
                </Alert>
                <Alert severity="warning" icon={<NiExclamationSquare />}>
                  This is a warning Alert.
                </Alert>
                <Alert severity="error" icon={<NiCrossSquare />}>
                  This is an error Alert.
                </Alert>
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Variants
              </Typography>
              <Box className="flex flex-col gap-2">
                <Alert variant="filled" severity="success" icon={<NiCheckSquare />}>
                  This is a filled success Alert.
                </Alert>
                <Alert variant="filled" severity="info" icon={<NiInfoSquare />}>
                  This is a filled info Alert.
                </Alert>
                <Alert variant="filled" severity="warning" icon={<NiExclamationSquare />}>
                  This is a filled warning Alert.
                </Alert>
                <Alert variant="filled" severity="error" icon={<NiCrossSquare />}>
                  This is a filled error Alert.
                </Alert>
                <Alert variant="outlined" severity="success" icon={<NiCheckSquare />}>
                  This is an outlined success Alert.
                </Alert>
                <Alert variant="outlined" severity="info" icon={<NiInfoSquare />}>
                  This is an outlined info Alert.
                </Alert>
                <Alert variant="outlined" severity="warning" icon={<NiExclamationSquare />}>
                  This is an outlined warning Alert.
                </Alert>
                <Alert variant="outlined" severity="error" icon={<NiCrossSquare />}>
                  This is an outlined error Alert.
                </Alert>
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Override Color
              </Typography>
              <Box className="flex flex-col gap-2">
                <Alert severity="success" color="warning" icon={<NiExclamationSquare />}>
                  This is a success Alert with warning colors.
                </Alert>
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Actions
              </Typography>
              <Box className="flex flex-col gap-2">
                <Alert
                  severity="warning"
                  onClose={() => {}}
                  icon={<NiExclamationSquare />}
                  action={
                    <Button
                      className="icon-only"
                      size="small"
                      color="warning"
                      variant="text"
                      startIcon={<NiCross size="small" />}
                    />
                  }
                >
                  This Alert displays the default close icon.
                </Alert>
                <Alert
                  severity="success"
                  icon={<NiCheckSquare />}
                  action={
                    <Button color="success" variant="text" size="small">
                      Undo
                    </Button>
                  }
                >
                  This Alert uses a Button component for its action.
                </Alert>
              </Box>
            </Box>
            <Box>
              <Typography variant="h6" component="h6" className="mb-2">
                Actions
              </Typography>
              <Box className="flex flex-col gap-2">
                <Alert icon={<NiCheck />} severity="success">
                  This success Alert has a custom icon.
                </Alert>
                <Alert icon={false} severity="success">
                  This success Alert has no icon.
                </Alert>
                <Alert
                  iconMapping={{
                    success: <NiCheckSquare />,
                  }}
                >
                  This success Alert uses `iconMapping` to override the default icon.
                </Alert>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Titles
            </Typography>
            <Box className="flex flex-col gap-2">
              <Alert severity="success" icon={<NiCheckSquare />}>
                <AlertTitle variant="subtitle2">Success</AlertTitle>
                This is a success Alert with an encouraging title.
              </Alert>
              <Alert severity="info" icon={<NiInfoSquare />}>
                <AlertTitle variant="subtitle2">Info</AlertTitle>
                This is an info Alert with an informative title.
              </Alert>
              <Alert severity="warning" icon={<NiExclamationSquare />}>
                <AlertTitle variant="subtitle2">Warning</AlertTitle>
                This is a warning Alert with a cautious title.
              </Alert>
              <Alert severity="error" icon={<NiCrossSquare />}>
                <AlertTitle variant="subtitle2">Error</AlertTitle>
                This is an error Alert with a scary title.
              </Alert>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Neutral Look
            </Typography>
            <Box className="flex flex-col gap-2">
              <Alert severity="success" icon={<NiCheckSquare />} className="neutral">
                <AlertTitle variant="subtitle2">Success</AlertTitle>
                This is a success Alert with an encouraging title.
              </Alert>
              <Alert severity="success" icon={<NiCheckSquare />} className="neutral">
                This is a success Alert with an encouraging title.
              </Alert>
              <Alert severity="info" icon={<NiInfoSquare />} className="neutral">
                <AlertTitle variant="subtitle2">Info</AlertTitle>
                This is an info Alert with an informative title.
              </Alert>
              <Alert severity="info" icon={<NiInfoSquare />} className="neutral">
                This is an info Alert with an informative title.
              </Alert>
              <Alert severity="warning" icon={<NiExclamationSquare />} className="neutral">
                <AlertTitle variant="subtitle2">Warning</AlertTitle>
                This is a warning Alert with a cautious title.
              </Alert>
              <Alert severity="warning" icon={<NiExclamationSquare />} className="neutral">
                This is a warning Alert with a cautious title.
              </Alert>
              <Alert severity="error" icon={<NiCrossSquare />} className="neutral">
                <AlertTitle variant="subtitle2">Error</AlertTitle>
                This is an error Alert with a scary title.
              </Alert>
              <Alert severity="error" icon={<NiCrossSquare />} className="neutral">
                This is an error Alert with a scary title.
              </Alert>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Transitions
            </Typography>
            <Box className="w-full">
              <Collapse in={open}>
                <Alert
                  action={
                    <Button
                      className="icon-only"
                      size="small"
                      color="success"
                      variant="text"
                      onClick={() => {
                        setOpen(false);
                      }}
                      startIcon={<NiCross size="small" />}
                    />
                  }
                  className="mb-2"
                >
                  Click the close icon to see the Collapse transition in action!
                </Alert>
              </Collapse>
              <Button
                disabled={open}
                color="grey"
                variant="outlined"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Re-open
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
