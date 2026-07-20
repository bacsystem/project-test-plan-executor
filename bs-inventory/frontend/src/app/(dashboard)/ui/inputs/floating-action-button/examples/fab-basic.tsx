import { Box, Card, CardContent, Fab, Grid, Typography } from "@mui/material";

import NiBriefcase from "@/icons/nexture/ni-briefcase";

export default function FabBasic() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic FAB
          </Typography>

          <Box className="flex flex-row items-start gap-4">
            <Fab color="primary">
              <NiBriefcase />
            </Fab>
            <Fab color="secondary">
              <NiBriefcase />
            </Fab>
            <Fab disabled color="primary">
              <NiBriefcase />
            </Fab>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
