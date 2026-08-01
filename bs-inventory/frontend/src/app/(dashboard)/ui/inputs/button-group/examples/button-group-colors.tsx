import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";

export default function ButtonGroupColors() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Colors
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="accent-1">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="accent-2">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="accent-3">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="accent-4">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="text-primary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="text-secondary">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="text-disabled">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="success">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="info">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="warning">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="error">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup variant="outlined" size="medium" color="grey">
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
