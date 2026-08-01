"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { useInViewport } from "react-in-viewport";

import { Box, Button, Grid, Typography } from "@mui/material";

import { LINKS } from "@/constants";
import NiBasket from "@/icons/nexture/ni-basket";
import { getThemeImage } from "@/lib/image-helper";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

type Props = {
  className?: string;
};

export default function LPCTA({ className }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });
  const { isDarkMode, theme } = useThemeContext();

  const rocketImage = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["blue-light-rocket.png", "blue-dark-rocket.png"],
        "theme-green": ["green-light-rocket.png", "green-dark-rocket.png"],
        "theme-orange": ["orange-light-rocket.png", "orange-dark-rocket.png"],
        "theme-purple": ["purple-light-rocket.png", "purple-dark-rocket.png"],
      },
      directory: "/images/three-d-icons/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);
  if (!mounted) {
    return null;
  }
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
          <Grid container spacing={5} className="flex items-center">
            <Grid
              size={{ xs: 12, md: 4, lg: 3 }}
              className="flex justify-center text-center md:justify-start md:text-start"
            >
              {rocketImage && (
                <img
                  width={240}
                  height={240}
                  alt="Theme rocket"
                  className="group-hover:animate-float h-60 w-60 bg-cover bg-center"
                  src={rocketImage}
                />
              )}
            </Grid>

            <Grid size={{ xs: 12, md: 8, lg: 9 }} className="flex justify-center md:justify-start">
              <Box className="text-center md:text-start">
                <Typography component="h2" variant="h2" className="lp-h2 text-center md:text-start">
                  Get Started with Acorn
                </Typography>
                <Typography component="p" className="lp-leading mb-2.5 text-center md:text-start">
                  Turn your ideas into polished products. Craft beautiful, consistent applications with modular,
                  customizable ui components designed and coded based on best practices.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<NiBasket size="large" />}
                  target="_blank"
                  href={LINKS.purchase}
                  component={Link}
                >
                  Buy
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
