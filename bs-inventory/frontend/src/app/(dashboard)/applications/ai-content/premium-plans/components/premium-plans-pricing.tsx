import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";

import NiAI from "@/icons/nexture/ni-ai";
import NiArchive from "@/icons/nexture/ni-archive";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiCatalog from "@/icons/nexture/ni-catalog";
import NiChartPie from "@/icons/nexture/ni-chart-pie";
import NiClock from "@/icons/nexture/ni-clock";
import NiCode from "@/icons/nexture/ni-code";
import NiCrop from "@/icons/nexture/ni-crop";
import NiDirectory from "@/icons/nexture/ni-directory";
import NiGraduation from "@/icons/nexture/ni-graduation";
import NiHeadphones from "@/icons/nexture/ni-headphones";
import NiJoin from "@/icons/nexture/ni-join";
import NiLaw from "@/icons/nexture/ni-law";
import NiLock from "@/icons/nexture/ni-lock";
import NiMessages from "@/icons/nexture/ni-messages";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiPalette from "@/icons/nexture/ni-palette";
import NiRankFour from "@/icons/nexture/ni-rank-four";
import NiRankOne from "@/icons/nexture/ni-rank-one";
import NiRankThree from "@/icons/nexture/ni-rank-three";
import NiRankTwo from "@/icons/nexture/ni-rank-two";
import NiScale from "@/icons/nexture/ni-scale";
import NiStructure from "@/icons/nexture/ni-structure";
import NiTextarea from "@/icons/nexture/ni-textarea";
import NiTrendUp from "@/icons/nexture/ni-trend-up";
import NiUsers from "@/icons/nexture/ni-users";

export default function PremiumPlansPricing() {
  return (
    <Grid container size={12} spacing={2.5}>
      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card className="h-full">
          <CardContent className="flex flex-col items-center gap-8">
            <Box className="flex flex-col items-center gap-4">
              <Box className="flex flex-col items-center gap-2">
                <Box className="bg-accent-2-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-md">
                  <NiRankOne size={"large"} className="text-accent-2" />
                </Box>
                <Typography variant="subtitle2"> Starter Spark</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h1">$0</Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              Perfect for hobbyists, students, or anyone exploring visual creativity without the pressure.
            </Typography>

            <Button variant="pastel" color="grey" className="pointer-events-none w-full">
              Active Subscription
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiArchive className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Free plan to get started
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  100 image generations/month
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPaintRoller className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Access to 15 core styles including realistic and anime
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTextarea className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Prompt guidance with auto-suggestions
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowInDown className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Low-res downloads
                  <br />
                  (up to 720p)
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card className="h-full">
          <CardContent className="flex flex-col items-center gap-8">
            <Box className="flex flex-col items-center gap-4">
              <Box className="flex flex-col items-center gap-2">
                <Box className="bg-accent-1-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-md">
                  <NiRankTwo size={"large"} className="text-accent-1" />
                </Box>
                <Typography variant="subtitle2">Creator Pulse</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h1">$8</Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              A balanced toolkit for those who need consistent, high-quality visuals for social media, or storytelling.
            </Typography>

            <Button variant="outlined" color="grey" className="w-full">
              Subscribe
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiArchive className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  All from the Starter Spark plan
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  750 image generations/month
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPaintRoller className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  60+ styles including cinematic, isometric, and surreal
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTextarea className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Prompt refinement assistant with tone/mood presets
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowInDown className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Low-res downloads
                  <br />
                  (up to 720p)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTrendUp className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Commercial usage rights
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiLaw className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority rendering queue
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiStructure className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Batch generation (up to 10 variations per prompt)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPalette className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Style remixing (combine two styles dynamically)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiScale className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Enhanced quality generation & upscaling
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card className="relative h-full">
          <Chip
            label="Best Offer"
            variant="outlined"
            className="outline-secondary text-secondary absolute inset-e-5 top-5"
            size="small"
          />

          <CardContent className="flex flex-col items-center gap-8">
            <Box className="flex flex-col items-center gap-4">
              <Box className="flex flex-col items-center gap-2">
                <Box className="bg-secondary-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-md">
                  <NiRankThree size={"large"} className="text-secondary" />
                </Box>
                <Typography variant="subtitle2">Vision Architect</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="body2" className="line-through">
                  $24
                </Typography>
                <Typography variant="h1" className="text-secondary">
                  $16
                </Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              Ideal for professionals who demand control, consistency, and advanced customization.
            </Typography>

            <Button variant="outlined" color="grey" className="w-full">
              Subscribe
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiArchive className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  All from the Creator Pulse plan
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  2,500 image generations/month
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPaintRoller className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Full style library + custom style blending
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiClock className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority response speed and reduced latency
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTextarea className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Advanced prompt scripting (multi-layered input, conditional logic)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowInDown className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Ultra-high-res downloads
                  <br />
                  (up to 4K)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiCode className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  API access for automation and integration
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiDirectory className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Private workspace with folders and version history
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiCrop className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Custom aspect ratios and canvas sizes
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPalette className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Style locking for brand consistency
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiChartPie className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Prompt analytics (track performance and trends)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiScale className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Ultimate quality generation & upscaling
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card className="h-full">
          <CardContent className="flex flex-col items-center gap-8">
            <Box className="flex flex-col items-center gap-4">
              <Box className="flex flex-col items-center gap-2">
                <Box className="bg-primary-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-md">
                  <NiRankFour size={"large"} className="text-primary" />
                </Box>
                <Typography variant="subtitle2">Design Nexus</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h1" className="text-primary">
                  $48
                </Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              Designed for teams pushing the boundaries of design, media, and immersive experiences.
            </Typography>

            <Button variant="outlined" color="grey" className="w-full">
              Subscribe
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiArchive className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  All from the Vision Architect plan
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Unlimited generations
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiLock className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Team collaboration tools (roles, permissions, shared libraries)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiGraduation className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Custom model training (upload reference sets for style fine-tuning)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiHeadphones className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Dedicated support, onboarding, and creative consultation
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowInDown className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Ultra-high-res downloads
                  <br />
                  (up to 8K)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiCode className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Enterprise-grade API with SLA and usage analytics
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiUsers className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Real-time co-creation mode (multiple users editing prompts live)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowOutUp className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  File upload and analysis
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiCatalog className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Brand-safe mode (filters for compliance and tone)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMessages className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Multi-language prompt support with localization tuning
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiJoin className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Integration with design tools (Figma, Adobe, Unity via plugins)
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
