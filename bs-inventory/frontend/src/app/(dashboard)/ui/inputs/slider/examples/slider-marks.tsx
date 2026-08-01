import { useState } from "react";

import { Box, Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

const MAX = 100;
const MIN = 0;
const marksCustom = [
  { value: MIN, label: "" },
  { value: MAX, label: "" },
];

export default function SliderMarks() {
  const [valCustom, setValCustom] = useState<number>(MIN);
  const handleChangeCustom = (_: Event, newValue: number | number[]) => {
    setValCustom(newValue as number);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Marks Placement
          </Typography>

          <FormGroup>
            <FormLabel component="label">Marks</FormLabel>
            <Slider
              marks={marksCustom}
              step={10}
              value={valCustom}
              valueLabelDisplay="auto"
              size="small"
              min={MIN}
              max={MAX}
              onChange={handleChangeCustom}
            />
            <Box className="flex flex-row justify-between">
              <Typography variant="body2" onClick={() => setValCustom(MIN)} className="cursor-pointer">
                {MIN} min
              </Typography>
              <Typography variant="body2" onClick={() => setValCustom(MAX)} className="cursor-pointer">
                {MAX} max
              </Typography>
            </Box>
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
