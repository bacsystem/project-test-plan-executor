import React from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function DialogAlert() {
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpenAlert}>
        Open Alert Dialog
      </Button>
      <Dialog open={openAlert} onClose={handleCloseAlert}>
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Disagree</Button>
          <Button variant="pastel" onClick={handleCloseAlert} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
