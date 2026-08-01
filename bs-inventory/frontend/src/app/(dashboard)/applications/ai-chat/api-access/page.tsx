"use client";

import Link from "next/link";

import { Breadcrumbs, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import NiCellsPlus from "@/icons/nexture/ni-cells-plus";
import NiQuestionHexagon from "@/icons/nexture/ni-question-hexagon";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

export default function Page() {
  const { isDarkMode } = useThemeContext();

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid size={{ md: "grow", xs: 12 }}>
        <Typography variant="h1" component="h1" className="mb-0">
          API Access
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/applications">
            Applications
          </Link>
          <Link color="inherit" href="/applications/ai-chat">
            AI Chat
          </Link>
          <Typography variant="body2">API Access</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
        <Button
          className="surface-standard"
          size="medium"
          color="grey"
          variant="surface"
          startIcon={<NiQuestionHexagon size={"medium"} />}
        >
          Help
        </Button>
        <Button
          className="surface-standard"
          size="medium"
          color="grey"
          variant="surface"
          startIcon={<NiCellsPlus size={"medium"} />}
        >
          Generate Key
        </Button>
      </Grid>

      <Grid size={12}>
        <Card
          className={cn(
            isDarkMode
              ? "bg-[url(/images/misc/search-background-dark.svg)]"
              : "bg-[url(/images/misc/search-background-light.svg)]",
            "flex min-h-72 items-center justify-center bg-contain bg-center bg-no-repeat p-0",
          )}
        >
          <CardContent className="flex flex-col items-center p-7!">
            <Typography variant="h2" className="mb-4">
              No Access Key!
            </Typography>
            <Typography component="p" className="text-text-secondary mb-2 max-w-xs text-center">
              There are no access keys. Generate one to get started.
            </Typography>
            <Button size="medium" color="primary" variant="outlined" startIcon={<NiCellsPlus size={"medium"} />}>
              Generate Key
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
