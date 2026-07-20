"use client";

import Link from "next/link";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiListCircle from "@/icons/nexture/ni-list-circle";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import NiSettings from "@/icons/nexture/ni-settings";
import { useThemeContext } from "@/theme/theme-provider";

const ArticleDetail = () => {
  const { isDarkMode } = useThemeContext();
  return (
    <Box className="mb-6">
      <Box>
        <Typography variant="h6" component="h6" className="mb-2">
          1. Issue description
        </Typography>
        <Typography variant="body1" component="p">
          Before diving into the development, familiarize yourself with the core technologies of web applications:
        </Typography>
        <br />
        <Typography variant="body1" component="ul">
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              HTML:
            </Typography>{" "}
            The structure and layout of your application.
          </Typography>
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              CSS:
            </Typography>{" "}
            The styling and design.
          </Typography>
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              JavaScript:
            </Typography>{" "}
            The functionality and interactivity.
          </Typography>
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              Frameworks/Libraries (Optional):
            </Typography>{" "}
            Tools like React, Angular, or Vue.js simplify development.
          </Typography>
        </Typography>
        <br />
      </Box>

      <Box>
        <Typography variant="h6" component="h6" className="mb-2">
          2. Context
        </Typography>
        <Typography variant="body1" component="p">
          To start coding, you need:
        </Typography>
        <br />
        <Typography variant="body1" component="ul">
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              Code Editor:
            </Typography>{" "}
            Use VS Code or Sublime Text for writing code.
          </Typography>
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              Browser:
            </Typography>{" "}
            Chrome, Firefox, or Edge for testing and debugging.
          </Typography>
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              Package Manager:
            </Typography>{" "}
            Install Node.js and npm (Node Package Manager) for managing dependencies.
          </Typography>
          <Typography variant="body1" component="li">
            <Typography variant="subtitle1" component="span">
              Version Control:
            </Typography>{" "}
            Use Git and GitHub to manage your codebase and collaborate.
          </Typography>
        </Typography>
        <br />
      </Box>

      <Box>
        <Typography variant="h6" component="h6" className="mb-2">
          3. Environment
        </Typography>
        <Typography variant="body1" component="p">
          Organize your web application with a clear and logical project structure. Keep essential files like HTML, CSS,
          and JavaScript separate, and use folders for assets such as images and fonts. A well-structured setup ensures
          maintainability and scalability as your application grows. Organize your files for a simple web application:
        </Typography>

        <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
          <SyntaxHighlighter
            className="bg-transparent!"
            language="javascript"
            style={isDarkMode ? atomOneDark : atomOneLight}
            codeTagProps={{ className: "border-none" }}
            showLineNumbers
          >
            {`my-web-app/
└── index.html    // Main HTML file
└── style.css     // CSS file
└── script.js     // JavaScript file
└── assets        // Images, fonts, etc.`}
          </SyntaxHighlighter>
        </Box>
        <br />
      </Box>

      <Box>
        <Typography variant="h6" component="h6" className="mb-2">
          4. Steps to Reproduce
        </Typography>
        <Typography variant="subtitle1">HTML:</Typography>
        <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
          <SyntaxHighlighter
            className="bg-transparent!"
            language="html"
            style={isDarkMode ? atomOneDark : atomOneLight}
            codeTagProps={{ className: "border-none" }}
            showLineNumbers
          >
            {`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Web App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My Web Application</h1>
  <button id="myButton">Click Me</button>
  <script src="script.js"></script>
</body>
</html>`}
          </SyntaxHighlighter>
        </Box>
        <br />

        <Typography variant="subtitle1">CSS:</Typography>
        <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
          <SyntaxHighlighter
            className="bg-transparent!"
            language="html"
            style={isDarkMode ? atomOneDark : atomOneLight}
            codeTagProps={{ className: "border-none" }}
            showLineNumbers
          >
            {`body {
  font-family: Arial, sans-serif;
  text-align: center;
  background-color: #f4f4f4;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}`}
          </SyntaxHighlighter>
        </Box>
        <br />

        <Typography variant="subtitle1">JS:</Typography>
        <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
          <SyntaxHighlighter
            className="bg-transparent!"
            language="html"
            style={isDarkMode ? atomOneDark : atomOneLight}
            codeTagProps={{ className: "border-none" }}
            showLineNumbers
          >
            {`document.getElementById("myButton").addEventListener("click", () => {
  alert("Button clicked!");
});`}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  );
};

const MenuContent = () => {
  return (
    <Box className="flex flex-col gap-4">
      <List dense>
        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none">
            <ListItemIcon>
              <NiSendUpRight size="medium" />
            </ListItemIcon>
            <ListItemText primary="Getting Started" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Installation" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="First-Time User Tips" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton selected>
            <ListItemText primary="Key Features" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Quick Start Checklist" className="ps-7" />
          </ListItemButton>
        </ListItem>
      </List>

      <List dense>
        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none">
            <ListItemIcon>
              <NiScreen size="medium" />
            </ListItemIcon>
            <ListItemText primary="User Interface" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Icon Glossary" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Navigation" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Shortcuts" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Accessibility" className="ps-7" />
          </ListItemButton>
        </ListItem>
      </List>

      <List dense>
        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none">
            <ListItemIcon>
              <NiDocumentFull size="medium" />
            </ListItemIcon>
            <ListItemText primary="API Reference" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Icon Glossary" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Navigation" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Shortcuts" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Accessibility" className="ps-7" />
          </ListItemButton>
        </ListItem>
      </List>

      <List dense>
        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none">
            <ListItemIcon>
              <NiCalendar size="medium" />
            </ListItemIcon>
            <ListItemText primary="Version History" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Upcoming Releases" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Deprecated Features" className="ps-7" />
          </ListItemButton>
        </ListItem>
      </List>

      <List dense>
        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none">
            <ListItemIcon>
              <NiSettings size="medium" />
            </ListItemIcon>
            <ListItemText primary="System Requirements" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Hardware" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Software" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Languages" className="ps-7" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Browsers" className="ps-7" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={"auto"} className="hidden pe-16 lg:flex">
        <MenuContent />
      </Grid>
      <Grid size={"grow"} spacing={5} container>
        <Grid size={12} spacing={2.5} container>
          <Grid size={{ xs: 12, md: "grow" }}>
            <Typography variant="h1" component="h1" className="mb-0">
              Key Features
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/pages">
                Pages
              </Link>
              <Link color="inherit" href="/pages/miscellaneous">
                Miscellaneous
              </Link>
              <Typography variant="body2">Key Features</Typography>
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
              <ArticleDetail />
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Box className="flex w-full flex-row justify-between gap-2">
            <Button
              variant="surface"
              color="grey"
              className="surface-standard"
              startIcon={<NiChevronLeftSmall size={"medium"} />}
            >
              Installation
            </Button>
            <Button
              variant="surface"
              color="grey"
              className="surface-standard"
              endIcon={<NiChevronRightSmall size={"medium"} />}
            >
              Accessibility
            </Button>
          </Box>
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
