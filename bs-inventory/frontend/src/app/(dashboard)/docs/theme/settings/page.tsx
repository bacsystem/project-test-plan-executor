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
      <DocsMenu selectedID="docs-settings" />
    </Box>
  );
};

export default function DocsThemeSettings() {
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
              Settings
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/docs">
                Docs
              </Link>
              <Link color="inherit" href="/docs/theme">
                Theme
              </Link>
              <Typography variant="body2">Settings</Typography>
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
                Config
              </Typography>
              <Typography variant="body1" component="p">
                The default values of the theme can be found at <code>src/config.ts</code> file.
              </Typography>
              <Box className="mt-4 flex flex-col">
                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    appRoot
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">string</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">Dashboard page route</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>/dashboards/default</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    locale
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">string</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The language of the theme. Can be <code>de, en, fr, es</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>en</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    themeColor
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">ThemeVariant</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The color theme. Can be <code>theme-blue, theme-green, theme-orange, theme-purple</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>theme-blue</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    themeMode
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">ModeVariant</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The mode of the theme. Can be <code>system, light, dark</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>system</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    contentType
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">ContentType</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The layout type for the main content area. Can be{" "}
                        <code>ContentType.Boxed, ContentType.Fluid</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>ContentType.Boxed</code>
                    </Box>
                  </Box>
                </Box>
                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    backgroundShape
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">BackgroundShape</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The background of the theme. Can be{" "}
                        <code>BackgroundShape.Waves, BackgroundShape.Spheres, BackgroundShape.None</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>BackgroundShape.Spheres</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    innerShadowOpacity
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">number</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">The opacity of the shadow that falls from the edges.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>40</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    foregroundOpacity
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">number</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">The opacity of the semi-transparent glass panels.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>60</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    bgOpacity
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">number</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">The opacity of the background.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>60</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    leftMenuType
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">MenuType</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The type of the left primary menu. Can be{" "}
                        <code>MenuType.Minimal, MenuType.Comfort, MenuType.SingleLayer</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>MenuType.Minimal</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    leftMenuWidth
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">object</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        Contains pixel size definitions for the left primary and secondary menus for different menu
                        types.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <pre>
                        {`{
    [MenuType.Minimal]: { primary: 60, secondary: 264 },
    [MenuType.Comfort]: { primary: 116, secondary: 264 },
}`}
                      </pre>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    rightMenuType
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">MenuType</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        The type of the right primary menu. Can be{" "}
                        <code>MenuType.Minimal, MenuType.Comfort, MenuType.SingleLayer</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>MenuType.Minimal</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    rightMenuWidth
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">object</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">
                        Contains pixel size definitions for the right primary and secondary menus for different menu
                        types.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <pre>
                        {`{
    [MenuType.Minimal]: { primary: 40, secondary: 264 },
    [MenuType.Comfort]: { primary: 80, secondary: 264 },
}`}
                      </pre>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    transitionDuration
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">number</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">Layout and menu animation times in milliseconds.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>150</code>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    rightMenuAlwaysHidden
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Type</Typography>
                      <Typography variant="body1">boolean</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Info</Typography>
                      <Typography variant="body1">Set to true to hide the right menu.</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" className="mb-1">
                        Default
                      </Typography>
                      <code>false</code>
                    </Box>
                  </Box>
                </Box>
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
