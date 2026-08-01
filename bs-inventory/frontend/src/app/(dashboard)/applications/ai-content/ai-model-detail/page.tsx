"use client";

import ModelDetailChangelog from "./components/model-detail-changelog";
import ModelDetailGeneratedItems from "./components/model-detail-generated-items";
import ModelDetailInfo from "./components/model-detail-info";
import ModelDetailStats from "./components/model-detail-stats";
import ModelDetailTags from "./components/model-detail-tags";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Breadcrumbs, Button, Grid, Typography } from "@mui/material";

import NiMagicWand from "@/icons/nexture/ni-magic-wand";

export default function Page() {
  const router = useRouter();

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Artbreeder
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/ai-content">
              AI Content
            </Link>
            <Link color="inherit" href="/applications/ai-content/models">
              Models
            </Link>
            <Typography variant="body2">Artbreeder</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Button
            size="medium"
            color="primary"
            variant="contained"
            startIcon={<NiMagicWand size={"medium"} />}
            onClick={() => {
              router.push("/applications/ai-content");
            }}
          >
            Generate
          </Button>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={{ "3xl": 3, lg: 4, xs: 12 }}>
          <ModelDetailInfo />
          <ModelDetailStats />
          <ModelDetailTags />
          <ModelDetailChangelog />
        </Grid>

        <Grid container size={{ "3xl": 9, lg: 8, xs: 12 }}>
          <Grid size={12}>
            <ModelDetailGeneratedItems />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
