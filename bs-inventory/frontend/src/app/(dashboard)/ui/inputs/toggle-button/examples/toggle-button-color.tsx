import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

export default function ToggleButtonColor() {
  const [platform, setPlatform] = useState("web");
  const handlePlatform = (event: React.MouseEvent<HTMLElement>, newPlatform: string) => {
    setPlatform(newPlatform);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Color
          </Typography>
          <Box className="flex flex-col items-start gap-4">
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="primary" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="secondary" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="accent-1" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="accent-2" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="accent-3" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="accent-4" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="success" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="info" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="warning" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup color="error" value={platform} exclusive onChange={handlePlatform} size="small">
                <ToggleButton value="web">Web</ToggleButton>
                <ToggleButton value="android">Android</ToggleButton>
                <ToggleButton value="ios">iOS</ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
