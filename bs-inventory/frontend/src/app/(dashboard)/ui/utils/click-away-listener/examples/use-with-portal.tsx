"use client";

import React from "react";

import { Box, Button, ClickAwayListener, Portal } from "@mui/material";

export default function UseWithPortal() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box className="relative flex flex-row items-start gap-2">
        <Button onClick={handleClick} variant="pastel">
          Open Menu Dropdown
        </Button>
        {open ? (
          <Portal>
            <Box className="bg-background-paper fixed inset-s-1/2 top-1/2 z-50 -translate-1/2 rounded-md px-4 py-2 shadow-sm">
              Click me, I will stay visible until you click outside.
            </Box>
          </Portal>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
