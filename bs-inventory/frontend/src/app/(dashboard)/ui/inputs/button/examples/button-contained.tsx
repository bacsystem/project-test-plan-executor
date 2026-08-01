import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonContained() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Contained Buttons
          </Typography>
          <Box className="row flex flex-wrap items-start gap-2">
            <Button variant="contained">Primary</Button>
            <Button variant="contained" disabled>
              Disabled
            </Button>
            <Button variant="contained" href="#text-buttons">
              Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
