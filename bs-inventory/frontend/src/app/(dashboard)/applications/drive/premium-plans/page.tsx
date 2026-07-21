"use client";

import PremiumPlansFaq from "./components/premium-plans-faq";
import PremiumPlansPricing from "./components/premium-plans-pricing";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

import { Box, Breadcrumbs, Button, Fade, Grid, Menu, MenuItem, PopoverVirtualElement, Typography } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function Page() {
  // Payment period select dropdown
  const [paymentPeriodAnchorEl, setPaymentPeriodAnchorEl] = useState<
    EventTarget | Element | PopoverVirtualElement | null
  >(null);
  const versionSelectOpen = Boolean(paymentPeriodAnchorEl);
  const handlePaymentPeriodClick = (event: Event | SyntheticEvent) => {
    setPaymentPeriodAnchorEl(event.currentTarget);
  };
  const versionSelectHandleClose = () => {
    setPaymentPeriodAnchorEl(null);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Box className="flex flex-row gap-2">
            <Typography variant="h1" component="h1" className="mb-0">
              Premium Plans
            </Typography>
            <Button
              variant="outlined"
              size="tiny"
              color="grey"
              onClick={handlePaymentPeriodClick}
              endIcon={
                <NiChevronRightSmall
                  size="small"
                  className={cn(
                    "-ms-1 transition-transform rtl:rotate-180",
                    versionSelectOpen && "rotate-90 rtl:rotate-90",
                  )}
                />
              }
            >
              <Box className="w-full truncate text-clip">Yearly (20% Off)</Box>
            </Button>
            <Menu
              anchorEl={paymentPeriodAnchorEl as Element}
              open={versionSelectOpen}
              onClose={versionSelectHandleClose}
              className="mt-1"
              slots={{
                transition: Fade,
              }}
            >
              <MenuItem onClick={versionSelectHandleClose} selected>
                Yearly (20% Off)
              </MenuItem>
              <MenuItem onClick={versionSelectHandleClose}>Monthly</MenuItem>
            </Menu>
          </Box>
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
            <Typography variant="body2">Premium Plans</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      {/* Plans */}
      <PremiumPlansPricing />

      {/* Faq */}
      <PremiumPlansFaq />
    </Grid>
  );
}
