"use client";
import DocsMenu from "../../sections/docs-menu";
import Link from "next/link";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Box, Breadcrumbs, Button, Card, CardContent, Drawer, Tooltip, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiListCircle from "@/icons/nexture/ni-list-circle";
import { useThemeContext } from "@/theme/theme-provider";

const MenuContent = () => {
  return (
    <Box className="flex flex-col gap-4">
      <DocsMenu selectedID="docs-installation" />
    </Box>
  );
};

export default function DocsGettingStartedInstallation() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  const { isDarkMode } = useThemeContext();

  return (
    <Grid container spacing={5} className="items-start">
      <Grid size={"auto"} className="hidden pe-8 lg:flex">
        <MenuContent />
      </Grid>
      <Grid size={"grow"} spacing={5} container>
        <Grid size={12} spacing={2.5} container>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Typography variant="h1" component="h1" className="mb-0">
              Installation
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/docs">
                Docs
              </Link>
              <Link color="inherit" href="/docs/getting-started">
                Getting Started
              </Link>
              <Typography variant="body2">Installation</Typography>
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
                Environment
              </Typography>
              <Typography variant="body1" component="p">
                Acorn contains packages that require Node.js and a package manager to be installed. You may use Npm,
                Yarn or Bun.
              </Typography>

              <br />
              <Typography variant="body1" component="ul">
                <Typography variant="body1" component="li">
                  <Typography variant="subtitle1" component="p">
                    Node
                  </Typography>
                  <Typography variant="body1" component="p">
                    <Link href="https://nodejs.org/en/download/" target="_blank" className="link-primary">
                      https://nodejs.org/en/download/
                    </Link>
                  </Typography>
                </Typography>
                <br />
                <Typography variant="body1" component="li">
                  <Typography variant="subtitle1" component="p">
                    Npm
                  </Typography>
                  <Typography variant="body1" component="p">
                    <Link
                      href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/"
                      target="_blank"
                      className="link-primary"
                    >
                      https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
                    </Link>
                  </Typography>
                </Typography>
                <br />

                <Typography variant="body1" component="li">
                  <Typography variant="subtitle1" component="p">
                    Yarn
                  </Typography>
                  <Link href="https://yarnpkg.com/getting-started/install" target="_blank" className="link-primary">
                    https://yarnpkg.com/getting-started/install
                  </Link>
                </Typography>
                <br />

                <Typography variant="body1" component="li">
                  <Typography variant="subtitle1" component="p">
                    Bun
                  </Typography>
                  <Typography variant="body1" component="p">
                    <Link href="https://bun.sh/" target="_blank" className="link-primary">
                      https://bun.sh/
                    </Link>
                  </Typography>
                </Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Installing Packages
              </Typography>
              <Typography variant="body1" component="p">
                Extract the zip file, navigate to the project route and do the installing.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`npm install`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Starting the Project
              </Typography>
              <Typography variant="body1" component="p">
                Run the app in development mode. The page will automatically reload if you make changes to the code. You
                will see the build errors and lint warnings in the console.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`npm run dev`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Creating a Production Build
              </Typography>
              <Typography variant="body1" component="p">
                Build the app for production to the build folder. It correctly bundles React in production mode and
                optimizes the build for the best performance.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`npm run build`}
                </SyntaxHighlighter>
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
