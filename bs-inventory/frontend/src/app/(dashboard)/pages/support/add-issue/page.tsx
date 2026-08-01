"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

import {
  Box,
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
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import { cn } from "@/lib/utils";

const AddIssueFormDynamic = dynamic(() => import("./sections/add-issue-form"), { ssr: false });

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
            Add Issue
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
            <Typography variant="body2">Add Issue</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tooltip title="Actions">
            <Button className="icon-only surface-standard" color="grey" variant="surface">
              <NiEllipsisHorizontal size={"medium"} />
            </Button>
          </Tooltip>

          <ButtonGroup size="medium" variant="surface" color="grey" className="surface-standard">
            <Button variant="surface" className="surface-standard" startIcon={<NiSendUpRight size={"medium"} />}>
              Publish
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
            <MenuItem>Save</MenuItem>
            <MenuItem>Draft</MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Grid container size={12}>
        <Grid size={12}>
          <AddIssueFormDynamic />
          <Box className="flex flex-row gap-2">
            <ButtonGroup size="medium" variant="surface" color="grey" className="surface-standard">
              <Button variant="surface" className="surface-standard" startIcon={<NiSendUpRight size={"medium"} />}>
                Publish
              </Button>
              <Button className="icon-only surface-standard" variant="surface">
                <NiChevronRightSmall
                  size={"medium"}
                  className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
                />
              </Button>
            </ButtonGroup>
            <Tooltip title="Save">
              <Button className="icon-only surface-standard" color="grey" variant="surface">
                <NiFloppyDisk size={"medium"} />
              </Button>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
