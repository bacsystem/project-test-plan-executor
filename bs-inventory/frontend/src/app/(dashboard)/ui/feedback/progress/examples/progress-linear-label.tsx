import React from "react";

import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressLinearLabel() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box className="flex items-center">
      <Box className="me-1 w-full">
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box>
        <Typography variant="body2" className="text-text-secondary">{`${Math.round(progress)}%`}</Typography>
      </Box>
    </Box>
  );
}
