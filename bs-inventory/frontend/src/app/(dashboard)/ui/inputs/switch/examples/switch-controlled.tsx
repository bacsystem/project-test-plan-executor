import { useState } from "react";

import {
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";

export default function SwitchControlled() {
  const [checked1, setChecked1] = useState(true);
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1(event.target.checked);
  };

  const [checked2, setChecked2] = useState(false);
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked);
  };

  const [checked3, setChecked3] = useState(false);
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked3(event.target.checked);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Controlled
          </Typography>
          <FormControl className="mb-0">
            <FormLabel>Ingredients</FormLabel>
            <FormGroup className="mb-0 flex flex-col gap-2">
              <FormControlLabel
                control={<Switch size="small" checked={checked1} onChange={handleChange1} />}
                label="Cheese"
              />
              <FormControlLabel
                control={<Switch size="small" checked={checked2} onChange={handleChange2} />}
                label="Tomato"
              />
              <FormControlLabel
                control={<Switch size="small" checked={checked3} onChange={handleChange3} />}
                label="Lettuce"
              />
            </FormGroup>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}
