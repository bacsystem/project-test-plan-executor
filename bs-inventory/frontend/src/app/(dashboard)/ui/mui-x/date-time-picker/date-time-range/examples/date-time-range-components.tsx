import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DateTimeRangePicker,
  DateTimeRangePickerTabs,
  DesktopDateTimeRangePicker,
  MobileDateTimeRangePicker,
} from "@mui/x-date-pickers-pro";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function DateTimeRangeComponents() {
  return (
    <Box className="flex flex-col items-start">
      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Desktop</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              switchViewIcon: (props) => {
                return <NiChevronDownSmall {...props} className={cn(props.className, "text-text-secondary")} />;
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
            }}
            defaultValue={[dayjs("2025-04-17"), dayjs("2025-04-21")]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Mobile</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              switchViewIcon: (props) => {
                return <NiChevronDownSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              tabs: (props) => {
                return (
                  <DateTimeRangePickerTabs
                    {...props}
                    dateIcon={<NiCalendar size={"small"} />}
                    timeIcon={<NiClock size={"small"} />}
                  ></DateTimeRangePickerTabs>
                );
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              actionBar: { className: "p-0!" },
              calendarHeader: { className: "p-0" },
              toolbar: { className: "p-0!" },
              tabs: { className: "border border-grey-100 rounded-lg px-1" },
              layout: { className: "py-7" },
            }}
            defaultValue={[dayjs("2025-04-17"), dayjs("2025-04-21")]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Responsive</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeRangePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiCalendar {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              switchViewIcon: (props) => {
                return <NiChevronDownSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              tabs: (props) => {
                return (
                  <DateTimeRangePickerTabs
                    {...props}
                    dateIcon={<NiCalendar size={"small"} />}
                    timeIcon={<NiClock size={"small"} />}
                  ></DateTimeRangePickerTabs>
                );
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              actionBar: { className: "p-0!" },
              calendarHeader: { className: "p-0" },
              toolbar: { className: "p-0!" },
              tabs: { className: "border border-grey-100 rounded-lg px-1" },
            }}
            defaultValue={[dayjs("2025-04-17"), dayjs("2025-04-21")]}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
