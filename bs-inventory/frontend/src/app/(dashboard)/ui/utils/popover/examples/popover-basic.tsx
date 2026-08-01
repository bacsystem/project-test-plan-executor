"use client";

import React from "react";

import { Button, Popover, Typography } from "@mui/material";

export default function PopoverBasic() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button variant="pastel" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1 mt-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
    </>
  );
}
