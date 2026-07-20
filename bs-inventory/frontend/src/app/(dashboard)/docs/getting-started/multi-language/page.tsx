"use client";
import DocsMenu from "../../sections/docs-menu";
import Link from "next/link";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Box, Breadcrumbs, Button, Card, CardContent, Drawer, Grid, Tooltip, Typography } from "@mui/material";

import NiListCircle from "@/icons/nexture/ni-list-circle";
import { useThemeContext } from "@/theme/theme-provider";

const MenuContent = () => {
  return (
    <Box className="flex flex-col gap-4">
      <DocsMenu selectedID="docs-multi-language" />
    </Box>
  );
};

export default function DocsGettingStartedMultiLanguage() {
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
              Multi Language
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
              <Typography variant="body2">Multi Language</Typography>
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
                Next Intl
              </Typography>
              <Typography variant="body1" component="p">
                Acorn uses next-intl to support multiple languages. Even though we have not fully included all the
                translations, the template is ready to support multilanguage. You may see it in action in the user menu
                by changing the language with the dropdown.
              </Typography>
              <br />
              <Typography variant="body1" component="p">
                All the necessary files can be found in the <code>src/i18n</code> folder. Translations are located in
                the <code>src/i18n/messages</code> folder.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Using Translations
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`import { useTranslations } from "use-intl";
                  
import { Typography } from "@mui/material";

export default function ActionTranslation() {
  const t = useTranslations("dashboard");

  return (
    <Typography variant="body1" component="p">
      {t("menu-ui")}
    </Typography>
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
                Changing the Language
              </Typography>
              <Box className="bg-grey-20 syntax-highlighter mt-3 rounded-lg p-4">
                <SyntaxHighlighter
                  className="bg-transparent!"
                  language="javascript"
                  style={isDarkMode ? atomOneDark : atomOneLight}
                  codeTagProps={{ className: "border-none" }}
                  showLineNumbers
                >
                  {`import React from "react";
import { useTransition } from "react";

import { Button } from "@mui/material";

import { LocaleOption } from "@/constants";
import { setClientLocale } from "@/i18n/locale";

export default function UserLanguageSwitch() {
  const [isPending, startTransition] = useTransition();

  function handleOnChangeLocale(value: LocaleOption) {
    startTransition(() => {
      setClientLocale(value);
    });
  }

  return (
    <>
      <Button
        onClick={() => {
          handleOnChangeLocale("en");
        }}
        disabled={isPending}
      >
        En
      </Button>
      <Button
        onClick={() => {
          handleOnChangeLocale("de");
        }}
        disabled={isPending}
      >
        De
      </Button>
    </>
  );
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
