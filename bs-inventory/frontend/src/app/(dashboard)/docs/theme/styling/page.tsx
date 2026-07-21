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
      <DocsMenu selectedID="docs-styling" />
    </Box>
  );
};

export default function DocsThemeStyling() {
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
              Styling
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
              <Typography variant="body2">Styling</Typography>
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
                Style Folder
              </Typography>
              <Typography variant="body1" component="p">
                The <code>src/style</code> directory contains all the styles of the application.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="asciidoc"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`+-- style
    |
    +-- data-display
    +-- feedback
    +-- inputs
    +-- lab
    +-- layout
    +-- mui-x
    +-- navigation
    +-- plugins
    +-- surfaces
    +-- theme
    |-- global.css`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Theme Definitions
              </Typography>
              <Typography variant="body1" component="p">
                The theme CSS definitions are in the <code>src/style/theme</code> directory. <code>common.css</code>{" "}
                contains light and dark theme specific values as well as the common values among the themes while
                specific theme color values are defined in their own files. For example, the <code>blue.css</code> file
                below has the colors for the blue theme.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="css"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`/* --------------------------- */
/* Theme Blue */
/* --------------------------- */

@layer base {
  .theme-blue {
    --primary: 191 100% 46%;
    --primary-light: 191 100% 56%;
    --primary-dark: 191 100% 36%;

    --secondary: 207 85% 42%;
    --secondary-light: 207 85% 52%;
    --secondary-dark: 207 85% 32%;

    --accent-1: 272 92% 66%;
    --accent-1-light: 272 92% 76%;
    --accent-1-dark: 272 92% 56%;

    --accent-2: 311 82% 60%;
    --accent-2-light: 311 82% 70%;
    --accent-2-dark: 311 82% 50%;

    --accent-3: 359 87% 70%;
    --accent-3-light: 359 87% 80%;
    --accent-3-dark: 359 87% 60%;

    --accent-4: 32 89% 65%;
    --accent-4-light: 32 89% 75%;
    --accent-4-dark: 32 89% 55%;

    --accent-5: 85 49% 49%;
    --accent-5-light: 85 49% 59%;
    --accent-5-dark: 85 49% 39%;

    --accent-6: 136 49% 49%;
    --accent-6-light: 136 49% 59%;
    --accent-6-dark: 136 49% 39%;

    color-scheme: light;
  }
  .theme-blue.dark {
    --primary: 191 100% 46%;
    --primary-light: 191 100% 56%;
    --primary-dark: 191 100% 36%;

    --secondary: 207 85% 42%;
    --secondary-light: 207 85% 52%;
    --secondary-dark: 207 85% 32%;

    --accent-1: 272 92% 66%;
    --accent-1-light: 272 92% 76%;
    --accent-1-dark: 272 92% 56%;

    --accent-2: 311 82% 60%;
    --accent-2-light: 311 82% 70%;
    --accent-2-dark: 311 82% 50%;

    --accent-3: 359 87% 70%;
    --accent-3-light: 359 87% 80%;
    --accent-3-dark: 359 87% 60%;

    --accent-4: 32 89% 65%;
    --accent-4-light: 32 89% 75%;
    --accent-4-dark: 32 89% 55%;

    --accent-5: 85 49% 49%;
    --accent-5-light: 85 49% 59%;
    --accent-5-dark: 85 49% 39%;

    --accent-6: 136 49% 49%;
    --accent-6-light: 136 49% 59%;
    --accent-6-dark: 136 49% 39%;
    
    color-scheme: dark;
  }
}`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Component Styles
              </Typography>
              <Typography variant="body1" component="p">
                The rest of the folders contain styles for the various components and plugins, including MUI ones. We
                used Tailwind to extend and change styles. An example css file for the <code>MUI Avatar</code>{" "}
                component.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="css"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`/* --------------------------- */
/* Avatar */
/* --------------------------- */

@layer utilities {
  .MuiAvatar-root {
    @apply bg-grey-300 font-body h-9 w-9 border-0! text-sm font-semibold outline-2 -outline-offset-1 outline-transparent;

    &.large {
      @apply h-10 w-10;

      &.MuiAvatar-circular {
        @apply rounded-lg;
      }
    }

    &.medium {
      @apply h-9 w-9;

      &.MuiAvatar-circular {
        @apply rounded-md;
      }
    }

    &.small {
      @apply h-8 w-8 text-xs;

      &.MuiAvatar-circular {
        @apply rounded;
      }
    }

    &.tiny {
      @apply h-7 w-7 text-xs;

      &.MuiAvatar-circular {
        @apply rounded-sm;
      }
    }

    &.nano {
      @apply h-4 w-4 text-xs;

      &.MuiAvatar-circular {
        @apply rounded-xs;
      }
    }
  }

  .MuiAvatar-circular {
    @apply rounded-md;
  }

  .MuiAvatar-rounded {
    @apply rounded-sm;
  }

  .MuiAvatarGroup-root {
    &.large .MuiAvatar-root {
      @apply h-10 w-10;
    }

    &.medium .MuiAvatar-root {
      @apply h-9 w-9;
    }

    &.small .MuiAvatar-root {
      @apply h-8 w-8 text-xs;
    }

    &.tiny .MuiAvatar-root {
      @apply h-7 w-7 text-xs;
    }

    &.nano .MuiAvatar-root {
      @apply h-4 w-4 text-xs;
    }
  }

  .MuiAvatarGroup-avatar {
    @apply outline-background-paper outline-2 -outline-offset-1;
  }
}`}
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
