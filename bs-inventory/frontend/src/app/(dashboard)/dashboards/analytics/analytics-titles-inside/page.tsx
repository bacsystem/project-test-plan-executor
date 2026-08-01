"use client";

import DashboardAnalyticsAppStatus from "./sections/dashboard-analytics-app-status";
import DashboardAnalyticsCategories from "./sections/dashboard-analytics-categories";
import DashboardAnalyticsCurrencies from "./sections/dashboard-analytics-currencies";
import DashboardAnalyticsDuration from "./sections/dashboard-analytics-duration";
import DashboardAnalyticsOrders from "./sections/dashboard-analytics-orders";
import DashboardAnalyticsOrdersStocks from "./sections/dashboard-analytics-orders-stocks";
import DashboardAnalyticsProgresses from "./sections/dashboard-analytics-progresses";
import DashboardAnalyticsSales from "./sections/dashboard-analytics-sales";
import DashboardAnalyticsStats from "./sections/dashboard-analytics-stats";
import DashboardAnalyticsVisits from "./sections/dashboard-analytics-visits";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

import { Breadcrumbs, Button, Menu, MenuItem, PopoverVirtualElement, Tooltip, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiArrowHistory from "@/icons/nexture/ni-arrow-history";
import NiEnterReverseUp from "@/icons/nexture/ni-enter-reverse-up";

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
            <Typography variant="body2">Analytics</Typography>
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
              href="/dashboards/analytics"
              startIcon={<NiEnterReverseUp size={"medium"} />}
            >
              Titles Outside
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

      <Grid container size={12}>
        <Grid container size={{ lg: 6, xs: 12 }} className="items-start">
          <Grid container size={12} spacing={2.5} className="flex-none">
            <DashboardAnalyticsStats />
          </Grid>
          <Grid size={12}>
            <DashboardAnalyticsSales />
          </Grid>
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardAnalyticsOrders />
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardAnalyticsCurrencies />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardAnalyticsProgresses />
        </Grid>
        <Grid size={{ lg: 3, xs: 12 }}>
          <DashboardAnalyticsCategories />
        </Grid>
        <Grid size={{ lg: 3, xs: 12 }}>
          <DashboardAnalyticsOrdersStocks />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardAnalyticsAppStatus />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardAnalyticsDuration />
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <DashboardAnalyticsVisits />
        </Grid>
      </Grid>
    </Grid>
  );
}
