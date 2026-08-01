import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonBasic() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic Button
          </Typography>
          <Box className="row flex flex-wrap items-start gap-2">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="pastel">Pastel</Button>
            <Button variant="text">Text</Button>
            <Button variant="surface">Surface</Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
