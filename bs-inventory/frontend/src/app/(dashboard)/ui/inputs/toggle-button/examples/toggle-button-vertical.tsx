import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import NiCells from "@/icons/nexture/ni-cells";
import NiMasonary from "@/icons/nexture/ni-masonary";
import NiRows from "@/icons/nexture/ni-rows";

export default function ToggleButtonVertical() {
  const [view, setView] = useState("list");
  const handleView = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Vertical Buttons
          </Typography>
          <Box className="flex flex-row flex-wrap items-start gap-4">
            <Box className="border-grey-200 inline-flex rounded-lg border border-solid p-1.5">
              <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleView} size="tiny">
                <ToggleButton value="list">
                  <NiRows size="tiny" />
                </ToggleButton>
                <ToggleButton value="module">
                  <NiCells size="tiny" />
                </ToggleButton>
                <ToggleButton value="quilt">
                  <NiMasonary size="tiny" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleView} size="small">
                <ToggleButton value="list">
                  <NiRows size="small" />
                </ToggleButton>
                <ToggleButton value="module">
                  <NiCells size="small" />
                </ToggleButton>
                <ToggleButton value="quilt">
                  <NiMasonary size="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box className="border-grey-200 inline-flex rounded-2xl border border-solid p-2">
              <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleView}>
                <ToggleButton value="list">
                  <NiRows size="medium" />
                </ToggleButton>
                <ToggleButton value="module">
                  <NiCells size="medium" />
                </ToggleButton>
                <ToggleButton value="quilt">
                  <NiMasonary size="medium" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box className="border-grey-200 inline-flex rounded-3xl border border-solid p-2.5">
              <ToggleButtonGroup orientation="vertical" value={view} exclusive onChange={handleView} size="large">
                <ToggleButton value="list">
                  <NiRows size="large" />
                </ToggleButton>
                <ToggleButton value="module">
                  <NiCells size="large" />
                </ToggleButton>
                <ToggleButton value="quilt">
                  <NiMasonary size="large" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
