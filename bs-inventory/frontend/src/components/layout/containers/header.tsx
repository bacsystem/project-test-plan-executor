"use client";
import Mode from "../mode/mode";
import Notifications from "../notifications/notifications";
import Search from "../search/search";
import AccountSwitch from "../user/account-switch";
import User from "../user/user";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import Logo from "@/components/logo/logo";
import { DEFAULTS } from "@/config";
import { MIN_LOGO_CONTAINER_WIDTH } from "@/constants";
import NiMenuSplit from "@/icons/nexture/ni-menu-split";
import NiMenuSplitReverse from "@/icons/nexture/ni-menu-split-reverse";
import { cn } from "@/lib/utils";

export default function Header() {
  const {
    showLeftInMobile,
    showLeftMobileButton,
    showRightInMobile,
    showRightMobileButton,
    leftMenuWidth,
    rightMenuWidth,
  } = useLayoutContext();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Box
        component="header"
        className="flex h-14 flex-none flex-row items-center sm:h-16"
        style={{ padding: `0 var(--main-padding)` }}
      >
        <Box className="flex h-full flex-row items-center">
          <Link href="/dashboards/default">
            <Logo classNameFull="ms-2 hidden md:block" classNameMobile="ms-2 md:hidden" />
          </Link>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="header"
      className="flex h-14 flex-none flex-row items-center sm:h-16"
      style={{ padding: `0 var(--main-padding)` }}
    >
      {/* Left menu button and logo */}
      <Button
        variant="surface"
        size="large"
        color="text-primary"
        className={cn(
          "icon-only hover-icon-shrink [&.active]:text-primary",
          showLeftMobileButton ? "flex" : "hidden",
          leftMenuWidth.primary > 0 && "active",
        )}
        onClick={() => showLeftInMobile()}
        startIcon={<NiMenuSplit size={24} />}
      />
      <Box
        className="flex h-full flex-row items-center"
        style={{
          ...(!showLeftMobileButton && {
            width: `calc(${Math.max(leftMenuWidth.primary + leftMenuWidth.secondary + 16, MIN_LOGO_CONTAINER_WIDTH)}px `,
          }),
        }}
      >
        <Link href={DEFAULTS.appRoot}>
          <Logo classNameFull="ms-2 hidden md:block" classNameMobile="ms-2 md:hidden" />
        </Link>
      </Box>

      {/* Account Switch */}
      <Box className="flex h-full grow items-center justify-end 2xl:justify-start">
        <AccountSwitch />
      </Box>

      {/* Right buttons */}
      <Box className="flex flex-row sm:gap-1">
        <Search />
        <Notifications />
        <Mode />
      </Box>

      {/* User Avatar and Menu */}
      <User />

      {/* Right menu button */}
      {!DEFAULTS.rightMenuAlwaysHidden && (
        <Button
          variant="surface"
          size="large"
          color="text-primary"
          className={cn(
            "icon-only hover-icon-shrink [&.active]:text-primary ms-1.5",
            showRightMobileButton ? "flex" : "hidden",
            rightMenuWidth.primary > 0 && "active",
          )}
          onClick={() => showRightInMobile()}
          startIcon={<NiMenuSplitReverse size={24} />}
        />
      )}
    </Box>
  );
}
