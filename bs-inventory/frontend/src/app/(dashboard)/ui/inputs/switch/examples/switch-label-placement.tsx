import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";

export default function SwitchLabelPlacement() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Label Placement
          </Typography>

          <Box className="flex flex-col">
            <FormControl component="fieldset" className="mb-0">
              <FormLabel component="legend">Start</FormLabel>
              <FormGroup row className="gap-4">
                <FormControlLabel
                  value="start"
                  control={<Switch size="small" />}
                  label="Start"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="start"
                  control={<Switch size="small" />}
                  label="Start"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className="mb-0">
              <FormLabel component="legend">End</FormLabel>
              <FormGroup row className="gap-4">
                <FormControlLabel value="end" control={<Switch size="small" />} label="End" labelPlacement="end" />
                <FormControlLabel value="end" control={<Switch size="small" />} label="End" labelPlacement="end" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className="mb-0">
              <FormLabel component="legend">Top</FormLabel>
              <FormGroup row className="gap-4">
                <FormControlLabel value="top" control={<Switch size="small" />} label="Top" labelPlacement="top" />
                <FormControlLabel value="top" control={<Switch size="small" />} label="Top" labelPlacement="top" />
              </FormGroup>
            </FormControl>

            <FormControl component="fieldset" className="mb-0">
              <FormLabel component="legend">Bottom</FormLabel>
              <FormGroup row className="gap-4">
                <FormControlLabel
                  value="bottom"
                  control={<Switch size="small" />}
                  label="Bottom"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="bottom"
                  control={<Switch size="small" />}
                  label="Bottom"
                  labelPlacement="bottom"
                />
              </FormGroup>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
