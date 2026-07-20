import React from "react";

import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";

import { RadiobuttonSmallChecked, RadiobuttonSmallEmptyOutlined } from "@/icons/form/mui-radiobutton";
const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

export interface ConfirmationDialogRawProps {
  id: string;
  keepMounted: boolean;
  value: string;
  open: boolean;
  onClose: (value?: string) => void;
}

function ConfirmationDialogRaw(props: ConfirmationDialogRawProps) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog
      className="[&_.MuiDialog-paper]:max-h-120 [&_.MuiDialog-paper]:w-[20rem]"
      slotProps={{ transition: { onEntering: handleEntering } }}
      open={open}
      {...other}
    >
      <DialogTitle>Phone Ringtone</DialogTitle>
      <DialogContent>
        <RadioGroup
          ref={radioGroupRef}
          className="mb-0 flex flex-col gap-2"
          name="ringtone"
          value={value}
          onChange={handleChange}
        >
          {options.map((option) => (
            <FormControlLabel
              value={option}
              key={option}
              control={<Radio icon={<RadiobuttonSmallEmptyOutlined />} checkedIcon={<RadiobuttonSmallChecked />} />}
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk} variant="pastel">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default function DialogConfirmation() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue?: string) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Card className="outline-grey-100 max-w-80 rounded-md">
      <List component="div" role="group">
        <ListItemButton disabled>
          <ListItemText primary="Interruptions" secondary="Off" />
        </ListItemButton>
        <ListItemButton onClick={handleClickListItem}>
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItemButton>
        <ListItemButton disabled>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItemButton>
        <ConfirmationDialogRaw id="ringtone-menu" keepMounted open={open} onClose={handleClose} value={value} />
      </List>
    </Card>
  );
}
