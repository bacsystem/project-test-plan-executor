import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonGroupSizes() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Sizes
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="pastel" size="large">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="pastel" size="medium">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="pastel" size="small">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="pastel" size="tiny">
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
