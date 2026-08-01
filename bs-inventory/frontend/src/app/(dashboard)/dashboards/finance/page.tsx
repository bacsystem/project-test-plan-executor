"use client";

import DashboardFinanceAccounts from "./sections/dashboard-finance-accounts";
import DashboardFinanceActions from "./sections/dashboard-finance-actions";
import DashboardFinanceBalanceChanges from "./sections/dashboard-finance-balance-changes";
import DashboardFinanceTotalBalance from "./sections/dashboard-finance-total-balance";
import DashboardFinanceTransactions from "./sections/dashboard-finance-transactions";
import DashboardFinanceTransfer from "./sections/dashboard-finance-transfer";
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
            <Typography variant="body2">Finance</Typography>
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
              href="/dashboards/finance/finance-titles-inside"
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

      <Grid container size={12} className="items-start">
        <Grid size={{ lg: 8, xs: 12 }} container>
          <Grid size={12}>
            <DashboardFinanceBalanceChanges />
          </Grid>
          <Grid size={12}>
            <DashboardFinanceAccounts />
          </Grid>
          <Grid size={12}>
            <DashboardFinanceTransactions />
          </Grid>
        </Grid>

        <Grid container size={{ lg: 4, xs: 12 }}>
          <Grid size={12}>
            <DashboardFinanceTotalBalance />
          </Grid>
          <Grid size={12}>
            <DashboardFinanceTransfer />
          </Grid>
          <Grid size={12}>
            <DashboardFinanceActions />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
