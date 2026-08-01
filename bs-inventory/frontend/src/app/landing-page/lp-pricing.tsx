"use client";
import Link from "next/link";
import { useRef } from "react";
import { useInViewport } from "react-in-viewport";

import { Avatar, Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import { LINKS } from "@/constants";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiFolder from "@/icons/nexture/ni-folder";
import NiHeadset from "@/icons/nexture/ni-headset";
import NiMoneyBag from "@/icons/nexture/ni-money-bag";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiRankFour from "@/icons/nexture/ni-rank-four";
import NiRankOne from "@/icons/nexture/ni-rank-one";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSendDownRight from "@/icons/nexture/ni-send-down-right";
import NiUploadCloud from "@/icons/nexture/ni-upload-cloud";
import { cn } from "@/lib/utils";
type Props = {
  className?: string;
};
export default function LPPricing({ className }: Props) {
  const scrollRef = useRef(null);
  const { inViewport } = useInViewport(scrollRef, { threshold: 0.2 });

  return (
    <Box
      className={cn(
        className,
        "lp-container-padding opacity-0 transition-opacity duration-700",
        inViewport && "opacity-100",
      )}
      ref={scrollRef}
    >
      <Box className="lp-contained-container flex flex-col gap-10">
        {/* Title and description */}
        <Box>
          <Typography component="h2" variant="h2" className="lp-h2 text-center">
            Pricing
          </Typography>
          <Typography component="p" className="lp-leading text-center">
            The Regular License fits most needs. The Extended License is only required for SaaS applications.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          <Grid size={{ lg: 2, xs: 0 }} className="hidden lg:flex"></Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card className="flex h-full flex-row items-start">
              <CardContent className="flex w-full flex-col items-center gap-4">
                <Box className="flex flex-col items-center justify-center gap-2.5">
                  <Avatar className="bg-accent-1-light/10 large">
                    <NiRankOne className="text-accent-1" size="large" />
                  </Avatar>
                  <Typography variant="subtitle2">Standard License</Typography>
                </Box>

                <Typography variant="h1" className="mb-4">
                  $38
                </Typography>

                <Typography variant="body1" className="text-text-secondary text-center">
                  The Regular License fits most needs and comes with all the design and code files.
                </Typography>
                <Button
                  variant="outlined"
                  color="grey"
                  size="medium"
                  className="mb-4 w-full"
                  target="_blank"
                  href={LINKS.purchase}
                  component={Link}
                >
                  Purchase
                </Button>

                <Box className="flex w-full flex-col items-start gap-4" component="ul">
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiUploadCloud className="text-accent-1" />
                    <Typography variant="body1">Future updates</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiHeadset className="text-accent-1" />
                    <Typography variant="body1">6 months support from the author</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiFolder className="text-accent-1" />
                    <Typography variant="body1">Main project and starter project</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiSendDownRight className="text-accent-1" />
                    <Typography variant="body1">Landing page</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiDocumentFull className="text-accent-1" />
                    <Typography variant="body1">Lifetime license</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiPaintRoller className="text-accent-1" />
                    <Typography variant="body1">Design files (Figma)</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiScreen className="text-accent-1" />
                    <Typography variant="body1">Usable in a single end product</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card className="flex flex-row items-start">
              <CardContent className="flex w-full flex-col items-center gap-4">
                <Box className="flex flex-col items-center justify-center gap-2.5">
                  <Avatar className="bg-accent-2-light/10 large">
                    <NiRankFour className="text-accent-2" size="large" />
                  </Avatar>
                  <Typography variant="subtitle2">Extended License</Typography>
                </Box>

                <Typography variant="h1" className="mb-4">
                  $800
                </Typography>

                <Typography variant="body1" className="text-text-secondary text-center">
                  The license for for SaaS usage. It has all the features of the standard license.
                </Typography>
                <Button
                  variant="outlined"
                  color="grey"
                  size="medium"
                  className="mb-4 w-full"
                  target="_blank"
                  href={LINKS.purchase_extended}
                  component={Link}
                >
                  Purchase
                </Button>

                <Box className="flex w-full flex-col items-start gap-4" component="ul">
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiUploadCloud className="text-accent-2" />
                    <Typography variant="body1">Future updates</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiHeadset className="text-accent-2" />
                    <Typography variant="body1">6 months support from the author</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiFolder className="text-accent-2" />
                    <Typography variant="body1">Main project and starter project</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiSendDownRight className="text-accent-2" />
                    <Typography variant="body1">Landing page</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiDocumentFull className="text-accent-2" />
                    <Typography variant="body1">Lifetime license</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiPaintRoller className="text-accent-2" />
                    <Typography variant="body1">Design files (Figma)</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiScreen className="text-accent-2" />
                    <Typography variant="body1">Usable in a single end product</Typography>
                  </Box>
                  <Box className="flex flex-row gap-2.5" component="li">
                    <NiMoneyBag className="text-accent-2" />
                    <Typography variant="body1">Commercial and SaaS applications</Typography>
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
