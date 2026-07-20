"use client";

import SettingsContact from "./components/settings-contact";
import SettingsPublicInfo from "./components/settings-public-info";
import SettingsWork from "./components/settings-work";
import Link from "next/link";
import { useState } from "react";

import {
  Box,
  Breadcrumbs,
  Button,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";

import NiBasket from "@/icons/nexture/ni-basket";
import NiBell from "@/icons/nexture/ni-bell";
import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiDocumentFull from "@/icons/nexture/ni-document-full";
import NiEmail from "@/icons/nexture/ni-email";
import NiLaptop from "@/icons/nexture/ni-laptop";
import NiListCircle from "@/icons/nexture/ni-list-circle";
import NiLock from "@/icons/nexture/ni-lock";
import NiMoneyBag from "@/icons/nexture/ni-money-bag";
import NiPaintRoller from "@/icons/nexture/ni-paint-roller";
import NiReceipt from "@/icons/nexture/ni-receipt";
import NiStars from "@/icons/nexture/ni-stars";
import NiUser from "@/icons/nexture/ni-user";
import NiUsers from "@/icons/nexture/ni-users";
import NiWallet from "@/icons/nexture/ni-wallet";

const MenuContent = () => {
  return (
    <Box className="flex flex-col gap-4">
      <List className="-mt-6">
        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none mt-4">
            <ListItemText
              primary="Personal"
              slotProps={{
                primary: { className: "text-sm! font-semibold! text-text-disabled-dark" },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link} selected>
            <ListItemIcon>
              <NiUser size="medium" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiUsers size="medium" />
            </ListItemIcon>
            <ListItemText primary="Friends" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiDocumentFull size="medium" />
            </ListItemIcon>
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none mt-4">
            <ListItemText
              primary="Payment"
              slotProps={{
                primary: { className: "text-sm! font-semibold! text-text-disabled-dark" },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiWallet size="medium" />
            </ListItemIcon>
            <ListItemText primary="Billing" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiReceipt size="medium" />
            </ListItemIcon>
            <ListItemText primary="Invoice" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiMoneyBag size="medium" />
            </ListItemIcon>
            <ListItemText primary="Tax Info" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiBasket size="medium" />
            </ListItemIcon>
            <ListItemText primary="Payment Methods" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none mt-4">
            <ListItemText
              primary="Security"
              slotProps={{
                primary: { className: "text-sm! font-semibold! text-text-disabled-dark" },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiLock size="medium" />
            </ListItemIcon>
            <ListItemText primary="Password" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiCheckSquare size="medium" />
            </ListItemIcon>
            <ListItemText primary="Two Factor Auth" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiLaptop size="medium" />
            </ListItemIcon>
            <ListItemText primary="Devices" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiListCircle size="medium" />
            </ListItemIcon>
            <ListItemText primary="Logs" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton className="pointer-events-none mt-4">
            <ListItemText
              primary="Preferences"
              slotProps={{
                primary: { className: "text-sm! font-semibold! text-text-disabled-dark" },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiBell size="medium" />
            </ListItemIcon>
            <ListItemText primary="Notifications" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiEmail size="medium" />
            </ListItemIcon>
            <ListItemText primary="Emails" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiPaintRoller size="medium" />
            </ListItemIcon>
            <ListItemText primary="Appearance" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton href="/settings" LinkComponent={Link}>
            <ListItemIcon>
              <NiStars size="medium" />
            </ListItemIcon>
            <ListItemText primary="Moderation" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default function Page() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid size={12} spacing={2.5} container>
        <Grid size={{ xs: 12, md: "grow" }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Settings
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Link color="inherit" href="/applications/ai-chat">
              AI Chat
            </Link>
            <Typography variant="body2">Settings</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid size={{ xs: 12, md: "auto" }} className="lg:hidden">
          <Tooltip title="Table of Contents">
            <Button className="icon-only surface-standard" color="grey" variant="surface" onClick={toggleDrawer(true)}>
              <NiListCircle size={"medium"} />
            </Button>
          </Tooltip>
        </Grid>
      </Grid>

      <Grid size={12} container className="w-full items-start justify-start">
        <Grid size={"auto"} className="hidden pe-8 lg:flex">
          <MenuContent />
        </Grid>
        <Grid size={"grow"} spacing={5} container>
          <SettingsPublicInfo />
          <SettingsWork />
          <SettingsContact />
        </Grid>
      </Grid>

      <Drawer
        open={openDrawer}
        anchor="right"
        onClose={toggleDrawer(false)}
        slotProps={{ paper: { className: "MuiDrawer-paperAnchorRight" } }}
      >
        <Box className="min-w-80 p-7">
          <MenuContent />
        </Box>
      </Drawer>
    </Grid>
  );
}
