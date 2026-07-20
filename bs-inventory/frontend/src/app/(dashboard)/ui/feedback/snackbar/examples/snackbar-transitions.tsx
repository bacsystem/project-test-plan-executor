import * as React from "react";

import { Box, Portal } from "@mui/material";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Grow, { GrowProps } from "@mui/material/Grow";
import Slide, { SlideProps } from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import { TransitionProps } from "@mui/material/transitions";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

export default function SnackbarTransitions() {
  const [state, setState] = React.useState<{
    open: boolean;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement;
      }
    >;
  }>({
    open: false,
    Transition: Fade,
  });

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement;
        }
      >,
    ) =>
    () => {
      setState({
        open: true,
        Transition,
      });
    };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return (
    <Box className="flex flex-row gap-2">
      <Button variant="outlined" onClick={handleClick(GrowTransition)}>
        Grow
      </Button>
      <Button variant="outlined" onClick={handleClick(Fade)}>
        Fade
      </Button>
      <Button variant="outlined" onClick={handleClick(SlideTransition)}>
        Slide
      </Button>
      <Portal>
        <Snackbar
          open={state.open}
          onClose={handleClose}
          slots={{ transition: state.Transition }}
          message="I love snacks"
          key={state.Transition.name}
          autoHideDuration={1200}
        />
      </Portal>
    </Box>
  );
}
