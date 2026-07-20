import dayjs from "dayjs";

import { Box, FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiInputTimeRangeField, SingleInputTimeRangeField, TimeRangePicker } from "@mui/x-date-pickers-pro";

import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeRangeFilled() {
  return (
    <Box>
      <FormControl fullWidth variant="filled">
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
                label: "Small",
                size: "small",
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled" className="mb-0">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiInputTimeRangeField
            className="mb-0"
            slotProps={{
              textField: ({ position }) => ({
                label: position === "start" ? "From" : "To",
                size: "small",
                variant: "filled",
              }),
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
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
                label: "Readonly",
                size: "small",
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
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
                label: "Disabled",
                size: "small",
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
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
                label: "Medium",
                size: "medium",
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
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
                label: "Single Input",
                size: "small",
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="filled">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SingleInputTimeRangeField
            className="mb-0"
            slotProps={{
              textField: {
                label: "Field Single Input",
                size: "small",
                variant: "filled",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
