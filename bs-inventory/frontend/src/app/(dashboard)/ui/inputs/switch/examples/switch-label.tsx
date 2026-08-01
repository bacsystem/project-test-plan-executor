import { Box, Card, CardContent, FormControl, FormControlLabel, Grid, Switch, Typography } from "@mui/material";

export default function SwitchLabel() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Label
          </Typography>
          <Box className="flex flex-col">
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" />} label="Label" />
            </FormControl>
            <FormControl>
              <FormControlLabel required control={<Switch size="small" />} label="Required" />
            </FormControl>
            <FormControl>
              <FormControlLabel disabled control={<Switch size="small" disabled />} label="Disabled" />
            </FormControl>
            <FormControl>
              <FormControlLabel
                disabled
                control={<Switch size="small" defaultChecked disabled />}
                label="Disabled Checked"
              />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
