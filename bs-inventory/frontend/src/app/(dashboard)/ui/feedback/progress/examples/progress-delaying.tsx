import React from "react";

import { Box, Button, CircularProgress, Fade, Typography } from "@mui/material";

export default function ProgressDelaying() {
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    [],
  );

  const handleClickLoading = () => {
    setLoading((prevLoading) => !prevLoading);
  };

  const handleClickQuery = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (query !== "idle") {
      setQuery("idle");
      return;
    }

    setQuery("progress");
    timerRef.current = setTimeout(() => {
      setQuery("success");
    }, 2000);
  };
  return (
    <Box className="flex flex-col items-start">
      <Box className="h-8">
        <Fade
          in={loading}
          style={{
            transitionDelay: loading ? "800ms" : "0ms",
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
      <Button variant="pastel" onClick={handleClickLoading} className="mb-4">
        {loading ? "Stop loading" : "Loading"}
      </Button>
      <Box className="h-8">
        {query === "success" ? (
          <Typography>Success!</Typography>
        ) : (
          <Fade
            in={query === "progress"}
            style={{
              transitionDelay: query === "progress" ? "800ms" : "0ms",
            }}
            unmountOnExit
          >
            <CircularProgress />
          </Fade>
        )}
      </Box>
      <Button variant="pastel" onClick={handleClickQuery}>
        {query !== "idle" ? "Reset" : "Simulate a load"}
      </Button>
    </Box>
  );
}
