"use client";

import AIContentLightbox from "../components/ai-content-lightbox";
import Link from "next/link";
import { useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  TextareaAutosize,
  Tooltip,
  Typography,
} from "@mui/material";

import NiAI from "@/icons/nexture/ni-ai";
import NiArrowCircleLeft from "@/icons/nexture/ni-arrow-circle-left";
import NiArrowInDown from "@/icons/nexture/ni-arrow-in-down";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiMagicWand from "@/icons/nexture/ni-magic-wand";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiPenSquare from "@/icons/nexture/ni-pen-square";
import NiScale from "@/icons/nexture/ni-scale";
import NiSendRight from "@/icons/nexture/ni-send-right";
import { cn } from "@/lib/utils";

export default function Page() {
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
            Image
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
            <Typography variant="body2">Image</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>

      <Grid size={12} className="flex flex-row gap-1.5">
        <Card className="w-full">
          <CardContent className="flex flex-col gap-4 p-2!">
            <FormControl className="MuiTextField-root relative mb-0 w-full">
              <TextareaAutosize
                minRows={1}
                maxRows={3}
                className="MuiInputBase-root MuiInput-root outlined autosize bg-background-paper! w-full resize-none pe-20! outline-none!"
                placeholder="Get creative..."
              />
              <Box className="absolute inset-e-0 flex flex-row">
                <Tooltip title="Talk" arrow enterDelay={2000}>
                  <Button
                    className="icon-only"
                    size="medium"
                    color="grey"
                    variant="text"
                    startIcon={<NiMicrophone size={"medium"} />}
                  />
                </Tooltip>
                <Tooltip title="Send" arrow enterDelay={2000}>
                  <Button
                    className="icon-only ms-1"
                    size="medium"
                    color="primary"
                    variant="pastel"
                    startIcon={<NiSendRight size={"medium"} />}
                  />
                </Tooltip>
              </Box>
            </FormControl>
            <Box className="flex flex-row gap-2 p-3">
              <Button size="medium" color="primary" variant="contained" startIcon={<NiMagicWand />}>
                Generate
              </Button>
              <Tooltip title="Improve Prompt" arrow>
                <Button size="medium" color="grey" variant="pastel" className="icon-only" startIcon={<NiAI />} />
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
                Generation #246
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
              <Typography variant="body1">
                A handcrafted wooden buck toy standing proudly in a sunlit forest clearing. The toy is carved from rich,
                warm-toned oak with visible wood grain and smooth, rounded edges. Its antlers are stylized and slightly
                exaggerated for a playful look, and its legs are jointed with small wooden pegs, allowing limited
                movement. The buck's eyes are tiny black beads embedded in the wood, giving it a gentle, curious
                expression.
              </Typography>

              <Grid container size={12} className="w-full" spacing={2.5}>
                {itemData1.map((item, index) => (
                  <Grid size={{ "2xl": 3, lg: 4, md: 6, xs: 12 }} key={index}>
                    <Box className="group relative overflow-hidden rounded-lg p-0">
                      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                        <Button
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleClickOpenDialog();
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
                Generation #245
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
              <Typography variant="body1">
                Hand-carved wooden toy lion made from smooth oak, with a stylized mane, rounded edges, and warm amber
                finish. Studio lighting, soft neutral background, product photography style.
              </Typography>

              <Grid container size={12} className="w-full" spacing={2.5}>
                {itemData2.map((item, index) => (
                  <Grid size={{ "2xl": 3, lg: 4, md: 6, xs: 12 }} key={index}>
                    <Box className="group relative overflow-hidden rounded-lg p-0">
                      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                        <Button
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleClickOpenDialog();
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
                Generation #244
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
              <Typography variant="body1">
                Handcrafted wooden bird carved from smooth maple, with minimalist wings, rounded contours, and a natural
                matte finish. Studio lighting, soft neutral background, product photography style.
              </Typography>

              <Grid container size={12} className="w-full" spacing={2.5}>
                {itemData3.map((item, index) => (
                  <Grid size={{ "2xl": 3, lg: 4, md: 6, xs: 12 }} key={index}>
                    <Box className="group relative overflow-hidden rounded-lg p-0">
                      <Box className="absolute inset-0 z-1 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 group-hover:backdrop-blur-[1px]">
                        <Button
                          onClick={(event: any) => {
                            event.preventDefault();
                            handleClickOpenDialog();
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

      <AIContentLightbox onClose={handleCloseDialog} open={openDialog} />
    </Grid>
  );
}

const itemData1 = [
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
];

const itemData2 = [
  {
    img: "/images/products/product-5.jpg",
  },
  {
    img: "/images/products/product-6.jpg",
  },
];

const itemData3 = [
  {
    img: "/images/products/product-7.jpg",
  },
  {
    img: "/images/products/product-8.jpg",
  },
];
