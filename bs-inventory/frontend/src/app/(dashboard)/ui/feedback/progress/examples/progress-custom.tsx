import React from "react";

import { CircularProgress } from "@mui/material";

export default function ProgressCustom() {
  return (
    <>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" className="text-primary" stopColor="currentColor" />
            <stop offset="100%" className="text-secondary" stopColor="currentColor" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress sx={{ "svg circle": { stroke: "url(#my_gradient)" } }} />
    </>
  );
}
