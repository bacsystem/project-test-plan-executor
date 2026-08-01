"use client";

import React from "react";

import { Box, Button, Popover, Typography } from "@mui/material";

export default function PopoverAnchorOrigin() {
  // Top Left
  const [anchorElTopLeft, setAnchorElTopLeft] = React.useState<HTMLButtonElement | null>(null);
  const handleClickTopLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTopLeft(event.currentTarget);
  };
  const handleCloseTopLeft = () => {
    setAnchorElTopLeft(null);
  };
  const openTopLeft = Boolean(anchorElTopLeft);

  // Top Center
  const [anchorElTopCenter, setAnchorElTopCenter] = React.useState<HTMLButtonElement | null>(null);
  const handleClickTopCenter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTopCenter(event.currentTarget);
  };
  const handleCloseTopCenter = () => {
    setAnchorElTopCenter(null);
  };
  const openTopCenter = Boolean(anchorElTopCenter);

  // Top Right
  const [anchorElTopRight, setAnchorElTopRight] = React.useState<HTMLButtonElement | null>(null);
  const handleClickTopRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElTopRight(event.currentTarget);
  };
  const handleCloseTopRight = () => {
    setAnchorElTopRight(null);
  };
  const openTopRight = Boolean(anchorElTopRight);

  // Bottom Left
  const [anchorElBottomLeft, setAnchorElBottomLeft] = React.useState<HTMLButtonElement | null>(null);
  const handleClickBottomLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBottomLeft(event.currentTarget);
  };
  const handleCloseBottomLeft = () => {
    setAnchorElBottomLeft(null);
  };
  const openBottomLeft = Boolean(anchorElBottomLeft);

  // Bottom Center
  const [anchorElBottomCenter, setAnchorElBottomCenter] = React.useState<HTMLButtonElement | null>(null);
  const handleClickBottomCenter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBottomCenter(event.currentTarget);
  };
  const handleCloseBottomCenter = () => {
    setAnchorElBottomCenter(null);
  };
  const openBottomCenter = Boolean(anchorElBottomCenter);

  // Bottom Right
  const [anchorElBottomRight, setAnchorElBottomRight] = React.useState<HTMLButtonElement | null>(null);
  const handleClickBottomRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElBottomRight(event.currentTarget);
  };
  const handleCloseBottomRight = () => {
    setAnchorElBottomRight(null);
  };
  const openBottomRight = Boolean(anchorElBottomRight);

  return (
    <Box className="flex flex-row items-start gap-2">
      {/* Top Left */}
      <Button variant="pastel" onClick={handleClickTopLeft}>
        Top Left
      </Button>
      <Popover
        open={openTopLeft}
        anchorEl={anchorElTopLeft}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleCloseTopLeft}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>

      {/* Top Center */}
      <Button variant="pastel" onClick={handleClickTopCenter}>
        Top Center
      </Button>
      <Popover
        open={openTopCenter}
        anchorEl={anchorElTopCenter}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleCloseTopCenter}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>

      {/* Top Right */}
      <Button variant="pastel" onClick={handleClickTopRight}>
        Top Right
      </Button>
      <Popover
        open={openTopRight}
        anchorEl={anchorElTopRight}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        onClose={handleCloseTopRight}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>

      {/* Bottom Left */}
      <Button variant="pastel" onClick={handleClickBottomLeft}>
        Bottom Left
      </Button>
      <Popover
        open={openBottomLeft}
        anchorEl={anchorElBottomLeft}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleCloseBottomLeft}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>

      {/* Bottom Center */}
      <Button variant="pastel" onClick={handleClickBottomCenter}>
        Bottom Center
      </Button>
      <Popover
        open={openBottomCenter}
        anchorEl={anchorElBottomCenter}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        onClose={handleCloseBottomCenter}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>

      {/* Bottom Right */}
      <Button variant="pastel" onClick={handleClickBottomRight}>
        Bottom Right
      </Button>
      <Popover
        open={openBottomRight}
        anchorEl={anchorElBottomRight}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        onClose={handleCloseBottomRight}
        elevation={3}
        slotProps={{
          paper: {
            className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1",
          },
        }}
      >
        <Typography>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}
