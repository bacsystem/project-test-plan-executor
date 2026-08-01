import { Box, Card, CardContent, Fab, Grid, Typography } from "@mui/material";

import NiBriefcase from "@/icons/nexture/ni-briefcase";

export default function FabColors() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Colors
          </Typography>

          <Box className="flex flex-col items-start gap-4">
            <Fab variant="extended" color="primary">
              <NiBriefcase className="me-2" />
              Primary
            </Fab>
            <Fab variant="extended" color="secondary">
              <NiBriefcase className="me-2" />
              Secondary
            </Fab>
            <Fab variant="extended" color="accent-1">
              <NiBriefcase className="me-2" />
              Accent 1
            </Fab>
            <Fab variant="extended" color="accent-2">
              <NiBriefcase className="me-2" />
              Accent 2
            </Fab>
            <Fab variant="extended" color="accent-3">
              <NiBriefcase className="me-2" />
              Accent 3
            </Fab>
            <Fab variant="extended" color="accent-4">
              <NiBriefcase className="me-2" />
              Accent 4
            </Fab>
            <Fab variant="extended" color="text-primary">
              <NiBriefcase className="me-2" />
              Text Primary
            </Fab>
            <Fab variant="extended" color="text-secondary">
              <NiBriefcase className="me-2" />
              Text Secondary
            </Fab>
            <Fab variant="extended" color="text-disabled">
              <NiBriefcase className="me-2" />
              Text Disabled
            </Fab>
            <Fab variant="extended" color="info">
              <NiBriefcase className="me-2" />
              Info
            </Fab>
            <Fab variant="extended" color="success">
              <NiBriefcase className="me-2" />
              Success
            </Fab>
            <Fab variant="extended" color="warning">
              <NiBriefcase className="me-2" />
              Warning
            </Fab>
            <Fab variant="extended" color="error">
              <NiBriefcase className="me-2" />
              Error
            </Fab>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
