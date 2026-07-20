import React from "react";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiClock from "@/icons/nexture/ni-clock";
import NiCross from "@/icons/nexture/ni-cross";
import { cn } from "@/lib/utils";

export default function TimeClear() {
  const [cleared, setCleared] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <Box>
      <FormControl fullWidth variant="standard" className="outlined">
        <FormLabel component="label">Time</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            className="mb-0"
            slots={{
              openPickerIcon: (props) => {
                return <NiClock {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              clearIcon: (props) => {
                return <NiCross {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            slotProps={{
              textField: { size: "small", variant: "standard" },
              desktopPaper: { className: "outlined" },
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
