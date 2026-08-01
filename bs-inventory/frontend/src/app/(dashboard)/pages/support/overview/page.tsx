"use client";

import SupportOverviewCategories from "./sections/support-overview-categories";
import SupportOverviewIssueChart from "./sections/support-overview-issue-chart";
import SupportOverviewRecentIssues from "./sections/support-overview-recent-issues";
import SupportOverviewSearch from "./sections/support-overview-search";
import SupportOverviewStats from "./sections/support-overview-stats";
import SupportOverviewTopClosers from "./sections/support-overview-top-closers";
import SupportOverviewTopOpeners from "./sections/support-overview-top-openers";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { Box, Breadcrumbs, Button, Card, Drawer, Grid, Tooltip, Typography } from "@mui/material";

import NiListCircle from "@/icons/nexture/ni-list-circle";
import NiPlus from "@/icons/nexture/ni-plus";

export default function Page() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Support Center
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/pages">
              Pages
            </Link>
            <Link color="inherit" href="/pages/support">
              Support
            </Link>
            <Typography variant="body2">Support Center</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Button
            className="surface-standard"
            size="medium"
            color="grey"
            variant="surface"
            startIcon={<NiPlus size={"medium"} />}
            onClick={() => {
              router.push("/pages/support/add-issue");
            }}
          >
            Add Issue
          </Button>
          <Tooltip title="Table of Contents" className="lg:hidden">
            <Button className="icon-only surface-standard" color="grey" variant="surface" onClick={toggleDrawer(true)}>
              <NiListCircle size={"medium"} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid container size={{ lg: 8, xs: 12 }}>
          <Grid size={12}>
            <SupportOverviewSearch />
          </Grid>
          <Grid size={12}>
            <SupportOverviewStats />
          </Grid>
          <Grid size={12}>
            <SupportOverviewIssueChart />
          </Grid>
          <Grid size={12}>
            <SupportOverviewRecentIssues />
          </Grid>
          <Grid size={{ "2xl": 6, xs: 12 }}>
            <SupportOverviewTopOpeners />
          </Grid>
          <Grid size={{ "2xl": 6, xs: 12 }}>
            <SupportOverviewTopClosers />
          </Grid>
        </Grid>
        <Grid size={{ lg: 4, xs: 12 }} className="hidden lg:flex">
          <Card className="w-full">
            <SupportOverviewCategories />
          </Card>
        </Grid>
      </Grid>

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={toggleDrawer(false)}
        slotProps={{ paper: { className: "MuiDrawer-paperAnchorRight" } }}
      >
        <Box className="min-w-80 p-5">
          <SupportOverviewCategories />
        </Box>
      </Drawer>
    </Grid>
  );
}
