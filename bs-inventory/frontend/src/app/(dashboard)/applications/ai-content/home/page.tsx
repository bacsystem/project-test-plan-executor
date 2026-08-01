"use client";

import AIContentHero from "./components/ai-content-hero";
import RecentCreations from "./components/ai-content-recent-creations";
import AIContentTips from "./components/ai-content-tips";
import AIContentTutorials from "./components/ai-content-tutorials";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";

import NiSendUpRight from "@/icons/nexture/ni-send-up-right";

export default function Page() {
  const router = useRouter();

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            AI Content
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Typography variant="body2">AI Content</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            startIcon={<NiSendUpRight size={"medium"} />}
            onClick={() => {
              router.push("/applications/ai-content/premium-plans");
            }}
          >
            Upgrade
          </Button>
        </Grid>
      </Grid>

      <Grid size={12}>
        <AIContentHero />
      </Grid>

      <Grid size={{ lg: 6, xs: 12 }}>
        <AIContentTutorials />
      </Grid>

      <Grid size={{ lg: 6, xs: 12 }}>
        <AIContentTips />
      </Grid>

      <Grid size={12}>
        <RecentCreations />
      </Grid>
    </Grid>
  );
}
