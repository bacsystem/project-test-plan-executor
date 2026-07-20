import { useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";

export default function SwitchFormGroup() {
  const [stateGrouped, setStateGrouped] = useState({
    gilad: true,
    jason: false,
    antoine: true,
  });

  const handleChangeGrouped = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateGrouped({
      ...stateGrouped,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Form Group
          </Typography>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup className="flex flex-col gap-2">
              <FormControlLabel
                control={
                  <Switch checked={stateGrouped.gilad} onChange={handleChangeGrouped} name="gilad" size="small" />
                }
                label="Gilad Gray"
              />
              <FormControlLabel
                control={
                  <Switch checked={stateGrouped.jason} onChange={handleChangeGrouped} name="jason" size="small" />
                }
                label="Jason Killian"
              />
              <FormControlLabel
                control={
                  <Switch checked={stateGrouped.antoine} onChange={handleChangeGrouped} name="antoine" size="small" />
                }
                label="Antoine Llorca"
              />
              <FormHelperText>Be careful!</FormHelperText>
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}
