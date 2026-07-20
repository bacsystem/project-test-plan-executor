import { FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import NiCalendar from "@/icons/nexture/ni-calendar";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function DateTimePickerCommunityVersion() {
  return (
    <FormControl className="outlined mb-0" fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormLabel component="label">Date Picker</FormLabel>
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
  );
}
