"use client";

import LPBackbone from "./landing-page/lp-backbone";
import LPComponents from "./landing-page/lp-components";
import LPCTA from "./landing-page/lp-cta";
import LPFooter from "./landing-page/lp-footer";
import LPGlance from "./landing-page/lp-glance";
import LPHeader from "./landing-page/lp-header";
import LPHero from "./landing-page/lp-hero";
import LPPreviews from "./landing-page/lp-previews";
import LPPricing from "./landing-page/lp-pricing";
import LPStats from "./landing-page/lp-stats";

import { Box } from "@mui/material";

import BackgroundWrapper from "@/components/layout/containers/background-wrapper";

export default function Home() {
  return (
    <>
      <Box className="mx-auto flex w-full flex-col items-center">
        <BackgroundWrapper />
        <Box className="bg-background/50 fixed inset-0 -z-1"></Box>
        <LPHeader />
        <Box className="flex w-full flex-col items-center gap-30 pt-20">
          <LPHero />
          <LPGlance />
          <LPBackbone />
          <LPPreviews />
          <LPComponents />
          <LPStats />
          <LPPricing />
          <LPCTA />
          <LPFooter />
        </Box>
      </Box>
    </>
  );
}
