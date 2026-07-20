import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, Typography } from "@mui/material";

import NiCheck from "@/icons/nexture/ni-check";

export default function ToggleButtonStandalone() {
  const [selected, setSelected] = useState(false);

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standalone Toggle Button
          </Typography>

          <Box className="flex flex-row flex-wrap items-start gap-4">
            <ToggleButton
              className="bg-grey-25"
              size="tiny"
              value="check"
              color="accent-1"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="tiny" />
            </ToggleButton>
            <ToggleButton
              size="tiny"
              className="outlined bg-grey-25"
              value="check"
              color="accent-1"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="tiny" />
            </ToggleButton>

            <ToggleButton
              className="bg-grey-25"
              size="small"
              value="check"
              color="accent-2"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="small" />
            </ToggleButton>

            <ToggleButton
              size="small"
              className="outlined bg-grey-25"
              value="check"
              color="accent-2"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="small" />
            </ToggleButton>

            <ToggleButton
              className="bg-grey-25"
              size="medium"
              value="check"
              color="accent-3"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="medium" />
            </ToggleButton>
            <ToggleButton
              size="medium"
              className="outlined bg-grey-25"
              value="check"
              color="accent-3"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="medium" />
            </ToggleButton>
            <ToggleButton
              className="bg-grey-25"
              size="large"
              value="check"
              color="accent-4"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="large" />
            </ToggleButton>

            <ToggleButton
              size="large"
              className="outlined bg-grey-25"
              value="check"
              color="accent-4"
              selected={selected}
              onChange={() => setSelected((prevSelected) => !prevSelected)}
            >
              <NiCheck size="large" />
            </ToggleButton>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
