"use client";

import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import { cn } from "@/lib/utils";

export default function LearnFeatures() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Features in a Nutshell
      </Typography>

      <Grid container size={12} spacing={2.5}>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "relative flex min-h-136 bg-size-[120%] bg-top bg-no-repeat p-0 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-1-vertical.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-4/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Generating Images
              </Typography>
              <Typography variant="body1">Create custom visuals from text prompts in seconds.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "relative flex min-h-136 bg-size-[120%] bg-top bg-no-repeat p-0 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-2-vertical.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-4/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Generating Videos
              </Typography>
              <Typography variant="body1">Transform ideas into dynamic video clips with AI-powered motion.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "relative flex min-h-136 bg-size-[120%] bg-top bg-no-repeat p-0 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-3-vertical.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-4/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Upscaling
              </Typography>
              <Typography variant="body1">
                Enhance image resolution and clarity while preserving style and detail.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 6, xl: 3 }}>
          <Card
            className={cn(
              "relative flex min-h-136 bg-size-[120%] bg-top bg-no-repeat p-0 transition-all hover:bg-size-[130%]",
              "bg-[url(/images/products/product-4-vertical.jpg)]",
            )}
          >
            <Box className="from-background-paper/0 to-background-paper via-background-paper absolute inset-s-0 inset-e-0 bottom-0 h-4/12 bg-linear-to-b"></Box>
            <CardContent className="relative flex flex-1 flex-col justify-end p-7!" component={Link} href={"#"}>
              <Typography variant="h6" component="h6" className="card-title">
                Models
              </Typography>
              <Typography variant="body1">
                Choose from specialized AI models tailored for art, realism, and more.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
