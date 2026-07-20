import React from "react";

import { Box, Button, Fade, Menu, MenuItem, PopoverVirtualElement } from "@mui/material";

import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function MenuOutlined() {
  const [anchorElOutlined, setAnchorElOutlined] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(
    null,
  );
  const openOutlined = Boolean(anchorElOutlined);
  const handleClickOutlined = (event: Event | React.SyntheticEvent) => {
    setAnchorElOutlined(event.currentTarget);
  };
  const handleCloseOutlined = () => {
    setAnchorElOutlined(null);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClickOutlined}
        endIcon={
          <NiChevronRightSmall
            size={"medium"}
            className={cn("transition-transform rtl:rotate-180", openOutlined && "rotate-90 rtl:rotate-90")}
          />
        }
      >
        Outlined
      </Button>
      <Menu
        anchorEl={anchorElOutlined as Element}
        open={openOutlined}
        onClose={handleCloseOutlined}
        className="outlined mt-1"
        slots={{
          transition: Fade,
        }}
      >
        <MenuItem onClick={handleCloseOutlined}>Profile</MenuItem>
        <MenuItem onClick={handleCloseOutlined}>Account</MenuItem>
        <MenuItem onClick={handleCloseOutlined}>New Account</MenuItem>
        <MenuItem onClick={handleCloseOutlined}>Logout</MenuItem>
      </Menu>
    </Box>
  );
}
