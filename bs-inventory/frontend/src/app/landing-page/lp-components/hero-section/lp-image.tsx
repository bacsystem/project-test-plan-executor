"use client";

import { useEffect, useState } from "react";

import { Avatar, Box, Button, Card, Chip } from "@mui/material";

import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiHeart from "@/icons/nexture/ni-heart";
import { getThemeImage } from "@/lib/image-helper";
import { cn } from "@/lib/utils";
import { useThemeContext } from "@/theme/theme-provider";

export default function LPImage() {
  const { theme, isDarkMode } = useThemeContext();

  const [image, setImage] = useState("/images/products/product-5-horizontal.jpg");
  useEffect(() => {
    const imageUrl = getThemeImage({
      srcSet: {
        "theme-blue": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
        "theme-green": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
        "theme-orange": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
        "theme-purple": ["product-5-horizontal.jpg", "product-5-horizontal-dark.jpg"],
      },
      directory: "/images/products/",
      current: { theme, isDarkMode },
    });
    setTimeout(() => {
      setImage(imageUrl);
    }, 0);
  }, [theme, isDarkMode]);

  return (
    <Card className="group border-background-paper relative h-44 w-64 overflow-hidden border-4 p-0">
      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
        <Button className="absolute z-0 h-full w-full border-none! bg-transparent! outline-none!"></Button>

        <Box className="flex h-full flex-col justify-between p-7">
          <Box className="flex flex-row items-center justify-between">
            <Box className="flex flex-row items-center gap-2">
              <Avatar alt="Laura Ellis" src="/images/avatars/avatar-1.jpg" className="tiny" />
            </Box>
            <Chip
              label="Public"
              variant="outlined"
              size="small"
              className="text-text-contrast outline-text-contrast text-sm"
            />
          </Box>

          <Box className="flex flex-col gap-2.5">
            <Box className="flex flex-row justify-between">
              <Box className="flex flex-row gap-2">
                <Button
                  size="tiny"
                  color="grey"
                  variant="pastel"
                  startIcon={<NiHeart size={"small"} />}
                  className={cn(
                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0",
                    "active",
                  )}
                >
                  {6}
                </Button>
                <Button
                  size="tiny"
                  color="grey"
                  variant="pastel"
                  startIcon={<NiFloppyDisk size={"small"} />}
                  className={cn(
                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0",
                  )}
                >
                  {87}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <img
        alt="hero image"
        sizes="100vw"
        className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
        src={image}
      />
    </Card>
  );
}
