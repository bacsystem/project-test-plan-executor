import * as React from "react";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import NiDrop from "@/icons/nexture/ni-drop";
import NiFire from "@/icons/nexture/ni-fire";
import NiFlash from "@/icons/nexture/ni-flash";

export default function TabsSize() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange} className="mb-2">
        <Tab icon={<NiFire size="tiny" />} iconPosition="start" label="Label 1" className="tiny" />
        <Tab icon={<NiDrop size="tiny" />} iconPosition="start" label="Label 2" className="tiny" />
        <Tab icon={<NiFlash size="tiny" />} iconPosition="start" label="Label 3" className="tiny" />
      </Tabs>
      <Tabs value={value} onChange={handleChange} className="mb-2">
        <Tab icon={<NiFire size="small" />} iconPosition="start" label="Label 1" className="small" />
        <Tab icon={<NiDrop size="small" />} iconPosition="start" label="Label 2" className="small" />
        <Tab icon={<NiFlash size="small" />} iconPosition="start" label="Label 3" className="small" />
      </Tabs>
      <Tabs value={value} onChange={handleChange} className="mb-0">
        <Tab icon={<NiFire size="medium" />} iconPosition="start" label="Label 1" />
        <Tab icon={<NiDrop size="medium" />} iconPosition="start" label="Label 2" />
        <Tab icon={<NiFlash size="medium" />} iconPosition="start" label="Label 3" />
      </Tabs>
    </>
  );
}
