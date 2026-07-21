"use client";

import Link from "next/link";

import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";

import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiFolder from "@/icons/nexture/ni-folder";
import NiScale from "@/icons/nexture/ni-scale";
import NiSquircle from "@/icons/nexture/ni-squircle";
import NextureIcons from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

type DriveLightboxProps = {
  open: boolean;
  onClose: () => void;
};

export default function DriveLightbox({ open, onClose }: DriveLightboxProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xl" scroll="body">
      <DialogTitle>
        <Box className="flex flex-row justify-between">
          <Box className="flex flex-row items-center gap-1.5">
            <Box className={cn("bg-accent-1-light/10 flex h-10 w-10 flex-none items-center justify-center rounded-md")}>
              <NextureIcons icon="NiDocumentImage" className="text-accent-1" size={"large"} />
            </Box>
            <Box>Hero_Image_Homepage.png</Box>
          </Box>
          <Box className="flex flex-row">
            <Button
              className="icon-only"
              onClick={onClose}
              size="small"
              color="grey"
              startIcon={<NiCrossFull size="small" />}
            />
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent className="flex flex-col gap-5 pb-7">
        <Box className="flex flex-row justify-between">
          <Box className="flex flex-row items-center gap-2">
            <Button size="medium" color="grey" variant="outlined" startIcon={<NiScale size={"medium"} />}>
              Share
            </Button>
          </Box>
          <Box className="flex flex-row gap-2">
            <Button
              size="medium"
              color="grey"
              variant="outlined"
              className="icon-only"
              startIcon={<NiArrowInDown size={"medium"} />}
            />
            <Button
              size="medium"
              color="grey"
              variant="outlined"
              className="icon-only"
              startIcon={<NiEllipsisHorizontal size={"medium"} />}
            />
          </Box>
        </Box>

        <Box className="relative">
          <Link href="/images/products/product-2-large.jpg" target="_blank">
            <img
              src="/images/products/product-2-large.jpg"
              alt={"lightbox image"}
              loading="lazy"
              className="h-288 w-full rounded-lg object-cover"
            />
          </Link>

          <Box className="absolute inset-e-4 bottom-4 flex flex-row gap-2">
            <Box className="bg-grey-25 rounded-xs px-1.5">
              <Button
                className="group min-w-auto! p-1!"
                variant="text"
                color="grey"
                component={Link}
                href="/applications/drive/label"
              >
                <NiSquircle
                  className="text-accent-1-light/40 group-hover:text-accent-1 transition-colors"
                  variant="contained"
                />
              </Button>
              <Button
                className="group min-w-auto! p-1!"
                variant="text"
                color="grey"
                component={Link}
                href="/applications/drive/label"
              >
                <NiSquircle
                  className="text-accent-2-light/40 group-hover:text-accent-2 transition-colors"
                  variant="contained"
                />
              </Button>
            </Box>
            <Button
              component={Link}
              href="/applications/drive/folder"
              size="tiny"
              color="grey"
              variant="pastel"
              startIcon={<NiFolder size={"small"} />}
              className={cn(
                "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary min-w-0",
              )}
            >
              Project-40/Assets/Images
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
