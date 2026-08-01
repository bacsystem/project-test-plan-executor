"use client";

import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import React from "react";

import { Button, Popover, Typography } from "@mui/material";

export default function PopoverUncontrolled() {
  return (
    <>
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Button variant="pastel" {...bindTrigger(popupState)}>
              Open Popover
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              elevation={3}
              slotProps={{
                paper: {
                  className: "bg-background-paper shadow-darker-sm! outline-grey-50 rounded-lg p-4 outline-1 mt-1",
                },
              }}
            >
              <Typography>The content of the Popover.</Typography>
            </Popover>
          </div>
        )}
      </PopupState>
    </>
  );
}
