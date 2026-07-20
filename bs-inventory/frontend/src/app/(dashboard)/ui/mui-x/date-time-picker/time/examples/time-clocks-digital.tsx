import dayjs, { Dayjs } from "dayjs";
import React from "react";

import { Box, FormControl, FormLabel } from "@mui/material";
import { DigitalClock, LocalizationProvider, MultiSectionDigitalClock, TimeView } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const shouldDisableTime = (value: Dayjs, view: TimeView) => {
  const hour = value.hour();
  if (view === "hours") {
    return hour < 9 || hour > 13;
  }
  if (view === "minutes") {
    const minute = value.minute();
    return minute > 20 && hour === 13;
  }
  return false;
};

export default function TimeClocksDigital() {
  return (
    <Box className="flex flex-col items-start">
      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Digital Clock</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Disabled</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              disabled
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Readonly</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              readOnly
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Multi Section</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Disabled</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              disabled
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>

        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Readonly</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              readOnly
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <FormControl variant="standard" className="outlined">
        <FormLabel component="label">Hours Minutes and Seconds</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiSectionDigitalClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
            defaultValue={dayjs("2025-04-17T05:30")}
            views={["hours", "minutes", "seconds"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" className="outlined">
        <FormLabel component="label">Hours</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiSectionDigitalClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
            defaultValue={dayjs("2025-04-17T05:30")}
            views={["hours"]}
          />
        </LocalizationProvider>
      </FormControl>

      <FormControl variant="standard" className="outlined">
        <FormLabel component="label">Minutes and Seconds</FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MultiSectionDigitalClock
            className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
            defaultValue={dayjs("2025-04-17T05:30")}
            views={["minutes", "seconds"]}
          />
        </LocalizationProvider>
      </FormControl>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Locale Default</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">&nbsp;</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">AM PM Enabled</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
              ampm
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">&nbsp;</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
              ampm
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">AM PM Disabled</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
              ampm={false}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">&nbsp;</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T05:30")}
              ampm={false}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Steps</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T00:00")}
              timeStep={60}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">&nbsp;</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T00:00")}
              timeSteps={{ hours: 2, minutes: 15, seconds: 10 }}
              views={["hours", "minutes", "seconds"]}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>

      <Box className="flex flex-col gap-4 lg:flex-row">
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">Skip Disabled</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T00:00")}
              skipDisabled
              timeStep={60}
            />
          </LocalizationProvider>
        </FormControl>
        <FormControl variant="standard" className="outlined">
          <FormLabel component="label">&nbsp;</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MultiSectionDigitalClock
              className="border-grey-100 ms-0 mb-0 rounded-lg border p-2"
              defaultValue={dayjs("2025-04-17T00:00")}
              skipDisabled
              shouldDisableTime={shouldDisableTime}
              ampm={false}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
    </Box>
  );
}
