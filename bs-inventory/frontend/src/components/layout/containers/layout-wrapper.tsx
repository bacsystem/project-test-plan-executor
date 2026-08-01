"use client";

import { PropsWithChildren } from "react";

import { Box } from "@mui/material";

export default function LayoutWrapper({ children }: PropsWithChildren) {
  return <Box className="relative z-10 flex h-dvh flex-col">{children}</Box>;
}
