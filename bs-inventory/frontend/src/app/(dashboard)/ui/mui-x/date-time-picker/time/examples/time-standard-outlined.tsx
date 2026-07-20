import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider, TimeField, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeStandardOutlined() {
  return (
    <Box>
      <FormControl fullWidth variant="standard" className="outlined">
        <FormLabel component="label">Small</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              desktopPaper: { className: "outlined" },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined">
        <FormLabel component="label">Time Field</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeField
            className="mb-0"
            slotProps={{
              textField: { size: "small", variant: "standard" },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined">
        <FormLabel component="label">Readonly</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              desktopPaper: { className: "outlined" },
            }}
            readOnly
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined">
        <FormLabel component="label" disabled>
          Disabled
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              desktopPaper: { className: "outlined" },
            }}
            disabled
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" size="medium" className="outlined">
        <FormLabel component="label">Medium</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "medium", variant: "standard" },
              desktopPaper: { className: "outlined" },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
