import { Box, Button, Card, CardContent, Chip, Grid, Typography } from "@mui/material";

import NiAI from "@/icons/nexture/ni-ai";
import NiArrowOutUp from "@/icons/nexture/ni-arrow-out-up";
import NiBadgeCheck from "@/icons/nexture/ni-badge-check";
import NiBulbOn from "@/icons/nexture/ni-bulb-on";
import NiChartBar from "@/icons/nexture/ni-chart-bar";
import NiClock from "@/icons/nexture/ni-clock";
import NiCode from "@/icons/nexture/ni-code";
import NiDashboard from "@/icons/nexture/ni-dashboard";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiKnobs from "@/icons/nexture/ni-knobs";
import NiMessages from "@/icons/nexture/ni-messages";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiPuzzle from "@/icons/nexture/ni-puzzle";
import NiRankFour from "@/icons/nexture/ni-rank-four";
import NiRankOne from "@/icons/nexture/ni-rank-one";
import NiRankThree from "@/icons/nexture/ni-rank-three";
import NiRankTwo from "@/icons/nexture/ni-rank-two";
import NiShuffle from "@/icons/nexture/ni-shuffle";
import NiTextarea from "@/icons/nexture/ni-textarea";
import NiTrophy from "@/icons/nexture/ni-trophy";
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
                <Typography variant="subtitle2">Basic</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h1">$0</Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              Simple, access for casual users to explore core AI capabilities.
            </Typography>

            <Button variant="pastel" color="grey" className="pointer-events-none w-full">
              Active Subscription
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Limited daily messages and daily usage time
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMessages className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Access only to the standard conversation mode
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiBulbOn className="text-accent-2" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Daily inspiration prompts
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
                <Typography variant="subtitle2">Plus</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h1">$8</Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              Enhanced experience with voice, and faster responses for all users.
            </Typography>

            <Button variant="outlined" color="grey" className="w-full">
              Subscribe
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Unlimited chat sessions
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMessages className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Memory-enabled conversations for context retention
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMicrophone className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Voice input and output for hands-free interaction
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiClock className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority response speed and reduced latency
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPaintRoller className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Customization options (e.g., tone, themes, chat style)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiBadgeCheck className="text-accent-1" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  No ads
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ lg: 3, md: 6, xs: 12 }}>
        <Card className="relative h-full">
          <Chip
            label="Sale"
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
                <Typography variant="subtitle2">Pro</Typography>
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
              Advanced tools and reasoning for creators and professionals.
            </Typography>

            <Button variant="outlined" color="grey" className="w-full">
              Subscribe
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Unlimited chat sessions
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMessages className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Memory-enabled conversations for context retention
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMicrophone className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Voice input and output for hands-free interaction
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiClock className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority response speed and reduced latency
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPaintRoller className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Customization options (e.g., tone, themes, chat style)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiBadgeCheck className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  No ads
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiShuffle className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Access to advanced reasoning modes
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiDocumentImage className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Image generation and editing
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowOutUp className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  File upload and analysis
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTextarea className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Copilot Pages for long-form writing and project collaboration
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiCode className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  API access or plugin compatibility
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTrophy className="text-secondary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority support and early access to new features
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
                <Typography variant="subtitle2">Enterprise</Typography>
              </Box>
              <Box className="flex flex-row items-center gap-2">
                <Typography variant="h1" className="text-primary">
                  $48
                </Typography>
                <Typography variant="body2">/ Month</Typography>
              </Box>
            </Box>

            <Typography variant="body1" className="text-center">
              Scalable, secure solutions for teams and organizations.
            </Typography>

            <Button variant="outlined" color="grey" className="w-full">
              Subscribe
            </Button>

            <Box className="flex w-full flex-col items-start justify-between gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiAI className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Unlimited chat sessions
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMessages className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Memory-enabled conversations for context retention
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiMicrophone className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Voice input and output for hands-free interaction
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiClock className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority response speed and reduced latency
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPaintRoller className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Customization options (e.g., tone, themes, chat style)
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiBadgeCheck className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  No ads
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiShuffle className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Access to advanced reasoning modes
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiDocumentImage className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Image generation and editing
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiArrowOutUp className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  File upload and analysis
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTextarea className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Copilot Pages for long-form writing and project collaboration
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiCode className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  API access or plugin compatibility
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiTrophy className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Priority support and early access to new features
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiUsers className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Multi-user collaboration
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiDashboard className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Admin dashboard with usage analytics and permission controls
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiKnobs className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Custom model tuning
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiPuzzle className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  Integration with internal systems or third-party platforms
                </Typography>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiChartBar className="text-primary" />
                <Typography variant="body1" className="text-text-primary flex-1">
                  SLA-backed performance guarantees
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
