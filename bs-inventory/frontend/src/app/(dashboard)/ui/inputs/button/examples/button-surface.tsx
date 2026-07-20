import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonSurface() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Surface Buttons
          </Typography>
          <Box className="row flex flex-wrap items-start gap-2">
            <Button variant="surface">Primary</Button>
            <Button variant="surface" disabled>
              Disabled
            </Button>
            <Button variant="surface" href="#text-buttons">
              Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
