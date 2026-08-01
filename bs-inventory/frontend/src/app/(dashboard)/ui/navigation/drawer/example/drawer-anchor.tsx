"use client";

import * as React from "react";
import { useState } from "react";

import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import NiBinEmpty from "@/icons/nexture/ni-bin-empty";
import NiChevronDownSmall from "@/icons/nexture/ni-chevron-down-small";
import NiChevronUpSmall from "@/icons/nexture/ni-chevron-up-small";
import NiDirectory from "@/icons/nexture/ni-directory";
import NiEmailOpen from "@/icons/nexture/ni-email-open";
import NiExclamationHexagon from "@/icons/nexture/ni-exclamation-hexagon";
import NiInbox from "@/icons/nexture/ni-inbox";
import NiSendRight from "@/icons/nexture/ni-send-right";
import NiSign from "@/icons/nexture/ni-sign";
import NiStar from "@/icons/nexture/ni-star";
import NiTag from "@/icons/nexture/ni-tag";
import { cn } from "@/lib/utils";

type Anchor = "top" | "left" | "bottom" | "right";

export default function DrawerAnchor() {
  const [openCollapse, setOpenCollapse] = useState(true);
  const handleClickCollapse = () => {
    setOpenCollapse(!openCollapse);
  };

  const [anchorPosition, setAnchorPosition] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchorClasses = {
    top: "MuiDrawer-paperAnchorTop",
    bottom: "MuiDrawer-paperAnchorBottom",
    left: "MuiDrawer-paperAnchorLeft",
    right: "MuiDrawer-paperAnchorRight",
  };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setAnchorPosition({ ...anchorPosition, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <Box className={cn("p-4", anchor === "top" || anchor === "bottom" ? "w-auto" : "w-80")}>
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
      <ListItemButton onClick={handleClickCollapse}>
        <ListItemIcon>
          {openCollapse ? <NiChevronUpSmall size="medium" /> : <NiChevronDownSmall size="medium" />}
        </ListItemIcon>
        <ListItemText primary="More" />
      </ListItemButton>
      <Collapse in={openCollapse} timeout="auto" unmountOnExit>
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
    </Box>
  );

  return (
    <Box className="flex flex-row gap-2">
      {(["left", "right", "top", "bottom"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="outlined" onClick={toggleDrawer(anchor, true)} className="capitalize">
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={anchorPosition[anchor]}
            onClose={toggleDrawer(anchor, false)}
            slotProps={{ paper: { className: anchorClasses[anchor] } }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </Box>
  );
}
