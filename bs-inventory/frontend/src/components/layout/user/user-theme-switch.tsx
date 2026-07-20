import React from "react";
import { useTranslations } from "use-intl";

import { Chip, Fade, ListItemIcon, Menu, MenuItem, PopoverVirtualElement } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiSquircle from "@/icons/nexture/ni-squircle";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

export default function UserThemeSwitch() {
  const { theme, setTheme } = useThemeContext();
  const [anchorElMode, setAnchorElMode] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const openMode = Boolean(anchorElMode);
  const handleClickMode = (event: Event | React.SyntheticEvent) => {
    setAnchorElMode(event.currentTarget);
  };
  const handleCloseMode = () => {
    setAnchorElMode(null);
  };

  const getModeLabel = () => {
    if (theme === "theme-blue") {
      return t("user-blue");
    } else if (theme === "theme-green") {
      return t("user-green");
    } else if (theme === "theme-orange") {
      return t("user-orange");
    } else {
      return t("user-purple");
    }
  };
  const t = useTranslations("dashboard");

  return (
    <>
      <MenuItem onClick={handleClickMode} className={cn(openMode && "bg-grey-500/10")}>
        <ListItemIcon>
          <NiPaintRoller size={20} />
        </ListItemIcon>
        <div className="w-full">Theme</div>
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
          className={cn(theme === "theme-blue" && "active")}
          onClick={() => {
            handleCloseMode();
            if (theme !== "theme-blue") setTheme("theme-blue");
          }}
        >
          <ListItemIcon>
            <NiSquircle size={20} className="text-[#00C1EC]" />
          </ListItemIcon>
          {t("user-blue")}
        </MenuItem>

        <MenuItem
          className={cn(theme === "theme-green" && "active")}
          onClick={() => {
            handleCloseMode();
            if (theme !== "theme-green") setTheme("theme-green");
          }}
        >
          <ListItemIcon>
            <NiSquircle size={20} className="text-[#66BA39]" />
          </ListItemIcon>
          {t("user-green")}
        </MenuItem>

        <MenuItem
          className={cn(theme === "theme-orange" && "active")}
          onClick={() => {
            handleCloseMode();
            if (theme !== "theme-orange") setTheme("theme-orange");
          }}
        >
          <ListItemIcon>
            <NiSquircle size={20} className="text-[#F8A52D]" />
          </ListItemIcon>
          {t("user-orange")}
        </MenuItem>

        <MenuItem
          className={cn(theme === "theme-purple" && "active")}
          onClick={() => {
            handleCloseMode();
            if (theme !== "theme-purple") setTheme("theme-purple");
          }}
        >
          <ListItemIcon>
            <NiSquircle size={20} className="text-[#D877DA]" />
          </ListItemIcon>
          {t("user-purple")}
        </MenuItem>
      </Menu>
    </>
  );
}
