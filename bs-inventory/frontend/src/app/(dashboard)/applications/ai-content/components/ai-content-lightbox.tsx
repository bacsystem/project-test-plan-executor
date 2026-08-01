"use client";

import Link from "next/link";

import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiCrossFull from "@/icons/nexture/ni-cross-full";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiHeart from "@/icons/nexture/ni-heart";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiScale from "@/icons/nexture/ni-scale";
import { cn } from "@/lib/utils";

type AIContentLightboxProps = {
  open: boolean;
  onClose: () => void;
};

export default function AIContentLightbox({ open, onClose }: AIContentLightboxProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" scroll="body">
      <DialogTitle>
        <Box className="flex flex-row justify-between">
          <Box>Generation #246</Box>
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
            <Avatar alt="Laura Ellis" src="/images/avatars/avatar-1.jpg" className="medium" />
            <Typography className="text-text-primary hidden md:flex">Laura Ellis</Typography>
          </Box>
          <Box className="flex flex-row gap-2">
            <Button size="medium" color="primary" variant="outlined" startIcon={<NiScale size={"medium"} />}>
              Upscale
            </Button>
            <Button size="medium" color="grey" variant="outlined" startIcon={<NiMagicWand size={"medium"} />}>
              Regenerate
            </Button>
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
          <Link href="/images/products/product-5-horizontal.jpg" target="_blank">
            <img
              src="/images/products/product-5-horizontal.jpg"
              alt={"lightbox image"}
              loading="lazy"
              className="h-150 w-full rounded-lg object-cover"
            />
          </Link>

          <Box className="absolute inset-e-4 bottom-4 flex flex-row gap-2">
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

        <Box>
          <Typography variant="body1">
            A handcrafted wooden buck toy standing proudly in a sunlit forest clearing. The toy is carved from rich,
            warm-toned oak with visible wood grain and smooth, rounded edges. Its antlers are stylized and slightly
            exaggerated for a playful look, and its legs are jointed with small wooden pegs, allowing limited movement.
            The buck's eyes are tiny black beads embedded in the wood, giving it a gentle, curious expression.
          </Typography>
        </Box>

        <Box className="flex flex-col items-start gap-4">
          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Model</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Midjourney
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Style</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Realism
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Enhancement</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Auto
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Resolution</Typography>
            <Typography variant="body1" className="text-text-secondary">
              1024x1024
            </Typography>
          </Box>

          <Box className="flex flex-col gap-1">
            <Typography variant="subtitle2">Status</Typography>
            <Typography variant="body1" className="text-text-secondary">
              Private
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
