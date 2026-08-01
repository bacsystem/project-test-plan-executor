"use client";

import React from "react";

import { Box, Button, Card, CardContent, Grid, Portal, Typography } from "@mui/material";

export default function PortalContainer() {
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <>
      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Portal Location
            </Typography>

            <Box>
              <Button variant="pastel" onClick={handleClick}>
                {show ? "Unmount children" : "Mount children"}
              </Button>
              {show ? (
                <Portal container={() => container.current!}>
                  <span>Rendered here!</span>
                </Portal>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Portal Render Target
            </Typography>
            <Box ref={container} />
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
