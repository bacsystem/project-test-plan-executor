"use client";
import Link from "next/link";
import { useMemo } from "react";
import { useRef } from "react";
import { useInViewport } from "react-in-viewport";

import { Avatar, Box, Button, Card, CardContent, FormGroup, FormLabel, Grid, Rating, Typography } from "@mui/material";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";
import NiChef from "@/icons/nexture/ni-chef";
import NiCode from "@/icons/nexture/ni-code";
import NiDrink from "@/icons/nexture/ni-drink";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiLike from "@/icons/nexture/ni-like";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiPath from "@/icons/nexture/ni-path";
import NiRocket from "@/icons/nexture/ni-rocket";
import NiSnow from "@/icons/nexture/ni-snow";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import { getThemeImage } from "@/lib/image-helper";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

type Props = {
  className?: string;
};

export default function LPGlance({ className }: Props) {
  const { theme, isDarkMode } = useThemeContext();
  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });

  const image = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
        "theme-green": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
        "theme-orange": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
        "theme-purple": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
      },
      directory: "/images/products/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);

  const imageSecond = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["product-5.jpg", "product-5-dark.jpg"],
        "theme-green": ["product-5.jpg", "product-5-dark.jpg"],
        "theme-orange": ["product-5.jpg", "product-5-dark.jpg"],
        "theme-purple": ["product-5.jpg", "product-5-dark.jpg"],
      },
      directory: "/images/products/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);

  return (
    <Box
      ref={scrollRef}
      className={cn(
        className,
        "lp-container-padding opacity-0 transition-opacity duration-750",
        inViewport && "opacity-100",
      )}
    >
      <Box className="lp-contained-container flex flex-col gap-10">
        {/* Title and description */}
        <Box>
          <Typography component="h2" variant="h2" className="lp-h2">
            Acorn at a Glance
          </Typography>
          <Typography component="p" className="lp-leading">
            Acorn has industry-standard tools, beautiful design, and modular technology to deliver a quick starting
            point for your next project.
          </Typography>
        </Box>

        {/* Bullet points and Components */}
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 6 }} className="flex flex-col gap-10">
            <Box className="flex flex-col gap-4">
              <Avatar className="bg-primary-light/10 large">
                <NiSnow className="text-primary" size="large" />
              </Avatar>
              <Box className="flex flex-col gap-2">
                <Typography variant="h5">Harmony</Typography>
                <Typography variant="body1" className="text-text-secondary max-w-full md:max-w-xs">
                  The styling is consistent through the app to allow easy branding and customization.
                </Typography>
              </Box>
            </Box>

            <Box className="flex flex-col gap-4">
              <Avatar className="bg-secondary-light/10 large">
                <NiPaintRoller className="text-secondary" size="large" />
              </Avatar>
              <Box className="flex flex-col gap-2">
                <Typography variant="h5">Design</Typography>
                <Typography variant="body1" className="text-text-secondary max-w-full md:max-w-xs">
                  Over 150 pages packed with reusable components, variables and styles in Figma.
                </Typography>
              </Box>
            </Box>

            <Box className="flex flex-col gap-4">
              <Avatar className="bg-accent-1-light/10 large">
                <NiCode className="text-accent-1" size="large" />
              </Avatar>
              <Box className="flex flex-col gap-2">
                <Typography variant="h5">Code</Typography>
                <Typography variant="body1" className="text-text-secondary max-w-full md:max-w-xs">
                  It is built on top of React, Typescript and MUI. Quick to start, easy to extend.
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} className="relative">
            {/* Blog post card */}
            <Card className="mt-10">
              <CardContent className="flex flex-row items-start gap-4">
                <Box className="hidden w-8 flex-col items-center gap-2.5 md:flex">
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiArrowUp size={"small"} />}
                  />
                  <Typography variant="body2">280</Typography>
                  <Button
                    className="icon-only"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiArrowDown size={"small"} />}
                  />
                </Box>
                <Box className="flex flex-col">
                  <Box className="mb-3 flex w-full flex-row items-center justify-between leading-6">
                    <Typography variant="h6" component="h6" className="flex-1">
                      Ask Me: I&apos;m a Space Engineer
                    </Typography>
                  </Box>
                  <Box className="mb-6 flex flex-col gap-4">
                    <Grid size={12} container spacing={2.5}>
                      <Grid size={{ xs: 12, md: 7 }}>
                        <img
                          alt="post image"
                          sizes="100vw"
                          className="h-48 w-full cursor-pointer rounded-lg object-cover transition-transform hover:scale-[1.02]"
                          src={image}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 5 }}>
                        <img
                          alt="post image"
                          sizes="100vw"
                          className="h-48 w-full cursor-pointer rounded-lg object-cover transition-transform hover:scale-[1.02]"
                          src={imageSecond}
                        />
                      </Grid>
                    </Grid>
                    <Typography>
                      Hi everyone! I&apos;m a space engineer for designing systems for Mars exploration. My work
                      involves creating technologies that can withstand extreme conditions, like the thin atmosphere and
                      freezing temperatures on Mars.
                    </Typography>
                  </Box>
                  <Box className="flex flex-col justify-between gap-2.5 md:flex-row md:items-center md:gap-1">
                    <Box className="flex flex-row items-center gap-2">
                      <Avatar alt="Daniel Fontaine" src="/images/avatars/avatar-2.jpg" className="small" />
                      <Typography>Daniel Fontaine</Typography>
                    </Box>
                    <Box className="flex flex-row items-end gap-1">
                      <Button
                        size="tiny"
                        color="grey"
                        variant="pastel"
                        startIcon={<NiLike size={"small"} />}
                        className="active [.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                      >
                        8
                      </Button>
                      <Button
                        size="tiny"
                        color="grey"
                        variant="pastel"
                        startIcon={<NiEyeOpen size={"small"} />}
                        className="active [.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                      >
                        12
                      </Button>
                      <Button
                        size="tiny"
                        color="grey"
                        variant="pastel"
                        startIcon={<NiRocket size={"small"} />}
                        className="active [.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1 [.active:hover]:text-text-primary min-w-0 md:min-w-16"
                      >
                        14
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Ratings */}
            <Card className="absolute bottom-24 z-1 w-36 ltr:left-6 ltr:md:-left-12 rtl:right-6 rtl:md:-right-12">
              <CardContent>
                <FormGroup>
                  <FormLabel component="label">Drinks</FormLabel>
                  <Rating
                    defaultValue={4}
                    max={5}
                    icon={<NiDrink variant="contained" size="medium" className="contained text-accent-2!" />}
                    emptyIcon={<NiDrink size="medium" className="outlined" />}
                  />
                </FormGroup>
                <FormGroup className="mb-0">
                  <FormLabel component="label">Food</FormLabel>
                  <Rating
                    defaultValue={4}
                    max={5}
                    icon={<NiChef variant="contained" size="medium" className="contained text-accent-3!" />}
                    emptyIcon={<NiChef size="medium" className="outlined" />}
                  />
                </FormGroup>
              </CardContent>
            </Card>

            {/* Stat card */}
            <Card
              component={Link}
              href="#"
              className="absolute top-0 z-1 flex w-64 flex-row items-center transition-transform hover:scale-[1.02] ltr:right-10 rtl:left-10"
            >
              <CardContent className="flex w-full flex-col gap-4">
                <Box className="flex flex-row items-center justify-between gap-2.5">
                  <Avatar className="bg-primary-light/10 large">
                    <NiPath className="text-primary" size="large" />
                  </Avatar>
                  <Button
                    size="tiny"
                    color="text-secondary"
                    variant="text"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                    className={cn(
                      "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                    )}
                  />
                </Box>
                <Box className="flex flex-col gap-1">
                  <Typography variant="body1" className="text-text-secondary leading-5">
                    Tours
                  </Typography>
                  <Box className="flex flex-row items-center gap-2">
                    <Typography variant="h5" className="text-leading-5">
                      452
                    </Typography>
                    <Box className="flex flex-row items-center">
                      <NiTriangleDown className="text-success" size={"medium"} />
                      <Typography variant="body2" className="text-success">
                        2.4%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
