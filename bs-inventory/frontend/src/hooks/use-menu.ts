import { useCallback, useEffect, useRef, useState } from "react";
import { useLocalStorage } from "react-use";

import { useScreenEffect } from "@/hooks/use-screen";
import { MenuDefaultWidth, MenuShowState, MenuType, MenuWidth, Screens } from "@/types";

type Props = {
  primaryBreakpoint: keyof Screens;
  secondaryBreakpoint?: keyof Screens;
  storageKey: string;
  defaultMenuType: MenuType;
  menuDefaultWidth: MenuDefaultWidth;
};

export function useMenu(config: Props) {
  const { primaryBreakpoint, secondaryBreakpoint, storageKey, defaultMenuType, menuDefaultWidth } = config;

  const [showBackdrop, setShowBackdrop] = useState(false);

  const [primaryDefault, setPrimaryDefault] = useState<boolean>(false);
  const [secondaryDefault, setSecondaryDefault] = useState<boolean>(false);

  const [menuType, setMenuType] = useLocalStorage<MenuType>(storageKey, defaultMenuType);

  const [primaryCurrent, setPrimaryCurrent] = useState(MenuShowState.Show);
  const [secondaryCurrent, setSecondaryCurrent] = useState(MenuShowState.Show);
  const [showMobileButton, setShowMobileButton] = useState(false);

  const [menuWidth, setMenuWidth] = useState<MenuWidth>({
    primary: menuDefaultWidth[menuType || defaultMenuType].primary,
    secondary: menuDefaultWidth[menuType || defaultMenuType].secondary,
  });

  const resetMenuCallbackRef = useRef<(() => void) | null>(null);

  const showBackdropIfNeeded = useCallback(() => {
    if (primaryCurrent === MenuShowState.TemporaryShow || secondaryCurrent === MenuShowState.TemporaryShow) {
      setShowBackdrop(true);
    }
  }, [primaryCurrent, secondaryCurrent]);

  const hideBackdropIfNeeded = useCallback(() => {
    if (primaryCurrent !== MenuShowState.TemporaryShow && secondaryCurrent !== MenuShowState.TemporaryShow) {
      setShowBackdrop(false);
    }
  }, [primaryCurrent, secondaryCurrent]);

  useEffect(() => {
    if (primaryCurrent === MenuShowState.TemporaryShow || secondaryCurrent === MenuShowState.TemporaryShow) {
      setShowBackdrop(true);
    } else {
      setShowBackdrop(false);
    }
  }, [primaryCurrent, secondaryCurrent, showBackdropIfNeeded, hideBackdropIfNeeded]);

  // Hide the secondary menu when the primary menu is hidden
  useEffect(() => {
    if (primaryCurrent === MenuShowState.Hide) {
      setSecondaryCurrent(MenuShowState.Hide);
    }
  }, [primaryCurrent]);

  // Update menu widths when show states or menu type changes
  useEffect(() => {
    setMenuWidth({
      primary: primaryCurrent === MenuShowState.Hide ? 0 : menuDefaultWidth[menuType || defaultMenuType].primary,
      secondary: secondaryCurrent === MenuShowState.Hide ? 0 : menuDefaultWidth[menuType || defaultMenuType].secondary,
    });
  }, [menuType, primaryCurrent, secondaryCurrent, menuDefaultWidth, defaultMenuType]);

  const onReset = useCallback((callback: () => void) => {
    resetMenuCallbackRef.current = callback;
    return () => {
      resetMenuCallbackRef.current = null;
    };
  }, []);

  const resetMenu = useCallback(() => {
    setPrimaryCurrent(primaryDefault ? MenuShowState.Show : MenuShowState.Hide);
    setSecondaryCurrent(secondaryDefault ? MenuShowState.Show : MenuShowState.Hide);
    setMenuWidth({
      primary: menuDefaultWidth[menuType || defaultMenuType].primary,
      secondary: menuDefaultWidth[menuType || defaultMenuType].secondary,
    });
    hideBackdropIfNeeded();

    if (resetMenuCallbackRef.current) {
      resetMenuCallbackRef.current();
    }
  }, [primaryDefault, secondaryDefault, menuDefaultWidth, menuType, defaultMenuType, hideBackdropIfNeeded]);

  // Reset menu when defaults or menu type changes
  useEffect(() => {
    resetMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryDefault, secondaryDefault, menuType]);

  // Handle primary breakpoint changes
  useScreenEffect(primaryBreakpoint, (match) => {
    setShowMobileButton(!match);
    if (primaryDefault !== match) {
      setPrimaryDefault(match);
    }
  });

  // Handle secondary breakpoint changes if configured
  useScreenEffect(secondaryBreakpoint || "2xl", (match) => {
    if (secondaryBreakpoint) {
      if (secondaryDefault !== match) {
        setSecondaryDefault(match);
      }
    }
  });

  const hidePrimaryMenu = useCallback(() => {
    if (primaryCurrent === MenuShowState.TemporaryShow) {
      setPrimaryCurrent(MenuShowState.Hide);
    }
  }, [primaryCurrent]);

  const hideSecondary = useCallback(() => {
    if (secondaryCurrent === MenuShowState.TemporaryShow) {
      setSecondaryCurrent(MenuShowState.Hide);
    }
  }, [secondaryCurrent]);

  const hideMenu = useCallback(() => {
    hidePrimaryMenu();
    hideSecondary();
    hideBackdropIfNeeded();
  }, [hidePrimaryMenu, hideSecondary, hideBackdropIfNeeded]);

  const showSecondary = useCallback(() => {
    setSecondaryCurrent(secondaryDefault ? MenuShowState.Show : MenuShowState.TemporaryShow);
  }, [secondaryDefault]);

  const showInMobile = useCallback(() => {
    setPrimaryCurrent(MenuShowState.TemporaryShow);
    setSecondaryCurrent(MenuShowState.TemporaryShow);
    showBackdropIfNeeded();
  }, [showBackdropIfNeeded]);

  return {
    menuType: menuType || defaultMenuType,
    setMenuType,
    resetMenu,
    showMobileButton,
    menuWidth,
    primaryCurrent,
    secondaryCurrent,
    hideMenu,
    showSecondary,
    hideSecondary,
    showInMobile,
    onReset,
    showBackdrop,
    setShowBackdrop,
  };
}
