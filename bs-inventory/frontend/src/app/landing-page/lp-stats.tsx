"use client";

import { useRef } from "react";
import { useInViewport } from "react-in-viewport";

import { Avatar, Box, Grid, Typography } from "@mui/material";

import NiBasket from "@/icons/nexture/ni-basket";
import NiMessages from "@/icons/nexture/ni-messages";
import NiStars from "@/icons/nexture/ni-stars";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export default function LPStats({ className }: Props) {
  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });

  return (
    <Box
      className={cn(
        className,
        "lp-container-padding flex w-full justify-center opacity-0 transition-opacity duration-700",
        inViewport && "opacity-100",
      )}
      ref={scrollRef}
    >
      <Box className="lp-contained-container lp-content-padding bg-foreground outline-line flex justify-center rounded-4xl shadow-sm outline -outline-offset-1 backdrop-blur-sm">
        <Box className="flex w-full flex-col gap-10">
          <Grid container spacing={{ xs: 12, md: 5 }}>
            <Grid size={{ xs: 12, md: 4 }} className="text-center">
              <Box className="flex flex-col items-center gap-4">
                <Avatar className="bg-primary-light/10 large">
                  <NiBasket className="text-primary" size="large" />
                </Avatar>
                <Box className="flex flex-col gap-2">
                  <Typography variant="h1">1.1K+ Sales</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} className="text-center">
              <Box className="flex flex-col items-center gap-4">
                <Avatar className="bg-secondary-light/10 large">
                  <NiStars className="text-secondary" size="large" />
                </Avatar>
                <Box className="flex flex-col gap-2">
                  <Typography variant="h1">4.9+ Rating</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} className="text-center">
              <Box className="flex flex-col items-center gap-4">
                <Avatar className="bg-accent-1-light/10 large">
                  <NiMessages className="text-accent-1" size="large" />
                </Avatar>
                <Box className="flex flex-col gap-2">
                  <Typography variant="h1">35+ Reviews</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
