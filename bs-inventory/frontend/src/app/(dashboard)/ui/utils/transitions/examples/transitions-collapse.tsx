"use client";
import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";

const icon = (
  <Paper className="border-grey-100 h-24 w-24 rounded-lg border p-4">
    <svg className="h-16 w-16">
      <Box component="polygon" points="0,60 30,00, 60,60" className="fill-grey-25" />
    </svg>
  </Paper>
);

export default function TransitionsCollapse() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box>
      <FormControlLabel control={<Switch checked={checked} onChange={handleChange} />} label="Show" className="mb-4" />
      <Box className="flex flex-col justify-between gap-2">
        <Box className="h-24 w-24">
          <Collapse in={checked}>{icon}</Collapse>
        </Box>
        <Box className="h-24 w-24">
          <Collapse in={checked} collapsedSize={40}>
            {icon}
          </Collapse>
        </Box>
        <Box className="h-24 w-24">
          <Collapse orientation="horizontal" in={checked}>
            {icon}
          </Collapse>
        </Box>
        <Box className="h-24 w-24">
          <Collapse orientation="horizontal" in={checked} collapsedSize={40}>
            {icon}
          </Collapse>
        </Box>
      </Box>
    </Box>
  );
}
