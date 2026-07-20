import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonPastel() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Pastel Buttons
          </Typography>
          <Box className="row flex flex-wrap items-start gap-2">
            <Button variant="pastel">Primary</Button>
            <Button variant="pastel" disabled>
              Disabled
            </Button>
            <Button variant="pastel" href="#text-buttons">
              Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
