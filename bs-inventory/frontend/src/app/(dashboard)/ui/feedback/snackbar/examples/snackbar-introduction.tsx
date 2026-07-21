import * as React from "react";

import { Portal } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

import NiCross from "@/icons/nexture/ni-cross";

export default function SnackbarIntroduction() {
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
      <Button onClick={handleClick} variant="outlined">
        Open Snackbar
      </Button>
      <Portal>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Note archived!"
          action={
            <>
              <Button color="grey" variant="text" size="tiny" onClick={handleClose}>
                View
              </Button>
              <Button
                onClick={handleClose}
                className="icon-only"
                size="tiny"
                color="text-secondary"
                variant="text"
                startIcon={<NiCross size={"tiny"} />}
              />
            </>
          }
        />
      </Portal>
    </div>
  );
}
