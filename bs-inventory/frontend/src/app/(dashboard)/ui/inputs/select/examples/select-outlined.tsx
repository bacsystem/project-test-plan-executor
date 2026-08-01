import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function SelectOutlined() {
  const [age, setAge] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Outlined
          </Typography>
          <Box>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Small</InputLabel>
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

            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel>Readonly</InputLabel>
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

            <FormControl fullWidth variant="outlined" size="small" disabled>
              <InputLabel>Disabled</InputLabel>
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

            <FormControl fullWidth size="medium" variant="outlined">
              <InputLabel>Medium</InputLabel>
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
