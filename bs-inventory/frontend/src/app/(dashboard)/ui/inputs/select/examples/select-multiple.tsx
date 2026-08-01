import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Checkbox,
  Chip,
  FormControl,
  FormLabel,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmpty } from "@/icons/form/mui-checkbox";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";

export default function SelectMultiple() {
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];
  const [personName, setPersonName] = useState<string[]>([]);
  const handleChangePersonName = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Multiple Select
          </Typography>
          <Box className="flex flex-col items-start">
            <FormControl fullWidth variant="standard" className="outlined" size="small">
              <FormLabel component="label">Default</FormLabel>
              <Select
                label="Default"
                multiple
                value={personName}
                onChange={handleChangePersonName}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="standard" className="outlined" size="small">
              <FormLabel component="label">Checkbox</FormLabel>
              <Select
                label="Checkbox"
                multiple
                value={personName}
                onChange={handleChangePersonName}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
                renderValue={(selected) => selected.join(", ")}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox
                      checked={personName.includes(name)}
                      className="me-2 min-h-0 px-0! py-[1px]!"
                      icon={<CheckboxSmallEmpty />}
                      checkedIcon={<CheckboxSmallChecked />}
                      size="small"
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth variant="standard" className="outlined" size="small">
              <FormLabel component="label">Chip</FormLabel>
              <Select
                label="Chip"
                multiple
                value={personName}
                onChange={handleChangePersonName}
                IconComponent={NiChevronDownSmall}
                MenuProps={{ className: "outlined" }}
                renderValue={(selected) => (
                  <Box className="flex flex-row flex-wrap gap-1">
                    {selected.map((value) => (
                      <Chip size="small" key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
