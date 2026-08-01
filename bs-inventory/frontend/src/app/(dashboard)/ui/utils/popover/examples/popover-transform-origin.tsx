"use client";

import React from "react";

import { Box, Button, Popover, Typography } from "@mui/material";

export default function PopoverTransformOrigin() {
  // Top Left
  const [transformElTopLeft, setTransformElTopLeft] = React.useState<HTMLButtonElement | null>(null);
  const handleClickTopLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTransformElTopLeft(event.currentTarget);
  };
  const handleCloseTopLeft = () => {
    setTransformElTopLeft(null);
  };
  const openTopLeft = Boolean(transformElTopLeft);

  // Top Center
  const [transformElTopCenter, setTransformElTopCenter] = React.useState<HTMLButtonElement | null>(null);
  const handleClickTopCenter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTransformElTopCenter(event.currentTarget);
  };
  const handleCloseTopCenter = () => {
    setTransformElTopCenter(null);
  };
  const openTopCenter = Boolean(transformElTopCenter);

  // Top Right
  const [transformElTopRight, setTransformElTopRight] = React.useState<HTMLButtonElement | null>(null);
  const handleClickTopRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTransformElTopRight(event.currentTarget);
  };
  const handleCloseTopRight = () => {
    setTransformElTopRight(null);
  };
  const openTopRight = Boolean(transformElTopRight);

  // Bottom Left
  const [transformElBottomLeft, setTransformElBottomLeft] = React.useState<HTMLButtonElement | null>(null);
  const handleClickBottomLeft = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTransformElBottomLeft(event.currentTarget);
  };
  const handleCloseBottomLeft = () => {
    setTransformElBottomLeft(null);
  };
  const openBottomLeft = Boolean(transformElBottomLeft);

  // Bottom Center
  const [transformElBottomCenter, setTransformElBottomCenter] = React.useState<HTMLButtonElement | null>(null);
  const handleClickBottomCenter = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTransformElBottomCenter(event.currentTarget);
  };
  const handleCloseBottomCenter = () => {
    setTransformElBottomCenter(null);
  };
  const openBottomCenter = Boolean(transformElBottomCenter);

  // Bottom Right
  const [transformElBottomRight, setTransformElBottomRight] = React.useState<HTMLButtonElement | null>(null);
  const handleClickBottomRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    setTransformElBottomRight(event.currentTarget);
  };
  const handleCloseBottomRight = () => {
    setTransformElBottomRight(null);
  };
  const openBottomRight = Boolean(transformElBottomRight);

  return (
    <Box className="flex flex-row items-start gap-2">
      {/* Top Left */}
      <Button variant="pastel" onClick={handleClickTopLeft}>
        Top Left
      </Button>
      <Popover
        open={openTopLeft}
        anchorEl={transformElTopLeft}
        transformOrigin={{
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
        anchorEl={transformElTopCenter}
        transformOrigin={{
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
        anchorEl={transformElTopRight}
        transformOrigin={{
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
        anchorEl={transformElBottomLeft}
        transformOrigin={{
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
        anchorEl={transformElBottomCenter}
        transformOrigin={{
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
        anchorEl={transformElBottomRight}
        transformOrigin={{
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
