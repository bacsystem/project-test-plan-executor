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
      <DocsMenu selectedID="docs-theme-provider" />
    </Box>
  );
};

export default function DocsThemeThemeProvider() {
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
              Theme Provider
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
              <Typography variant="body2">Theme Provider</Typography>
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
                useThemeContext
              </Typography>
              <Typography variant="body1" component="p">
                It provides functions to modify the theme on the runtime.
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter mt-3 mb-6 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`import NiMoon from "@/icons/nexture/ni-moon";
import NiSun from "@/icons/nexture/ni-sun";
import { useThemeContext } from "@/theme/theme-provider";


export default function Page() {
  const { isDarkMode } = useThemeContext();


  return <>{isDarkMode ? <NiMoon /> : <NiSun />}</>;
}`}
                </SyntaxHighlighter>
              </Box>

              <Typography variant="body1" component="p">
                It has several functions and variables.
              </Typography>

              <Box className="mt-4 flex flex-col">
                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    theme
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">
                        <code>ThemeVariant</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">none</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    setTheme
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">void</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">
                        <code>theme: ThemeVariant</code>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    mode
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">
                        <code>system | light | dark</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">none</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    setMode
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">void</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">
                        <code>mode: ModeVariant</code>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    content
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">
                        <code>ContentType</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">none</Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    setContent
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">void</Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">
                        <code>content: ContentType</code>
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="box border-grey-50 mb-4 border-b pb-6">
                  <Typography variant="h6" component="h6" className="mb-2">
                    isDarkMode
                  </Typography>
                  <Box className="flex flex-col gap-4">
                    <Box>
                      <Typography variant="subtitle1">Returns</Typography>
                      <Typography variant="body1">
                        <code>boolean</code>
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1">Receives</Typography>
                      <Typography variant="body1">none</Typography>
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
