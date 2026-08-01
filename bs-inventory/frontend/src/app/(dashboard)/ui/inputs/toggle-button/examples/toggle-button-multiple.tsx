import { useState } from "react";

import { Box, Card, CardContent, Grid, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiTextBold from "@/icons/nexture/ni-text-bold";
import NiTextFont from "@/icons/nexture/ni-text-font";
import NiTextItalic from "@/icons/nexture/ni-text-italic";
import NiTextUnderline from "@/icons/nexture/ni-text-underline";

export default function ToggleButtonMultiple() {
  const [formats, setFormats] = useState(() => ["bold", "italic"]);
  const handleFormat = (event: React.MouseEvent<HTMLElement>, newFormats: string[]) => {
    setFormats(newFormats);
  };

  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Multiple Selection
          </Typography>
          <Box className="border-grey-200 inline-flex rounded-2xl border border-solid p-1.75">
            <ToggleButtonGroup value={formats} onChange={handleFormat} size="small">
              <ToggleButton value="bold">
                <NiTextBold size="small" />
              </ToggleButton>
              <ToggleButton value="underlined">
                <NiTextUnderline size="small" />
              </ToggleButton>
              <ToggleButton value="italic">
                <NiTextItalic size="small" />
              </ToggleButton>
              <ToggleButton value="color" disabled>
                <NiTextFont size="small" />
                <NiChevronDownSmall size="small" />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
