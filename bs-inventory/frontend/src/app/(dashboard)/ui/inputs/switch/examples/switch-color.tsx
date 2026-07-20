import { Box, Card, CardContent, FormControl, FormControlLabel, Grid, Switch, Typography } from "@mui/material";

export default function SwitchColor() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Color
          </Typography>
          <Box className="flex flex-col">
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="primary" />} label="Primary" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="secondary" />} label="Secondary" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="accent-1" />} label="Accent 1" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="accent-2" />} label="Accent 2" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="accent-3" />} label="Accent 3" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="accent-4" />} label="Accent 4" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="warning" />} label="Warning" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="success" />} label="Success" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="info" />} label="Info" />
            </FormControl>
            <FormControl>
              <FormControlLabel control={<Switch defaultChecked size="small" color="error" />} label="Error" />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
