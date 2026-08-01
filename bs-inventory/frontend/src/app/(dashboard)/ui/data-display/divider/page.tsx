"use client";

import Link from "next/link";
import React from "react";

import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/material";

import NiMoon from "@/icons/nexture/ni-moon";
import NiScreen from "@/icons/nexture/ni-screen";
import NiSun from "@/icons/nexture/ni-sun";
import NiTextBold from "@/icons/nexture/ni-text-bold";
import NiTextCenter from "@/icons/nexture/ni-text-center";
import NiTextItalic from "@/icons/nexture/ni-text-italic";
import NiTextLeft from "@/icons/nexture/ni-text-left";
import NiTextRight from "@/icons/nexture/ni-text-right";
import NiTextUnderline from "@/icons/nexture/ni-text-underline";

export default function Page() {
  const [toggleButtonValue, setToggleButtonValue] = React.useState<string | null>("left");
  const handleToggleButtonChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    setToggleButtonValue(newAlignment);
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Divider
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
          <Typography variant="body2">Divider</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Introduction
            </Typography>
            <Card className="rounded-md shadow-none!">
              <Box className="p-4">
                <Stack direction="row" className="items-center justify-between">
                  <Typography variant="h5" component="div">
                    Toothbrush
                  </Typography>
                  <Typography variant="h6" component="div">
                    $4.50
                  </Typography>
                </Stack>
                <Typography variant="body1" className="text-text-secondary">
                  Pinstriped cornflower blue cotton blouse takes you on a walk to the park or just down the hall.
                </Typography>
              </Box>
              <Box className="px-4">
                <Divider />
              </Box>
              <Box className="p-4">
                <Typography variant="body2">Select type</Typography>
                <Stack direction="row" spacing={1}>
                  <Chip color="primary" label="Soft" size="small" />
                  <Chip label="Medium" size="small" />
                  <Chip label="Hard" size="small" />
                </Stack>
              </Box>
            </Card>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basics
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Full width variant below" />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary="Inset variant below" />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemText primary="Middle variant below" />
              </ListItem>
              <Divider variant="middle" component="li" />
              <ListItem>
                <ListItemText primary="List item" />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Orientation
            </Typography>
            <Box className="border-grey-200 inline-flex rounded-2xl border border-solid p-1.75">
              <ToggleButtonGroup value={toggleButtonValue} exclusive onChange={handleToggleButtonChange} size="small">
                <ToggleButton value="left">
                  <NiTextLeft size="small" />
                </ToggleButton>
                <ToggleButton value="center">
                  <NiTextCenter size="small" />
                </ToggleButton>
                <ToggleButton value="right">
                  <NiTextRight size="small" />
                </ToggleButton>
                <Divider orientation="vertical" flexItem />
                <ToggleButton value="bold">
                  <NiTextBold size="small" />
                </ToggleButton>
                <ToggleButton value="underlined">
                  <NiTextUnderline size="small" />
                </ToggleButton>
                <ToggleButton value="italic">
                  <NiTextItalic size="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Flex Item
            </Typography>
            <Box className="border-grey-200 inline-flex rounded-2xl border border-solid p-1.75">
              <ToggleButtonGroup value={toggleButtonValue} exclusive onChange={handleToggleButtonChange} size="small">
                <ToggleButton value="left">
                  <NiSun size="small" />
                </ToggleButton>
                <Divider orientation="vertical" variant="middle" flexItem />
                <ToggleButton value="center">
                  <NiMoon size="small" />
                </ToggleButton>
                <Divider orientation="vertical" variant="middle" flexItem />
                <ToggleButton value="center">
                  <NiScreen size="small" />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              With Children
            </Typography>
            <Box className="flex flex-col gap-4">
              <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Box>
              <Divider className="text-text-secondary text-sm">Center</Divider>
              <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Box>
              <Divider className="text-primary text-sm" textAlign="left">
                Left
              </Divider>
              <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Box>
              <Divider className="text-primary text-sm" textAlign="right">
                Right
              </Divider>
              <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Box>
              <Divider>
                <Chip label="Chip" size="small" />
              </Divider>
              <Box>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
