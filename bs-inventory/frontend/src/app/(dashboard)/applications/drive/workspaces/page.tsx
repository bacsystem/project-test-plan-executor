"use client";

import Workspace from "./components/workspace";
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

export type FileType = {
  id: string;
  name: string;
  background: string;
  border: string;
};

export type WorkspaceData = {
  id: string;
  name: string;
  icon: string;
  ownership: "Owner" | "Editor" | "Viewer";
  users: string;
  description: string;
  link: string;
  fileTypes: FileType[];
};

export default function Page() {
  const workspaces: WorkspaceData[] = [
    {
      id: crypto.randomUUID(),
      name: "Project Apollo",
      icon: "/images/icons/gavel-icon.png",
      ownership: "Owner",
      description:
        "This folder supports the full lifecycle of a new product launch—from ideation to public release. It's designed to centralize all strategic planning, creative development, and marketing execution.",
      users: "5 Users",
      fileTypes: [
        { id: crypto.randomUUID(), name: "Photos", background: "bg-primary-light/10", border: "border-primary" },
        { id: crypto.randomUUID(), name: "Videos", background: "bg-secondary-light/10", border: "border-secondary" },
      ],
      link: "#",
    },
    {
      id: crypto.randomUUID(),
      name: "Project Helix",
      icon: "/images/icons/diagram-icon.png",
      ownership: "Owner",
      description:
        "A research-driven initiative focused on developing and testing AI models. This folder is used by data scientists, engineers, and product strategists to experiment with machine learning workflows and share insights.",
      users: "8 Users",
      fileTypes: [
        { id: crypto.randomUUID(), name: "Documents", background: "bg-accent-1-light/10", border: "border-accent-1" },
      ],
      link: "#",
    },
    {
      id: crypto.randomUUID(),
      name: "Project Nimbus",
      icon: "/images/icons/lightning-icon.png",
      ownership: "Owner",
      description:
        "This one supports the redesign of an e-commerce platform, with a focus on improving user experience, accessibility, and performance. It’s used by design, engineering, and QA teams to coordinate efforts across research, and testing.",
      users: "12 Users",
      fileTypes: [
        { id: crypto.randomUUID(), name: "Photos", background: "bg-primary-light/10", border: "border-primary" },
        { id: crypto.randomUUID(), name: "Documents", background: "bg-accent-1-light/10", border: "border-accent-1" },
      ],
      link: "#",
    },
    {
      id: crypto.randomUUID(),
      name: "Project Vital",
      icon: "/images/icons/flask-icon.png",
      ownership: "Editor",
      description:
        "A localization and compliance project for healthcare software being adapted for international markets. This folder ensures that translations meet regulatory standards and cultural expectations.",
      users: "18 Users",
      fileTypes: [
        { id: crypto.randomUUID(), name: "Documents", background: "bg-accent-1-light/10", border: "border-accent-1" },
      ],
      link: "#",
    },
  ];
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Workspaces
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/drive">
              Drive
            </Link>
            <Typography variant="body2">Workspaces</Typography>
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
          {workspaces.map((workspace) => {
            return (
              <Grid size={{ lg: 6, xs: 12 }} key={workspace.id}>
                <Workspace {...workspace}></Workspace>{" "}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
