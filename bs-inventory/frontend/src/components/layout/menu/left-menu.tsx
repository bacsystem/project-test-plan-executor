"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "use-intl";

import { Box, Paper, Typography } from "@mui/material";

import { useLayoutContext } from "@/components/layout/layout-context";
import { PrimaryItem } from "@/components/layout/menu/primary-item";
import { SecondaryItem } from "@/components/layout/menu/secondary-item";
import { DEFAULTS } from "@/config";
import { getThemeImage } from "@/lib/image-helper";
import { cn, isPathMatch } from "@/lib/utils";
import { leftMenuBottomItems, leftMenuItems } from "@/menu-items";
import { useThemeContext } from "@/theme/theme-provider";
import { MenuItem, MenuShowState, MenuType } from "@/types";

export type OpenedAccordion = { indent: number; id: string };

export default function LeftMenu() {
  const { theme, isDarkMode } = useThemeContext();
  const t = useTranslations("dashboard");
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const {
    leftMenuType,
    leftMenuWidth,
    leftPrimaryCurrent,
    leftSecondaryCurrent,
    showLeftSecondary,
    hideLeftSecondary,
    hideLeft,
    resetLeftMenu,
    onResetLeft,
    leftShowBackdrop,
    setLeftShowBackdrop,
    showLeftMobileButton,
    temporaryShowPrimaryMenu,
    setTemporaryShowPrimaryMenu,
    menuSelectedSecondaryItem,
    setMenuSelectedSecondaryItem,
  } = useLayoutContext();

  const selectedPrimary = useRef<undefined | MenuItem>(undefined);
  const [activeItem, setActiveItem] = useState<MenuItem | undefined>(undefined);
  const [openedAccordions, setOpenedAccordions] = useState<OpenedAccordion[]>([]);

  const updateSelectedSecondaryItem = useCallback(() => {
    if (!activeItem?.children) {
      setMenuSelectedSecondaryItem(undefined);
      return;
    }

    const findSelectedItem = (items: MenuItem[]): MenuItem | undefined => {
      for (const item of items) {
        if (item.href && isPathMatch(pathname, item.href)) {
          return item;
        }
        if (item.children) {
          const found = findSelectedItem(item.children);
          if (found) return found;
        }
      }
      return undefined;
    };

    setMenuSelectedSecondaryItem(findSelectedItem(activeItem.children));
  }, [activeItem, pathname, setMenuSelectedSecondaryItem]);

  useEffect(() => {
    let selectedMenu = leftMenuItems.find((item) => item.href && isPathMatch(pathname, item.href));
    if (!selectedMenu && leftMenuBottomItems) {
      selectedMenu = leftMenuBottomItems.find((item) => item.href && isPathMatch(pathname, item.href));
    }
    selectedPrimary.current = selectedMenu;

    setActiveItem(selectedMenu);
    if (temporaryShowPrimaryMenu) {
      setTemporaryShowPrimaryMenu(false);
    }
    resetLeftMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (selectedPrimary.current?.id !== activeItem?.id && !leftShowBackdrop) {
      setLeftShowBackdrop(true);
    }
  }, [activeItem?.id, selectedPrimary.current?.id, setLeftShowBackdrop, leftShowBackdrop]);

  useEffect(() => {
    const resetCallback = () => {
      if (selectedPrimary.current) {
        setActiveItem(selectedPrimary.current);
        if (
          !selectedPrimary.current.children ||
          !selectedPrimary.current.children.filter((x) => !x.hideInMenu).length
        ) {
          hideLeftSecondary();
        }
        updateSelectedSecondaryItem();
      }
    };

    onResetLeft(resetCallback);

    return () => {
      onResetLeft(() => {});
    };
  }, [onResetLeft, hideLeftSecondary, updateSelectedSecondaryItem, menuSelectedSecondaryItem]);

  const handleSelectPrimaryItem = (item: MenuItem) => {
    if (!temporaryShowPrimaryMenu && leftMenuType !== MenuType.SingleLayer) {
      setTemporaryShowPrimaryMenu(true);
    }
    setMenuSelectedSecondaryItem(undefined);

    if (item.content) {
      // Primary item has a custom menu and it has children. Show the menu content as temporary and don't navigate to the route.
      // Accordion state is now managed by PrimaryItem component
      showLeftSecondary();
      setActiveItem(item);
    } else if (item.children && item.children.filter((x) => !x.hideInMenu).length > 0) {
      // Primary item is a default menu item with children. Show the sub menu without navigating.
      showLeftSecondary();
      setActiveItem(item);
    } else {
      if (isPathMatch(pathname, item.href || "")) {
        // Primary item is link without children or a content. The route is the same so don't do anything.
        hideLeftSecondary();
        resetLeftMenu();
        setActiveItem(item);
      } else {
        // Primary item is link without children or a content. Navigate to the route.
        setOpenedAccordions((prev) => prev.filter((a) => a.indent !== 0));
        router.push(item.href ?? "");
      }
    }
  };

  useEffect(() => {
    if (!activeItem) {
      if (showLeftMobileButton) {
        hideLeftSecondary();
      } else {
        hideLeft();
      }
    }
  }, [hideLeft, activeItem, showLeftMobileButton, hideLeftSecondary]);

  useEffect(() => {
    if (!activeItem?.children && leftSecondaryCurrent === MenuShowState.Hide) {
      hideLeftSecondary();
    }
  }, [activeItem, hideLeftSecondary, leftSecondaryCurrent]);

  const rocketImage = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["blue-light-rocket.png", "blue-dark-rocket.png"],
        "theme-green": ["green-light-rocket.png", "green-dark-rocket.png"],
        "theme-orange": ["orange-light-rocket.png", "orange-dark-rocket.png"],
        "theme-purple": ["purple-light-rocket.png", "purple-dark-rocket.png"],
      },
      directory: "/images/three-d-icons/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);

  const leftPrimaryDefaultWidth = useMemo(() => DEFAULTS.leftMenuWidth[leftMenuType].primary, [leftMenuType]);
  const leftSecondaryDefaultWidth = useMemo(() => DEFAULTS.leftMenuWidth[leftMenuType].secondary, [leftMenuType]);

  useEffect(() => {
    updateSelectedSecondaryItem();
  }, [updateSelectedSecondaryItem]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <nav className="flex flex-row">
      <Box
        className="relative flex shrink-0 grow-0 flex-col items-center overflow-x-hidden transition-all duration-(--layout-duration)"
        style={{
          ...(leftPrimaryCurrent !== MenuShowState.Hide && leftMenuWidth.primary > 0
            ? { padding: `0 var(--main-padding)`, width: `calc(${leftMenuWidth.primary}px + (var(--main-padding)*2))` }
            : { width: "0px" }),
        }}
      >
        <Box
          className={cn(
            leftMenuType === MenuType.SingleLayer &&
              leftPrimaryCurrent !== MenuShowState.Hide &&
              leftMenuWidth.primary > 0 &&
              "",
            "absolute flex h-full min-h-full shrink-0 grow-0 flex-col items-center gap-0.5",
            leftMenuType === MenuType.Minimal &&
              leftPrimaryCurrent !== MenuShowState.Hide &&
              leftMenuWidth.primary > 0 &&
              "",
            leftMenuType === MenuType.Comfort &&
              leftPrimaryCurrent !== MenuShowState.Hide &&
              leftMenuWidth.primary > 0 &&
              "",
          )}
          style={{
            ...(leftPrimaryCurrent !== MenuShowState.Hide && leftMenuWidth.primary > 0
              ? { width: `${leftMenuWidth.primary}px` }
              : { width: "0px" }),
          }}
        >
          {!temporaryShowPrimaryMenu &&
          leftMenuType === MenuType.SingleLayer &&
          (activeItem?.content || menuSelectedSecondaryItem?.content) ? (
            <Box className="flex w-full flex-1 flex-col">
              {(activeItem?.content || menuSelectedSecondaryItem?.content) &&
                (activeItem?.content || menuSelectedSecondaryItem?.content)}
            </Box>
          ) : (
            <>
              <Box
                style={{ width: leftPrimaryDefaultWidth }}
                className={cn(
                  "flex w-full flex-1 flex-col",
                  leftMenuType === MenuType.SingleLayer && "gap-1",
                  leftMenuType === MenuType.Minimal && "gap-2",
                  leftMenuType === MenuType.Comfort && "gap-4",
                )}
              >
                {leftMenuItems
                  .filter((x) => !x.hideInMenu)
                  .map((item) =>
                    leftMenuType === MenuType.SingleLayer ? (
                      <SecondaryItem
                        className={cn(leftShowBackdrop && "z-20")}
                        item={item}
                        key={`left-menu-primary-item-${leftMenuType}-${item.id}`}
                        indent={0}
                        openedAccordions={openedAccordions}
                        setOpenedAccordions={setOpenedAccordions}
                        onSelect={(item) => {
                          if (temporaryShowPrimaryMenu) {
                            setTemporaryShowPrimaryMenu(false);
                          }
                          handleSelectPrimaryItem(item);
                          setActiveItem(item);
                        }}
                      />
                    ) : (
                      <PrimaryItem
                        className={cn(leftShowBackdrop && "z-20")}
                        item={item}
                        key={`left-menu-primary-item-${leftMenuType}-${item.id}`}
                        onSelect={(item) => handleSelectPrimaryItem(item)}
                        isActive={activeItem?.id === item.id}
                        menuType={leftMenuType}
                      />
                    ),
                  )}
              </Box>
              <Box
                className={cn(
                  "flex w-full flex-col",
                  leftMenuType === MenuType.SingleLayer && "gap-1",
                  leftMenuType === MenuType.Minimal && "gap-2",
                  leftMenuType === MenuType.Comfort && "gap-4",
                )}
              >
                {leftMenuBottomItems
                  .filter((x) => !x.hideInMenu)
                  .map((item) =>
                    leftMenuType === MenuType.SingleLayer ? (
                      <SecondaryItem
                        className={cn(leftShowBackdrop && "z-20")}
                        item={item}
                        key={`left-menu-bottom-item-${leftMenuType}-${item.id}`}
                        indent={0}
                        openedAccordions={openedAccordions}
                        setOpenedAccordions={setOpenedAccordions}
                        onSelect={(item) => handleSelectPrimaryItem(item)}
                      />
                    ) : (
                      <PrimaryItem
                        className={cn(leftShowBackdrop && "z-20")}
                        item={item}
                        key={`left-menu-bottom-item-${leftMenuType}-${item.id}`}
                        onSelect={(item) => handleSelectPrimaryItem(item)}
                        isActive={activeItem?.id === item.id}
                        menuType={leftMenuType}
                      />
                    ),
                  )}
              </Box>
            </>
          )}
        </Box>
      </Box>
      {(leftMenuType === MenuType.Comfort || leftMenuType === MenuType.Minimal) && (
        <Box
          className={cn(
            "ltr:shadow-line-left rtl:shadow-line-right flex h-full shrink-0 grow-0 overflow-x-hidden transition-all duration-(--layout-duration)",
            leftShowBackdrop && "z-20",
          )}
          style={{
            width:
              ((activeItem?.children && activeItem?.children.filter((x) => !x.hideInMenu).length > 0) ||
                activeItem?.content) &&
              leftSecondaryCurrent !== MenuShowState.Hide &&
              leftMenuWidth.secondary > 0
                ? `calc(${leftMenuWidth.secondary}px`
                : 0,
          }}
        >
          <Box className="h-full w-full pe-(--main-padding)">
            <Paper
              elevation={3}
              className="bg-foreground outline-line h-full w-full rounded-4xl py-6 outline -outline-offset-1 backdrop-blur-sm"
            >
              <Box className="relative h-full w-full overflow-x-hidden">
                <Box
                  style={{ width: `calc(calc(${leftSecondaryDefaultWidth}px - var(--main-padding))` }}
                  className={cn("absolute h-full gap-2 overflow-y-scroll pt-2")}
                >
                  <Box className="flex h-full min-h-full flex-col gap-2 px-5.5">
                    {!activeItem?.content && !menuSelectedSecondaryItem?.content && (
                      <>
                        {activeItem?.label && (
                          <Typography variant="h6" className={"text-primary mb-4 px-2.5"}>
                            {t(activeItem?.label)}
                          </Typography>
                        )}
                        <Box className="flex h-full w-full flex-1 flex-col justify-between gap-2">
                          <>
                            <Box className="flex w-full flex-1 flex-col gap-1">
                              {activeItem?.children &&
                                activeItem?.children?.filter((x) => !x.hideInMenu).length > 0 &&
                                activeItem?.children
                                  ?.filter((x) => !x.hideInMenu)
                                  .map((item) => (
                                    <SecondaryItem
                                      item={item}
                                      key={`left-menu-secondary-item-${leftMenuType}-${activeItem.id}-${item.id}`}
                                      indent={0}
                                      openedAccordions={openedAccordions}
                                      setOpenedAccordions={setOpenedAccordions}
                                      onSelect={(item) => {
                                        setMenuSelectedSecondaryItem(item);
                                      }}
                                    />
                                  ))}
                            </Box>

                            <Box
                              component="a"
                              href="#"
                              className="group flex w-full cursor-pointer flex-col items-center justify-center gap-2"
                            >
                              {rocketImage && (
                                <img
                                  width={120}
                                  height={120}
                                  alt="Theme rocket"
                                  className="group-hover:animate-float h-30 w-30 bg-cover bg-center"
                                  src={rocketImage}
                                />
                              )}
                              <Typography variant="body1" className="px-4 text-center">
                                {t("menu-cta-copy")}
                              </Typography>
                              <Box className="group-hover:bg-primary/10 text-primary rounded-md px-5 py-2 font-medium transition-colors">
                                {t("menu-cta-button")}
                              </Box>
                            </Box>
                          </>
                        </Box>
                      </>
                    )}
                    {(activeItem?.content || menuSelectedSecondaryItem?.content) &&
                      (activeItem?.content || menuSelectedSecondaryItem?.content)}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      )}
    </nav>
  );
}
