import React from "react";

import { Backdrop, Box, Button, Modal, Typography } from "@mui/material";

export default function ModalTransitions() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen} variant="pastel">
        React Transition Group
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Box className="bg-background-paper fixed top-1/2 left-1/2 z-50 -translate-1/2 rounded-3xl p-7 shadow-sm">
          <Typography variant="h6" component="h6" className="mb-2">
            React Transition Group
          </Typography>
          <Typography variant="body1">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</Typography>
        </Box>
      </Modal>
    </>
  );
}
