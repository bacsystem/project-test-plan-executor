import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField, SingleInputTimeRangeField, TimeRangePicker } from "@mui/x-date-pickers-pro";

import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeRangeStandard() {
  return (
    <Box>
      <FormControl fullWidth variant="standard">
        <FormLabel component="label">Small</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: {
                size: "small",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="mb-0">
        <FormLabel component="label">Time Range Field</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiInputTimeRangeField
            className="mb-0"
            slotProps={{
              textField: ({ position }) => ({
                label: position === "start" ? "From" : "To",
                size: "small",
                variant: "standard",
              }),
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard">
        <FormLabel component="label">Readonly</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeRangePicker
            className="mb-0"
            defaultValue={[dayjs("2025-04-17T15:30"), dayjs("2025-04-17T18:30")]}
            readOnly
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: {
                size: "small",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard">
        <FormLabel component="label">Disabled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeRangePicker
            className="mb-0"
            defaultValue={[dayjs("2025-04-17T15:30"), dayjs("2025-04-17T18:30")]}
            disabled
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: {
                size: "small",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard">
        <FormLabel component="label">Medium</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: {
                size: "medium",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard">
        <FormLabel component="label">Single Input</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              field: SingleInputTimeRangeField,
            }}
            slotProps={{
              textField: {
                size: "small",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard">
        <FormLabel component="label">Field Single Input</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SingleInputTimeRangeField
            className="mb-0"
            slotProps={{
              textField: {
                size: "small",
                variant: "standard",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
