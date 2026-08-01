import { useState } from "react";

import { Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

export default function SliderColor() {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Color
          </Typography>

          <FormGroup>
            <FormLabel component="label">Primary</FormLabel>
            <Slider value={value} onChange={handleChange} color="primary" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Secondary</FormLabel>
            <Slider value={value} onChange={handleChange} color="secondary" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Accent 1</FormLabel>
            <Slider value={value} onChange={handleChange} color="accent-1" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Accent 2</FormLabel>
            <Slider value={value} onChange={handleChange} color="accent-2" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Accent 3</FormLabel>
            <Slider value={value} onChange={handleChange} color="accent-3" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Accent 4</FormLabel>
            <Slider value={value} onChange={handleChange} color="accent-4" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Warning</FormLabel>
            <Slider value={value} onChange={handleChange} color="warning" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Success</FormLabel>
            <Slider value={value} onChange={handleChange} color="success" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Info</FormLabel>
            <Slider value={value} onChange={handleChange} color="info" size="small" />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Error</FormLabel>
            <Slider value={value} onChange={handleChange} color="error" size="small" />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
