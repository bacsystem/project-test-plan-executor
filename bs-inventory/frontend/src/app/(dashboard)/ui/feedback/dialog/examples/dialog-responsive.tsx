"use client";
import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";

export default function DialogResponsive() {
  const [openResponsive, setOpenResponsive] = React.useState(false);
  const theme = useTheme();
  const fullScreenResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const handleClickOpenResponsive = () => {
    setOpenResponsive(true);
  };
  const handleCloseResponsive = () => {
    setOpenResponsive(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpenResponsive}>
        Open Responsive Dialog
      </Button>
      <Dialog fullScreen={fullScreenResponsive} open={openResponsive} onClose={handleCloseResponsive}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResponsive}>Disagree</Button>
          <Button onClick={handleCloseResponsive}>Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
