import { useState } from "react";

import { Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

function calculateValue(value: number) {
  return 2 ** value;
}

function valueLabelFormat(value: number) {
  const units = ["KB", "MB", "GB", "TB"];

  let unitIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1024 && unitIndex < units.length - 1) {
    unitIndex += 1;
    scaledValue /= 1024;
  }

  return `${scaledValue} ${units[unitIndex]}`;
}

export default function SliderNonLinear() {
  const [valueNonLinear, setValueNonLinear] = useState<number>(10);
  const handleChangeNonLinear = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setValueNonLinear(newValue);
    }
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Non-linear Scale
          </Typography>

          <FormGroup>
            <FormLabel component="label">Storage: {valueLabelFormat(calculateValue(valueNonLinear))}</FormLabel>
            <Slider
              value={valueNonLinear}
              min={5}
              step={1}
              max={30}
              scale={calculateValue}
              getAriaValueText={valueLabelFormat}
              valueLabelFormat={valueLabelFormat}
              onChange={handleChangeNonLinear}
              valueLabelDisplay="auto"
              size="small"
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
