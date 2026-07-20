import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import {
  DesktopTimePicker,
  LocalizationProvider,
  MobileTimePicker,
  StaticTimePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeComponents() {
  return (
    <Box className="flex flex-col items-start">
      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Desktop</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopTimePicker
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
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Mobile</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              actionBar: { className: "p-0!" },
              toolbar: { className: "p-0!" },
              layout: { className: "py-7" },
            }}
            orientation="portrait"
            defaultValue={dayjs("2025-04-17T15:30")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Responsive</FormLabel>
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
              actionBar: { className: "p-0!" },
              toolbar: { className: "p-0!" },
            }}
            orientation="portrait"
            defaultValue={dayjs("2025-04-17T15:30")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Static</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticTimePicker
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-7"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              actionBar: { className: "p-0!" },
              toolbar: { className: "p-0!" },
            }}
            orientation="portrait"
            defaultValue={dayjs("2025-04-17T15:30")}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
