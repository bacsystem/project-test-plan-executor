import * as React from "react";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import NiNext from "@/icons/nexture/ni-next";
import NiPlay from "@/icons/nexture/ni-play";
import NiPrevious from "@/icons/nexture/ni-previous";

export default function CardUIControls() {
  return (
    <Card className="flex max-w-80 flex-row">
      <Box className="flex flex-1 flex-col items-center">
        <CardContent>
          <Typography component="div" variant="h5">
            UI Controls
          </Typography>
          <Typography variant="subtitle1" component="div" sx={{ color: "text.secondary" }}>
            Mac Miller
          </Typography>
        </CardContent>
        <Box className="flex flex-row items-center pb-4">
          <Button
            className="icon-only"
            size="medium"
            color="text-secondary"
            variant="surface"
            startIcon={<NiPrevious size={"small"} />}
          />
          <Button
            className="icon-only"
            size="large"
            color="primary"
            variant="surface"
            startIcon={<NiPlay size={"large"} />}
          />
          <Button
            className="icon-only"
            size="medium"
            color="text-secondary"
            variant="surface"
            startIcon={<NiNext size={"small"} />}
          />
        </Box>
      </Box>
      <CardMedia
        component="img"
        className="w-40 rounded-md"
        image="/images/products/product-1.jpg"
        alt="Live from space album cover"
      />
    </Card>
  );
}
