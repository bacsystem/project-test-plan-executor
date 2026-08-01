import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonGroupVertical() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Vertical
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="contained" orientation="vertical">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" orientation="vertical">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="pastel" orientation="vertical">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="surface" orientation="vertical">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="text" orientation="vertical">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
