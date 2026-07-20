import React from "react";

import {
  Box,
  Button,
  Fade,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  PopoverVirtualElement,
} from "@mui/material";

import NiArrowOutRight from "@/icons/nexture/ni-arrow-out-right";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiSettings from "@/icons/nexture/ni-settings";
import NiUser from "@/icons/nexture/ni-user";
import { cn } from "@/lib/utils";

export default function MenuDense() {
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
        Dense
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
        <MenuList dense>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <NiUser size="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <NiSettings size="small" />
            </ListItemIcon>
            <ListItemText>Account</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <NiPlusSquare size="small" />
            </ListItemIcon>
            <ListItemText>New Account</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <NiArrowOutRight size="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
