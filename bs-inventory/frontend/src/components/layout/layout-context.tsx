"use client";
import { createContext, type PropsWithChildren, useContext, useEffect, useState } from "react";

import { DEFAULTS } from "@/config";
import { LOCAL_STORAGE_KEYS } from "@/constants";
import { useMenu } from "@/hooks/use-menu";
import { MenuItem, MenuShowState } from "@/types";

type LayoutContextType = ReturnType<typeof useLayoutContextValue>;

const LayoutContext = createContext<LayoutContextType | null>(null);

function useLayoutContextValue() {
  const [mounted, setMounted] = useState(false);
  const [temporaryShowPrimaryMenu, setTemporaryShowPrimaryMenu] = useState(false);
  const [menuSelectedSecondaryItem, setMenuSelectedSecondaryItem] = useState<MenuItem | undefined>(undefined);
  const [scrollContentRef, setScrollContentRef] = useState<HTMLDivElement | null>();

  const leftMenu = useMenu({
    primaryBreakpoint: "md",
    secondaryBreakpoint: "xl",
    storageKey: LOCAL_STORAGE_KEYS.leftMenuType,
    defaultMenuType: DEFAULTS.leftMenuType,
    menuDefaultWidth: DEFAULTS.leftMenuWidth,
  });

  const rightMenu = useMenu({
    primaryBreakpoint: "lg",
    secondaryBreakpoint: "3xl",
    storageKey: LOCAL_STORAGE_KEYS.rightMenuType,
    defaultMenuType: DEFAULTS.rightMenuType,
    menuDefaultWidth: DEFAULTS.rightMenuWidth,
  });

  const scrollToBottom = () => {
    if (scrollContentRef) {
      scrollContentRef.scrollTo({ top: scrollContentRef.scrollHeight, left: 0 });
    }
  };

  const scrollToTop = () => {
    if (scrollContentRef) {
      scrollContentRef.scrollTo({ top: 0, left: 0 });
    }
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  // Return initial state during SSR
  if (!mounted) {
    return {
      // Left menu
      leftMenuType: DEFAULTS.leftMenuType,
      setLeftMenuType: () => {},
      resetLeftMenu: () => {},
      showLeftMobileButton: false,
      leftMenuWidth: DEFAULTS.leftMenuWidth[DEFAULTS.leftMenuType],
      leftPrimaryCurrent: MenuShowState.Hide,
      leftSecondaryCurrent: MenuShowState.Hide,
      hideLeft: () => {},
      showLeftSecondary: () => {},
      hideLeftSecondary: () => {},
      showLeftInMobile: () => {},
      onResetLeft: () => () => {},
      leftShowBackdrop: false,
      setLeftShowBackdrop: () => {},
      temporaryShowPrimaryMenu,
      setTemporaryShowPrimaryMenu,
      menuSelectedSecondaryItem: undefined,
      setMenuSelectedSecondaryItem: () => {},

      // Right menu
      rightMenuType: DEFAULTS.rightMenuType,
      setRightMenuType: () => {},
      resetRightMenu: () => {},
      showRightMobileButton: false,
      rightMenuWidth: DEFAULTS.rightMenuWidth[DEFAULTS.rightMenuType],
      rightPrimaryCurrent: MenuShowState.Hide,
      rightSecondaryCurrent: MenuShowState.Hide,
      hideRight: () => {},
      showRightSecondary: () => {},
      hideRightSecondary: () => {},
      showRightInMobile: () => {},
      onResetRight: () => () => {},
      rightShowBackdrop: false,
      setRightShowBackdrop: () => {},

      scrollToBottom: () => {},
      scrollToTop: () => {},
      scrollContentRef,
      setScrollContentRef,
    };
  }

  return {
    // Left menu
    leftMenuType: leftMenu.menuType,
    setLeftMenuType: leftMenu.setMenuType,
    resetLeftMenu: leftMenu.resetMenu,
    showLeftMobileButton: leftMenu.showMobileButton,
    leftMenuWidth: leftMenu.menuWidth,
    leftPrimaryCurrent: leftMenu.primaryCurrent,
    leftSecondaryCurrent: leftMenu.secondaryCurrent,
    hideLeft: leftMenu.hideMenu,
    showLeftSecondary: leftMenu.showSecondary,
    hideLeftSecondary: leftMenu.hideSecondary,
    showLeftInMobile: leftMenu.showInMobile,
    onResetLeft: leftMenu.onReset,
    leftShowBackdrop: leftMenu.showBackdrop,
    setLeftShowBackdrop: leftMenu.setShowBackdrop,
    temporaryShowPrimaryMenu,
    setTemporaryShowPrimaryMenu,
    menuSelectedSecondaryItem,
    setMenuSelectedSecondaryItem,

    // Right menu
    rightMenuType: rightMenu.menuType,
    setRightMenuType: rightMenu.setMenuType,
    resetRightMenu: rightMenu.resetMenu,
    showRightMobileButton: rightMenu.showMobileButton,
    rightMenuWidth: rightMenu.menuWidth,
    rightPrimaryCurrent: rightMenu.primaryCurrent,
    rightSecondaryCurrent: rightMenu.secondaryCurrent,
    hideRight: rightMenu.hideMenu,
    showRightSecondary: rightMenu.showSecondary,
    hideRightSecondary: rightMenu.hideSecondary,
    showRightInMobile: rightMenu.showInMobile,
    onResetRight: rightMenu.onReset,
    rightShowBackdrop: rightMenu.showBackdrop,
    setRightShowBackdrop: rightMenu.setShowBackdrop,

    scrollToBottom,
    scrollToTop,
    scrollContentRef,
    setScrollContentRef,
  };
}

export default function LayoutContextProvider({ children }: PropsWithChildren) {
  const value = useLayoutContextValue();
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
