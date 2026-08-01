import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import NiTextCenter from "@/icons/nexture/ni-text-center";
import NiTextJustify from "@/icons/nexture/ni-text-justify";
import NiTextLeft from "@/icons/nexture/ni-text-left";
import NiTextRight from "@/icons/nexture/ni-text-right";

export default function ToggleButtonSizeAndVariants() {
  const [alignment, setAlignment] = useState<string | null>("left");
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Size and Variants
          </Typography>

          <Box className="flex flex-row gap-4">
            <Box className="flex flex-col items-start gap-4">
              <Box className="border-grey-200 inline-flex rounded-lg border border-solid p-1.5">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="tiny">
                  <ToggleButton value="left">
                    <NiTextLeft size="tiny" />
                  </ToggleButton>
                  <ToggleButton value="center">
                    <NiTextCenter size="tiny" />
                  </ToggleButton>
                  <ToggleButton value="right">
                    <NiTextRight size="tiny" />
                  </ToggleButton>
                  <ToggleButton value="justify">
                    <NiTextJustify size="tiny" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box className="border-grey-200 inline-flex rounded-xl border border-solid p-1.75">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="small">
                  <ToggleButton value="left">
                    <NiTextLeft size="small" />
                  </ToggleButton>
                  <ToggleButton value="center">
                    <NiTextCenter size="small" />
                  </ToggleButton>
                  <ToggleButton value="right">
                    <NiTextRight size="small" />
                  </ToggleButton>
                  <ToggleButton value="justify">
                    <NiTextJustify size="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box className="border-grey-200 inline-flex rounded-2xl border border-solid p-2">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                  <ToggleButton value="left">
                    <NiTextLeft size="medium" />
                  </ToggleButton>
                  <ToggleButton value="center">
                    <NiTextCenter size="medium" />
                  </ToggleButton>
                  <ToggleButton value="right">
                    <NiTextRight size="medium" />
                  </ToggleButton>
                  <ToggleButton value="justify">
                    <NiTextJustify size="medium" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box className="border-grey-200 inline-flex rounded-3xl border border-solid p-2.5">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="large">
                  <ToggleButton value="left">
                    <NiTextLeft size="large" />
                  </ToggleButton>
                  <ToggleButton value="center">
                    <NiTextCenter size="large" />
                  </ToggleButton>
                  <ToggleButton value="right">
                    <NiTextRight size="large" />
                  </ToggleButton>
                  <ToggleButton value="justify">
                    <NiTextJustify size="large" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>

            <Box className="flex flex-col items-start gap-4">
              <Box className="border-grey-25 bg-grey-25 inline-flex rounded-lg border border-solid p-1.5">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="tiny">
                  <ToggleButton value="left" className="outlined">
                    <NiTextLeft size="tiny" />
                  </ToggleButton>
                  <ToggleButton value="center" className="outlined">
                    <NiTextCenter size="tiny" />
                  </ToggleButton>
                  <ToggleButton value="right" className="outlined">
                    <NiTextRight size="tiny" />
                  </ToggleButton>
                  <ToggleButton value="justify" className="outlined">
                    <NiTextJustify size="tiny" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box className="border-grey-25 bg-grey-25 inline-flex rounded-xl border border-solid p-1.75">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="small">
                  <ToggleButton value="left" className="outlined">
                    <NiTextLeft size="small" />
                  </ToggleButton>
                  <ToggleButton value="center" className="outlined">
                    <NiTextCenter size="small" />
                  </ToggleButton>
                  <ToggleButton value="right" className="outlined">
                    <NiTextRight size="small" />
                  </ToggleButton>
                  <ToggleButton value="justify" className="outlined">
                    <NiTextJustify size="small" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box className="border-grey-25 bg-grey-25 inline-flex rounded-2xl border border-solid p-2">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment}>
                  <ToggleButton value="left" className="outlined">
                    <NiTextLeft size="medium" />
                  </ToggleButton>
                  <ToggleButton value="center" className="outlined">
                    <NiTextCenter size="medium" />
                  </ToggleButton>
                  <ToggleButton value="right" className="outlined">
                    <NiTextRight size="medium" />
                  </ToggleButton>
                  <ToggleButton value="justify" className="outlined">
                    <NiTextJustify size="medium" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
              <Box className="border-grey-25 bg-grey-25 inline-flex rounded-3xl border border-solid p-2.5">
                <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} size="large">
                  <ToggleButton value="left" className="outlined">
                    <NiTextLeft size="large" />
                  </ToggleButton>
                  <ToggleButton value="center" className="outlined">
                    <NiTextCenter size="large" />
                  </ToggleButton>
                  <ToggleButton value="right" className="outlined">
                    <NiTextRight size="large" />
                  </ToggleButton>
                  <ToggleButton value="justify" className="outlined">
                    <NiTextJustify size="large" />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
