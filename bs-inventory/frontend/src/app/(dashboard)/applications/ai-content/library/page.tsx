"use client";

import AIContentLightbox from "../components/ai-content-lightbox";
import Link from "next/link";
import { useState } from "react";

import Masonry from "@mui/lab/Masonry";
import {
  Avatar,
  Box,
  Breadcrumbs,
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

export default function Page() {
  const [type, setType] = useState("Image");
  const handleTypeChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Library
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/ai-content">
              AI Content
            </Link>
            <Typography variant="body2">Library</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid size={12} className="flex flex-row gap-1.5">
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
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={handleTypeChange}
            IconComponent={NiChevronDownSmall}
            MenuProps={{ className: "outlined" }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Image">Image</MenuItem>
            <MenuItem value="Video">Video</MenuItem>
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
                      <Chip
                        label="Public"
                        variant="outlined"
                        size="small"
                        className="text-text-contrast outline-text-contrast text-sm"
                      />
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
                          Regenerate
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
                  alt={"upload"}
                  loading="lazy"
                  className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
                />
              </Card>
            ))}
          </Masonry>
        </Box>
      </Box>
      <AIContentLightbox onClose={handleCloseDialog} open={openDialog} />
    </Grid>
  );
}

const itemData = [
  {
    img: "/images/products/product-1.jpg",
  },
  {
    img: "/images/products/product-2.jpg",
  },
  {
    img: "/images/products/product-3.jpg",
  },
  {
    img: "/images/products/product-4.jpg",
  },
  {
    img: "/images/products/product-5.jpg",
  },
  {
    img: "/images/products/product-6.jpg",
  },
  {
    img: "/images/products/product-7.jpg",
  },
  {
    img: "/images/products/product-8.jpg",
  },
  {
    img: "/images/products/product-9.jpg",
  },
  {
    img: "/images/products/product-10.jpg",
  },
  {
    img: "/images/products/product-11.jpg",
  },
  {
    img: "/images/products/product-12.jpg",
  },
];
