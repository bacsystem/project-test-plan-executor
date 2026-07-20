import dayjs, { Dayjs } from "dayjs";
import React from "react";

import { Box, FormControl, FormLabel } from "@mui/material";
import { LocalizationProvider, TimeClock } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function TimeClocks() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2025-04-17T15:30"));

  return (
    <Box className="flex flex-col items-start">
      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Basic</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Uncontrolled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Controlled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Disabled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            disabled
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Readonly</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            readOnly
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Hours Minutes and Seconds</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["hours", "minutes", "seconds"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Hours</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["hours"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Minutes and Seconds</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            views={["minutes", "seconds"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">Locale Default</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">AM PM Enabled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            ampm
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl fullWidth variant="standard" className="outlined max-w-sm">
        <FormLabel component="label">AM PM Disabled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimeClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-5"
            slots={{
              rightArrowIcon: (props) => {
                return <NiChevronRightSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
              leftArrowIcon: (props) => {
                return <NiChevronLeftSmall {...props} className={cn(props.className, "text-text-secondary")} />;
              },
            }}
            defaultValue={dayjs("2025-04-17T15:30")}
            ampm={false}
          />
        </LocalizationProvider>
      </FormControl>
    </Box>
  );
}
