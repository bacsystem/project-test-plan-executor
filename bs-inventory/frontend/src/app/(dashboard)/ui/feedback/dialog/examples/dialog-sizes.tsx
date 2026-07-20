import React from "react";

import {
  Box,
  Breakpoint,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function DialogSizes() {
  const [openOptionalSizes, setOpenOptionalSizes] = React.useState(false);
  const [fullWidthOptionalSizes, setFullWidthOptionalSizes] = React.useState(true);
  const [maxWidthOptionalSizes, setMaxWidthOptionalSizes] = React.useState<DialogProps["maxWidth"]>("sm");
  const handleClickOpenOptionalSizes = () => {
    setOpenOptionalSizes(true);
  };
  const handleCloseOptionalSizes = () => {
    setOpenOptionalSizes(false);
  };
  const handleMaxWidthChangeOptionalSizes = (event: SelectChangeEvent<typeof maxWidthOptionalSizes>) => {
    setMaxWidthOptionalSizes(event.target.value as Breakpoint);
  };
  const handleFullWidthChangeOptionalSizes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullWidthOptionalSizes(event.target.checked);
  };

  return (
    <Box>
      <Button variant="outlined" onClick={handleClickOpenOptionalSizes}>
        Open Max Width Dialog
      </Button>
      <Dialog
        fullWidth={fullWidthOptionalSizes}
        maxWidth={maxWidthOptionalSizes}
        open={openOptionalSizes}
        onClose={handleCloseOptionalSizes}
      >
        <DialogTitle>Optional Sizes</DialogTitle>
        <DialogContent>
          <DialogContentText className="mb-4">
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box noValidate component="form" className="flex flex-col items-start">
            <FormControl>
              <FormLabel component="label">Full Width</FormLabel>
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    className="outlined"
                    checked={fullWidthOptionalSizes}
                    onChange={handleFullWidthChangeOptionalSizes}
                  />
                }
                label={fullWidthOptionalSizes ? "Full width enabled" : "Full width disabled"}
              />
            </FormControl>

            <FormControl
              size="small"
              variant="standard"
              className="outlined min-w-48"
              disabled={!fullWidthOptionalSizes}
            >
              <FormLabel component="label">Max Width</FormLabel>
              <Select
                value={maxWidthOptionalSizes}
                label="Max Width"
                onChange={handleMaxWidthChangeOptionalSizes}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseOptionalSizes}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
