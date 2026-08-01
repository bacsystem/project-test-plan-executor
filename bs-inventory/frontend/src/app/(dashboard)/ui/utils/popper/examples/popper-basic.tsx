"use client";

import React from "react";

import { Button, Popper, Typography } from "@mui/material";

export default function PopperBasic() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Button aria-describedby={id} variant="pastel" onClick={handleClick}>
        Toggle Popper
      </Button>
      <Popper
        open={open}
        anchorEl={anchorEl}
        slotProps={{
          root: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1 mt-1!",
          },
        }}
      >
        <Typography>The content of the Popper.</Typography>
      </Popper>
    </>
  );
}
