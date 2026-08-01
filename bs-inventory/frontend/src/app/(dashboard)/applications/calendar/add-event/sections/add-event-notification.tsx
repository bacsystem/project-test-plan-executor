import { useState } from "react";

import { Box, Card, CardContent, FormControl, FormLabel, Input, MenuItem, Select, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function AddEventNotification() {
  const [notification, setNotification] = useState({
    type: "Notification",
    beforeCount: "10",
    beforeUnit: "Minutes",
  });

  const handleTypeChange = (event: any) => {
    setNotification({ ...notification, type: event.target.value });
  };

  const handleUnitChange = (event: any) => {
    setNotification({ ...notification, beforeUnit: event.target.value });
  };

  const handleCountChange = (event: any) => {
    setNotification({ ...notification, beforeCount: event.target.value });
  };

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h6" component="h6" className="card-title">
          Notification
        </Typography>

        <Box className="flex flex-col">
          <FormControl size="small" variant="standard" className="outlined w-sm max-w-full">
            <FormLabel component="label">Type</FormLabel>
            <Select
              value={notification.type}
              label="Small"
              onChange={handleTypeChange}
              IconComponent={NiChevronDownSmall}
              MenuProps={{ className: "outlined" }}
            >
              <MenuItem value={"Notification"}>Notification</MenuItem>
              <MenuItem value={"Email"}>Email</MenuItem>
              <MenuItem value={"SMS"}>SMS</MenuItem>
              <MenuItem value={"Call"}>Call</MenuItem>
            </Select>
          </FormControl>

          <Box className="flex flex-row gap-2">
            <FormControl size="small" variant="standard" className="outlined mb-0 w-sm max-w-full">
              <FormLabel component="label">Notify Before</FormLabel>
              <Input placeholder="" value={notification.beforeCount} onChange={handleCountChange} type="number" />
            </FormControl>
            <FormControl size="small" variant="standard" className="outlined mb-0 w-sm max-w-full">
              <FormLabel component="label" className="opacity-0 select-none">
                Unit
              </FormLabel>
              <Select
                value={notification.beforeUnit}
                label="Small"
                onChange={handleUnitChange}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                <MenuItem value={"Minutes"}>Minutes</MenuItem>
                <MenuItem value={"Hours"}>Hours</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
