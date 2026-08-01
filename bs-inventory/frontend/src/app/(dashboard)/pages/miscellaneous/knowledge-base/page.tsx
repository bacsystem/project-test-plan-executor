"use client";

import KnowledgeBaseActions from "./sections/knowledge-base-actions";
import KnowledgeBaseReference from "./sections/knowledge-base-reference";
import KnowledgeBaseTips from "./sections/knowledge-base-tips";
import KnowledgeBaseTutorials from "./sections/knowledge-base-tutorials";
import KnowledgeBaseVideo from "./sections/knowledge-base-video";
import Link from "next/link";
import React from "react";

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

export default function Page() {
  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid size={{ md: "grow", xs: 12 }}>
        <Typography variant="h1" component="h1" className="mb-0">
          Knowledge Base
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/pages">
            Pages
          </Link>
          <Link color="inherit" href="/pages/miscellaneous">
            Miscellaneous
          </Link>
          <Typography variant="body2">Knowledge Base</Typography>
        </Breadcrumbs>
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

        <Grid container size={12}>
          <Grid size={{ lg: 4, xs: 12 }} container spacing={2.5}>
            <KnowledgeBaseActions />
          </Grid>
          <Grid size={{ lg: 8, xs: 12 }}>
            <KnowledgeBaseVideo />
          </Grid>

          <Grid size={12}>
            <KnowledgeBaseReference />
          </Grid>

          <Grid size={{ lg: 6, xs: 12 }}>
            <KnowledgeBaseTutorials />
          </Grid>
          <Grid size={{ lg: 6, xs: 12 }}>
            <KnowledgeBaseTips />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
