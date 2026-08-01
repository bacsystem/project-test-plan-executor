"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { useLayoutContext } from "../layout-context";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useRef } from "react";

import { Box, Paper } from "@mui/material";

import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";
import { ContentType } from "@/types";

export default function ContentWrapper({ children }: PropsWithChildren) {
  const { content } = useThemeContext();

  const { scrollToTop, scrollContentRef, setScrollContentRef } = useLayoutContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  useEffect(() => {
    if (!scrollContentRef) {
      if (scrollRef.current) {
        setScrollContentRef(scrollRef.current);
      }
    }
  }, []);

  return (
    <Paper
      elevation={3}
      className="bg-foreground outline-line flex w-full min-w-0 transform-[translateX(0)] rounded-xl py-5 outline -outline-offset-1 backdrop-blur-sm sm:rounded-4xl sm:py-6 md:py-8"
    >
      <Box className="me-0.25 flex w-full overflow-y-scroll" ref={scrollRef}>
        <Box
          className={cn(
            "mx-auto w-full px-5 transition-all sm:px-6 md:px-10",
            content === ContentType.Boxed && "max-w-screen-lg",
          )}
        >
          <Box className="-mx-2 min-h-full overflow-x-auto px-2 *:mb-2">{children}</Box>
        </Box>
      </Box>
    </Paper>
  );
}
