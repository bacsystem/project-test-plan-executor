"use client";

import OrderDetailActivity from "./sections/order-detail-activity";
import OrderDetailAddresses from "./sections/order-detail-addresses";
import OrderDetailInfo from "./sections/order-detail-info";
import OrderDetailSummary from "./sections/order-detail-summary";
import OrderDetailUserData from "./sections/order-detail-user-data";
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

import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
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
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Order-24560
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/pages">
              Pages
            </Link>
            <Link color="inherit" href="/pages/ecommerce">
              Ecommerce
            </Link>
            <Typography variant="body2">Order-24560</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Tooltip title="Edit">
            <Button className="icon-only surface-standard" color="grey" variant="surface">
              <NiPenSquare size={"medium"} />
            </Button>
          </Tooltip>

          <ButtonGroup size="medium" variant="surface" color="grey" className="surface-standard">
            <Button variant="surface" className="surface-standard" startIcon={<NiCheckSquare size={"medium"} />}>
              Delivered
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
            <MenuItem>Delivered</MenuItem>
            <MenuItem>Pending</MenuItem>
            <MenuItem>Cancelled</MenuItem>
            <MenuItem>Inactive</MenuItem>
            <MenuItem>Out of Stock</MenuItem>
          </Menu>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={{ "3xl": 9, xl: 8, xs: 12 }}>
          <OrderDetailInfo />
          <OrderDetailActivity />
          <OrderDetailUserData />
        </Grid>

        <Grid size={{ "3xl": 3, xl: 4, xs: 12 }}>
          <OrderDetailSummary />
          <OrderDetailAddresses />
        </Grid>
      </Grid>
    </Grid>
  );
}
