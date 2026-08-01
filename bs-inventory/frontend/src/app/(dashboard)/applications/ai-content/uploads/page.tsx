"use client";

import AIContentLightbox from "../components/ai-content-lightbox";
import Link from "next/link";
import { useState } from "react";

import Masonry from "@mui/lab/Masonry";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
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
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
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
            Uploads
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
            <Typography variant="body2">Uploads</Typography>
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

                  <Box className="flex h-full flex-col justify-end p-7">
                    <Box className="flex flex-row items-end justify-between gap-2.5">
                      <Box className="flex flex-col">
                        <Typography className="text-text-contrast line-clamp-1" variant="subtitle2">
                          image.jpg
                        </Typography>
                        <Typography className="text-text-contrast line-clamp-1" variant="body2">
                          245KB · Yesterday
                        </Typography>
                      </Box>

                      <Button
                        size="tiny"
                        color="grey"
                        variant="pastel"
                        startIcon={<NiEllipsisHorizontal size={"small"} />}
                        className={cn(
                          "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                        )}
                      />
                    </Box>
                  </Box>
                </Box>
                <img
                  srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=162&auto=format`}
                  alt={"library"}
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
