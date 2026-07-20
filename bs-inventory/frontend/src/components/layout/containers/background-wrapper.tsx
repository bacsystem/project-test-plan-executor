"use client";

import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import { useThemeContext } from "@/theme/theme-provider";
import { BackgroundShape } from "@/types";

interface BackgroundWrapperProps {
  backgroundImage?: string;
}

export default function BackgroundWrapper({ backgroundImage }: BackgroundWrapperProps) {
  const { backgroundShape, bgOpacity } = useThemeContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const normalizedBgOpacity = bgOpacity / 100;

  let bgShapeClass = "";
  if (backgroundShape === BackgroundShape.Waves) {
    bgShapeClass = "bg-waves";
  } else if (backgroundShape === BackgroundShape.Spheres) {
    bgShapeClass = "bg-spheres";
  } else {
    bgShapeClass = "bg-none";
  }

  return (
    <Box
      className={`bg-grey-50 shadow-inside fixed inset-0 -z-10 h-full w-full bg-cover bg-bottom-right bg-no-repeat ${bgShapeClass}`}
      sx={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        opacity: normalizedBgOpacity,
      }}
    />
  );
}
