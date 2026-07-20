import dayjs, { Dayjs } from "dayjs";
import React from "react";

import { Box, FormControl, FormLabel } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import { cn } from "@/lib/utils";

export default function DateCalendars() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2025-04-17"));

  return (
    <Box className="flex flex-col items-start">
      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Basic</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            defaultValue={dayjs("2025-04-17")}
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

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Uncontrolled Calendar</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            defaultValue={dayjs("2025-04-17")}
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

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Controlled Calendar</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            defaultValue={dayjs("2025-04-17")}
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

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Disabled</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            disabled
            defaultValue={dayjs("2025-04-17")}
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

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Readonly</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            readOnly
            defaultValue={dayjs("2025-04-17")}
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

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Year View</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            defaultValue={dayjs("2025-04-17")}
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
            views={["month", "year"]}
            openTo="month"
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Year View</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            defaultValue={dayjs("2025-04-17")}
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
            openTo="year"
            views={["year"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Additional Days</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            showDaysOutsideCurrentMonth
            fixedWeekNumber={6}
            defaultValue={dayjs("2025-04-17")}
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

      <FormControl className="outlined" fullWidth>
        <FormLabel component="label">Week Number</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="border-grey-100 ms-0 mb-0 rounded-lg border"
            displayWeekNumber
            defaultValue={dayjs("2025-04-17")}
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
    </Box>
  );
}
