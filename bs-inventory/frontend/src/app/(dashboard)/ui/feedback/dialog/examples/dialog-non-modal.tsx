import React from "react";

import { Box, Button, Fade, Paper, Portal, Typography, Unstable_TrapFocus } from "@mui/material";

export default function DialogNonModal() {
  const [bannerOpen, setBannerOpen] = React.useState(false);

  const closeBanner = () => {
    setBannerOpen(false);
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={() => {
          setBannerOpen(true);
        }}
      >
        Open Dialog Modal
      </Button>
      <Portal>
        <Unstable_TrapFocus open disableAutoFocus disableEnforceFocus>
          <Fade appear={false} in={bannerOpen}>
            <Paper
              role="dialog"
              tabIndex={-1}
              className="border-grey-100 shadow-darker-sm fixed right-4 bottom-4 left-4 z-50 rounded-3xl border border-solid p-7"
            >
              <Box className="flex flex-col justify-between gap-2 sm:flex-row">
                <Box className="flex shrink flex-col self-start sm:self-center">
                  <Typography variant="h6">This website uses cookies</Typography>
                  <Typography variant="body1">Acorn relies on cookies to improve your experience.</Typography>
                </Box>
                <Box className="sm: flex shrink-0 flex-row-reverse gap-2 self-end sm:flex-row sm:self-center">
                  <Button color="primary" onClick={closeBanner} variant="contained">
                    Allow All
                  </Button>
                  <Button color="primary" variant="text" onClick={closeBanner}>
                    Reject All
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Fade>
        </Unstable_TrapFocus>
      </Portal>
    </Box>
  );
}
