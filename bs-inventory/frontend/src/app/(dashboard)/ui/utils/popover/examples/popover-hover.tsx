"use client";

import React from "react";

import { Box, Button, Popover, Typography } from "@mui/material";

export default function PopoverHover() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box className="flex flex-row items-start gap-2">
      <Button variant="pastel" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        Hover
      </Button>
      <Popover
        className="pointer-events-none"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        elevation={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
        disableRestoreFocus
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}
