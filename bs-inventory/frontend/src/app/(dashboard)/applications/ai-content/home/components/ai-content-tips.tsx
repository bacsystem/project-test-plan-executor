"use client";

import Link from "next/link";
import { useMemo } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiDocumentFull from "@/icons/nexture/ni-document-full";
import { getThemeImage } from "@/lib/image-helper";
import { useThemeContext } from "@/theme/theme-provider";

export default function AIContentTips() {
  const { theme, isDarkMode } = useThemeContext();
  const imageContent = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["blue-light-clipboard.png", "blue-dark-clipboard.png"],
        "theme-green": ["green-light-clipboard.png", "green-dark-clipboard.png"],
        "theme-orange": ["orange-light-clipboard.png", "orange-dark-clipboard.png"],
        "theme-purple": ["purple-light-clipboard.png", "purple-dark-clipboard.png"],
      },
      directory: "/images/three-d-icons/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);
  return (
    <Box className="mt-2 mb-3 flex flex-wrap justify-between gap-4">
      <Typography variant="h6" component="h6">
        Best Practices and Tips
      </Typography>
      <Card>
        <CardContent className="flex min-h-36 flex-col items-start justify-between">
          <Box className="flex w-full flex-col md:flex-row">
            <Box className="w-full md:w-8/12 2xl:w-9/12">
              <Typography
                variant="body1"
                component="p"
                className="text-text-secondary mb-12 text-center md:text-start xl:max-w-md"
              >
                Unlock your full potential with our Best Practices and Tips! Discover actionable insights that help you
                streamline processes and achieve your goals.
              </Typography>
              <Button
                className="mx-auto md:mx-0"
                size="medium"
                color="secondary"
                variant="pastel"
                startIcon={<NiDocumentFull size={"medium"} />}
                component={Link}
                href="/applications/ai-content/learn"
              >
                Read Now
              </Button>
            </Box>
            <Box className="flex w-full justify-center md:w-4/12 md:justify-end 2xl:w-3/12">
              {imageContent && <img alt="image" className="w-full max-w-2xs object-contain" src={imageContent} />}
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
