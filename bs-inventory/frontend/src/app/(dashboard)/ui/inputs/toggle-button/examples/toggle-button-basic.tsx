import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import NiTextCenter from "@/icons/nexture/ni-text-center";
import NiTextJustify from "@/icons/nexture/ni-text-justify";
import NiTextLeft from "@/icons/nexture/ni-text-left";
import NiTextRight from "@/icons/nexture/ni-text-right";

export default function ToggleButtonBasic() {
  const [alignment, setAlignment] = useState<string | null>("left");
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic
          </Typography>
          <Box className="border-grey-200 inline-flex rounded-2xl border border-solid p-1.75">
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
              <ToggleButton value="justify" disabled>
                <NiTextJustify size="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
