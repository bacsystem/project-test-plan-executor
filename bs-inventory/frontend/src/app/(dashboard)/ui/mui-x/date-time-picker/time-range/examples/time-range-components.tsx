import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimeRangePicker, MobileTimeRangePicker, TimeRangePicker } from "@mui/x-date-pickers-pro";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function TimeRangeComponents() {
  return (
    <Box className="flex flex-col items-start">
      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Desktop</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopTimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              desktopPaper: { className: "outlined" },
              tabs: {
                timeIcon: <NiClock />,
              },
            }}
            defaultValue={[dayjs("2025-04-17"), dayjs("2025-04-21")]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Mobile</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileTimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              actionBar: { className: "p-0!" },
              toolbar: { className: "p-0!" },
              layout: { className: "py-7" },
              tabs: {
                timeIcon: <NiClock />,
              },
            }}
            defaultValue={[dayjs("2025-04-17"), dayjs("2025-04-21")]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Responsive</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              actionBar: { className: "p-0!" },
              toolbar: { className: "p-0" },
              tabs: {
                timeIcon: <NiClock />,
              },
            }}
            defaultValue={[dayjs("2025-04-17"), dayjs("2025-04-21")]}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
