import { useMemo } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiNext from "@/icons/nexture/ni-next";
import { getThemeImage } from "@/lib/image-helper";
import { useThemeContext } from "@/theme/theme-provider";

export default function KnowledgeBaseTutorials() {
  const { theme, isDarkMode } = useThemeContext();
  const imageContent = useMemo(() => {
    return getThemeImage({
      srcSet: {
        "theme-blue": ["blue-light-video.png", "blue-dark-video.png"],
        "theme-green": ["green-light-video.png", "green-dark-video.png"],
        "theme-orange": ["orange-light-video.png", "orange-dark-video.png"],
        "theme-purple": ["purple-light-video.png", "purple-dark-video.png"],
      },
      directory: "/images/three-d-icons/",
      current: { theme, isDarkMode },
    });
  }, [theme, isDarkMode]);
  return (
    <Card>
      <CardContent className="flex min-h-56 flex-col items-start justify-between">
        <Box className="flex w-full flex-col md:flex-row">
          <Box className="mb-4 w-full md:w-8/12 2xl:w-9/12">
            <Typography variant="h6" component="h6" className="card-title">
              Video Tutorials
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className="text-text-secondary text-center md:text-start xl:max-w-md"
            >
              Learn quickly with our video tutorials! Whether you&apos;re a beginner or looking to enhance your skills,
              our guides make complex topics simple.
            </Typography>
          </Box>
          <Box className="flex w-full justify-center md:w-4/12 md:justify-end 2xl:w-3/12">
            {imageContent && <img alt="image" className="w-full max-w-2xs object-contain" src={imageContent} />}
          </Box>
        </Box>
        <Button
          className="mx-auto md:mx-0"
          size="medium"
          color="primary"
          variant="pastel"
          startIcon={<NiNext size={"medium"} />}
        >
          Watch Now
        </Button>
      </CardContent>
    </Card>
  );
}
