"use client";

import AIContentLightbox from "../../components/ai-content-lightbox";
import Link from "next/link";
import { useState } from "react";

import Masonry from "@mui/lab/Masonry";
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";

import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiHeart from "@/icons/nexture/ni-heart";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiSearch from "@/icons/nexture/ni-search";
import { cn } from "@/lib/utils";

export default function ModelDetailGeneratedItems() {
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box>
      <Grid size={12}>
        <FormControl variant="filled" size="medium" className="surface mb-2.5" fullWidth>
          <InputLabel>Search</InputLabel>
          <FilledInput
            defaultValue=""
            placeholder="Type to search projects..."
            endAdornment={
              <>
                <InputAdornment position="end">
                  <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
                </InputAdornment>
              </>
            }
          />
        </FormControl>
      </Grid>

      <Box className="w-full overflow-hidden">
        <Box className="-me-2.5">
          <Masonry columns={{ xs: 1, md: 2, lg: 3 }} spacing={2.5}>
            {itemData.map((item, index) => (
              <Card className="group relative overflow-hidden p-0" key={index}>
                <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                  <Button
                    onClick={(event: any) => {
                      event.preventDefault();
                      handleClickOpenDialog();
                    }}
                    className="absolute z-0 h-full w-full border-none! bg-transparent! outline-none!"
                  ></Button>

                  <Box className="flex h-full flex-col justify-between p-7">
                    <Box className="flex flex-row items-center justify-between">
                      <Box className="flex flex-row items-center gap-2">
                        <Avatar alt="Laura Ellis" src="/images/avatars/avatar-1.jpg" className="tiny" />
                        <Typography className="text-text-contrast hidden md:flex">Laura Ellis</Typography>
                      </Box>
                      <Chip label="Public" variant="outlined" size="small" className="text-text-contrast text-sm" />
                    </Box>

                    <Box className="flex flex-col gap-2.5">
                      <Typography className="text-text-contrast line-clamp-2">
                        A handcrafted wooden buck toy standing. The toy is carved from rich, warm-toned oak with visible
                      </Typography>

                      <Box className="flex flex-row justify-between">
                        <Button
                          size="tiny"
                          color="primary"
                          variant="contained"
                          startIcon={<NiMagicWand size={"small"} />}
                          component={Link}
                          href="/applications/ai-content/ai-image"
                        >
                          Recreate
                        </Button>
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
                  srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=162&auto=format`}
                  alt={"recent"}
                  loading="lazy"
                  className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
                />
              </Card>
            ))}
          </Masonry>
        </Box>
      </Box>

      <AIContentLightbox onClose={handleCloseDialog} open={openDialog} />
    </Box>
  );
}

const itemData = [
  {
    img: "/images/products/product-1.jpg",
  },
  {
    img: "/images/products/product-5-horizontal.jpg",
  },
  {
    img: "/images/products/product-2-vertical.jpg",
  },
  {
    img: "/images/products/product-10.jpg",
  },
  {
    img: "/images/products/product-6.jpg",
  },
  {
    img: "/images/products/product-3-vertical.jpg",
  },
  {
    img: "/images/products/product-11.jpg",
  },
  {
    img: "/images/products/product-7-horizontal.jpg",
  },
  {
    img: "/images/products/product-4.jpg",
  },
  {
    img: "/images/products/product-7.jpg",
  },
  {
    img: "/images/products/product-12.jpg",
  },
  {
    img: "/images/products/product-8-horizontal.jpg",
  },
  {
    img: "/images/products/product-2.jpg",
  },
  {
    img: "/images/products/product-9.jpg",
  },
  {
    img: "/images/products/product-4-vertical.jpg",
  },
  {
    img: "/images/products/product-5.jpg",
  },
  {
    img: "/images/products/product-6-horizontal.jpg",
  },
  {
    img: "/images/products/product-1-vertical.jpg",
  },
  {
    img: "/images/products/product-8.jpg",
  },
  {
    img: "/images/products/product-5-horizontal.jpg",
  },
  {
    img: "/images/products/product-2-vertical.jpg",
  },
  {
    img: "/images/products/product-10.jpg",
  },
  {
    img: "/images/products/product-6.jpg",
  },
];
