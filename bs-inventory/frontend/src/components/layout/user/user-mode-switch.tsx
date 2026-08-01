import React from "react";
import { useTranslations } from "use-intl";

import { Chip, Fade, ListItemIcon, Menu, MenuItem, PopoverVirtualElement } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiMoon from "@/icons/nexture/ni-moon";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSun from "@/icons/nexture/ni-sun";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

export default function UserModeSwitch() {
  const { mode, setMode } = useThemeContext();
  const [anchorElMode, setAnchorElMode] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const openMode = Boolean(anchorElMode);
  const handleClickMode = (event: Event | React.SyntheticEvent) => {
    setAnchorElMode(event.currentTarget);
  };
  const handleCloseMode = () => {
    setAnchorElMode(null);
  };

  const getModeIcon = () => {
    if (mode === "light") {
      return <NiSun size={20} />;
    } else if (mode === "dark") {
      return <NiMoon size={20} />;
    } else {
      return <NiScreen size={20} />;
    }
  };

  const getModeLabel = () => {
    if (mode === "light") {
      return t("mode-light");
    } else if (mode === "dark") {
      return t("mode-dark");
    } else {
      return t("mode-system");
    }
  };

  const t = useTranslations("dashboard");

  return (
    <>
      <MenuItem onClick={handleClickMode} className={cn(openMode && "bg-grey-500/10")}>
        <ListItemIcon>{getModeIcon()}</ListItemIcon>
        <div className="w-full">{t("user-mode")}</div>
        <Chip variant="outlined" label={getModeLabel()} size="small" />
        <ListItemIcon>
          <NiChevronRightSmall size={20} className={cn("ms-1 me-0 transition-transform", openMode && "rotate-90")} />
        </ListItemIcon>
      </MenuItem>
      <Menu
        anchorEl={anchorElMode as Element}
        open={openMode}
        onClose={handleCloseMode}
        classes={{ paper: "mt-1 w-72" }}
        slots={{
          transition: Fade,
        }}
      >
        <MenuItem
          className={cn(mode === "system" && "active")}
          onClick={() => {
            handleCloseMode();
            if (mode !== "system") setMode("system");
          }}
        >
          <ListItemIcon>
            <NiScreen size={20} />
          </ListItemIcon>
          {t("user-system")}
        </MenuItem>
        <MenuItem
          className={cn(mode === "light" && "active")}
          onClick={() => {
            handleCloseMode();
            if (mode !== "light") setMode("light");
          }}
        >
          <ListItemIcon>
            <NiSun size={20} />
          </ListItemIcon>
          {t("user-light")}
        </MenuItem>
        <MenuItem
          className={cn(mode === "dark" && "active")}
          onClick={() => {
            handleCloseMode();
            if (mode !== "dark") setMode("dark");
          }}
        >
          <ListItemIcon>
            <NiMoon size={20} />
          </ListItemIcon>
          {t("user-dark")}
        </MenuItem>
      </Menu>
    </>
  );
}
