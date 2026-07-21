import React, { PropsWithChildren } from "react";

import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

import NiBell from "@/icons/nexture/ni-bell";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiExpandFull from "@/icons/nexture/ni-expand-full";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiPaperclip from "@/icons/nexture/ni-paperclip";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiSendUpRight from "@/icons/nexture/ni-send-up-right";
import NiShrinkFull from "@/icons/nexture/ni-shrink-full";

export default function DialogCustom() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [full, setFull] = React.useState(false);
  const toggleFull = () => {
    setFull(!full);
  };

  const DialogWrapper = ({ children }: PropsWithChildren) => {
    if (full) {
      return (
        <Dialog onClose={handleCloseDialog} open={openDialog} fullScreen={true}>
          {children}
        </Dialog>
      );
    }
    return (
      <Dialog onClose={handleCloseDialog} open={openDialog} fullWidth maxWidth="lg">
        {children}
      </Dialog>
    );
  };
  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpenDialog}>
        Custom Dialog
      </Button>
      <DialogWrapper>
        <DialogTitle>
          <Box className="flex flex-row justify-between">
            <Box>New Message</Box>
            <Box className="flex flex-row">
              <Button
                className="icon-only"
                onClick={toggleFull}
                size="small"
                color="grey"
                startIcon={full ? <NiShrinkFull size="small" /> : <NiExpandFull size="small" />}
              />
              <Button
                className="icon-only"
                onClick={handleCloseDialog}
                size="small"
                color="grey"
                startIcon={<NiCrossFull size="small" />}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="flex min-h-120 flex-col pt-2! pb-0">
          <TextField label="To" />
          <TextField label="Subject" />
          <TextField label="Message" multiline className="full-height" />
        </DialogContent>
        <DialogActions className="justify-start">
          <Box className="flex flex-1 flex-row items-center justify-between">
            <Box className="relative flex flex-row items-center">
              <Button variant="contained" color="primary" className="me-2" startIcon={<NiSendUpRight size="medium" />}>
                Send
              </Button>
              <Button className="icon-only" size="medium" color="grey" startIcon={<NiPenSquare size="medium" />} />
              <Button className="icon-only" size="medium" color="grey" startIcon={<NiPaperclip size="medium" />} />
              <Button className="icon-only" size="medium" color="grey" startIcon={<NiFaceSmile size="medium" />} />
              <Button className="icon-only" size="medium" color="grey" startIcon={<NiBell size="medium" />} />
            </Box>
            <Button
              onClick={handleCloseDialog}
              className="icon-only"
              size="medium"
              color="grey"
              startIcon={<NiBinEmpty size="medium" />}
            />
          </Box>
        </DialogActions>
      </DialogWrapper>
    </Box>
  );
}
