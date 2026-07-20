"use client";

import AIContentLightbox from "../components/ai-content-lightbox";
import AIContentSelect from "../components/ai-content-select";
import Link from "next/link";
import { useState } from "react";

import { Avatar, Box, Breadcrumbs, Button, Card, CardContent, Grid, Tooltip, Typography } from "@mui/material";

import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiScale from "@/icons/nexture/ni-scale";
import { cn } from "@/lib/utils";

export default function Page() {
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const handleClickOpenDetailDialog = () => {
    setOpenDetailDialog(true);
  };
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  const [openSelectDialog, setOpenSelectDialog] = useState(false);
  const [imageSelected, setImageSelected] = useState(false);
  const handleClickOpenSelectDialog = () => {
    setOpenSelectDialog(true);
  };
  const handleCloseSelectDialog = () => {
    setOpenSelectDialog(false);
  };
  const handleConfirmSelectDialog = () => {
    setOpenSelectDialog(false);
    setImageSelected(true);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Upscale
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
            <Typography variant="body2">Upscale</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid size={12} className="flex flex-row gap-1.5">
        <Card className="w-full">
          <CardContent className="flex flex-col items-start justify-start gap-4 p-2!">
            <Box className="h-9 ps-3 pt-3">
              {imageSelected ? (
                <Avatar alt="selected-image" src="/images/products/product-1.jpg" className="medium" />
              ) : (
                <Button
                  size="medium"
                  color="text-secondary"
                  variant="text"
                  className="hover:text-primary p-0! text-left! hover:bg-transparent active:bg-transparent"
                  onClick={handleClickOpenSelectDialog}
                >
                  Select Image
                </Button>
              )}
            </Box>

            <Box className="flex flex-row gap-2 p-3">
              <Button
                size="medium"
                color="primary"
                variant="contained"
                startIcon={<NiScale />}
                disabled={!imageSelected}
              >
                Upscale
              </Button>
              <Tooltip title="Select Image" arrow>
                <Button
                  size="medium"
                  color="grey"
                  variant="pastel"
                  className="icon-only"
                  startIcon={<NiDocumentImage />}
                  onClick={handleClickOpenSelectDialog}
                />
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card className="group/card w-full">
          <CardContent>
            <Box className="flex flex-row items-start justify-between">
              <Typography variant="h6" component="h6" className="card-title">
                Upscale #28
              </Typography>
              <Box className="flex flex-row gap-1 opacity-0 transition-opacity group-hover/card:opacity-100">
                <Tooltip title="Edit Prompt" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiPenSquare size={"small"} />}
                  />
                </Tooltip>
                <Tooltip title="Regenerate" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiArrowCircleLeft size={"small"} />}
                  />
                </Tooltip>
                <Tooltip title="Options" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Tooltip>
              </Box>
            </Box>

            <Box className="flex flex-col gap-3">
              <Grid container size={12} className="w-full" spacing={2.5}>
                {itemData1.map((item, index) => (
                  <Grid size={{ "2xl": 3, lg: 4, md: 6, xs: 12 }} key={index}>
                    <Box className="group relative overflow-hidden rounded-lg p-0">
                      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                        <Button
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleClickOpenDetailDialog();
                          }}
                          className="absolute z-0 h-full w-full border-none! bg-transparent! outline-none!"
                        ></Button>

                        <Box className="flex h-full flex-col justify-end p-7">
                          <Box className="flex flex-col gap-2.5">
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
                                  startIcon={<NiScale size={"small"} />}
                                  className={cn(
                                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                                  )}
                                />
                                <Button
                                  size="tiny"
                                  color="grey"
                                  variant="pastel"
                                  startIcon={<NiArrowInDown size={"small"} />}
                                  className={cn(
                                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                                  )}
                                />
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
                        </Box>
                      </Box>
                      <img
                        srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=162&auto=format`}
                        alt={"upload"}
                        loading="lazy"
                        className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card className="group/card w-full">
          <CardContent>
            <Box className="flex flex-row items-start justify-between">
              <Typography variant="h6" component="h6" className="card-title">
                Upscale #27
              </Typography>
              <Box className="flex flex-row gap-1 opacity-0 transition-opacity group-hover/card:opacity-100">
                <Tooltip title="Edit Prompt" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiPenSquare size={"small"} />}
                  />
                </Tooltip>
                <Tooltip title="Regenerate" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiArrowCircleLeft size={"small"} />}
                  />
                </Tooltip>
                <Tooltip title="Options" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Tooltip>
              </Box>
            </Box>

            <Box className="flex flex-col gap-3">
              <Grid container size={12} className="w-full" spacing={2.5}>
                {itemData2.map((item, index) => (
                  <Grid size={{ "2xl": 3, lg: 4, md: 6, xs: 12 }} key={index}>
                    <Box className="group relative overflow-hidden rounded-lg p-0">
                      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                        <Button
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleClickOpenDetailDialog();
                          }}
                          className="absolute z-0 h-full w-full border-none! bg-transparent! outline-none!"
                        ></Button>

                        <Box className="flex h-full flex-col justify-end p-7">
                          <Box className="flex flex-col gap-2.5">
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
                                  startIcon={<NiScale size={"small"} />}
                                  className={cn(
                                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                                  )}
                                />
                                <Button
                                  size="tiny"
                                  color="grey"
                                  variant="pastel"
                                  startIcon={<NiArrowInDown size={"small"} />}
                                  className={cn(
                                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                                  )}
                                />
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
                        </Box>
                      </Box>
                      <img
                        srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=162&auto=format`}
                        alt={"upload"}
                        loading="lazy"
                        className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card className="group/card w-full">
          <CardContent>
            <Box className="flex flex-row items-start justify-between">
              <Typography variant="h6" component="h6" className="card-title">
                Upscale #26
              </Typography>
              <Box className="flex flex-row gap-1 opacity-0 transition-opacity group-hover/card:opacity-100">
                <Tooltip title="Edit Prompt" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiPenSquare size={"small"} />}
                  />
                </Tooltip>
                <Tooltip title="Regenerate" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiArrowCircleLeft size={"small"} />}
                  />
                </Tooltip>
                <Tooltip title="Options" arrow>
                  <Button
                    size="small"
                    color="text-primary"
                    variant="text"
                    className="icon-only"
                    startIcon={<NiEllipsisHorizontal size={"small"} />}
                  />
                </Tooltip>
              </Box>
            </Box>

            <Box className="flex flex-col gap-3">
              <Grid container size={12} className="w-full" spacing={2.5}>
                {itemData3.map((item, index) => (
                  <Grid size={{ "2xl": 3, lg: 4, md: 6, xs: 12 }} key={index}>
                    <Box className="group relative overflow-hidden rounded-lg p-0">
                      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                        <Button
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleClickOpenDetailDialog();
                          }}
                          className="absolute z-0 h-full w-full border-none! bg-transparent! outline-none!"
                        ></Button>

                        <Box className="flex h-full flex-col justify-end p-7">
                          <Box className="flex flex-col gap-2.5">
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
                                  startIcon={<NiScale size={"small"} />}
                                  className={cn(
                                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                                  )}
                                />
                                <Button
                                  size="tiny"
                                  color="grey"
                                  variant="pastel"
                                  startIcon={<NiArrowInDown size={"small"} />}
                                  className={cn(
                                    "[.active]:text-primary [.active]:bg-grey-25 hover:text-primary [.active:hover]:text-text-primary icon-only min-w-0",
                                  )}
                                />
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
                        </Box>
                      </Box>
                      <img
                        srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=162&auto=format`}
                        alt={"upload"}
                        loading="lazy"
                        className="relative z-0 w-full scale-110 object-cover transition-transform group-hover:scale-100"
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <AIContentLightbox onClose={handleCloseDetailDialog} open={openDetailDialog} />
      <AIContentSelect
        onClose={handleCloseSelectDialog}
        open={openSelectDialog}
        onConfirm={handleConfirmSelectDialog}
      />
    </Grid>
  );
}

const itemData1 = [
  {
    img: "/images/products/product-1.jpg",
  },
];

const itemData2 = [
  {
    img: "/images/products/product-2.jpg",
  },
];

const itemData3 = [
  {
    img: "/images/products/product-3.jpg",
  },
];
