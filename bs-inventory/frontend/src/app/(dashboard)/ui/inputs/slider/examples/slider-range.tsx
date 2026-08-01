import { useState } from "react";

import { Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

const minDistance = 10;

function valuetext(value: number) {
  return `${value}°C`;
}

export default function SliderRange() {
  const [valueRange, setValueRange] = useState<number[]>([20, 37]);
  const handleChangeRange = (event: Event, newValue: number | number[]) => {
    setValueRange(newValue as number[]);
  };

  const [value1, setValue1] = useState<number[]>([20, 37]);
  const handleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  const [value2, setValue2] = useState<number[]>([20, 37]);
  const handleChange2 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setValue2([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue2([clamped - minDistance, clamped]);
      }
    } else {
      setValue2(newValue as number[]);
    }
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Range Slider
          </Typography>

          <FormGroup>
            <FormLabel component="label">Range</FormLabel>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={valueRange}
              onChange={handleChangeRange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              size="small"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Minimum Distance</FormLabel>
            <Slider
              value={value1}
              onChange={handleChange1}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              size="small"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Minimum Distance Shift</FormLabel>
            <Slider
              value={value2}
              onChange={handleChange2}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
              size="small"
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
