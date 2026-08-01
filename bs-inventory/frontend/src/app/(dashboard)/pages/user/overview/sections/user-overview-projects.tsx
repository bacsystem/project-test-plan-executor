import { useRouter } from "next/navigation";

import { Box, Button, Card, CardContent, Chip, Grid, Link, Paper, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiLike from "@/icons/nexture/ni-like";
import NiStar from "@/icons/nexture/ni-star";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

interface ProjectData {
  id: string;
  name: string;
  icon: IconName;
  type: "Public" | "Private";
  description: string;
  likes: number;
  followers: number;
  stars: number;
  isLiked: boolean;
  isFollewed: boolean;
  isStared: boolean;
}

export default function UserOverviewProjects() {
  const router = useRouter();

  const projects: ProjectData[] = [
    {
      id: crypto.randomUUID(),
      name: "Pixel Pioneer",
      icon: "NiBag",
      type: "Public",
      description:
        "A cutting-edge image processing library leveraging machine learning to upscale, denoise, and optimize images for various platforms.",
      likes: 16,
      followers: 6,
      stars: 24,
      isLiked: true,
      isFollewed: false,
      isStared: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Code Chronicles",
      icon: "NiTrophy",
      type: "Private",
      description:
        "A markdown-based journaling tool for developers, enabling them to document their coding journey, track progress, and share insights with the community.",
      likes: 4,
      followers: 43,
      stars: 225,
      isLiked: true,
      isFollewed: true,
      isStared: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Eco Track",
      icon: "NiMoneyBag",
      type: "Public",
      description:
        "A sustainable living assistant that calculates your carbon footprint, provides eco-friendly tips, and connects users to local green initiatives.",
      likes: 44,
      followers: 2,
      stars: 53,
      isLiked: false,
      isFollewed: false,
      isStared: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Sound Forge",
      icon: "NiSoundOn",
      type: "Private",
      description:
        "A DIY audio creation and editing toolkit for music producers and podcasters, featuring plugins for sound manipulation and mixing.",
      likes: 2,
      followers: 4,
      stars: 1,
      isLiked: true,
      isFollewed: false,
      isStared: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Game On",
      icon: "NiController",
      type: "Private",
      description:
        "A 2D game engine supporting cross-platform compatibility with tutorials for beginners to start their journey in game development.",
      likes: 0,
      followers: 0,
      stars: 0,
      isLiked: false,
      isFollewed: false,
      isStared: false,
    },
    {
      id: crypto.randomUUID(),
      name: "Habit Hive",
      icon: "NiShuffle",
      type: "Public",
      description:
        "A customizable habit tracker with features like daily insights, reminders, and progress visualizations to help users build healthy routines.",
      likes: 478,
      followers: 201,
      stars: 248,
      isLiked: true,
      isFollewed: true,
      isStared: true,
    },
    {
      id: crypto.randomUUID(),
      name: "Data Vista",
      icon: "NiChartPie",
      type: "Public",
      description:
        "An intuitive data visualization library that simplifies creating charts, graphs, and interactive dashboards for analytics and presentations.",
      likes: 114,
      followers: 240,
      stars: 86,
      isLiked: true,
      isFollewed: false,
      isStared: true,
    },
    {
      id: crypto.randomUUID(),
      name: "AI-Scribe",
      icon: "NiRobot",
      type: "Private",
      description:
        "A natural language processing tool that assists with automated content generation, grammar correction, and text summarization for writers and researchers.",
      likes: 2,
      followers: 2,
      stars: 0,
      isLiked: false,
      isFollewed: false,
      isStared: false,
    },
  ];

  return (
    <Card>
      <CardContent>
        <Box className="mb-3 flex flex-row items-center leading-6">
          <Typography variant="h6" component="h6" className="flex-1">
            Projects
          </Typography>
          <Button
            size="tiny"
            color="grey"
            variant="text"
            startIcon={<NiChevronRightSmall size={"tiny"} className="rtl:rotate-180" />}
            onClick={() => router.push("/pages/user/projects")}
          >
            View All
          </Button>
        </Box>
        <Grid container spacing={2.5}>
          {projects.map((project) => {
            return (
              <Grid
                key={project.id}
                size={{ lg: 6, xs: 12 }}
                component={Paper}
                variant="outlined"
                elevation={0}
                className="flex flex-row items-start gap-2.5 rounded-lg p-7"
              >
                <NextureIcons icon={project.icon} size={"large"} />
                <Box className="flex flex-1 flex-col">
                  <Box className="mb-1 flex flex-row justify-between gap-1">
                    <Link href="#" variant="subtitle2" underline="hover" color="textPrimary" className="pt-0.25">
                      {project.name}
                    </Link>
                    <Chip label="Public" variant="filled" className="text-sm" />
                  </Box>
                  <Typography className="text-text-secondary mb-4 line-clamp-2 min-h-8" variant="body2">
                    {project.description}
                  </Typography>
                  <Box className="flex flex-row items-end gap-1">
                    <Button
                      size="tiny"
                      color="grey"
                      variant="pastel"
                      startIcon={<NiLike size={"small"} />}
                      className={cn(
                        project.isLiked && "active",
                        "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary",
                      )}
                    >
                      {project.likes}
                    </Button>
                    <Button
                      size="tiny"
                      color="grey"
                      variant="pastel"
                      startIcon={<NiEyeOpen size={"small"} />}
                      className={cn(
                        project.isFollewed && "active",
                        "[.active]:text-secondary [.active]:bg-grey-25 hover:text-secondary",
                      )}
                    >
                      {project.followers}
                    </Button>
                    <Button
                      size="tiny"
                      color="grey"
                      variant="pastel"
                      startIcon={<NiStar size={"small"} />}
                      className={cn(
                        project.isStared && "active",
                        "[.active]:text-accent-1 [.active]:bg-grey-25 hover:text-accent-1",
                      )}
                    >
                      {project.stars}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
}
