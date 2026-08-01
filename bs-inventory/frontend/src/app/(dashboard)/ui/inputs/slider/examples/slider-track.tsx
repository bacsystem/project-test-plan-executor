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

export default function SliderTrack() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Track
          </Typography>

          <FormGroup>
            <FormLabel component="label">Removed Track</FormLabel>
            <Slider track={false} size="small" getAriaValueText={valuetext} defaultValue={30} marks={marks} />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Removed Track Range Slider</FormLabel>
            <Slider track={false} size="small" getAriaValueText={valuetext} defaultValue={[20, 37, 50]} marks={marks} />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Inverted Track</FormLabel>
            <Slider track="inverted" size="small" getAriaValueText={valuetext} defaultValue={30} marks={marks} />
          </FormGroup>
          <FormGroup>
            <FormLabel component="label">Inverted Track Range</FormLabel>
            <Slider track="inverted" size="small" getAriaValueText={valuetext} defaultValue={[20, 37]} marks={marks} />
          </FormGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
