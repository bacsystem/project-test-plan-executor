import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmpty } from "@/icons/form/mui-checkbox";

export default function CheckboxFormGroup() {
  const [stateGroup, setStateGroup] = useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChangeGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateGroup({
      ...stateGroup,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = stateGroup;
  const errorGroup = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Form Group
          </Typography>

          <Box className="flex flex-row gap-4">
            <FormControl component="fieldset" variant="standard" className="flex flex-col gap-2">
              <FormLabel component="legend">Assign responsibility</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChangeGroup}
                    name="gilad"
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jason}
                    onChange={handleChangeGroup}
                    name="jason"
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={antoine}
                    onChange={handleChangeGroup}
                    name="antoine"
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Antoine Llorca"
              />
              <FormHelperText>Be careful</FormHelperText>
            </FormControl>
            <FormControl
              required
              error={errorGroup}
              component="fieldset"
              variant="standard"
              className="flex flex-col gap-2"
            >
              <FormLabel component="legend">Pick two</FormLabel>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={gilad}
                    onChange={handleChangeGroup}
                    name="gilad"
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jason}
                    onChange={handleChangeGroup}
                    name="jason"
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={antoine}
                    onChange={handleChangeGroup}
                    name="antoine"
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                  />
                }
                label="Antoine Llorca"
              />
              <FormHelperText>You can display an error</FormHelperText>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
