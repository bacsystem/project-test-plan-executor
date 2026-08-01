"use client";

import Link from "next/link";
import React from "react";

import { Breadcrumbs, Button, Card, CardContent, Menu, MenuItem, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiCatalog from "@/icons/nexture/ni-catalog";
import NiChevronRightSmall from "@/icons/nexture/ni-chevron-right-small";
import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiHome from "@/icons/nexture/ni-home";
import NiScreen from "@/icons/nexture/ni-screen";

export default function Page() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement> | null) => {
    if (event) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Breadcrumbs
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/navigation">
            Navigation
          </Link>
          <Typography variant="body2">Breadcrumbs</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>

            <Breadcrumbs>
              <Link href="/public">MUI</Link>
              <Link href="/public">Core</Link>
              <Typography variant="body2">Breadcrumbs</Typography>
            </Breadcrumbs>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Active Last Breadcrumb
            </Typography>

            <Breadcrumbs>
              <Link href="/public">MUI</Link>
              <Link href="/public">Core</Link>
              <Link href="/public">Breadcrumbs</Link>
            </Breadcrumbs>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Custom Separator
            </Typography>

            <Breadcrumbs separator="-">
              <Link href="/public">MUI</Link>
              <Link href="/public">Core</Link>
              <Link href="/public">Breadcrumbs</Link>
            </Breadcrumbs>

            <Breadcrumbs separator=">">
              <Link href="/public">MUI</Link>
              <Link href="/public">Core</Link>
              <Link href="/public">Breadcrumbs</Link>
            </Breadcrumbs>

            <Breadcrumbs separator={<NiChevronRightSmall size="small" className="rtl:rotate-180" />}>
              <Link href="/public">MUI</Link>
              <Link href="/public">Core</Link>
              <Link href="/public">Breadcrumbs</Link>
            </Breadcrumbs>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Breadcrumbs with Icons
            </Typography>

            <Breadcrumbs aria-label="breadcrumb">
              <Link className="flex items-center" href="/public">
                <NiHome className="me-1" size="small" />
                MUI
              </Link>
              <Link className="flex items-center" href="/public">
                <NiScreen className="me-1" size="small" />
                Core
              </Link>
              <Typography className="flex items-center">
                <NiCatalog className="me-1" size="small" />
                Breadcrumb
              </Typography>
            </Breadcrumbs>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Collapsed
            </Typography>
            <Breadcrumbs maxItems={2}>
              <Link href="/public">Home</Link>
              <Link href="/public">Catalog</Link>
              <Link href="/public">Accessories</Link>
              <Link href="/public">New Collection</Link>
              <Typography>Belts</Typography>
            </Breadcrumbs>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Condensed
            </Typography>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} aria-labelledby="with-menu-demo-breadcrumbs">
              <MenuItem onClick={handleClose}>Breadcrumb 2</MenuItem>
              <MenuItem onClick={handleClose}>Breadcrumb 3</MenuItem>
              <MenuItem onClick={handleClose}>Breadcrumb 4</MenuItem>
            </Menu>
            <Breadcrumbs aria-label="breadcrumbs">
              <Link color="primary" href="#condensed-with-menu">
                Breadcrumb 1
              </Link>
              <Button
                onClick={handleClick}
                className="icon-only py-0.5!"
                size="tiny"
                color="grey"
                variant="text"
                startIcon={<NiEllipsisHorizontal size={"small"} />}
              />
              <Link color="primary" href="#condensed-with-menu">
                Breadcrumb 5
              </Link>
              <Link color="primary" href="#condensed-with-menu">
                Breadcrumb 6
              </Link>
            </Breadcrumbs>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
