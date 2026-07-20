"use client";
import { useLayoutContext } from "../layout-context";
import { PrimaryItem } from "./primary-item";
import { BackgroundContent } from "./right-menu-contents/background";
import { ThemeContent } from "./right-menu-contents/theme";
import { usePathname } from "next/navigation";
import router from "next/router";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { Box, Paper, Typography } from "@mui/material";

import { DEFAULTS } from "@/config";
import { cn, isPathMatch } from "@/lib/utils";
import { MenuItem, MenuShowState, MenuType } from "@/types";

const menuItems: MenuItem[] = [
  {
    id: "theme-customization",
    label: "menu-theme-customization",
    icon: "NiPalette",
    content: <ThemeContent />,
    color: "accent-1",
  },
  {
    id: "background-customization",
    label: "menu-background-customization",
    icon: "NiPaintRoller",
    content: <BackgroundContent />,
    color: "accent-2",
  },
];

export default function RightMenu() {
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const {
    rightMenuType,
    rightMenuWidth,
    rightPrimaryCurrent,
    rightSecondaryCurrent,
    showRightSecondary,
    hideRightSecondary,
    hideRight,
    showRightMobileButton,
    resetRightMenu,
    onResetRight,
    rightShowBackdrop,
    setRightShowBackdrop,
  } = useLayoutContext();
  const selectedPrimary = useRef<undefined | MenuItem>(undefined);
  const [activeItem, setActiveItem] = useState<MenuItem | undefined>(undefined);

  useEffect(() => {
    if (selectedPrimary.current?.id !== activeItem?.id && !rightShowBackdrop) {
      setRightShowBackdrop(true);
    }
  }, [activeItem?.id, selectedPrimary.current?.id, setRightShowBackdrop, rightShowBackdrop]);

  useEffect(() => {
    const resetCallback = () => {
      if (selectedPrimary.current) {
        setActiveItem(undefined);
        hideRightSecondary();
      }
    };

    onResetRight(resetCallback);
    return () => {};
  }, [hideRightSecondary, onResetRight]);

  const handleSelectPrimaryItem = (item: MenuItem) => {
    if (item.id === activeItem?.id) {
      setActiveItem(undefined);
    } else {
      if (item.content) {
        setActiveItem(item);
        showRightSecondary();
      } else {
        if (isPathMatch(pathname, item.href || "")) {
          hideRightSecondary();
          resetRightMenu();
        } else {
          router.push(item.href ?? "");
        }
      }
    }
  };

  useEffect(() => {
    if (!activeItem) {
      if (showRightMobileButton) {
        hideRightSecondary();
      } else {
        hideRight();
      }
    }
    selectedPrimary.current = activeItem;
  }, [hideRight, activeItem, showRightMobileButton, hideRightSecondary]);

  useEffect(() => {
    if (activeItem?.content) {
      showRightSecondary();
    } else {
      hideRightSecondary();
    }
  }, [activeItem, showRightSecondary, hideRightSecondary]);

  const rightPrimaryDefaultWidth = DEFAULTS.rightMenuWidth[rightMenuType].primary;
  const rightSecondaryDefaultWidth = DEFAULTS.rightMenuWidth[rightMenuType].secondary;

  return (
    <nav className={cn("flex flex-row")}>
      <Box
        className={cn(
          "relative flex shrink-0 grow-0 flex-col overflow-x-hidden transition-all duration-(--layout-duration)",
          rightShowBackdrop && "z-20",
        )}
        style={{
          width:
            activeItem?.content && rightSecondaryCurrent !== MenuShowState.Hide && rightMenuWidth.secondary > 0
              ? `calc(${rightMenuWidth.secondary}px + var(--main-padding))`
              : 0,
        }}
      >
        <Box className="h-full w-full ps-(--main-padding)">
          <Paper
            elevation={3}
            className="bg-foreground outline-line h-full w-full rounded-4xl py-8 outline -outline-offset-1 backdrop-blur-sm"
          >
            <Box className="relative h-full w-full overflow-x-hidden">
              <Box
                style={{ width: rightSecondaryDefaultWidth }}
                className={cn("absolute flex h-full min-h-full flex-col gap-2 overflow-y-scroll ps-3 pe-2")}
              >
                <Box className={cn("flex min-h-full flex-col")}>
                  {activeItem?.label && (
                    <Typography variant="h6" className={"text-primary mb-4 px-5"}>
                      {t(activeItem?.label)}
                    </Typography>
                  )}
                  <Box className="flex h-full w-full flex-1 flex-col justify-between gap-2">
                    {activeItem?.content && activeItem?.content}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>

      <Box
        className={cn(
          "relative shrink-0 grow-0 flex-col items-center gap-2 overflow-x-hidden transition-all duration-(--layout-duration)",
        )}
        style={{
          width:
            rightPrimaryCurrent !== MenuShowState.Hide && rightMenuWidth.primary > 0
              ? `calc(${rightMenuWidth.primary}px + (var(--main-padding)*2))`
              : "0px",
          ...(rightPrimaryCurrent !== MenuShowState.Hide &&
            rightMenuWidth.primary > 0 && { padding: `0 var(--main-padding)` }),
        }}
      >
        <Box className="absolute flex h-full shrink-0 grow-0 flex-col" style={{ width: rightPrimaryDefaultWidth }}>
          <Box className={cn("flex flex-1 flex-col gap-2", rightMenuType === MenuType.Comfort && "gap-4")}>
            {menuItems.map((item) => (
              <PrimaryItem
                className={cn(rightShowBackdrop && "z-20")}
                item={item}
                key={`right-menu-primary-item-${rightMenuType}-${item.id}`}
                onSelect={(item) => handleSelectPrimaryItem(item)}
                isActive={activeItem?.id === item.id}
                menuType={rightMenuType}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </nav>
  );
}
