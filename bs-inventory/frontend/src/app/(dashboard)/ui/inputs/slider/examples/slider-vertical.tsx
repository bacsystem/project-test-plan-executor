import { Box, Card, CardContent, FormGroup, FormLabel, Grid, Slider, Typography } from "@mui/material";

function valuetext(value: number) {
  return `${value}°C`;
}

const marks = [
  { value: 0, label: "0°C" },
  { value: 20, label: "20°C" },
  { value: 37, label: "37°C" },
  { value: 100, label: "100°C" },
];

export default function SliderVertical() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Vertical Sliders
          </Typography>

          <Box className="flex flex-row items-start gap-4">
            <FormGroup>
              <FormLabel component="label">Default</FormLabel>
              <Slider
                className="h-64"
                orientation="vertical"
                size="small"
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                defaultValue={30}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel component="label">Disabled</FormLabel>
              <Slider
                className="h-64"
                orientation="vertical"
                size="small"
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                defaultValue={30}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <FormLabel component="label">Marked</FormLabel>
              <Slider
                className="h-64"
                orientation="vertical"
                size="small"
                valueLabelDisplay="auto"
                defaultValue={[20, 37]}
                marks={marks}
              />
            </FormGroup>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
