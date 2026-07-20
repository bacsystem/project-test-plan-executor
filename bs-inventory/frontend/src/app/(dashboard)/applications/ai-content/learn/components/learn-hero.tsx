import { useEffect, useState } from "react";

import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import NiPlay from "@/icons/nexture/ni-play";
import { getThemeImage } from "@/lib/image-helper";
import { useThemeContext } from "@/theme/theme-provider";

export default function LearnHero() {
  const { theme, isDarkMode } = useThemeContext();

  const [configImage, setConfigImage] = useState("/images/misc/plant-light.png");
  useEffect(() => {
    const imageUrl = getThemeImage({
      srcSet: {
        "theme-blue": ["plant-light.png", "plant-dark.png"],
        "theme-green": ["plant-light.png", "plant-dark.png"],
        "theme-orange": ["plant-light.png", "plant-dark.png"],
        "theme-purple": ["plant-light.png", "plant-dark.png"],
      },
      directory: "/images/misc/",
      current: { theme, isDarkMode },
    });
    setTimeout(() => {
      setConfigImage(imageUrl);
    }, 0);
  }, [theme, isDarkMode]);

  return (
    <Card className="outline-background-paper flex-colp-0 relative flex h-80 outline-4 -outline-offset-4">
      <Box className="bg-primary-light/10 absolute inset-1 z-0 rounded-xl"></Box>
      <Box className="from-background-paper to-background-paper/0 absolute inset-1 z-1 rounded-xl bg-linear-to-r rtl:bg-linear-to-l"></Box>

      <CardContent className="z-10 flex flex-1 flex-row items-start justify-between p-7!">
        <Box className="flex h-full w-full flex-col items-start justify-between gap-5 md:w-6/12">
          <Box>
            <Typography variant="h4" component="h4" className="card-title">
              Quick Introduction
            </Typography>
            <Typography variant="body1" component="p" className="text-text-secondary text-start md:max-w-md">
              Create custom visuals from text prompts in seconds—no design skills needed. Transform ideas into dynamic
              video clips with AI-powered motion and storytelling.
            </Typography>
          </Box>
          <Button size="medium" color="primary" variant="contained" startIcon={<NiPlay size={"medium"} />} href="#">
            Watch
          </Button>
        </Box>

        <Box className="flex w-0 justify-center md:w-6/12 md:justify-end">
          <img
            alt="configure theme"
            sizes="100vw"
            className="hidden h-64 w-full max-w-xs object-contain md:block"
            src={configImage}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
