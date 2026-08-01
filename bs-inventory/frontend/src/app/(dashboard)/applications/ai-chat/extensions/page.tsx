"use client";

import Extension from "./components/extension";
import Link from "next/link";

import {
  Breadcrumbs,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";

import NiSearch from "@/icons/nexture/ni-search";

export type ExtensionData = {
  id: string;
  name: string;
  icon: string;
  category: "Writing" | "Education" | "Lifestyle" | "Productivity" | "Programming";
  users: string;
  description: string;
  likes: number;
  unlikes: number;
  isLiked: boolean;
  isUnliked: boolean;
  isInstalled: boolean;
  link: string;
};

export default function Page() {
  const extensions: ExtensionData[] = [
    {
      id: crypto.randomUUID(),
      name: "Grammar Checker",
      icon: "/images/icons/message-icon.png",
      category: "Writing",
      description:
        "Polish your writing with AI precision. Instantly fix grammar, enhance style, and boost clarity across emails, documents, and content—so you always sound sharp and professional.",
      users: "274,521 Users",
      likes: 2781,
      unlikes: 48,
      isLiked: true,
      isUnliked: false,
      isInstalled: true,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Scholar AI",
      icon: "/images/icons/hat-icon.png",
      category: "Education",
      description:
        "Your smart research companion. Scholar AI finds academic papers, summarizes complex topics, and generates citations in seconds. Designed for students, researchers, and lifelong learners who want faster insights and better results.",
      users: "189,284 Users",
      likes: 4812,
      unlikes: 48,
      isLiked: true,
      isUnliked: false,
      isInstalled: true,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Melody Maker",
      icon: "/images/icons/music-icon.png",
      category: "Lifestyle",
      description:
        "Music creation app that helps users compose original melodies, harmonize tracks, and explore different musical styles. It offers intuitive tools for songwriting, making it ideal for musicians, producers, and hobbyists looking to spark creativity or refine their sound.",
      users: "157,202 Users",
      likes: 1587,
      unlikes: 99,
      isLiked: false,
      isUnliked: false,
      isInstalled: true,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Product Manager",
      icon: "/images/icons/box-icon.png",
      category: "Productivity",
      description:
        "Your all-in-one command center for product success. This intelligent app simplifies planning, feature prioritization, and team collaboration—so you can focus on building products users love.",
      users: "114,988 Users",
      likes: 1247,
      unlikes: 45,
      isLiked: false,
      isUnliked: false,
      isInstalled: false,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Video Generator",
      icon: "/images/icons/video-icon.png",
      category: "Productivity",
      description:
        "Turn ideas into stunning videos—instantly. This AI-powered tool transforms text, images, and scripts into professional-quality content with automated editing, voiceovers, and dynamic visuals. Perfect for creators, marketers, and educators.",
      users: "98,215 Users",
      likes: 998,
      unlikes: 24,
      isLiked: false,
      isUnliked: false,
      isInstalled: false,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Law and Contract",
      icon: "/images/icons/gavel-icon.png",
      category: "Writing",
      description:
        "Legal clarity, powered by AI. This smart tool drafts, reviews, and analyzes contracts with precision—reducing risk and saving time. Ideal for legal teams, startups, and businesses that need fast, reliable legal support without the heavy lifting.",
      users: "98,215 Users",
      likes: 877,
      unlikes: 18,
      isLiked: false,
      isUnliked: false,
      isInstalled: false,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Presentation Maker",
      icon: "/images/icons/chart-icon.png",
      category: "Productivity",
      description:
        "Create stunning presentations. This AI-powered tool designs slides, refines content, and adds visual flair in minutes. Whether you're pitching, teaching, or inspiring, it helps you deliver impactful stories with style and speed.",
      users: "78,110 Users",
      likes: 677,
      unlikes: 16,
      isLiked: false,
      isUnliked: false,
      isInstalled: false,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
    {
      id: crypto.randomUUID(),
      name: "Software Architect",
      icon: "/images/icons/document-icon.png",
      category: "Programming",
      description:
        "Design smarter systems with AI at your side. It helps you plan scalable architectures, generate diagrams, and validate design patterns. Ideal for developers and tech leads who want clarity, efficiency, and confidence in every build.",
      users: "65,887 Users",
      likes: 528,
      unlikes: 14,
      isLiked: false,
      isUnliked: false,
      isInstalled: false,
      link: "/applications/ai-chat/extension-detail?extension=flash",
    },
  ];
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Extensions
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/ai-chat">
              AI Chat
            </Link>
            <Typography variant="body2">Extensions</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid size={{ xs: 12 }}>
          <FormControl variant="filled" size="medium" className="surface mb-0" fullWidth>
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

        <Grid size={{ xs: 12 }} container className="w-full" spacing={2.5}>
          {extensions.map((extension) => {
            return (
              <Grid size={{ lg: 6, xs: 12 }} key={extension.id}>
                <Extension {...extension}></Extension>{" "}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
