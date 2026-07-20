"use client";

import Favorites from "./components/favorites";
import RecentFiles from "./components/recent-files";
import RecentFolders from "./components/recent-folders";
import Usage from "./components/usage";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";

import { Breadcrumbs, Button, Grid, Menu, MenuItem, PopoverVirtualElement, Typography } from "@mui/material";

import NiPlusSquare from "@/icons/nexture/ni-plus-square";

export default function Page() {
  const [anchorElMainMenu, setAnchorElMainMenu] = useState<EventTarget | Element | PopoverVirtualElement | null>(null);
  const openMainMenu = Boolean(anchorElMainMenu);
  const handleClickMainMenu = (event: Event | SyntheticEvent) => {
    setAnchorElMainMenu(event.currentTarget);
  };
  const handleCloseMainMenu = () => {
    setAnchorElMainMenu(null);
  };

  return (
    <Grid container spacing={5} className="w-full" size={12}>
      <Grid container spacing={2.5} className="w-full" size={12}>
        <Grid size={{ md: "grow", xs: 12 }}>
          <Typography variant="h1" component="h1" className="mb-0">
            Drive
          </Typography>
          <Breadcrumbs>
            <Link color="inherit" href="/dashboards/default">
              Home
            </Link>
            <Link color="inherit" href="/applications">
              Applications
            </Link>
            <Typography variant="body2">Drive</Typography>
          </Breadcrumbs>
        </Grid>

        <Grid size={{ xs: 12, md: "auto" }} className="flex flex-row items-start gap-2">
          <Button
            className="surface-standard"
            size="medium"
            color="grey"
            variant="surface"
            startIcon={<NiPlusSquare size={"medium"} />}
            onClick={handleClickMainMenu}
          >
            Create
          </Button>
          <Menu
            anchorEl={anchorElMainMenu as Element}
            open={openMainMenu}
            onClose={handleCloseMainMenu}
            className="mt-1"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem>New File</MenuItem>
            <MenuItem>New Folder</MenuItem>
            <MenuItem>Upload File</MenuItem>
            <MenuItem>Upload Folder</MenuItem>
          </Menu>
        </Grid>
      </Grid>

      <Grid size={{ lg: 8, xs: 12 }}>
        <RecentFolders />
      </Grid>

      <Grid size={{ lg: 4, xs: 12 }}>
        <Favorites />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <RecentFiles />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Usage />
      </Grid>
    </Grid>
  );
}
