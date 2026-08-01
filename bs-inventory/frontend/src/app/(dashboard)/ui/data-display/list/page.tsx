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
  Checkbox,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Switch,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmpty } from "@/icons/form/mui-checkbox";
import NiAntenna from "@/icons/nexture/ni-antenna";
import NiArrowUpDown from "@/icons/nexture/ni-arrow-up-down";
import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiBluetooth from "@/icons/nexture/ni-bluetooth";
import NiBriefcase from "@/icons/nexture/ni-briefcase";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import NiDirectory from "@/icons/nexture/ni-directory";
import NiDocumentImage from "@/icons/nexture/ni-document-image";
import NiDollarSquare from "@/icons/nexture/ni-dollar-square";
import NiDrink from "@/icons/nexture/ni-drink";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiEmailOpen from "@/icons/nexture/ni-email-open";
import NiEuroSquare from "@/icons/nexture/ni-euro-square";
import NiExclamationHexagon from "@/icons/nexture/ni-exclamation-hexagon";
import NiFolder from "@/icons/nexture/ni-folder";
import NiInbox from "@/icons/nexture/ni-inbox";
import NiMessage from "@/icons/nexture/ni-message";
import NiMusic from "@/icons/nexture/ni-music";
import NiPlus from "@/icons/nexture/ni-plus";
import NiPoundSquare from "@/icons/nexture/ni-pound-square";
import NiSendRight from "@/icons/nexture/ni-send-right";
import NiSign from "@/icons/nexture/ni-sign";
import NiSignalLeftRight from "@/icons/nexture/ni-signal-left-right";
import NiSignalUp from "@/icons/nexture/ni-signal-up";
import NiStar from "@/icons/nexture/ni-star";
import NiTag from "@/icons/nexture/ni-tag";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };

  const [checked, setChecked] = React.useState([0]);
  const handleChecked = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const [toggled, setToggled] = React.useState(["wifi", "sounds", "vibration"]);

  const handleToggle = (value: string) => () => {
    const currentIndex = toggled.indexOf(value);
    const newToggled = [...toggled];

    if (currentIndex === -1) {
      newToggled.push(value);
    } else {
      newToggled.splice(currentIndex, 1);
    }

    setToggled(newToggled);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          List
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
          <Typography variant="body2">List</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Introduction
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiInbox size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiStar size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiSendRight size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiEmailOpen size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiBinEmpty size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemIcon>
                      <NiExclamationHexagon size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Spam" />
                  </ListItemButton>
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
              Nested List
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiInbox size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiStar size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Starred" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiSendRight size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Sent" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiEmailOpen size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItemButton>
                </ListItem>
              </List>
              <Divider />
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  {open ? <NiChevronUpSmall size="medium" /> : <NiChevronDownSmall size="medium" />}
                </ListItemIcon>
                <ListItemText primary="More" />
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{<NiDirectory size="medium" />}</ListItemIcon>
                    <ListItemText primary="Categories" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>{<NiTag size="medium" />}</ListItemIcon>
                    <ListItemText primary="Tags" />
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>{<NiSign size="medium" />}</ListItemIcon>
                    <ListItemText primary="Labels" />
                  </ListItemButton>
                </List>
              </Collapse>

              <Divider />
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiBinEmpty size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Trash" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemIcon>
                      <NiExclamationHexagon size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Spam" />
                  </ListItemButton>
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
              Folder List
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className="medium bg-primary-light/10 me-3">
                      <NiDocumentImage size="medium" className="text-primary-dark" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="p" variant="subtitle2" className="leading-4">
                        Photos
                      </Typography>
                    }
                    secondary="Jan 9, 2024"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className="medium bg-secondary-light/10 me-3">
                      <NiBriefcase size="medium" className="text-secondary-dark" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="p" variant="subtitle2" className="leading-4">
                        Work
                      </Typography>
                    }
                    secondary="Jan 12, 2024"
                    slotProps={{ primary: { className: "leading-4" } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className="medium bg-accent-1-light/10 me-3">
                      <NiDrink size="medium" className="text-accent-1-dark" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="p" variant="subtitle2" className="leading-4">
                        Vacation
                      </Typography>
                    }
                    secondary="July 20, 2024"
                    slotProps={{ primary: { className: "leading-4" } }}
                  />
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
              Interactive
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem
                  className="group"
                  secondaryAction={
                    <Box className="flex flex-row">
                      <Button
                        className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                        size="tiny"
                        color="grey"
                        variant="text"
                        startIcon={<NiPlus size={"small"} />}
                      />
                      <Button
                        className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                        size="tiny"
                        color="grey"
                        variant="text"
                        startIcon={<NiEllipsisHorizontal size={"small"} />}
                      />
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar className="medium bg-primary-light/10 me-3">
                      <NiFolder size="medium" className="text-primary-dark" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="p" variant="subtitle2" className="leading-4">
                        node_modules
                      </Typography>
                    }
                    secondary="Jan 9, 2014"
                    slotProps={{ primary: { className: "leading-4" } }}
                  />
                </ListItem>
                <ListItem
                  className="group"
                  secondaryAction={
                    <Box className="flex flex-row">
                      <Button
                        className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                        size="tiny"
                        color="grey"
                        variant="text"
                        startIcon={<NiPlus size={"small"} />}
                      />
                      <Button
                        className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                        size="tiny"
                        color="grey"
                        variant="text"
                        startIcon={<NiEllipsisHorizontal size={"small"} />}
                      />
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar className="medium bg-primary-light/10 me-3">
                      <NiFolder size="medium" className="text-primary-dark" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="p" variant="subtitle2" className="leading-4">
                        public
                      </Typography>
                    }
                    secondary="Jan 12, 2024"
                    slotProps={{ primary: { className: "leading-4" } }}
                  />
                </ListItem>
                <ListItem
                  className="group"
                  secondaryAction={
                    <Box className="flex flex-row">
                      <Button
                        className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                        size="tiny"
                        color="grey"
                        variant="text"
                        startIcon={<NiPlus size={"small"} />}
                      />
                      <Button
                        className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                        size="tiny"
                        color="grey"
                        variant="text"
                        startIcon={<NiEllipsisHorizontal size={"small"} />}
                      />
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar className="medium bg-primary-light/10 me-2">
                      <NiFolder size="medium" className="text-primary-dark" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography component="p" variant="subtitle2" className="leading-4">
                        src
                      </Typography>
                    }
                    secondary="July 20, 2024"
                    slotProps={{ primary: { className: "leading-4" } }}
                  />
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
              Selected ListItem
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List component="nav" aria-label="main mailbox folders">
                <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                  <ListItemIcon>
                    <NiDollarSquare size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="US Dollar" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                  <ListItemIcon>
                    <NiEuroSquare size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Euro" />
                </ListItemButton>
                <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                  <ListItemIcon>
                    <NiPoundSquare size="medium" />
                  </ListItemIcon>
                  <ListItemText primary="Pound" />
                </ListItemButton>
              </List>
            </Card>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Item Alignment
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" className="me-3" />
                  </ListItemAvatar>
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
                </ListItem>
                <Divider component="li" className="mx-4!" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" className="me-3" />
                  </ListItemAvatar>
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
                </ListItem>
                <Divider component="li" className="mx-4!" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" className="me-3" />
                  </ListItemAvatar>
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
              List Controls
            </Typography>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Checkbox
              </Typography>
              <Card className="outline-grey-100 max-w-80 rounded-md">
                <List>
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem
                        className="group"
                        key={value}
                        secondaryAction={
                          <Button
                            className="icon-only opacity-0 transition-opacity group-hover:opacity-100"
                            size="tiny"
                            color="grey"
                            variant="text"
                            startIcon={<NiMessage size={"small"} />}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton role={undefined} onClick={handleChecked(value)}>
                          <ListItemIcon>
                            <Checkbox
                              size="small"
                              checked={checked.includes(value)}
                              tabIndex={-1}
                              icon={<CheckboxSmallEmpty />}
                              checkedIcon={<CheckboxSmallChecked />}
                            />
                          </ListItemIcon>
                          <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Checkbox Secondary
              </Typography>
              <Card className="outline-grey-100 max-w-80 rounded-md">
                <List>
                  {[0, 1, 2, 3].map((value) => {
                    return (
                      <ListItem
                        key={value}
                        secondaryAction={
                          <Checkbox
                            size="small"
                            onChange={handleChecked(value)}
                            checked={checked.includes(value)}
                            icon={<CheckboxSmallEmpty />}
                            checkedIcon={<CheckboxSmallChecked />}
                          />
                        }
                        disablePadding
                      >
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar
                              alt={`Avatar ${value + 1}`}
                              src={`/images/avatars/avatar-${value + 1}.jpg`}
                              className="me-3"
                            />
                          </ListItemAvatar>
                          <ListItemText primary={`Line item ${value + 1}`} />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Card>
            </Box>

            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Switch
              </Typography>
              <Card className="outline-grey-100 max-w-80 rounded-md">
                <List subheader={<ListSubheader>Network</ListSubheader>} className="mb-2">
                  <ListItem>
                    <ListItemIcon>
                      <NiSignalUp size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Wi-Fi" />
                    <Switch size="small" onChange={handleToggle("wifi")} checked={toggled.includes("wifi")} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NiArrowUpDown />
                    </ListItemIcon>
                    <ListItemText primary="Mobile Data" />
                    <Switch size="small" onChange={handleToggle("mobile")} checked={toggled.includes("mobile")} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NiAntenna />
                    </ListItemIcon>
                    <ListItemText primary="Mobile Hotspot" />
                    <Switch size="small" onChange={handleToggle("hotspot")} checked={toggled.includes("hotspot")} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NiBluetooth />
                    </ListItemIcon>
                    <ListItemText primary="Bluetooth" />
                    <Switch size="small" onChange={handleToggle("bluetooth")} checked={toggled.includes("bluetooth")} />
                  </ListItem>
                </List>
                <List subheader={<ListSubheader>Sounds and Notification</ListSubheader>}>
                  <ListItem>
                    <ListItemIcon>
                      <NiMusic size="medium" />
                    </ListItemIcon>
                    <ListItemText primary="Sounds" />
                    <Switch size="small" onChange={handleToggle("sounds")} checked={toggled.includes("sounds")} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <NiSignalLeftRight />
                    </ListItemIcon>
                    <ListItemText primary="Vibration" />
                    <Switch size="small" onChange={handleToggle("vibration")} checked={toggled.includes("vibration")} />
                  </ListItem>
                </List>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Sticky Subheader
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List subheader={<li />} className="relative max-h-80 overflow-auto">
                {[0, 1, 2, 3, 4].map((sectionId) => (
                  <li key={`section-${sectionId}`}>
                    <ul className="p-0">
                      <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
                      {[0, 1, 2].map((item) => (
                        <ListItem key={`item-${sectionId}-${item}`}>
                          <ListItemText primary={`Item ${item}`} />
                        </ListItem>
                      ))}
                    </ul>
                  </li>
                ))}
              </List>
            </Card>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Inset List Item
            </Typography>

            <Card className="outline-grey-100 max-w-80 rounded-md">
              <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <NiStar />
                    </ListItemIcon>
                    <ListItemText primary="Chelsea Otakan" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText className="ps-7" primary="Eric Hoffman" />
                  </ListItemButton>
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
              Gutterless List
            </Typography>

            <Card className="border-grey-100 max-w-80 rounded-md border border-solid p-0 shadow-none!">
              <List>
                {[1, 2, 3].map((value) => (
                  <ListItem key={value} disableGutters>
                    <ListItemText primary={`Line item ${value}`} />
                  </ListItem>
                ))}
              </List>
            </Card>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
