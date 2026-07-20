import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonText() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Text Buttons
          </Typography>
          <Box className="row flex flex-wrap items-start gap-2">
            <Button>Primary</Button>
            <Button disabled>Disabled</Button>
            <Button href="#text-buttons">Link</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
