"use client";

import Link from "next/link";
import React from "react";

import {
  Badge,
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import NiBell from "@/icons/nexture/ni-bell";
import NiCalendar from "@/icons/nexture/ni-calendar";
import NiEmail from "@/icons/nexture/ni-email";

export default function Page() {
  const [invisible, setInvisible] = React.useState(false);
  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Badge
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
          <Typography variant="body2">Badge</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Badge badgeContent={4} color="primary">
              <NiBell size="large" />
            </Badge>

            <Badge
              badgeContent={4}
              color="primary"
              slotProps={{
                badge: { className: "ltr:right-2! rtl:left-2! top-2" },
              }}
            >
              <Button
                variant="surface"
                size="large"
                color="text-primary"
                className="icon-only hover-icon-shrink [&.active]:text-primary"
                startIcon={<NiBell size="large" />}
              />
            </Badge>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Color
            </Typography>
            <Box className="flex flex-row gap-2">
              <Badge badgeContent={4} color="primary">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="secondary">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="accent-1">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="accent-2">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="accent-3">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="accent-4">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="text-primary">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="text-secondary">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="text-disabled">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="info">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="success">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="warning">
                <NiEmail size="large" />
              </Badge>
              <Badge badgeContent={4} color="error">
                <NiEmail size="large" />
              </Badge>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Customization
            </Typography>
            <Badge
              badgeContent={6}
              color="primary"
              slotProps={{
                badge: { className: "top-5 border border-solid border-primary bg-background-paper text-primary" },
              }}
            >
              <NiCalendar size="large" />
            </Badge>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Visibility
            </Typography>

            <Box className="mb-4 flex flex-col items-start gap-2">
              <Typography variant="h6" component="h6" className="mb-2">
                Invisible Property
              </Typography>
              <Badge color="primary" variant="dot" invisible={invisible}>
                <NiCalendar size="large" />
              </Badge>
              <FormControlLabel
                control={<Switch size="small" checked={!invisible} onChange={handleBadgeVisibility} />}
                label="Show Badge"
              />
            </Box>
            <Box className="flex flex-col items-start gap-2">
              <Typography variant="h6" component="h6" className="mb-2">
                Show Zero Property
              </Typography>
              <Box className="flex flex-row gap-2">
                <Badge color="primary" badgeContent={0} showZero>
                  <NiCalendar size="large" />
                </Badge>
                <Badge color="primary" badgeContent={0}>
                  <NiCalendar size="large" />
                </Badge>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Maximum Value
            </Typography>
            <Box className="flex flex-row gap-8">
              <Badge color="secondary" badgeContent={99}>
                <NiEmail size="large" />
              </Badge>
              <Badge color="secondary" badgeContent={100}>
                <NiEmail size="large" />
              </Badge>
              <Badge color="secondary" badgeContent={1000} max={999}>
                <NiEmail size="large" />
              </Badge>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Dot Badge
            </Typography>
            <Badge color="secondary" variant="dot">
              <NiCalendar size="large" />
            </Badge>
            <Badge
              variant="dot"
              color="secondary"
              slotProps={{
                badge: { className: "inset-e-2 top-2" },
              }}
            >
              <Button
                variant="surface"
                size="large"
                color="text-primary"
                className="icon-only hover-icon-shrink [&.active]:text-primary"
                startIcon={<NiCalendar size="large" />}
              />
            </Badge>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Badge Overlap
            </Typography>
            <Box className="flex flex-row gap-4">
              <Badge color="secondary" badgeContent=" ">
                <Box className="bg-primary/50 h-10 w-10"></Box>
              </Badge>
              <Badge color="secondary" badgeContent=" " variant="dot">
                <Box className="bg-primary/50 h-10 w-10"></Box>
              </Badge>
              <Badge color="secondary" overlap="circular" badgeContent=" ">
                <Box className="bg-primary/50 h-10 w-10 rounded-full"></Box>
              </Badge>
              <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                <Box className="bg-primary/50 h-10 w-10 rounded-full"></Box>
              </Badge>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Badge Alignment
            </Typography>
            <Box className="flex flex-row gap-8">
              <Badge
                badgeContent={4}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <NiCalendar size="large" />
              </Badge>
              <Badge
                badgeContent={4}
                color="primary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
              >
                <NiCalendar size="large" />
              </Badge>
              <Badge
                badgeContent={4}
                color="primary"
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <NiCalendar size="large" />
              </Badge>
              <Badge
                badgeContent={4}
                color="primary"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <NiCalendar size="large" />
              </Badge>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
