import { Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

function valuetext(value: number) {
  return `${value}°C`;
}

const marks = [
  { value: 0, label: "0°C" },
  { value: 20, label: "20°C" },
  { value: 37, label: "37°C" },
  { value: 100, label: "100°C" },
];

export default function SliderDiscrete() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Discrete Sliders
          </Typography>

          <FormGroup>
            <FormLabel component="label">Small</FormLabel>
            <Slider
              size="small"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={10}
              marks
              min={10}
              max={110}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Small Disabled</FormLabel>
            <Slider
              disabled
              size="small"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              shiftStep={30}
              step={10}
              marks
              min={10}
              max={110}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Custom Marks</FormLabel>
            <Slider
              defaultValue={20}
              getAriaValueText={valuetext}
              step={10}
              valueLabelDisplay="auto"
              marks={marks}
              size="small"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Restricted Values</FormLabel>
            <Slider
              defaultValue={20}
              getAriaValueText={valuetext}
              step={null}
              valueLabelDisplay="auto"
              marks={marks}
              size="small"
            />
          </FormGroup>

          <FormGroup>
            <FormLabel component="label">Label Always Visible</FormLabel>
            <Slider
              defaultValue={20}
              getAriaValueText={valuetext}
              step={null}
              valueLabelDisplay="on"
              marks={marks}
              size="small"
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
