"use client";

import DashboardLearningContinue from "./sections/dashboard-learning-continue";
import DashboardLearningCourses from "./sections/dashboard-learning-courses";
import DashboardLearningLevels from "./sections/dashboard-learning-levels";
import DashboardLearningRecommended from "./sections/dashboard-learning-recommended";
import DashboardLearningSchedule from "./sections/dashboard-learning-schedule";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

import { Breadcrumbs, Button, Menu, MenuItem, PopoverVirtualElement, Tooltip, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiArrowHistory from "@/icons/nexture/ni-arrow-history";
import NiEnterDown from "@/icons/nexture/ni-enter-down";

export default function Page() {
  const [anchorElCalendarMenu, setAnchorElCalendarMenu] = useState<
    EventTarget | Element | PopoverVirtualElement | null
  >(null);
  const open = Boolean(anchorElCalendarMenu);
  const handleClickCalendarMenu = (event: Event | SyntheticEvent) => {
    setAnchorElCalendarMenu(event.currentTarget);
  };
  const handleCloseCalendarMenu = () => {
    setAnchorElCalendarMenu(null);
  };

  const calendarTermOptions = ["This Week", "Last Week", "Last 7 Days", "Current Month", "Last Month", "Custom"];
  const [selectedCalendarTerm, setSelectedCalendarTerm] = useState("This Week");
  const handleCalendarTermOptionClick = (option: string) => {
    setSelectedCalendarTerm(option);
    handleCloseCalendarMenu();
  };

  return (
    <Grid container spacing={5}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Welcome Laura!
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/dashboards">
              Dashboards
            </Link>
            <Typography variant="body2">Learning</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tooltip title="View the Alternative">
            <Button
              className="surface-standard flex-none"
              size="medium"
              color="grey"
              variant="surface"
              component={Link}
              href="/dashboards/learning/learning-titles-inside"
              startIcon={<NiEnterDown size={"medium"} />}
            >
              Titles Inside
            </Button>
          </Tooltip>
          <Tooltip title="Term">
            <Button
              className="icon-only surface-standard flex-none"
              color="grey"
              size="medium"
              variant="surface"
              onClick={handleClickCalendarMenu}
            >
              <NiArrowHistory size={"medium"} />
            </Button>
          </Tooltip>
          <Menu
            anchorEl={anchorElCalendarMenu as Element}
            open={open}
            onClose={handleCloseCalendarMenu}
            className="mt-1"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {calendarTermOptions.map((option, index) => {
              return (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleCalendarTermOptionClick(option);
                  }}
                  selected={option === selectedCalendarTerm}
                >
                  {option}
                </MenuItem>
              );
            })}
          </Menu>
        </Grid>
      </Grid>

      <Grid size={12} container>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardLearningContinue />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardLearningRecommended />
        </Grid>

        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardLearningSchedule />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardLearningLevels />
        </Grid>

        <Grid size={{ lg: 12, xs: 12 }}>
          <DashboardLearningCourses />
        </Grid>
      </Grid>
    </Grid>
  );
}
