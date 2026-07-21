import * as React from "react";

import { Box, Portal } from "@mui/material";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";

import NiCross from "@/icons/nexture/ni-cross";

export interface SnackbarMessage {
  message: string;
  key: number;
}

export default function SnackbarConsecutive() {
  const [snackPack, setSnackPack] = React.useState<readonly SnackbarMessage[]>([]);
  const [open, setOpen] = React.useState(false);
  const [messageInfo, setMessageInfo] = React.useState<SnackbarMessage | undefined>(undefined);

  React.useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an active snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message: string) => () => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  return (
    <Box>
      <Box className="flex flex-row gap-2">
        <Button variant="outlined" onClick={handleClick("Message A")}>
          Show A
        </Button>
        <Button variant="outlined" onClick={handleClick("Message B")}>
          Show B
        </Button>
      </Box>
      <Portal>
        <Snackbar
          key={messageInfo ? messageInfo.key : undefined}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          slotProps={{
            transition: { onExited: handleExited },
          }}
          message={messageInfo ? messageInfo.message : undefined}
          action={
            <>
              <Button color="primary" size="small" onClick={handleClose}>
                Undo
              </Button>
              <Button
                className="icon-only"
                size="tiny"
                color="text-secondary"
                variant="text"
                onClick={handleClose}
                startIcon={<NiCross size={"tiny"} />}
              />
            </>
          }
        />
      </Portal>
    </Box>
  );
}
