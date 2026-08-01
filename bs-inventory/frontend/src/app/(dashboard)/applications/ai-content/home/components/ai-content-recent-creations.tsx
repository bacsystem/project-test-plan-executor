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
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiHeart from "@/icons/nexture/ni-heart";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiSearch from "@/icons/nexture/ni-search";
import { cn } from "@/lib/utils";

export default function RecentCreations() {
  const [popularity, setPopularity] = useState("Trending");
  const handlePopularityChange = (event: SelectChangeEvent) => {
    setPopularity(event.target.value as string);
  };

  const [theme, setTheme] = useState("All");
  const handleThemeChange = (event: SelectChangeEvent) => {
    setTheme(event.target.value as string);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Typography variant="h6" component="h6" className="mt-2 mb-3">
        Recent Creations
      </Typography>
      <Grid size={12} className="mb-2.5 flex flex-row gap-1.5">
        <FormControl variant="filled" size="medium" className="surface mb-0 flex-1">
          <InputLabel>Search</InputLabel>
          <FilledInput
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">{<NiSearch size="medium" className="text-text-disabled" />}</IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <FormControl variant="filled" className="surface mb-0 w-40">
          <InputLabel>Popularity</InputLabel>
          <Select
            value={popularity}
            label="Popularity"
            onChange={handlePopularityChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Trending">Trending</MenuItem>
            <MenuItem value="Popular">Popular</MenuItem>
            <MenuItem value="Legend">Legend</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="filled" className="surface mb-0 w-40">
          <InputLabel>Theme</InputLabel>
          <Select
            value={theme}
            label="Theme"
            onChange={handleThemeChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
            <MenuItem value="Fantasy">Fantasy</MenuItem>
            <MenuItem value="Urban">Urban</MenuItem>
            <MenuItem value="Architecture">Architecture</MenuItem>
            <MenuItem value="Human">Human</MenuItem>
            <MenuItem value="Surrealism">Surrealism</MenuItem>
            <MenuItem value="Nature">Nature</MenuItem>
            <MenuItem value="Mythology">Mythology</MenuItem>
            <MenuItem value="Conceptual">Conceptual</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Box className="w-full overflow-hidden">
        <Box className="-me-2.5">
          <Masonry columns={{ xs: 1, md: 2, lg: 3, "2xl": 4 }} spacing={2.5}>
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
    </>
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
