import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function SelectLabelsAndHelperText() {
  const [age, setAge] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Labels and Helper Text
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
              <FormHelperText>Helper text label</FormHelperText>
            </FormControl>

            <FormControl fullWidth size="small" variant="standard" className="outlined">
              <FormLabel component="label" className="mb-0!">
                Small
              </FormLabel>
              <FormHelperText className="mt-0 mb-2">Helper text label</FormHelperText>
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
