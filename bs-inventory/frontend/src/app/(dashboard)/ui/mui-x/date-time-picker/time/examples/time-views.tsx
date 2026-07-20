import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeViews() {
  return (
    <Box className="flex flex-col items-start">
      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Hours Minutes Seconds</FormLabel>
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
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["hours", "minutes", "seconds"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Hours</FormLabel>
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
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["hours"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Minutes Seconds</FormLabel>
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
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["minutes", "seconds"]}
            format="mm:ss"
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">24 Hours</FormLabel>
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
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["hours", "minutes"]}
            ampm={false}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
