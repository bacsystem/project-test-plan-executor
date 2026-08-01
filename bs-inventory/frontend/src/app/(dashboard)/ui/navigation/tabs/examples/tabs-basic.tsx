import * as React from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

export default function TabsBasic() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="w-full text-base">
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange}>
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1" className="p-0">
          Item One
        </TabPanel>
        <TabPanel value="2" className="p-0">
          Item Two
        </TabPanel>
        <TabPanel value="3" className="p-0">
          Item Three
        </TabPanel>
      </TabContext>
    </Box>
  );
}
