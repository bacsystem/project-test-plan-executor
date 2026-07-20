import { useState } from "react";

import { Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

export default function SliderStandard() {
  const [value, setValue] = useState<number>(30);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standard
          </Typography>

          <FormGroup>
            <FormLabel component="label">Default</FormLabel>
            <Slider value={value} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Disabled</FormLabel>
            <Slider disabled defaultValue={30} />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
