import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonGroupVariants() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Variants
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="contained">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="pastel">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="surface">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="text">
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
