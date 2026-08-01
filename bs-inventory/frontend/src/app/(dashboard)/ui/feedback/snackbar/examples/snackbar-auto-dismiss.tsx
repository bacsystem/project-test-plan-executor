import * as React from "react";

import { Portal } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

export default function SnackbarAutoDismiss() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Open Snackbar
      </Button>
      <Portal>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message="This Snackbar will be dismissed in 5 seconds."
        />
      </Portal>
    </div>
  );
}
