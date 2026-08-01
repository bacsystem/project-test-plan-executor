"use client";

import IssueDetailActivity from "./sections/issue-detail-activity";
import IssueDetailContentAddComment from "./sections/issue-detail-content-add-comment";
import IssueDetailContentComments from "./sections/issue-detail-content-comments";
import IssueDetailContentMain from "./sections/issue-detail-content-main";
import IssueDetailParticipants from "./sections/issue-detail-participants";
import IssueDetailSummary from "./sections/issue-detail-summary";
import Link from "next/link";
import React from "react";

import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Fade,
  Grid,
  Menu,
  MenuItem,
  PopoverVirtualElement,
  Tooltip,
  Typography,
} from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import { cn } from "@/lib/utils";

export default function Page() {
  const [anchorEl, setAnchorEl] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: Event | React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            API timeout issues during high traffic
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
            <Typography variant="body2">API timeout issues during high traffic</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tooltip title="Actions">
            <Button className="icon-only surface-standard" color="grey" variant="surface">
              <NiEllipsisHorizontal size={"medium"} />
            </Button>
          </Tooltip>

          <ButtonGroup size="medium" variant="surface" color="grey" className="surface-standard">
            <Button variant="surface" className="surface-standard" startIcon={<NiExclamationSquare size={"medium"} />}>
              Open
            </Button>
            <Button className="icon-only surface-standard" variant="surface" onClick={handleClick}>
              <NiChevronRightSmall
                size={"medium"}
                className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
              />
            </Button>
          </ButtonGroup>

          <Menu
            anchorEl={anchorEl as Element}
            open={open}
            onClose={handleClose}
            className="mt-1"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            slots={{
              transition: Fade,
            }}
          >
            <MenuItem>Open</MenuItem>
            <MenuItem>In Progress</MenuItem>
            <MenuItem>Closed</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid size={{ "3xl": 9, xl: 8, xs: 12 }}>
          <IssueDetailContentMain />
          <IssueDetailContentComments />
          <IssueDetailContentAddComment />
        </Grid>

        <Grid size={{ "3xl": 3, xl: 4, xs: 12 }}>
          <IssueDetailSummary />
          <IssueDetailParticipants />
          <IssueDetailActivity />
        </Grid>
      </Grid>
    </Grid>
  );
}
