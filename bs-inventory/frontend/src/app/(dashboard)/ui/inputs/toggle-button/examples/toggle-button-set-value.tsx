import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import NiLaptop from "@/icons/nexture/ni-laptop";
import NiPhone from "@/icons/nexture/ni-phone";
import NiScreen from "@/icons/nexture/ni-screen";
import NiTextCenter from "@/icons/nexture/ni-text-center";
import NiTextLeft from "@/icons/nexture/ni-text-left";
import NiTextRight from "@/icons/nexture/ni-text-right";

export default function ToggleButtonSetValue() {
  const [alignmentEnforced, setAlignmentEnforced] = useState("left");
  const [devicesEnforced, setDevicesEnforced] = useState(() => ["phone"]);
  const handleAlignmentEnforced = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      setAlignmentEnforced(newAlignment);
    }
  };
  const handleDevicesEnforced = (event: React.MouseEvent<HTMLElement>, newDevices: string[]) => {
    if (newDevices.length) {
      setDevicesEnforced(newDevices);
    }
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Enforce Value Set
          </Typography>
          <Box className="flex flex-row flex-wrap items-start gap-4">
            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup value={alignmentEnforced} exclusive onChange={handleAlignmentEnforced} size="small">
                <ToggleButton value="left">
                  <NiTextLeft size="small" />
                </ToggleButton>
                <ToggleButton value="center">
                  <NiTextCenter size="small" />
                </ToggleButton>
                <ToggleButton value="right">
                  <NiTextRight size="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
              <ToggleButtonGroup value={devicesEnforced} onChange={handleDevicesEnforced} size="small">
                <ToggleButton value="laptop">
                  <NiLaptop size="small" />
                </ToggleButton>
                <ToggleButton value="tv">
                  <NiScreen size="small" />
                </ToggleButton>
                <ToggleButton value="phone">
                  <NiPhone size="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
