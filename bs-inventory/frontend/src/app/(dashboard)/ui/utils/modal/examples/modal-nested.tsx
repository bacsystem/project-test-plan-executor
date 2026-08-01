"use client";

import * as React from "react";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen} variant="pastel">
        Open Child Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="bg-background-paper fixed top-1/2 left-1/2 z-50 max-w-80 -translate-1/2 rounded-3xl p-7 shadow-sm">
          <Typography variant="h6" component="h6" className="mb-2">
            Child Modal Title
          </Typography>
          <Typography variant="body1" className="mb-4">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button onClick={handleClose} variant="pastel">
            Close Child Modal
          </Button>
        </Box>
      </Modal>
    </>
  );
}

export default function ModalNested() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="pastel">
        Open Modal
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box className="bg-background-paper fixed top-1/2 left-1/2 z-50 -translate-1/2 rounded-3xl p-7 shadow-sm">
          <Typography variant="h6" component="h6" className="mb-2">
            Modal Title
          </Typography>
          <Typography variant="body1" className="mb-4">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
