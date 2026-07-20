"use client";

import DocsMenu from "../../sections/docs-menu";
import Link from "next/link";
import { useState } from "react";

import { Box, Breadcrumbs, Button, Card, CardContent, Drawer, Tooltip, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiListCircle from "@/icons/nexture/ni-list-circle";

const MenuContent = () => {
  return (
    <Box className="flex flex-col gap-4">
      <DocsMenu selectedID="docs-faq" />
    </Box>
  );
};

export default function DocsWelcomeFaq() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Grid container spacing={5} className="items-start">
      <Grid size={"auto"} className="hidden pe-8 lg:flex">
        <MenuContent />
      </Grid>
      <Grid size={"grow"} spacing={5} container>
        <Grid size={12} spacing={2.5} container>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Typography variant="h1" component="h1" className="mb-0">
              FAQ
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/docs">
                Docs
              </Link>
              <Link color="inherit" href="/docs/welcome">
                Welcome
              </Link>
              <Typography variant="body2">FAQ</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }} className="lg:hidden">
            <Tooltip title="Table of Contents">
              <Button
                className="icon-only surface-standard"
                color="grey"
                variant="surface"
                onClick={toggleDrawer(true)}
              >
                <NiListCircle size={"medium"} />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Are the design files available?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  Yes, we have page designs and UI components in Figma. It is available with a Standard Plus or above
                  license and included with the project package.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                How can I use the Figma file?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  The zip folder of the template contains a file with a .fig extension. Please drag&drop it to Figma
                  when the Figma home page is selected.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Are the icons included within the source?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  Yes, they are both included in the code and Figma.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Which license is the correct one for me?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  The Regular License fits most needs. The Extended License is only required for SaaS applications.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Do I need an additional MUI license?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  MUI comes with lots of components in its free plan and you don't need a subscription to use them. You
                  might check out the features on their pricing page to see which ones require a license.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Is the backend implemented?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  No, there are a couple of api calls which are responded to by a mock-api call. They are added only to
                  provide examples for some plugins and components.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Is authentication implemented?
              </Typography>
              <Box>
                <Typography variant="body1" component="p">
                  No, there is no authentication backend implementation in the template. Although, the template contains
                  authentication page layouts such as login, register, forgot password and reset password with
                  validation.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Drawer
          open={openDrawer}
          anchor="right"
          onClose={toggleDrawer(false)}
          slotProps={{ paper: { className: "MuiDrawer-paperAnchorRight" } }}
        >
          <Box className="min-w-80 p-7">
            <MenuContent />
          </Box>
        </Drawer>
      </Grid>
    </Grid>
  );
}
