"use client";
import { useRouter } from "next/navigation";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Typography,
} from "@mui/material";

import NiCrossFull from "@/icons/nexture/ni-cross-full";

type PropTypes = {
  addDialogOpen: boolean;
  onAddDialogClose: () => void;
};

export default function AddContactDialog({ addDialogOpen, onAddDialogClose }: PropTypes) {
  const router = useRouter();

  const handleChatNewClick = () => {
    router.push("/applications/messages/chat-new");
  };

  const handleClose = () => {
    onAddDialogClose();
  };

  return (
    <Dialog maxWidth={"sm"} fullWidth open={addDialogOpen} onClose={handleClose}>
      <Box className="flex flex-col">
        <DialogTitle>
          <Box className="flex flex-row items-center justify-between">
            <Typography variant="h6" className="leading-5">
              Add Contact
            </Typography>
            <Box className="-mt-1 flex flex-row">
              <Button
                className="icon-only"
                size="small"
                color="grey"
                startIcon={<NiCrossFull size="small" />}
                onClick={handleClose}
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent className="flex flex-1 flex-col gap-5 pb-7">
          <Box className="flex flex-col">
            <FormControl className="outlined" variant="standard" size="small">
              <FormLabel component="label">First Name</FormLabel>
              <Input />
            </FormControl>
            <FormControl className="outlined" variant="standard" size="small">
              <FormLabel component="label">Last Name</FormLabel>
              <Input />
            </FormControl>
            <FormControl className="outlined" variant="standard" size="small">
              <FormLabel component="label">Email</FormLabel>
              <Input />
            </FormControl>
            <FormControl className="outlined" variant="standard" size="small">
              <FormLabel component="label">Phone</FormLabel>
              <Input />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions className="flex flex-col">
          <Box className="flex flex-row gap-2 self-end">
            <Button variant="pastel" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="contained" onClick={handleChatNewClick}>
              Add
            </Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
