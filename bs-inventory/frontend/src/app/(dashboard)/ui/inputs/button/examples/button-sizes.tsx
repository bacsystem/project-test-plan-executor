import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonSizes() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Sizes
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button variant="contained" size="large" color="primary">
              Large
            </Button>
            <Button variant="outlined" size="large" color="primary">
              Large
            </Button>
            <Button variant="pastel" size="large" color="primary">
              Large
            </Button>
            <Button variant="text" size="large" color="primary">
              Large
            </Button>
            <Button variant="surface" size="large" color="primary">
              Large
            </Button>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button variant="contained" size="medium" color="secondary">
              Medium
            </Button>
            <Button variant="outlined" size="medium" color="secondary">
              Medium
            </Button>
            <Button variant="pastel" size="medium" color="secondary">
              Medium
            </Button>
            <Button variant="text" size="medium" color="secondary">
              Medium
            </Button>
            <Button variant="surface" size="medium" color="secondary">
              Medium
            </Button>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button variant="contained" size="small" color="accent-1">
              Small
            </Button>
            <Button variant="outlined" size="small" color="accent-1">
              Small
            </Button>
            <Button variant="pastel" size="small" color="accent-1">
              Small
            </Button>
            <Button variant="text" size="small" color="accent-1">
              Small
            </Button>
            <Button variant="surface" size="small" color="accent-1">
              Small
            </Button>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button variant="contained" size="tiny" color="accent-2">
              Tiny
            </Button>
            <Button variant="outlined" size="tiny" color="accent-2">
              Tiny
            </Button>
            <Button variant="pastel" size="tiny" color="accent-2">
              Tiny
            </Button>
            <Button variant="text" size="tiny" color="accent-2">
              Tiny
            </Button>
            <Button variant="surface" size="tiny" color="accent-2">
              Tiny
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
