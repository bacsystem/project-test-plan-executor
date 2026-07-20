import { SyntheticEvent, useState } from "react";

import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiReligion from "@/icons/nexture/ni-religion";

export default function DashboardBookingHolidays() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Holidays
      </Typography>
      <Card>
        <CardContent>
          <Tabs
            className="flex grow"
            classes={{ list: "gap-2 flex grow pb-2" }}
            value={tabValue}
            onChange={handleChange}
            variant="scrollable"
            allowScrollButtonsMobile
            scrollButtons={true}
            slots={{
              endScrollButtonIcon: (props) => {
                return <NiChevronRightSmall size="medium" {...props} />;
              },
              startScrollButtonIcon: (props) => {
                return <NiChevronLeftSmall size="medium" {...props} />;
              },
            }}
          >
            <Tab
              className="w-11 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-primary">Jan</Typography>
                  <Typography className="text-text-secondary">25</Typography>
                </Box>
              }
            />
            <Tab
              className="w-11 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-primary">Feb</Typography>
                  <Typography className="text-text-secondary">25</Typography>
                </Box>
              }
            />
            <Tab
              className="w-11 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-primary">Mar</Typography>
                  <Typography className="text-text-secondary">25</Typography>
                </Box>
              }
            />
            <Tab
              className="w-11 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-primary">Apr</Typography>
                  <Typography className="text-text-secondary">25</Typography>
                </Box>
              }
            />
            <Tab
              className="w-11 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-disabled">May</Typography>
                  <Typography className="text-text-disabled">25</Typography>
                </Box>
              }
            />
            <Tab
              className="w-11 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-disabled">Jun</Typography>
                  <Typography className="text-text-disabled">25</Typography>
                </Box>
              }
            />
          </Tabs>
          <Box className="px-0">
            <Typography className="mb-5" variant="subtitle1">
              10 May 2026 Monday
            </Typography>
            <Box className="flex flex-col gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiMagicWand className="text-primary flex-none"></NiMagicWand>
                <Box className="w-full">
                  <Typography variant="subtitle2">New Year's Day</Typography>
                  <Box className="flex w-full flex-row justify-between">
                    <Typography variant="body2" className="text-text-secondary">
                      1 January 2025
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      Wednesday
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiReligion className="text-secondary flex-none"></NiReligion>
                <Box className="w-full">
                  <Typography variant="subtitle2">Epiphany</Typography>
                  <Box className="flex w-full flex-row justify-between">
                    <Typography variant="body2" className="text-text-secondary">
                      6 January 2025
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      Monday
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
