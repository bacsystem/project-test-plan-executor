import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardActions,
  Chip,
  ClickAwayListener,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  PopoverVirtualElement,
  Popper,
  Tab,
  Tooltip,
  Typography,
} from "@mui/material";

import NiBell from "@/icons/nexture/ni-bell";
import NiBellInactive from "@/icons/nexture/ni-bell-inactive";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSettings from "@/icons/nexture/ni-settings";
import NiStructure from "@/icons/nexture/ni-structure";
import NiUsers from "@/icons/nexture/ni-users";
import NextureIcons, { IconName } from "@/icons/nexture-icons";
import { cn } from "@/lib/utils";

type ChipData = {
  id: string;
  label?: string;
  image?: string;
};

type ActionData = {
  id: string;
  label?: string;
  type?: "positive" | "negative";
};

type NotificationData = {
  id: string;
  labelBold: string;
  labelRegular: string;
  type: "system" | "user";
  avatarImage?: string;
  avatarIcon?: string;
  avatarColorMain?: string;
  avatarColorBackground?: string;
  chips?: ChipData[];
  actions?: ActionData[];
  href?: string;
  time: string;
  temporaryUnread: boolean;
  markedUnread: boolean;
};

export default function Notifications() {
  const [notificationData, setNotificationData] = useState<NotificationData[]>([
    {
      id: "100",
      labelBold: "Laura Ellis",
      labelRegular: "added a product with an image.",
      type: "user",
      time: "2 minutes ago",
      href: "/pages/ecommerce/product-detail",
      avatarImage: "/images/avatars/avatar-1.jpg",
      temporaryUnread: true,
      markedUnread: false,
      chips: [{ label: "product-1.jpg", image: "/images/products/product-1.jpg", id: "1001" }],
    },
    {
      id: "101",
      labelBold: "Zoila Vittorino",
      labelRegular: "added an issue.",
      type: "user",
      time: "14 minutes ago",
      href: "/pages/support/issue-detail",
      avatarImage: "/images/avatars/avatar-2.jpg",
      temporaryUnread: true,
      markedUnread: false,
      chips: [
        { label: "Products", id: "1011" },
        { label: "Electronics", id: "1012" },
      ],
    },
    {
      id: "102",
      labelBold: "Travis Howard",
      labelRegular: "requested editor access.",
      type: "user",
      time: "20 minutes ago",
      avatarImage: "/images/avatars/avatar-3.jpg",
      temporaryUnread: false,
      markedUnread: false,
      actions: [
        { type: "positive", id: "1021", label: "Approve" },
        { type: "negative", id: "1022", label: "Decline" },
      ],
    },
    {
      id: "103",
      labelBold: "Cindy Baker",
      labelRegular: "added a post.",
      type: "user",
      time: "2 hours ago",
      href: "/pages/user/social",
      avatarImage: "/images/avatars/avatar-4.jpg",
      temporaryUnread: false,
      markedUnread: false,
    },
    {
      id: "104",
      labelBold: "New Version!",
      labelRegular: "Introducing v2 with lots of new features.",
      type: "system",
      time: "4 hours ago",
      href: "/pages/miscellaneous/article",
      avatarColorBackground: "bg-accent-3-light/10",
      avatarColorMain: "text-accent-3",
      avatarIcon: "NiFire",
      temporaryUnread: false,
      markedUnread: false,
    },
    {
      id: "105",
      labelBold: "Tip:",
      labelRegular: "Something is wrong? Create an issue.",
      type: "system",
      time: "4 hours ago",
      href: "/pages/support/add-issue",
      avatarColorBackground: "bg-accent-1-light/10",
      avatarColorMain: "text-accent-1",
      avatarIcon: "NiBulbOn",
      temporaryUnread: false,
      markedUnread: false,
    },
    {
      id: "106",
      labelBold: "Stuck somewhere?",
      labelRegular: "Use Knowledge Base to get help.",
      type: "system",
      time: "6 hours ago",
      href: "/pages/miscellaneous/knowledge-base",
      avatarColorBackground: "bg-accent-2-light/10",
      avatarColorMain: "text-accent-2",
      avatarIcon: "NiQuestionHexagon",
      temporaryUnread: false,
      markedUnread: false,
    },
  ]);

  const router = useRouter();
  const [seenTemporary, setSeenTemporary] = React.useState(false);

  const count = useMemo(() => {
    let c = 0;
    if (seenTemporary) {
      notificationData.forEach((notification) => {
        if (notification.markedUnread) {
          c++;
        }
      });
    } else {
      notificationData.forEach((notification) => {
        if (notification.temporaryUnread || notification.markedUnread) {
          c++;
        }
      });
    }
    return c;
  }, [notificationData, seenTemporary]);

  const [tooltipShow, setTooltipShow] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setSeenTemporary(true);
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: any) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    markAllTemporaryRead();
    setOpen(false);
  };

  const [tabValue, setTabValue] = React.useState("1");

  const handleTabValueChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [notificationOn, setNotificationOn] = React.useState(true);

  const markAllTemporaryRead = () => {
    const newNotificationData = notificationData.map((notification) => {
      if (notification.temporaryUnread) {
        return {
          ...notification,
          temporaryUnread: false,
        };
      } else {
        return notification;
      }
    });
    setNotificationData(newNotificationData);
  };

  const handleMarkAsRead = (id: string) => {
    const newNotificationData = notificationData.map((notification) => {
      if (id === notification.id) {
        return {
          ...notification,
          markedUnread: false,
        };
      } else {
        return notification;
      }
    });
    setNotificationData(newNotificationData);
  };

  const handleMarkAsUnread = (id: string) => {
    const newNotificationData = notificationData.map((notification) => {
      if (id === notification.id) {
        return {
          ...notification,
          markedUnread: true,
        };
      } else {
        return notification;
      }
    });
    setNotificationData(newNotificationData);
  };

  const handleClick = (href: string | undefined, event: any) => {
    if (href) {
      router.push(href);
    }
    handleClose(event);
  };

  return (
    <>
      <Tooltip title="Notifications" placement="bottom" arrow open={!open && tooltipShow}>
        <Badge
          badgeContent={count}
          color="primary"
          slotProps={{
            badge: { className: "ltr:right-2! rtl:left-2! top-2 pointer-events-none" },
          }}
        >
          <Button
            variant="surface"
            size="large"
            color="text-primary"
            className={cn("icon-only hover-icon-shrink [&.active]:text-primary", open && "active")}
            onClick={handleToggle}
            onMouseEnter={() => setTooltipShow(true)}
            onMouseLeave={() => setTooltipShow(false)}
            ref={anchorRef}
            startIcon={
              notificationOn ? (
                <NiBell size="large" variant={open ? "contained" : "outlined"} />
              ) : (
                <NiBellInactive size="large" variant={open ? "contained" : "outlined"} />
              )
            }
          />
        </Badge>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-end"
        className="mt-3!"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box>
              <ClickAwayListener onClickAway={handleClose}>
                <Card className="shadow-darker-sm! w-xs md:w-sm">
                  <Box className="flex flex-1 flex-row items-start justify-between pe-4">
                    <Typography variant="h6" component="h6" className="card-title px-4 pt-4">
                      Notifications
                    </Typography>
                    <Box className="flex flex-row">
                      <Tooltip title={notificationOn ? "Turn off" : "Turn on"} arrow>
                        {notificationOn ? (
                          <Button
                            className="icon-only mt-3"
                            size="small"
                            color="grey"
                            variant="text"
                            startIcon={<NiBell size={"small"} />}
                            onClick={() => {
                              setNotificationOn((prevValue) => !prevValue);
                            }}
                          />
                        ) : (
                          <Button
                            className="icon-only mt-3"
                            size="small"
                            color="grey"
                            variant="text"
                            startIcon={<NiBellInactive size={"small"} />}
                            onClick={() => {
                              setNotificationOn((prevValue) => !prevValue);
                            }}
                          />
                        )}
                      </Tooltip>
                      <Button
                        className="icon-only mt-3"
                        size="small"
                        color="grey"
                        variant="text"
                        startIcon={<NiSettings size={"small"} />}
                        href="/settings"
                        component={Link}
                      />
                    </Box>
                  </Box>
                  <TabContext value={tabValue}>
                    <TabList className="mb-5 px-4" onChange={handleTabValueChange}>
                      <Tab
                        icon={<NiStructure size="tiny" />}
                        iconPosition="start"
                        label="All"
                        className="tiny"
                        value="1"
                      />
                      <Tab
                        icon={<NiScreen size="tiny" />}
                        iconPosition="start"
                        label="System"
                        className="tiny"
                        value="2"
                      />
                      <Tab
                        icon={<NiUsers size="tiny" />}
                        iconPosition="start"
                        label="User"
                        className="tiny"
                        value="3"
                      />
                    </TabList>
                    <TabPanel value="1" className="mb-4 p-0">
                      <List className="max-h-96 overflow-auto">
                        {notificationData.map((notification: NotificationData) => {
                          return (
                            <NotificationItem
                              key={notification.id}
                              {...notification}
                              onMarkAsRead={() => {
                                handleMarkAsRead(notification.id);
                              }}
                              onMarkAsUnread={() => {
                                handleMarkAsUnread(notification.id);
                              }}
                              onClick={(event) => {
                                handleClick(notification.href, event);
                              }}
                            />
                          );
                        })}
                      </List>
                    </TabPanel>
                    <TabPanel value="2" className="mb-4 p-0">
                      <List className="max-h-96 overflow-auto">
                        {notificationData
                          .filter((notification) => notification.type === "system")
                          .map((notification: NotificationData) => {
                            return (
                              <NotificationItem
                                key={notification.id}
                                {...notification}
                                onMarkAsRead={() => {
                                  handleMarkAsRead(notification.id);
                                }}
                                onMarkAsUnread={() => {
                                  handleMarkAsUnread(notification.id);
                                }}
                                onClick={(event) => {
                                  handleClick(notification.href, event);
                                }}
                              />
                            );
                          })}
                      </List>
                    </TabPanel>
                    <TabPanel value="3" className="mb-4 p-0">
                      <List className="max-h-96 overflow-auto">
                        {notificationData
                          .filter((notification) => notification.type === "user")
                          .map((notification: NotificationData) => {
                            return (
                              <NotificationItem
                                key={notification.id}
                                {...notification}
                                onMarkAsRead={() => {
                                  handleMarkAsRead(notification.id);
                                }}
                                onMarkAsUnread={() => {
                                  handleMarkAsUnread(notification.id);
                                }}
                                onClick={(event) => {
                                  handleClick(notification.href, event);
                                }}
                              />
                            );
                          })}
                      </List>
                    </TabPanel>
                  </TabContext>

                  <CardActions disableSpacing>
                    <Button variant="outlined" size="tiny" color="grey" className="w-full">
                      View All
                    </Button>
                  </CardActions>
                </Card>
              </ClickAwayListener>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
}

function NotificationItem({
  id,
  labelBold,
  labelRegular,
  type,
  avatarImage,
  avatarIcon,
  avatarColorMain,
  avatarColorBackground,
  href,
  time,
  temporaryUnread,
  markedUnread,
  chips,
  actions,
  onMarkAsRead,
  onMarkAsUnread,
  onClick,
}: NotificationData & {
  onMarkAsRead: () => void;
  onMarkAsUnread: () => void;
  onClick: (event: any) => void;
}) {
  const [anchorElEllipsis, setAnchorElEllipsis] = React.useState<EventTarget | Element | PopoverVirtualElement | null>(
    null,
  );
  const open = Boolean(anchorElEllipsis);

  const handleClickEllipsis = (event: Event | React.SyntheticEvent) => {
    setAnchorElEllipsis(event.currentTarget);
  };

  const handleCloseEllipsis = () => {
    setAnchorElEllipsis(null);
  };

  const handleMarkAsRead = () => {
    handleCloseEllipsis();
    onMarkAsRead();
  };

  const handleMarkAsUnread = () => {
    handleCloseEllipsis();
    onMarkAsUnread();
  };

  return (
    <>
      <Menu
        anchorEl={anchorElEllipsis as Element}
        open={open}
        onClose={handleCloseEllipsis}
        className="mt-1"
        slots={{
          transition: Fade,
        }}
      >
        <MenuList dense>
          {markedUnread && <MenuItem onClick={handleMarkAsRead}>Mark as Read</MenuItem>}
          {!markedUnread && <MenuItem onClick={handleMarkAsUnread}>Mark as Unread</MenuItem>}
        </MenuList>
      </Menu>
      <ListItem key={id} className="group relative px-4 py-0">
        <ListItemButton
          onClick={(event) => {
            event.preventDefault();
            onClick(event);
          }}
          classes={{ root: cn("w-full items-start", (temporaryUnread || markedUnread) && "bg-primary-dark/5") }}
          LinkComponent={href ? Link : Box}
          href={href ? href : "#"}
        >
          <ListItemAvatar>
            {type === "user" ? (
              <Avatar alt="notificaiton avatar" src={avatarImage} className="me-3" />
            ) : (
              <Avatar className={cn("medium me-3", avatarColorBackground)}>
                <NextureIcons icon={avatarIcon as IconName} className={avatarColorMain} />
              </Avatar>
            )}
          </ListItemAvatar>
          <Box className="flex flex-col items-start gap-2">
            <ListItemText
              className="pe-8"
              primary={
                <Typography component="span" className="leading-4">
                  <Typography component="span" variant="subtitle1" className="leading-4">
                    {labelBold}
                  </Typography>{" "}
                  <Typography component="span" variant="body1" className="leading-4">
                    {labelRegular}
                  </Typography>
                </Typography>
              }
              secondary={time}
            />
            {chips && (
              <Box className="flex flex-row gap-1">
                {chips.map((chip) => {
                  if (chip.image) {
                    return (
                      <Chip
                        size="small"
                        avatar={<Avatar alt="product" src={chip.image} />}
                        label={chip.label}
                        variant="outlined"
                        key={chip.id}
                      />
                    );
                  } else {
                    return <Chip variant="outlined" label={chip.label} size="small" key={chip.id} />;
                  }
                })}
              </Box>
            )}

            {actions && (
              <Box className="flex flex-row gap-1">
                {actions.map((action) => {
                  if (action.type === "positive") {
                    return (
                      <Button size="tiny" color="primary" variant="contained" key={action.id}>
                        {action.label}
                      </Button>
                    );
                  } else {
                    return (
                      <Button size="tiny" color="primary" variant="text" key={action.id}>
                        {action.label}
                      </Button>
                    );
                  }
                })}
              </Box>
            )}
          </Box>
        </ListItemButton>
        <Button
          className={cn(
            "icon-only hover:text-text-primary hover:bg-grey-100 absolute inset-e-6 top-2 flex-none opacity-0 group-hover:opacity-100",
            anchorElEllipsis && "bg-grey-100 text-text-primary opacity-100",
          )}
          size="tiny"
          color="grey"
          variant="text"
          startIcon={<NiEllipsisHorizontal size={"small"} />}
          onClick={handleClickEllipsis}
        />
      </ListItem>
    </>
  );
}
