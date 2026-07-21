import * as React from "react";

import { Box, SnackbarContent } from "@mui/material";
import Button from "@mui/material/Button";

const action = (
  <Button color="primary" size="small">
    Lorem Ipsum Dolorem
  </Button>
);

export default function SnackbarContents() {
  return (
    <Box className="flex max-w-96 flex-col gap-2">
      <Box className="border-grey-100 rounded-md border border-solid">
        <SnackbarContent elevation={0} message="I love snacks." action={action} />
      </Box>
      <Box className="border-grey-100 rounded-md border border-solid">
        <SnackbarContent
          elevation={0}
          message={
            "I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate."
          }
        />
      </Box>
      <Box className="border-grey-100 rounded-md border border-solid">
        <SnackbarContent elevation={0} message="I love candy. I love cookies. I love cupcakes." action={action} />
      </Box>
      <Box className="border-grey-100 rounded-md border border-solid">
        <SnackbarContent
          elevation={0}
          message={
            "I love candy. I love cookies. I love cupcakes. \
          I love cheesecake. I love chocolate."
          }
          action={action}
        />
      </Box>
    </Box>
  );
}
