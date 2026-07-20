"use client";

import React from "react";

import { Box, Button, Fade, Grid, Popper, PopperPlacementType, Typography } from "@mui/material";

export default function PopperPlacement() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick = (newPlacement: PopperPlacementType) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  return (
    <>
      <Box className="w-96">
        <Popper
          open={open}
          anchorEl={anchorEl}
          placement={placement}
          transition
          slotProps={{
            root: {
              className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1 z-50 mt-1!",
            },
          }}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Typography>The content of the Popper.</Typography>
            </Fade>
          )}
        </Popper>
        <Grid container className="justify-center">
          <Grid>
            <Button onClick={handleClick("top-start")}>Top Start</Button>
            <Button onClick={handleClick("top")}>Top</Button>
            <Button onClick={handleClick("top-end")}>Top End</Button>
          </Grid>
        </Grid>
        <Grid container className="justify-center">
          <Grid size={{ xs: 6 }}>
            <Grid>
              <Button onClick={handleClick("left-start")}>Left Start</Button>
            </Grid>
            <Grid>
              <Button onClick={handleClick("left")}>Left</Button>
            </Grid>
            <Grid>
              <Button onClick={handleClick("left-end")}>Left End</Button>
            </Grid>
          </Grid>
          <Grid size={{ xs: 6 }} className="flex flex-col items-end">
            <Grid>
              <Button onClick={handleClick("right-start")}>Right Start</Button>
            </Grid>
            <Grid>
              <Button onClick={handleClick("right")}>Right</Button>
            </Grid>
            <Grid>
              <Button onClick={handleClick("right-end")}>Right End</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container className="justify-center">
          <Grid>
            <Button onClick={handleClick("bottom-start")}>Bottom Start</Button>
            <Button onClick={handleClick("bottom")}>Bottom</Button>
            <Button onClick={handleClick("bottom-end")}>Bottom End</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
