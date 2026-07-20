import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Outlined Buttons
          </Typography>
          <Box className="row flex flex-wrap items-start gap-2">
            <Button variant="outlined">Primary</Button>
            <Button variant="outlined" disabled>
              Disabled
            </Button>
            <Button variant="outlined" href="#text-buttons">
              Link
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
