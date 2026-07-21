import React from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogSlide() {
  const [openSlide, setOpenSlide] = React.useState(false);
  const handleClickOpenSlide = () => {
    setOpenSlide(true);
  };
  const handleCloseSlide = () => {
    setOpenSlide(false);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpenSlide}>
        Slide Alert Dialog
      </Button>
      <Dialog
        open={openSlide}
        slots={{ transition: Transition }}
        keepMounted
        onClose={handleCloseSlide}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSlide}>Disagree</Button>
          <Button variant="pastel" onClick={handleCloseSlide}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
