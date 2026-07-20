import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function SelectStandardOutlined() {
  const [age, setAge] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standard Outlined
          </Typography>

          <Box>
            <FormControl fullWidth size="small" variant="standard" className="outlined">
              <FormLabel component="label">Small</FormLabel>
              <Select
                value={age}
                label="Small"
                onChange={handleChange}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" variant="standard" className="outlined">
              <FormLabel component="label">Readonly</FormLabel>
              <Select
                value={"10"}
                label="Small"
                onChange={handleChange}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
                readOnly
              >
                <MenuItem value={"10"}>Ten</MenuItem>
                <MenuItem value={"20"}>Twenty</MenuItem>
                <MenuItem value={"30"}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="standard" className="outlined" size="small" disabled>
              <FormLabel component="label">Disabled</FormLabel>
              <Select
                value={age}
                label="Disabled"
                onChange={handleChange}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="medium" variant="standard" className="outlined">
              <FormLabel component="label">Medium</FormLabel>
              <Select
                value={age}
                label="Medium"
                onChange={handleChange}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
