import { Box, Card, CardContent, Grid, Switch, Typography } from "@mui/material";

export default function SwitchBasic() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic
          </Typography>
          <Box className="flex flex-row items-start gap-4">
            <Switch defaultChecked size="small" />
            <Switch size="small" className="outlined" />
            <Switch size="small" />
            <Switch defaultChecked size="small" disabled />
            <Switch size="small" disabled />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
