"use client";

import FaqArticles from "./sections/faq-articles";
import FaqCategories from "./sections/faq-categories";
import FaqContent from "./sections/faq-content";
import Link from "next/link";
import React, { useState } from "react";

import { Box, Breadcrumbs, Button, Card, Drawer, Grid, Tooltip, Typography } from "@mui/material";

import NiListCircle from "@/icons/nexture/ni-list-circle";

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid size={12} container spacing={2.5}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Faq
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
            <Typography variant="body2">Faq</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid size={{ xs: 12, md: "auto" }} className="lg:hidden">
          <Tooltip title="Table of Contents">
            <Button className="icon-only surface-standard" color="grey" variant="surface" onClick={toggleDrawer(true)}>
              <NiListCircle size={"medium"} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid container size={{ lg: 8, xs: 12 }}>
          <Grid size={12}>
            <FaqContent />
          </Grid>
        </Grid>
        <Grid size={{ lg: 4, xs: 12 }}>
          <Card className="mb-5 hidden lg:block">
            <FaqCategories />
          </Card>
          <FaqArticles />
        </Grid>
      </Grid>

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={toggleDrawer(false)}
        slotProps={{ paper: { className: "MuiDrawer-paperAnchorRight" } }}
      >
        <Box className="min-w-80 p-5">
          <FaqCategories />
        </Box>
      </Drawer>
    </Grid>
  );
}
