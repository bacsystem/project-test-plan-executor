"use client";

import Link from "next/link";
import React from "react";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  ClickAwayListener,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { Grid } from "@mui/material";

import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import { Instance } from "@popperjs/core";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const handleTooltipClose = () => {
    setOpen(false);
  };
  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const [openControlled, setOpenControlled] = React.useState(false);
  const handleCloseControlled = () => {
    setOpenControlled(false);
  };
  const handleOpenControlled = () => {
    setOpenControlled(true);
  };

  const longText = `Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus. Praesent non nunc mollis, fermentum neque at, semper arcu.`;

  const positionRef = React.useRef<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const popperRef = React.useRef<Instance>(null);
  const areaRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Tooltip
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/data-display">
            Data Display
          </Link>
          <Typography variant="body2">Tooltip</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Tooltip title="Delete">
              <Button
                className="icon-only"
                size="small"
                color="primary"
                variant="pastel"
                startIcon={<NiBinEmpty size={"small"} />}
              />
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Positioned Tooltips
            </Typography>
            <Box className="w-96">
              <Grid container className="justify-center">
                <Grid>
                  <Tooltip title="Add" placement="top-start">
                    <Button>Top Start</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="top">
                    <Button>Top</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="top-end">
                    <Button>Top End</Button>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container className="justify-center">
                <Grid size={{ xs: 6 }}>
                  <Grid>
                    <Tooltip title="Add" placement="left-start">
                      <Button>Left Start</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="left">
                      <Button>Left</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="left-end">
                      <Button>Left End</Button>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 6 }} className="flex flex-col items-end">
                  <Grid>
                    <Tooltip title="Add" placement="right-start">
                      <Button>Right Start</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="right">
                      <Button>Right</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="right-end">
                      <Button>Right End</Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className="justify-center">
                <Grid>
                  <Tooltip title="Add" placement="bottom-start">
                    <Button>Bottom Start</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="bottom">
                    <Button>Bottom</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="bottom-end">
                    <Button>Bottom End</Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Arrow Tooltips
            </Typography>
            <Box className="w-96">
              <Grid container className="justify-center">
                <Grid>
                  <Tooltip title="Add" placement="top-start" arrow>
                    <Button>Top Start</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="top" arrow>
                    <Button>Top</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="top-end" arrow>
                    <Button>Top End</Button>
                  </Tooltip>
                </Grid>
              </Grid>
              <Grid container className="justify-center">
                <Grid size={{ xs: 6 }}>
                  <Grid>
                    <Tooltip title="Add" placement="left-start" arrow>
                      <Button>Left Start</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="left" arrow>
                      <Button>Left</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="left-end" arrow>
                      <Button>Left End</Button>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid size={{ xs: 6 }} className="flex flex-col items-end">
                  <Grid>
                    <Tooltip title="Add" placement="right-start" arrow>
                      <Button>Right Start</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="right" arrow>
                      <Button>Right</Button>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="Add" placement="right-end" arrow>
                      <Button>Right End</Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container className="justify-center">
                <Grid>
                  <Tooltip title="Add" placement="bottom-start" arrow>
                    <Button>Bottom Start</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="bottom" arrow>
                    <Button>Bottom</Button>
                  </Tooltip>
                  <Tooltip title="Add" placement="bottom-end" arrow>
                    <Button>Bottom End</Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Size
            </Typography>
            <Box className="flex flex-col items-start gap-2">
              <Tooltip title="Small" placement="right">
                <Button>Small</Button>
              </Tooltip>
              <Tooltip title="Small Arrow" placement="right" arrow>
                <Button>Small Arrow</Button>
              </Tooltip>
              <Tooltip title="Large" placement="right" slotProps={{ tooltip: { className: "large" } }}>
                <Button>Large</Button>
              </Tooltip>
              <Tooltip title="Large Arrow" placement="right" arrow slotProps={{ tooltip: { className: "large" } }}>
                <Button>Large Arrow</Button>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Colors
            </Typography>
            <Box className="flex flex-col items-start gap-2">
              <Tooltip
                title="Text Primary"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-text-primary",
                  },
                }}
              >
                <Button color="text-primary">Text Primary</Button>
              </Tooltip>
              <Tooltip
                title="Text Secondary"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-text-secondary",
                  },
                }}
              >
                <Button color="text-secondary">Text Secondary</Button>
              </Tooltip>
              <Tooltip
                title="Text Disabled"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-text-disabled",
                  },
                }}
              >
                <Button color="text-disabled">Text Disabled</Button>
              </Tooltip>
              <Tooltip
                title="Primary"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-primary",
                  },
                }}
              >
                <Button color="primary">Primary</Button>
              </Tooltip>
              <Tooltip
                title="Secondary"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-secondary",
                  },
                }}
              >
                <Button color="secondary">Secondary</Button>
              </Tooltip>
              <Tooltip
                title="Accent 1"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-accent-1",
                  },
                }}
              >
                <Button color="accent-1">Accent 1</Button>
              </Tooltip>
              <Tooltip
                title="Accent 2"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-accent-2",
                  },
                }}
              >
                <Button color="accent-2">Accent 2</Button>
              </Tooltip>
              <Tooltip
                title="Accent 3"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-accent-3",
                  },
                }}
              >
                <Button color="accent-3">Accent 3</Button>
              </Tooltip>
              <Tooltip
                title="Accent 4"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-accent-4",
                  },
                }}
              >
                <Button color="accent-4">Accent 4</Button>
              </Tooltip>
              <Tooltip
                title="Info"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-info",
                  },
                }}
              >
                <Button color="info">Info</Button>
              </Tooltip>
              <Tooltip
                title="Success"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-success",
                  },
                }}
              >
                <Button color="success">Success</Button>
              </Tooltip>
              <Tooltip
                title="Warning"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-warning",
                  },
                }}
              >
                <Button color="warning">Warning</Button>
              </Tooltip>
              <Tooltip
                title="Error"
                placement="right"
                arrow
                slotProps={{
                  tooltip: {
                    className: "text-error",
                  },
                }}
              >
                <Button color="error">Error</Button>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Distance from Anchor
            </Typography>
            <Tooltip
              arrow
              title="Add"
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: "offset",
                      options: {
                        offset: [0, -14],
                      },
                    },
                  ],
                },
              }}
            >
              <Button>Offset</Button>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Child Element
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem alignItems="flex-start">
                  <Tooltip title="Remy Sharp" placement="left" arrow>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" className="me-3" />
                    </ListItemAvatar>
                  </Tooltip>
                  <Tooltip title="Remy Sharp" placement="right" arrow>
                    <ListItemText
                      primary={
                        <Typography component="p" variant="subtitle2">
                          Brunch this weekend?
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body1" className="text-text-primary inline">
                            Ali Connors
                          </Typography>
                          <Typography component="span" variant="body1" className="text-text-secondary inline">
                            — I will be in your neighborhood doing errands this…
                          </Typography>
                        </>
                      }
                    />
                  </Tooltip>
                </ListItem>
                <Divider component="li" className="mx-4!" />
                <ListItem alignItems="flex-start">
                  <Tooltip title="Travis Howard" placement="left" arrow>
                    <ListItemAvatar>
                      <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" className="me-3" />
                    </ListItemAvatar>
                  </Tooltip>
                  <Tooltip title="Travis Howard" placement="right" arrow>
                    <ListItemText
                      primary={
                        <Typography component="p" variant="subtitle2">
                          Summer BBQ
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body1" className="text-text-primary inline">
                            Scott, Alex, Jennifer
                          </Typography>
                          <Typography component="span" variant="body1" className="text-text-secondary inline">
                            — Wish I could come, but I am out of town this…
                          </Typography>
                        </>
                      }
                    />
                  </Tooltip>
                </ListItem>
                <Divider component="li" className="mx-4!" />
                <ListItem alignItems="flex-start">
                  <Tooltip title="Cindy Baker" placement="left" arrow>
                    <ListItemAvatar>
                      <Avatar alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" className="me-3" />
                    </ListItemAvatar>
                  </Tooltip>
                  <Tooltip title="Cindy Baker" placement="right" arrow>
                    <ListItemText
                      primary={
                        <Typography component="p" variant="subtitle2">
                          Paris vacation!
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography component="span" variant="body1" className="text-text-primary inline">
                            Oui Oui
                          </Typography>
                          <Typography component="span" variant="body1" className="text-text-secondary inline">
                            — Do you have Paris recommendations? Have you ever…
                          </Typography>
                        </>
                      }
                    />
                  </Tooltip>
                </ListItem>
              </List>
            </Card>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Triggers
            </Typography>
            <Grid container>
              <Grid>
                <Tooltip disableFocusListener title="Add" placement="top" arrow>
                  <Button>Hover or touch</Button>
                </Tooltip>
              </Grid>
              <Grid>
                <Tooltip disableFocusListener disableTouchListener title="Add" placement="top" arrow>
                  <Button>Hover</Button>
                </Tooltip>
              </Grid>
              <Grid>
                <ClickAwayListener onClickAway={handleTooltipClose}>
                  <div>
                    <Tooltip
                      arrow
                      placement="top"
                      onClose={handleTooltipClose}
                      open={open}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title="Add"
                      slotProps={{
                        popper: {
                          disablePortal: true,
                        },
                      }}
                    >
                      <Button onClick={handleTooltipOpen}>Click</Button>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Controlled Tooltips
            </Typography>
            <Tooltip
              open={openControlled}
              onClose={handleCloseControlled}
              onOpen={handleOpenControlled}
              title="Add"
              arrow
            >
              <Button onClick={() => handleCloseControlled()}>Controlled</Button>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Variable Width
            </Typography>
            <Tooltip
              title={longText}
              placement="top"
              arrow
              slotProps={{
                tooltip: {
                  className: "max-w-[300px]",
                },
              }}
            >
              <Button>Default Width [300px]</Button>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={longText}
              slotProps={{
                tooltip: {
                  className: "max-w-[500px]",
                },
              }}
            >
              <Button>Default Width [500px]</Button>
            </Tooltip>
            <Tooltip
              placement="top"
              arrow
              title={longText}
              slotProps={{
                tooltip: {
                  className: "max-w-none",
                },
              }}
            >
              <Button>No wrapping</Button>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Disabled Elements
            </Typography>
            <Tooltip title="You don't have permission to do this" arrow>
              <span>
                <Button disabled>A Disabled Button</Button>
              </span>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Transitions
            </Typography>
            <Box>
              <Tooltip title="Add" arrow>
                <Button>Grow</Button>
              </Tooltip>
              <Tooltip
                arrow
                title="Add"
                slots={{
                  transition: Fade,
                }}
                slotProps={{
                  transition: { timeout: 600 },
                }}
              >
                <Button>Fade</Button>
              </Tooltip>
              <Tooltip
                arrow
                title="Add"
                slots={{
                  transition: Zoom,
                }}
              >
                <Button>Zoom</Button>
              </Tooltip>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Follow Cursor
            </Typography>
            <Tooltip title="You don't have permission to do this" followCursor arrow>
              <Button>Button</Button>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Virtual Element
            </Typography>
            <Tooltip
              title="Add"
              placement="top"
              arrow
              slotProps={{
                popper: {
                  popperRef,
                  anchorEl: {
                    getBoundingClientRect: () => {
                      return new DOMRect(positionRef.current.x, areaRef.current!.getBoundingClientRect().y, 0, 0);
                    },
                  },
                },
              }}
            >
              <Box
                ref={areaRef}
                onMouseMove={handleMouseMove}
                className="bg-primary/10 text-primary-dark rounded-md px-4 py-4"
              >
                Hover
              </Box>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Showing and Hiding
            </Typography>
            <Tooltip title="Add" enterDelay={500} leaveDelay={200} arrow>
              <Button>[500ms, 200ms]</Button>
            </Tooltip>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
