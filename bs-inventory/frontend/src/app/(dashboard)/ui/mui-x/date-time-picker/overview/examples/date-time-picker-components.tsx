import { FormControl, FormLabel } from "@mui/material";
import { DateCalendar, DateField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function DateTimePickerComponents() {
  return (
    <>
      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Date Picker</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
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
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined">
        <FormLabel component="label">Date Field</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            className="mb-0"
            slotProps={{
              textField: { size: "small", variant: "standard" },
            }}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl className="outlined mb-0" fullWidth>
        <FormLabel component="label">Date Calendar</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
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
          />
        </LocalizationProvider>
      </FormControl>
    </>
  );
}
