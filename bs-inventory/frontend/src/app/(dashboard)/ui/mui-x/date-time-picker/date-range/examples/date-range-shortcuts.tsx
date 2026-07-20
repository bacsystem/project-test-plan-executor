import dayjs, { Dayjs } from "dayjs";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider, PickersShortcutsItem } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange, DesktopDateRangePicker } from "@mui/x-date-pickers-pro";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

const shortcutsItems: PickersShortcutsItem<DateRange<Dayjs>>[] = [
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("week"), today.endOf("week")];
    },
  },
  {
    label: "Last Week",
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, "day");
      return [prevWeek.startOf("week"), prevWeek.endOf("week")];
    },
  },
  {
    label: "Last 7 Days",
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, "day"), today];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month"), today.endOf("month")];
    },
  },
  {
    label: "Next Month",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [startOfNextMonth, startOfNextMonth.endOf("month")];
    },
  },
  { label: "Reset", getValue: () => [null, null] },
];

export default function DateRangeShortcuts() {
  return (
    <Box className="flex flex-col items-start">
      <FormControl variant="standard" fullWidth className="outlined max-w-sm">
        <FormLabel component="label">Set</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateRangePicker
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
              shortcuts: {
                items: shortcutsItems,
                changeImportance: "set",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" fullWidth className="outlined mb-0 max-w-sm">
        <FormLabel component="label">Accept</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDateRangePicker
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
              shortcuts: {
                items: shortcutsItems,
                changeImportance: "accept",
              },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
