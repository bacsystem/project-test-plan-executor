"use client";

import ExtensionChangelog from "./components/extension-changelog";
import ExtensionConversations from "./components/extension-conversations";
import ExtensionInfo from "./components/extension-info";
import ExtensionMore from "./components/extension-more";
import ExtensionStats from "./components/extension-stats";
import ExtensionTags from "./components/extension-tags";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";

import NiMessages from "@/icons/nexture/ni-messages";

export default function Page() {
  const router = useRouter();

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Color Analysis
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
            <Link color="inherit" href="/applications/ai-chat/extensions">
              Extensions
            </Link>
            <Typography variant="body2">Color Analysis</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            startIcon={<NiMessages size={"medium"} />}
            onClick={() => {
              router.push("/applications/ai-chat/new-chat");
            }}
          >
            Start Chat
          </Button>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={{ "3xl": 3, lg: 4, xs: 12 }}>
          <ExtensionInfo />
          <ExtensionStats />
          <ExtensionTags />
        </Grid>

        <Grid container size={{ "3xl": 9, lg: 8, xs: 12 }}>
          <Grid size={12}>
            <ExtensionConversations />
            <ExtensionChangelog />
            <ExtensionMore />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
