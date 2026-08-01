"use client";
import Link from "next/link";
import { useState } from "react";

import { Box, Breadcrumbs, Button, Card, CardContent, CardMedia, Grid, Tooltip, Typography } from "@mui/material";

import NiBrackets from "@/icons/nexture/ni-brackets";
import NiCamera from "@/icons/nexture/ni-camera";
import NiCameraInactive from "@/icons/nexture/ni-camera-inactive";
import NiCross from "@/icons/nexture/ni-cross";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiExpandFull from "@/icons/nexture/ni-expand-full";
import NiMicrophone from "@/icons/nexture/ni-microphone";
import NiMicrophoneInactive from "@/icons/nexture/ni-microphone-inactive";
import NiPlusSquare from "@/icons/nexture/ni-plus-square";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSettings from "@/icons/nexture/ni-settings";
import NiShrinkFull from "@/icons/nexture/ni-shrink-full";
import { cn } from "@/lib/utils";

export default function Page() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [expand, setExpand] = useState(false);

  return (
    <Box className="relative flex h-full min-h-[calc(100vh-12rem)] flex-col items-center gap-5">
      <Grid container spacing={5} className="w-full" size={12}>
        <Grid container spacing={2.5} className="w-full" size={12}>
          <Grid size={{ md: "grow", xs: 12 }}>
            <Typography variant="h1" component="h1" className="mb-0">
              Call Hgt-871
            </Typography>
            <Breadcrumbs>
              <Link color="inherit" href="/dashboards/default">
                Home
              </Link>
              <Link color="inherit" href="/applications">
                Applications
              </Link>
              <Typography variant="body2">Messages</Typography>
            </Breadcrumbs>
          </Grid>

          <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
            <Button
              className="surface-standard"
              size="medium"
              color="grey"
              variant="surface"
              startIcon={<NiPlusSquare size={"medium"} className={cn("transition-transform rtl:rotate-180")} />}
            >
              Invite
            </Button>
            <Tooltip title="Settings">
              <Button className="icon-only surface-standard" color="grey" variant="surface">
                <NiEllipsisHorizontal size={"medium"} />
              </Button>
            </Tooltip>
            <Tooltip title="Close">
              <Button
                className="icon-only surface-standard"
                color="grey"
                variant="surface"
                component={Link}
                href="/applications/messages/home"
              >
                <NiCross size={"medium"} />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>

      {expand ? (
        <Box className={cn("flex w-full flex-1 flex-col items-center justify-center pb-32")}>
          <Box className="flex w-full flex-col items-center gap-4">
            <Grid size={{ xs: 12 }} container spacing={5} className="mt-2 w-full justify-center">
              <Grid size={{ xs: 10 }}>
                <Card className="relative pb-0">
                  <CardMedia
                    component="img"
                    alt="screen"
                    className="rounded-md"
                    image="/images/misc/screen-1-large.jpg"
                  />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Daniela Fontaine Sharing
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiShrinkFull size={"small"} />}
                    onClick={() => {
                      setExpand(false);
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }} container spacing={5} className="mt-2 w-full justify-center">
              <Grid size={{ sm: 4, md: 2 }}>
                <Card className="relative h-full pb-0">
                  <CardMedia
                    component="img"
                    alt="avatar"
                    className="rounded-md"
                    image="/images/avatars/large/avatar-1.jpg"
                  />

                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Liam Carter
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only bg-grey-25/50 pointer-events-none absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiMicrophoneInactive size={"small"} />}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 4, md: 2 }}>
                <Card className="relative h-full pb-0">
                  <CardMedia
                    component="img"
                    alt="avatar"
                    className="rounded-md"
                    image="/images/avatars/large/avatar-2.jpg"
                  />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Mia Sullivan
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only bg-grey-25/50 pointer-events-none absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiMicrophoneInactive size={"small"} />}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 4, md: 2 }}>
                <Card className="outline-primary/40 relative h-full pb-0 outline-2 -outline-offset-2">
                  <CardMedia
                    component="img"
                    alt="avatar"
                    className="rounded-md"
                    image="/images/avatars/large/avatar-3.jpg"
                  />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Daniela Fontaine
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only absolute top-6 right-6"
                    size="small"
                    color="primary"
                    variant="contained"
                    startIcon={<NiBrackets size={"small"} />}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 4, md: 2 }}>
                <Card className="relative h-full pb-0">
                  <CardMedia component="img" alt="screen" className="rounded-md" image="/images/misc/screen-2.jpg" />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Mia Sullivan Sharing
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiExpandFull size={"small"} />}
                    onClick={() => {
                      setExpand(true);
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      ) : (
        <Box className={cn("flex w-full flex-1 flex-col items-center justify-center pb-32")}>
          <Box className="flex w-full flex-col items-center gap-4">
            <Grid size={{ xs: 12 }} container spacing={5} className="mt-2 w-full justify-center">
              <Grid size={{ sm: 6, md: 4, xs: 12 }}>
                <Card className="relative pb-0">
                  <CardMedia
                    component="img"
                    alt="avatar"
                    className="rounded-md"
                    image="/images/avatars/large/avatar-1.jpg"
                  />

                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Liam Carter
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only bg-grey-25/50 pointer-events-none absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiMicrophoneInactive size={"small"} />}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 6, md: 4, xs: 12 }}>
                <Card className="relative pb-0">
                  <CardMedia
                    component="img"
                    alt="avatar"
                    className="rounded-md"
                    image="/images/avatars/large/avatar-2.jpg"
                  />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Mia Sullivan
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only bg-grey-25/50 pointer-events-none absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiMicrophoneInactive size={"small"} />}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 6, md: 4, xs: 12 }}>
                <Card className="outline-primary/40 relative pb-0 outline-2 -outline-offset-2">
                  <CardMedia
                    component="img"
                    alt="avatar"
                    className="rounded-md"
                    image="/images/avatars/large/avatar-3.jpg"
                  />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Daniela Fontaine
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only absolute top-6 right-6"
                    size="small"
                    color="primary"
                    variant="contained"
                    startIcon={<NiBrackets size={"small"} />}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 6, md: 4, xs: 12 }}>
                <Card className="relative pb-0">
                  <CardMedia component="img" alt="screen" className="rounded-md" image="/images/misc/screen-1.jpg" />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Daniela Fontaine Sharing
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiExpandFull size={"small"} />}
                    onClick={() => {
                      setExpand(true);
                    }}
                  />
                </Card>
              </Grid>
              <Grid size={{ sm: 6, md: 4, xs: 12 }}>
                <Card className="relative pb-0">
                  <CardMedia component="img" alt="screen" className="rounded-md" image="/images/misc/screen-2.jpg" />
                  <CardContent className="flex flex-row justify-between">
                    <Typography variant="subtitle1" component="h6">
                      Mia Sullivan Sharing
                    </Typography>
                    <Button
                      className="icon-only"
                      size="small"
                      color="grey"
                      variant="text"
                      startIcon={<NiEllipsisHorizontal size={"small"} />}
                    />
                  </CardContent>
                  <Button
                    className="icon-only absolute top-6 right-6"
                    size="small"
                    color="grey"
                    variant="pastel"
                    startIcon={<NiExpandFull size={"small"} />}
                    onClick={() => {
                      setExpand(true);
                    }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}

      <Box className="fixed bottom-0 z-2 w-screen">
        <Box className="-mx-4">
          <Box className="p-4">
            <Box className="flex flex-row justify-center gap-2 p-4">
              {mic ? (
                <Tooltip title="Microphone" placement="top" arrow enterDelay={1000}>
                  <Button
                    className="icon-only surface-standard text-primary"
                    color="grey"
                    variant="surface"
                    size="large"
                    onClick={() => {
                      setMic(false);
                    }}
                  >
                    <NiMicrophone size="large" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Microphone" placement="top" arrow enterDelay={1000}>
                  <Button
                    className="icon-only surface-standard"
                    color="text-disabled"
                    variant="surface"
                    size="large"
                    onClick={() => {
                      setMic(true);
                    }}
                  >
                    <NiMicrophoneInactive size="large" />
                  </Button>
                </Tooltip>
              )}
              {cam ? (
                <Tooltip title="Camera" placement="top" arrow enterDelay={1000}>
                  <Button
                    className="icon-only surface-standard text-primary"
                    color="grey"
                    variant="surface"
                    size="large"
                    onClick={() => {
                      setCam(false);
                    }}
                  >
                    <NiCamera size="large" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip title="Camera" placement="top" arrow enterDelay={1000}>
                  <Button
                    className="icon-only surface-standard"
                    color="text-disabled"
                    variant="surface"
                    size="large"
                    onClick={() => {
                      setCam(true);
                    }}
                  >
                    <NiCameraInactive size="large" />
                  </Button>
                </Tooltip>
              )}

              <Tooltip title="Screen Share" placement="top" arrow enterDelay={1000}>
                <Button className="icon-only surface-standard" color="grey" variant="surface" size="large">
                  <NiScreen size="large" />
                </Button>
              </Tooltip>

              <Tooltip title="Settings" placement="top" arrow enterDelay={1000}>
                <Button className="icon-only surface-standard" color="grey" variant="surface" size="large">
                  <NiSettings size="large" />
                </Button>
              </Tooltip>

              <Button
                className="surface-standard hover:text-error-dark!"
                size="large"
                color="error"
                variant="surface"
                component={Link}
                href="/applications/messages/home"
              >
                Leave
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
