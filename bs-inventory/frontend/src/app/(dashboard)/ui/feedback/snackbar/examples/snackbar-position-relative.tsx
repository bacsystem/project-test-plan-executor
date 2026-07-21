"use client";

import * as React from "react";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function SnackbarPositionRelative() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <>
      <Box className="flex justify-center">
        <Button onClick={handleClick({ vertical: "top", horizontal: "center" })}>Top Center</Button>
      </Box>
      <Grid container className="justify-center">
        <Grid size={{ xs: 6 }}>
          <Button onClick={handleClick({ vertical: "top", horizontal: "left" })}>Top Left</Button>
        </Grid>
        <Grid size={{ xs: 6 }} className="text-right">
          <Button onClick={handleClick({ vertical: "top", horizontal: "right" })}>Top Right</Button>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Button onClick={handleClick({ vertical: "bottom", horizontal: "left" })}>Bottom Left</Button>
        </Grid>
        <Grid size={{ xs: 6 }} className="text-right">
          <Button onClick={handleClick({ vertical: "bottom", horizontal: "right" })}>Bottom Right</Button>
        </Grid>
      </Grid>
      <Box className="flex justify-center">
        <Button onClick={handleClick({ vertical: "bottom", horizontal: "center" })}>Bottom Center</Button>
      </Box>
    </>
  );

  return (
    <Box className="w-96">
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </Box>
  );
}
