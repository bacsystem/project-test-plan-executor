"use client";

import LPAction from "./lp-components/hero-section/lp-action";
import LPActivityChart from "./lp-components/hero-section/lp-activity-chart";
import LPAutocompletes from "./lp-components/hero-section/lp-autocompletes";
import LPImage from "./lp-components/hero-section/lp-image";
import LPSettings from "./lp-components/hero-section/lp-settings";
import LPStatEarnings from "./lp-components/hero-section/lp-stat-earnings";
import LPStatOrders from "./lp-components/hero-section/lp-stat-orders";
import LPUser from "./lp-components/hero-section/lp-user";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useInViewport } from "react-in-viewport";
import { useTranslations } from "use-intl";

import { Box, Button, Grid, Typography } from "@mui/material";

import { LINKS } from "@/constants";
import NiBasket from "@/icons/nexture/ni-basket";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LPHero({ className }: Props) {
  const t = useTranslations("dashboard");
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
        "lp-container-padding w-full opacity-0 transition-opacity duration-700",
        inViewport && "opacity-100",
      )}
    >
      <Box className="bg-foreground lp-content-padding outline-line flex justify-center overflow-x-hidden rounded-4xl shadow-sm outline -outline-offset-1 backdrop-blur-sm">
        <Box className="lp-contained-container flex min-h-200 flex-row items-center justify-between gap-8">
          <Grid container className="w-full">
            {/* Copies */}
            <Grid size={{ xs: 12, lg: 5 }} className="flex items-center justify-center lg:justify-start">
              <Box className="flex flex-col items-center lg:items-start">
                <Typography component="h1" variant="h1" className="lp-h1 mb-8 text-center lg:text-start">
                  {t("landing-hero-first")}
                  <br />
                  {t("landing-hero-second")}
                  <br />
                  {t("landing-hero-third")}
                </Typography>

                <Typography component="p" className="lp-leading mb-4 max-w-md text-center lg:text-start">
                  {t("landing-copy-first")}
                </Typography>

                <Box className="mb-12 flex flex-col gap-2 sm:flex-row">
                  <Button
                    className="min-w-36"
                    size="large"
                    color="primary"
                    variant="contained"
                    startIcon={<NiSendUpRight size={"large"} />}
                    href={LINKS.dashboard}
                    target="_blank"
                    component={Link}
                  >
                    {t("landing-view-live")}
                  </Button>

                  <Button
                    className="min-w-36"
                    size="large"
                    color="primary"
                    variant="pastel"
                    startIcon={<NiBasket size={"large"} />}
                    href={LINKS.purchase}
                    target="_blank"
                    component={Link}
                  >
                    {t("landing-purchase")}
                  </Button>
                </Box>
              </Box>
            </Grid>
            {/* Components */}
            <Grid size={{ xs: 12, lg: 7 }}>
              <Box className="flex flex-row justify-center gap-2.5 lg:items-center lg:justify-end">
                <Box className="flex flex-col items-end gap-2.5">
                  <LPStatEarnings />
                  <LPSettings />
                  <LPUser />
                  <LPAction />
                  <LPStatOrders />
                </Box>
                <Box className="flex flex-col items-start gap-2.5">
                  <LPImage />
                  <LPAutocompletes />
                  <LPActivityChart />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
