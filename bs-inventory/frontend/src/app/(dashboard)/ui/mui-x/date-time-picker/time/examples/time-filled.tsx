import dayjs from "dayjs";

import { Box, FormControl } from "@mui/material";
import { LocalizationProvider, TimeField, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeFilled() {
  return (
    <Box>
      <FormControl fullWidth variant="filled">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Small"
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "filled" },
              desktopPaper: { className: "outlined" },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            label="Time Field"
            className="mb-0"
            slotProps={{
              textField: { size: "small", variant: "filled" },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Readonly"
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "filled" },
              desktopPaper: { className: "outlined" },
            }}
            readOnly
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Disabled"
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "filled" },
              desktopPaper: { className: "outlined" },
            }}
            disabled
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled" size="medium">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label="Medium"
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "medium", variant: "filled" },
              desktopPaper: { className: "outlined" },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
