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
      <DocsMenu selectedID="docs-changelog" />
    </Box>
  );
};

export default function DocsWelcomeChangelog() {
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
              Changelog
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
              <Typography variant="body2">Changelog</Typography>
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
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 8.3.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  01 Jul 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Search header fix and dialog improvement</li>
                    <li>Price update</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 8.3.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  01 Jun 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Included three new product pages</li>
                    <li>Datagrid improvements</li>
                    <li>Packages updated</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 8.2.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  20 May 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>
                      Included min-release-age, save-exact and ignore-scripts in .npmrc file as a supply chain attack
                      defence
                    </li>
                    <li>
                      Included engines in package.json to specify minimum Node and NPM versions that supports
                      min-release-age
                    </li>
                    <li>Updated React and React Dom versions</li>
                    <li>Updated MUI version</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 8.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  05 May 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Styling layer improvement</li>
                    <li>Drawer anchor fixes</li>
                    <li>Cosmetic improvements</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 8.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  29 Apr 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>React updated to version 19.2.5</li>
                    <li>MUI updated to version 9.0.0</li>
                    <li>Nextjs updated to version 16.2.4</li>
                    <li>Packages updated</li>
                    <li>Added number field</li>
                    <li>Added menubar</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.9.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  29 Mar 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added a messaging application</li>
                    <li>Added an emoji picker</li>
                    <li>Packages updated</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.8.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  07 Mar 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added a calendar application</li>
                    <li>Background and color improvements</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.7.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  20 Feb 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added OTP plugin</li>
                    <li>Video player implementation update</li>
                    <li>RTL improvements</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.6.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  01 Feb 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Package updates</li>
                    <li>Npm vulnerability fixes</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.5.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  19 Jan 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added a landing page</li>
                    <li>Included two new accent colors</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.4.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  09 Jan 2026
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added RTL support</li>
                    <li>Updated dark mode background colors</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.3.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  23 Dec 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Updated the packages that were causing peer dependency issues</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.3.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  21 Dec 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>2 new dashboards</li>
                    <li>Dashboard versions for the titles inside and outside</li>
                    <li>Updated React and Nextjs versions to the latest</li>
                    <li>Various UI improvements</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.2.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  26 Nov 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Auth pages background</li>
                    <li>Light & Dark mode button in the header</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  21 Nov 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Menu improvements</li>
                    <li>Small UI fixes</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 7.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  01 Nov 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>AI chat application</li>
                    <li>AI content application</li>
                    <li>Drive application</li>
                    <li>New menu capabilities to add custom sub menus</li>
                    <li>Markdown plugin added</li>
                    <li>Input mask plugin added</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 6.5.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  29 Oct 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Health dashboard added</li>
                    <li>Learning dashboard added</li>
                    <li>Commerce dashboard added</li>
                    <li>Various icon addition</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 6.4.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  02 Sep 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Card title size reduce from h5 to h6</li>
                    <li>Header shadow fix</li>
                    <li>Minor cosmetic improvements</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 6.3.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  14 Aug 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Background and shadow improvements for the light theme</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 6.2.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  06 Aug 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Landing page improvements</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 6.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  04 Aug 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>More narrow layout for boxed content container</li>
                    <li>Darker scrollbar colors</li>
                    <li>Auth pages styling</li>
                    <li>Small issue with the left menu</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 6.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  31 Jul 2025
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Rebuild with Typescript, Next, React 19, MUI, Tailwind</li>
                    <li>Added Figma files</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 5.3.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  09 Jun 2021
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Updated packages</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 5.3.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  15 Jan 2021
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>React version has been upgraded to 17</li>
                    <li>Project-wide eslint warnings fixed</li>
                    <li>Due to React version update root files in the directory "src" have changed</li>
                    <li>Files have been added to the "assets" folder</li>
                    <li>
                      Based on package updates, fixed some problems with the styles in the "src/assets/css/sass folder"
                    </li>
                    <li>Updated packages</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 5.2.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  06 Aug 2020
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added user roles</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 5.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  12 Jul 2020
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Included preview page</li>
                    <li>Updated packages</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 5.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  03 Jun 2020
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Implemented new lifecycle hooks</li>
                    <li>Updated plugins</li>
                    <li>Added new color options</li>
                    <li>Fixed some problems with the styles</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.8
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  18 Jan 2020
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Packages updated</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.7
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  05 Dec 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Some package updates and temporary version fixes</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.6
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  27 Nov 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added a footer</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.5
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  18 Nov 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>
                      Updated Firebase to solve installation problems with Node v12 which is related to grpc package
                    </li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.4
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  30 Oct 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Fixed a problem with NavLink</li>
                    <li>Updated packages for minor versions</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.3
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  01 Oct 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added forgot password and reset password pages</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.2
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  04 Sep 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Made improvements at login page</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  27 Aug 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added Acorn-React-Start-With-Auth back</li>
                    <li>Fixed a small problem with checkboxes that occurs on Firefox</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.2.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  22 Aug 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added form wizard</li>
                    <li>Added blog and blog detail pages</li>
                    <li>Updated to React 16.9.0, Bootstrap 4.3 and Reactstrap 8.0.1.</li>
                    <li>Implemented new lifecycle hooks instead of old ones</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  12 Aug 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Code splitting</li>
                    <li>Added profile and detail pages</li>
                    <li>Improved menu and overall layout</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.0.2
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  29 Jun 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Fixed a problem with production build</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.0.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  28 Jun 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added RTL support</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 4.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  09 Jun 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Ported theme to CRA</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 3.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  09 Apr 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Added Formik</li>
                    <li>
                      Created custom components to provide an advanced validation system for external components like
                      React Select, Tags, Date Picker etc.
                    </li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 3.0.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  17 Mar 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Removed Fine Uploader in favor for Dropzone</li>
                    <li>Added mailing</li>
                    <li>Added invoice</li>
                    <li>Added maps</li>
                    <li>Added tables</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 3.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  13 Feb 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Removed landing pages due to a warning from Envato</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 2.0.4
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  04 Feb 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>
                      We fixed a problem about dynamic imports which occured on newer Node.js versions. Updated Babel to
                      7.2.2 and Webpack to 4.29.0.
                    </li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 2.0.3
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  25 Jan 2019
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>
                      Current Babel configuration causes problems with newer Node.js versions so we removed dynamic
                      imports from project to provide a temporary solution. As a result, theme selecting currently not
                      available
                    </li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 2.0.2
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  11 Dec 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Fixed a problem with landing page refs that occurs only getting a production build</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 2.0.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  09 Dec 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Webpack css loading packages updated</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 2.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  08 Dec 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Landing page added</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 1.1.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  30 Oct 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Right click menu added to list items</li>
                    <li>Keyboard shortcuts added. Can be seen at a list page with ctrl+a and ctrl+d</li>
                    <li>Multilanguage support added</li>
                    <li>Axios library added</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 1.0.2
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  08 Oct 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Dark theme colors adjusted</li>
                    <li>Search bar mobile error fixed</li>
                    <li>package.json webpack-cli version updated</li>
                    <li>Axios library added</li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 1.0.1
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  29 Sep 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>
                      We experienced a copyright issue with one of the icon libraries. Due to large usage of the icons
                      through the project, source is completely altered. We are sorry that will not be able to provide a
                      guide to merging new version since nearly all the files have changed.
                    </li>
                  </ul>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Box className="flex flex-row gap-2">
                <Typography variant="h6" component="h6" className="card-title">
                  Version 1.0.0
                </Typography>
                <Typography variant="body2" component="p" className="card-title text-text-secondary pt-0.5">
                  14 Sep 2018
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" component="p">
                  <ul className="list-inside list-disc">
                    <li>Initial release version</li>
                  </ul>
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
