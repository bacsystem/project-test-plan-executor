import { SyntheticEvent, useState } from "react";

import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";

import NiChevronLeftSmall from "@/icons/nexture/ni-chevron-left-small";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiLaw from "@/icons/nexture/ni-law";
import NiToyBoat from "@/icons/nexture/ni-toy-boat";
import NiToySky from "@/icons/nexture/ni-toy-sky";

export default function DashboardLearningSchedule() {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Workshop Schedule
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
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Mo</Typography>
                  <Typography className="text-primary">10</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Tu</Typography>
                  <Typography className="text-text-secondary">11</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">We</Typography>
                  <Typography className="text-text-secondary">12</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Th</Typography>
                  <Typography className="text-text-secondary">13</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Fr</Typography>
                  <Typography className="text-primary">14</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-disabled">Sa</Typography>
                  <Typography className="text-text-disabled">15</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-disabled">Su</Typography>
                  <Typography className="text-text-disabled">16</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Mo</Typography>
                  <Typography className="text-text-secondary">17</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Tu</Typography>
                  <Typography className="text-text-secondary">18</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">We</Typography>
                  <Typography className="text-text-secondary">19</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Th</Typography>
                  <Typography className="text-text-secondary">20</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Fr</Typography>
                  <Typography className="text-text-secondary">21</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-disabled">Sa</Typography>
                  <Typography className="text-text-disabled">22</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-disabled">Su</Typography>
                  <Typography className="text-text-disabled">23</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Mo</Typography>
                  <Typography className="text-text-secondary">24</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">Tu</Typography>
                  <Typography className="text-text-secondary">25</Typography>
                </Box>
              }
            />
            <Tab
              className="w-10 [&:not(.Mui-selected)]:border-transparent"
              label={
                <Box className="flex flex-col">
                  <Typography className="text-text-secondary">We</Typography>
                  <Typography className="text-text-secondary">26</Typography>
                </Box>
              }
            />
          </Tabs>
          <Box className="px-0">
            <Typography className="text-text-secondary mb-5">10 May 2026 Monday</Typography>
            <Box className="flex flex-col gap-4">
              <Box className="flex flex-row gap-2.5">
                <NiToyBoat className="text-primary flex-none"></NiToyBoat>
                <Box className="w-full">
                  <Typography variant="subtitle2">Tiny Treasures: Crafting Wooden Toys at Home</Typography>
                  <Box className="flex w-full flex-row justify-between">
                    <Typography variant="body2" className="text-text-secondary">
                      Course introduction and setting goals.
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      10:30 AM
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiToySky className="text-secondary flex-none"></NiToySky>
                <Box className="w-full">
                  <Typography variant="subtitle2">Little Hands, Big Minds</Typography>
                  <Box className="flex w-full flex-row justify-between">
                    <Typography variant="body2" className="text-text-secondary">
                      Course lesson
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      02:30 PM
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="flex flex-row gap-2.5">
                <NiLaw className="text-accent-1 flex-none"></NiLaw>
                <Box className="w-full">
                  <Typography variant="subtitle2">Traditional Toys Workshop</Typography>
                  <Box className="flex w-full flex-row justify-between">
                    <Typography variant="body2" className="text-text-secondary">
                      Group project
                    </Typography>
                    <Typography variant="body2" className="text-text-secondary">
                      06:30 PM
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
