import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function SelectOtherProps() {
  const [age, setAge] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Other Props
          </Typography>
          <Box className="flex flex-col items-start">
            <FormControl className="min-w-32" disabled size="small">
              <InputLabel>Age</InputLabel>
              <Select value={age} label="Age" onChange={handleChange} IconComponent={NiChevronDownSmall}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Disabled</FormHelperText>
            </FormControl>
            <FormControl className="min-w-32" error size="small">
              <InputLabel>Age</InputLabel>
              <Select
                value={age}
                label="Age"
                onChange={handleChange}
                renderValue={(value) => `⚠️  - ${value}`}
                IconComponent={NiChevronDownSmall}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Error</FormHelperText>
            </FormControl>
            <FormControl className="min-w-32" size="small">
              <InputLabel>Age</InputLabel>
              <Select
                value={age}
                label="Age"
                onChange={handleChange}
                inputProps={{ readOnly: true }}
                IconComponent={NiChevronDownSmall}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Read only</FormHelperText>
            </FormControl>
            <FormControl required className="min-w-32" size="small">
              <InputLabel>Age</InputLabel>
              <Select value={age} label="Age *" onChange={handleChange} IconComponent={NiChevronDownSmall}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
