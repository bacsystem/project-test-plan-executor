"use client";

import PopupState, { bindPopper, bindToggle } from "material-ui-popup-state";
import React from "react";

import { Button, Fade, Popper, Typography } from "@mui/material";

export default function PopperUncontrolled() {
  return (
    <>
      <PopupState variant="popper" popupId="demo-popup-popper">
        {(popupState) => (
          <div>
            <Button variant="pastel" {...bindToggle(popupState)}>
              Toggle Popper
            </Button>
            <Popper
              {...bindPopper(popupState)}
              transition
              slotProps={{
                root: {
                  className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1 mt-1!",
                },
              }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Typography>The content of the Popper.</Typography>
                </Fade>
              )}
            </Popper>
          </div>
        )}
      </PopupState>
    </>
  );
}
