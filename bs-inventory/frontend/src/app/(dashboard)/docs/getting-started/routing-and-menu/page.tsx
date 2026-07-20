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
      <DocsMenu selectedID="docs-routing-and-menu" />
    </Box>
  );
};

export default function DocsGettingStartedRoutingAndMenu() {
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
              Routing and Menu
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
              <Typography variant="body2">Routing and Menu</Typography>
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
                Menu Source
              </Typography>
              <Typography variant="body1" component="p">
                The menu works connected with the layout and you can find the source codes in{" "}
                <code>src/components/layout/menu</code> folder.
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="asciidoc"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`+-- components
    | 
    +-- charts
    +-- data-grid
    +-- layout
    |   |
    |   +-- containers
    |   +-- menu                                       // Menu source codes
    |   |   |
    |   |   |-- left-menu.tsx                          // Left primary and secondary source
    |   |   |-- menu-backdrop.tsx                      // Custom click away area of the menu
    |   |   |-- primary-item.tsx                       // Primary menu item
    |   |   |-- secondary-item.tsx                     // Secondary menu item
    |   |   |
    |   +-- notifications
    |   +-- search
    |   +-- shortcuts
    |   +-- user
    |   |-- layout-context.tsx
    |   |-- listing-page-content.tsx
    +-- logo
    +-- plugins`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Left Menu
              </Typography>
              <Typography variant="body1" component="p">
                The left menu gets a list of menu items and navigates to them. The menu items can contain hrefs, labels,
                and icons. If there is a children array, the menu displays an accordion on the secondary panel. The menu
                data file is located in <code>src/menu-items.tsx</code>. It has two arrays and they provide the data for
                the top and bottom left menu contents.
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`export const leftMenuItems: MenuItem[] = [
{
  id: "dashboards",
  icon: "NiHome",
  label: "menu-dashboards",
  description: "menu-dashboards-description",
  color: "text-primary",
  href: "/dashboards",
  children: [
    {
      id: "default",
      icon: "NiDashboard",
      label: "menu-default",
      href: "/dashboards/default",
      description: "menu-default-description",
    },
    {
      id: "analytics",
      icon: "NiChartPie",
      label: "menu-analytics",
      href: "/dashboards/analytics",
      description: "menu-analytics-description",
    },
    {
      id: "visual",
      icon: "NiPresentation",
      label: "menu-visual",
      href: "/dashboards/visual",
      description: "menu-visual-description",
    },
  ],
},
...`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Custom Left Menu Content
              </Typography>
              <Typography variant="body1" component="p" className="mb-2">
                Use <code>content</code> property of the <code>MenuItem</code> to supply a component to be used as a
                custom menu.
              </Typography>

              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`{
  id: "ai-chat",
  icon: "NiMessages",
  label: "menu-ai-chat",
  href: "/applications/ai-chat",
  content: <AiChatMenuContent />,
  children: [
    ...
  ],
},`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Right Menu
              </Typography>
              <Typography variant="body1" component="p">
                The right menu works similarly to the left one but instead of getting routing data and displaying links,
                it displays components based on an array. You can find the array in
                <code>src/components/layout/menu/right-menu.tsx</code>.
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`const menuItems: MenuItem[] = [
  {
    id: "theme-customization",
    label: "menu-theme-customization",
    icon: "NiPalette",
    content: <ThemeContent />,
    color: "accent-1",
  },
  {
    id: "background-customization",
    label: "menu-background-customization",
    icon: "NiPaintRoller",
    content: <BackgroundContent />,
    color: "accent-2",
  },
];`}
                </SyntaxHighlighter>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Navigating via Next Link
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`import Link from "next/link";

import { Box } from "@mui/material";

export default function Page() {
  return (
    <Box className="flex flex-col">
      <Link href="/ui/navigation/link" className="link-primary">
        Link
      </Link>
      <Link href="https://themeforest.net" target="_blank" className="link-primary">
        MUI
      </Link>
    </Box>
  );
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
                Navigating via Next Router
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push("/docs/getting-started/installation");
  }, [router]);
  return <></>;
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
