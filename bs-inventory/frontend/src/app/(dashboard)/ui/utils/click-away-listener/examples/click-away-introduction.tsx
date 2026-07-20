"use client";
import React from "react";

import { Box, Button, ClickAwayListener } from "@mui/material";

export default function ClickAwayIntroduction() {
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
          <Box className="bg-grey-25 top-0 rounded-md px-4 py-2 leading-5">
            Click me, I will stay visible until you click outside.
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
}
