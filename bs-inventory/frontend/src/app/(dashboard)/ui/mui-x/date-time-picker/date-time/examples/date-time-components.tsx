import dayjs from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import {
  DateTimePicker,
  DesktopDateTimePicker,
  LocalizationProvider,
  MobileDateTimePicker,
  StaticDateTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiClock from "@/icons/nexture/ni-clock";
import { cn } from "@/lib/utils";

export default function DateTimeComponents() {
  return (
    <Box className="flex flex-col items-start">
      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Desktop</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateTimePicker
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
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Mobile</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
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
              actionBar: { className: "p-0!" },
              calendarHeader: { className: "p-0" },
              toolbar: { className: "p-0!" },
              layout: { className: "py-7" },
              tabs: {
                dateIcon: <NiCalendar />,
                timeIcon: <NiClock />,
              },
            }}
            orientation="portrait"
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Responsive</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
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
              actionBar: { className: "p-0!" },
              toolbar: { className: "p-0" },
              tabs: {
                dateIcon: <NiCalendar />,
                timeIcon: <NiClock />,
              },
            }}
            orientation="portrait"
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Static</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-7"
            slots={{
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
              actionBar: { className: "p-0!" },
              calendarHeader: { className: "p-0!" },
              toolbar: { className: "p-0!" },
              tabs: {
                dateIcon: <NiCalendar />,
                timeIcon: <NiClock />,
              },
            }}
            orientation="portrait"
            defaultValue={dayjs("2025-04-17")}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
