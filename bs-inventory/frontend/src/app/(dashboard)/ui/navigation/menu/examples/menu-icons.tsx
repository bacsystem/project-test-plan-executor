import React from "react";

import { Box, Button, Fade, ListItemIcon, ListItemText, Menu, MenuItem, PopoverVirtualElement } from "@mui/material";

import NiArrowOutRight from "@/icons/nexture/ni-arrow-out-right";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiSettings from "@/icons/nexture/ni-settings";
import NiUser from "@/icons/nexture/ni-user";
import { cn } from "@/lib/utils";

export default function MenuIcons() {
  const [anchorEl, setAnchorEl] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: Event | React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Button
        variant="outlined"
        color="grey"
        onClick={handleClick}
        endIcon={
          <NiChevronRightSmall
            size={"medium"}
            className={cn("transition-transform rtl:rotate-180", open && "rotate-90 rtl:rotate-90")}
          />
        }
      >
        Icons
      </Button>
      <Menu
        anchorEl={anchorEl as Element}
        open={open}
        onClose={handleClose}
        className="mt-1"
        slots={{
          transition: Fade,
        }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiUser size="medium" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiSettings size="medium" />
          </ListItemIcon>
          <ListItemText>Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiPlusSquare size="medium" />
          </ListItemIcon>
          <ListItemText>New Account</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <NiArrowOutRight size="medium" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
