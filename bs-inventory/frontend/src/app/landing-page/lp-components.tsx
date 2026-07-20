"use client";

import LPCategoriesChart from "./lp-components/components-section/lp-categories-chart";
import LPHelp from "./lp-components/components-section/lp-help";
import LPInventory from "./lp-components/components-section/lp-inventory";
import LPReviews from "./lp-components/components-section/lp-reviews";
import LPShortcuts from "./lp-components/components-section/lp-shortcuts";
import LPSources from "./lp-components/components-section/lp-sources";
import LPStats from "./lp-components/components-section/lp-stats";
import LPStatsSquare from "./lp-components/components-section/lp-stats-square";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInViewport } from "react-in-viewport";

import { Box, Button, Grid, Typography } from "@mui/material";

import { LINKS } from "@/constants";
import NiController from "@/icons/nexture/ni-controller";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LPComponents({ className }: Props) {
  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Box
      ref={scrollRef}
      className={cn(
        className,
        "lp-container-padding relative w-full justify-center opacity-0 transition-opacity duration-700",
        inViewport && "opacity-100",
      )}
    >
      <Box className="relative w-full">
        <Box
          className={cn(
            "bg-foreground outline-line absolute top-0 z-0 flex min-h-120 w-full justify-center rounded-4xl bg-cover shadow-sm outline -outline-offset-1 backdrop-blur-sm",
          )}
        ></Box>
      </Box>

      <Box className="lp-content-padding flex w-full justify-center pb-0">
        <Box className="lp-contained-container relative flex flex-col gap-10">
          {/* Title and description */}
          <Box>
            <Typography component="h2" variant="h2" className="lp-h2">
              Production-Ready Components, Lots of Them
            </Typography>
            <Typography component="p" className="lp-leading mb-2.5">
              Acorn comes with a library of fully tested, scalable components designed for real-world use.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<NiController size="large" />}
              target="_blank"
              href={LINKS.components}
              component={Link}
            >
              View All
            </Button>
          </Box>

          <Grid container spacing={5}>
            <Grid size={{ lg: 4, md: 6, xs: 12 }}>
              <LPStats />
            </Grid>
            <Grid size={{ lg: 4, md: 6, xs: 12 }}>
              <LPCategoriesChart />
            </Grid>
            <Grid size={{ lg: 4, md: 6, xs: 12 }} className="block md:hidden lg:block">
              <LPSources />
            </Grid>
            <Grid size={{ lg: 6, xs: 12 }}>
              <LPHelp />
            </Grid>
            <Grid size={{ lg: 6, xs: 12 }}>
              <LPReviews />
            </Grid>
            <Grid size={{ lg: 4, md: 6, xs: 12 }}>
              <LPInventory />
            </Grid>
            <Grid size={{ lg: 4, md: 6, xs: 12 }}>
              <LPShortcuts />
            </Grid>
            <Grid size={{ lg: 4, md: 6, xs: 12 }} className="block md:hidden lg:block">
              <LPStatsSquare />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
