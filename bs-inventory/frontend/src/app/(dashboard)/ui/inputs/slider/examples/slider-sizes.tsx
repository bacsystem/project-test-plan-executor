import { useState } from "react";

import { Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

export default function SliderSizes() {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Sizes
          </Typography>
          <FormGroup>
            <FormLabel component="label">Small</FormLabel>
            <Slider value={value} onChange={handleChange} size="small" valueLabelDisplay="auto" />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Medium</FormLabel>
            <Slider value={value} onChange={handleChange} size="medium" valueLabelDisplay="auto" />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
