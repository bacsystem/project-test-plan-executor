import { useState } from "react";

import { Box, Card, CardContent, Chip, FormGroup, FormLabel, Grid, Slider, TextField, Typography } from "@mui/material";

export default function SliderInput() {
  const [valueInput, setValueInput] = useState(30);

  const handleSliderChangeInput = (event: Event, newValue: number | number[]) => {
    setValueInput(newValue as number);
  };

  const handleInputChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(event.target.value === "" ? 0 : Number(event.target.value));
  };

  const handleBlurInput = () => {
    if (valueInput < 0) {
      setValueInput(0);
    } else if (valueInput > 100) {
      setValueInput(100);
    }
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Input
          </Typography>

          <FormGroup>
            <FormLabel component="label">Label</FormLabel>
            <Box className="flex flex-row items-center gap-4">
              <Slider
                className="w-64"
                value={typeof valueInput === "number" ? valueInput : 0}
                onChange={handleSliderChangeInput}
                size="small"
                valueLabelDisplay="auto"
              />
              <TextField
                label="Filled"
                variant="standard"
                className="outlined"
                size="small"
                value={valueInput}
                onChange={handleInputChangeInput}
                onBlur={handleBlurInput}
                slotProps={{
                  htmlInput: {
                    step: 10,
                    min: 0,
                    max: 100,
                    type: "number",
                  },
                }}
              />
            </Box>
          </FormGroup>
          <FormGroup className="w-72">
            <Box className="flex w-full flex-row items-center justify-between gap-4">
              <FormLabel component="label" className="mb-0!">
                Label
              </FormLabel>
              <Chip label={valueInput} variant="outlined" />
            </Box>
            <Box>
              <Slider
                className="w-full"
                value={typeof valueInput === "number" ? valueInput : 0}
                onChange={handleSliderChangeInput}
                size="small"
                valueLabelDisplay="auto"
              />
            </Box>
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
