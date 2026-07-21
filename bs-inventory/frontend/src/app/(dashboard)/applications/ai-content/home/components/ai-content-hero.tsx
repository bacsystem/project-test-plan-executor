"use client";

import Link from "next/link";

import { Box, Grid, Typography } from "@mui/material";

import NiArchive from "@/icons/nexture/ni-archive";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiPlay from "@/icons/nexture/ni-play";
import NiScale from "@/icons/nexture/ni-scale";

export default function AIContentHero() {
  return (
    <Box className="mt-2 mb-3 flex flex-wrap justify-between gap-4">
      <Typography variant="h6" component="h6">
        Time to Get Creative!
      </Typography>
      <Grid size={12} container spacing={2.5}>
        <Grid size={{ lg: 3, xs: 12, sm: 6 }}>
          <Link
            href="/applications/ai-content/ai-image"
            className="border-grey-25 bg-background-paper flex min-w-48 flex-row items-center rounded-3xl border p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-primary-light/10 flex h-18 w-16 flex-none items-center justify-center rounded-2xl">
              <NiDocumentImage className="text-primary" size={"large"} />
            </Box>
            <Box className="p-4">
              <Typography variant="body2" className="text-text-secondary leading-3">
                Generate
              </Typography>
              <Typography variant="subtitle2" className="leading-4">
                Image
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid size={{ lg: 3, xs: 12, sm: 6 }}>
          <Link
            href="/applications/ai-content/ai-video"
            className="border-grey-25 bg-background-paper flex min-w-48 flex-row items-center rounded-3xl border p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-secondary-light/10 flex h-18 w-16 flex-none items-center justify-center rounded-2xl">
              <NiPlay className="text-secondary" size={"large"} />
            </Box>
            <Box className="p-4">
              <Typography variant="body2" className="text-text-secondary leading-3">
                Generate
              </Typography>
              <Typography variant="subtitle2" className="leading-4">
                Video
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid size={{ lg: 3, xs: 12, sm: 6 }}>
          <Link
            href="/applications/ai-content/ai-upscale"
            className="border-grey-25 bg-background-paper flex min-w-48 flex-row items-center rounded-3xl border p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-accent-1-light/10 flex h-18 w-16 flex-none items-center justify-center rounded-2xl">
              <NiScale className="text-accent-1" size={"large"} />
            </Box>
            <Box className="p-4">
              <Typography variant="body2" className="text-text-secondary leading-3">
                Upscale
              </Typography>
              <Typography variant="subtitle2" className="leading-4">
                Image
              </Typography>
            </Box>
          </Link>
        </Grid>
        <Grid size={{ lg: 3, xs: 12, sm: 6 }}>
          <Link
            href="/applications/ai-content/ai-models"
            className="border-grey-25 bg-background-paper flex min-w-48 flex-row items-center rounded-3xl border p-1 transition-transform hover:scale-[1.02]"
          >
            <Box className="bg-accent-2-light/10 flex h-18 w-16 flex-none items-center justify-center rounded-2xl">
              <NiArchive className="text-accent-2" size={"large"} />
            </Box>
            <Box className="p-4">
              <Typography variant="body2" className="text-text-secondary leading-3">
                Generative
              </Typography>
              <Typography variant="subtitle2" className="leading-4">
                Models
              </Typography>
            </Box>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
