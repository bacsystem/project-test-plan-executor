import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiEyeOpen from "@/icons/nexture/ni-eye-open";
import NiLike from "@/icons/nexture/ni-like";
import NiSearch from "@/icons/nexture/ni-search";
import NiStar from "@/icons/nexture/ni-star";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

interface AvatarData {
  id: string;
  image: string;
  name: string;
}

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
  avatars: AvatarData[];
}
export default function UserProjectsList() {
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-1.jpg", name: "Laura Ellis" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-2.jpg", name: "Daniel Fontaine" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-3.jpg", name: "Sofia Bennett" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-4.jpg", name: "Olivia Castillo" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-5.jpg", name: "Lucas Wright" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-6.jpg", name: "Henry Lawson" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-7.jpg", name: "Emma Sullivan" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-2.jpg", name: "Daniel Fontaine" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-3.jpg", name: "Sofia Bennett" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-5.jpg", name: "Adrian Patel" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-6.jpg", name: "Olivia Castillo" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-7.jpg", name: "Lucas Wright" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-8.jpg", name: "Olivia Castillo" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-4.jpg", name: "Olivia Castillo" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-5.jpg", name: "Lucas Wright" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-6.jpg", name: "Olivia Castillo" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-7.jpg", name: "Lucas Wright" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-2.jpg", name: "Daniel Fontaine" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-3.jpg", name: "Sofia Bennett" },
      ],
    },
    {
      id: crypto.randomUUID(),
      name: "PathFinder",
      icon: "NiPath",
      type: "Private",
      description:
        "A route optimization tool for logistics and delivery services, helping users calculate the most efficient paths with real-time traffic updates.",
      likes: 8,
      followers: 4,
      stars: 4,
      isLiked: true,
      isFollewed: false,
      isStared: false,
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-4.jpg", name: "Olivia Castillo" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-5.jpg", name: "Lucas Wright" },
      ],
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
      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-4.jpg", name: "Laura Ellis" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-5.jpg", name: "Daniel Fontaine" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-6.jpg", name: "Sofia Bennett" },
      ],
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
      avatars: [{ id: crypto.randomUUID(), image: "/images/avatars/avatar-5.jpg", name: "Lucas Wright" }],
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

      avatars: [
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-4.jpg", name: "Olivia Castillo" },
        { id: crypto.randomUUID(), image: "/images/avatars/avatar-3.jpg", name: "Sofia Bennett" },
      ],
    },
  ];

  return (
    <>
      <Grid size={12}>
        <FormControl variant="filled" size="medium" className="surface mb-2.5" fullWidth>
          <InputLabel>Search</InputLabel>
          <FilledInput
            defaultValue=""
            placeholder="Type to search projects..."
            endAdornment={
              <>
                <InputAdornment position="end">
                  <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                </InputAdornment>
              </>
            }
          />
        </FormControl>
      </Grid>
      {projects.map((project) => {
        return (
          <Grid key={project.id} size={{ lg: 6, xs: 12 }}>
            <Card>
              <CardContent className="flex flex-row gap-2.5">
                <NextureIcons icon={project.icon} size={"large"} />
                <Box className="flex flex-1 flex-col">
                  <Box className="mb-1 flex flex-row justify-between gap-1">
                    <Link href="#" variant="subtitle2" underline="hover" color="textPrimary" className="pt-0.25">
                      {project.name}
                    </Link>
                    <Chip label={project.type} variant="filled" className="text-sm" />
                  </Box>
                  <Typography className="text-text-secondary mb-4 line-clamp-2 min-h-9" variant="body2">
                    {project.description}
                  </Typography>
                  <Box className="flex flex-row justify-between gap-1">
                    <AvatarGroup spacing="medium" className="tiny justify-end">
                      {project.avatars.map((avatar) => {
                        return <Avatar key={avatar.id} alt={avatar.name} src={avatar.image} />;
                      })}
                    </AvatarGroup>
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
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      <Grid size={12} className="mt-2.5 flex justify-center">
        <Pagination
          size="medium"
          className="surface-standard"
          count={3}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: NiChevronLeftSmall, next: NiChevronRightSmall }} {...item} />
          )}
        />
      </Grid>
    </>
  );
}
