import React from "react";

import { Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";

import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";

export default function ButtonGroupLoading() {
  const [loading, setLoading] = React.useState(false);

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Loading Button
          </Typography>
          <ButtonGroup variant="outlined" aria-label="Loading button group">
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
              }}
            >
              Submit
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
              }}
            >
              Fetch data
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                setLoading(true);
              }}
              loadingPosition="start"
              startIcon={<NiFloppyDisk size={"medium"} />}
            >
              Save
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </Grid>
  );
}
