import { Box, Card, CardContent, Fab, Grid, Typography } from "@mui/material";

import NiDocumentCode from "@/icons/nexture/ni-document-code";

export default function FabSize() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Size
          </Typography>

          <Box className="mb-4 flex flex-row items-start gap-4">
            <Fab color="primary" size="xlarge">
              <NiDocumentCode size={"large"} />
            </Fab>
            <Fab variant="extended" color="primary" size="xlarge">
              <NiDocumentCode size={"large"} className="me-2" />
              Xlarge
            </Fab>
          </Box>

          <Box className="mb-4 flex flex-row items-start gap-4">
            <Fab color="primary" size="large">
              <NiDocumentCode size={"large"} />
            </Fab>
            <Fab variant="extended" color="primary" size="large">
              <NiDocumentCode size={"large"} className="me-2" />
              Large
            </Fab>
          </Box>

          <Box className="mb-4 flex flex-row gap-4">
            <Fab size="medium" color="primary">
              <NiDocumentCode size={"medium"} />
            </Fab>
            <Fab variant="extended" size="medium" color="primary">
              <NiDocumentCode size={"medium"} className="me-2" />
              Medium
            </Fab>
          </Box>

          <Box className="flex flex-row gap-4">
            <Fab size="small" color="primary">
              <NiDocumentCode size={"small"} />
            </Fab>
            <Fab variant="extended" size="small" color="primary">
              <NiDocumentCode size={"small"} className="me-2" />
              Small
            </Fab>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
