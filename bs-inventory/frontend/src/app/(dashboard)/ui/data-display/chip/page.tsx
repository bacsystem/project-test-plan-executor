"use client";

import Link from "next/link";
import React from "react";

import { Avatar, Box, Breadcrumbs, Card, CardContent, Chip, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiCross from "@/icons/nexture/ni-cross";
import NiFaceSmile from "@/icons/nexture/ni-face-smile";
import NiMinus from "@/icons/nexture/ni-minus";
import NiStar from "@/icons/nexture/ni-star";

interface ChipData {
  key: number;
  label: string;
}

export default function Page() {
  const handleClickActionExample = () => {
    console.info("You clicked the Chip.");
  };

  const handleDeleteExample = () => {
    console.info("You clicked the delete icon.");
  };

  const [chipData, setChipData] = React.useState<readonly ChipData[]>([
    { key: 0, label: "Item 1" },
    { key: 1, label: "Item 2" },
    { key: 2, label: "Item 3" },
    { key: 3, label: "Item 4" },
    { key: 4, label: "Item 5" },
  ]);

  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Chip
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
          <Typography variant="body2">Chip</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Box className="flex flex-row items-start gap-2">
              <Chip label="Chip Filled" />
              <Chip label="Chip Outlined" variant="outlined" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Chip Actions
            </Typography>
            <Box className="flex flex-col items-start gap-4">
              <Box className="flex flex-row items-start gap-2">
                <Chip label="Clickable" onClick={handleClickActionExample} />
                <Chip label="Clickable" variant="outlined" onClick={handleClickActionExample} />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip label="Deletable" onDelete={handleDeleteExample} />
                <Chip label="Deletable" variant="outlined" onDelete={handleDeleteExample} />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip label="Clickable Deletable" onClick={handleClickActionExample} onDelete={handleDeleteExample} />
                <Chip
                  label="Clickable Deletable"
                  variant="outlined"
                  onClick={handleClickActionExample}
                  onDelete={handleDeleteExample}
                />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip label="Clickable Link" component="a" href="#basic-chip" clickable />
                <Chip label="Clickable Link" component="a" href="#basic-chip" variant="outlined" clickable />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip
                  label="Custom Delete Icon"
                  onClick={handleClickActionExample}
                  onDelete={handleDeleteExample}
                  deleteIcon={<NiCross size="small" />}
                />
                <Chip
                  label="Custom Delete Icon"
                  onClick={handleClickActionExample}
                  onDelete={handleDeleteExample}
                  variant="outlined"
                  deleteIcon={<NiMinus size="small" />}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Chip Adornments
            </Typography>

            <Box className="flex flex-col items-start gap-4">
              <Box className="flex flex-row items-start gap-2">
                <Chip avatar={<Avatar className="bg-primary text-text-contrast!">M</Avatar>} label="Avatar" />
                <Chip
                  variant="outlined"
                  avatar={<Avatar className="bg-primary text-text-contrast!">M</Avatar>}
                  label="Avatar"
                />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip icon={<NiStar size="small" />} label="Icon" />
                <Chip icon={<NiStar size="small" />} label="Icon" variant="outlined" />
              </Box>

              <Box className="flex flex-row items-start gap-2">
                <Chip
                  size="small"
                  avatar={<Avatar className="bg-primary text-text-contrast!">M</Avatar>}
                  label="Avatar"
                />
                <Chip
                  size="small"
                  variant="outlined"
                  avatar={<Avatar className="bg-primary text-text-contrast!">M</Avatar>}
                  label="Avatar"
                />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip icon={<NiStar size="tiny" />} label="Icon" size="small" />
                <Chip icon={<NiStar size="tiny" />} label="Icon" variant="outlined" size="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Color Chip
            </Typography>

            <Box className="flex flex-col items-start gap-4">
              <Box className="flex flex-row flex-wrap gap-2">
                <Chip label="Primary" color="primary" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Secondary" color="secondary" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 1" color="accent-1" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 2" color="accent-2" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 3" color="accent-3" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 4" color="accent-4" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Info" color="info" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Success" color="success" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Warning" color="warning" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip label="Error" color="error" variant="outlined" clickable onDelete={handleDeleteExample} />
                <Chip
                  label="Text Primary"
                  color="text-primary"
                  variant="outlined"
                  clickable
                  onDelete={handleDeleteExample}
                />
                <Chip
                  label="Text Secondary"
                  color="text-secondary"
                  variant="outlined"
                  clickable
                  onDelete={handleDeleteExample}
                />
                <Chip
                  label="Text Disabled"
                  color="text-disabled"
                  variant="outlined"
                  clickable
                  onDelete={handleDeleteExample}
                />
                <Chip label="Grey" color="grey" variant="outlined" clickable onDelete={handleDeleteExample} />
              </Box>

              <Box className="flex flex-row flex-wrap gap-2">
                <Chip label="Primary" color="primary" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Secondary" color="secondary" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 1" color="accent-1" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 2" color="accent-2" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 3" color="accent-3" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Accent 4" color="accent-4" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Info" color="info" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Success" color="success" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Warning" color="warning" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip label="Error" color="error" variant="filled" clickable onDelete={handleDeleteExample} />
                <Chip
                  label="Text Primary"
                  color="text-primary"
                  variant="filled"
                  clickable
                  onDelete={handleDeleteExample}
                />
                <Chip
                  label="Text Secondary"
                  color="text-secondary"
                  variant="filled"
                  clickable
                  onDelete={handleDeleteExample}
                />
                <Chip
                  label="Text Disabled"
                  color="text-disabled"
                  variant="filled"
                  clickable
                  onDelete={handleDeleteExample}
                />
                <Chip label="Grey" color="grey" variant="filled" clickable onDelete={handleDeleteExample} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Sizes
            </Typography>
            <Box className="flex flex-col items-start gap-4">
              <Box className="flex flex-row items-start gap-2">
                <Chip label="Medium" />
                <Chip variant="outlined" label="Medium" />
              </Box>
              <Box className="flex flex-row items-start gap-2">
                <Chip label="Small" size="small" />
                <Chip variant="outlined" label="Small" size="small" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Multiline Chip
            </Typography>
            <Box className="flex flex-row items-start gap-2">
              <Chip className="w-40" label="Single line chip without any other lines." />
              <Chip className="multiline w-40" label="Multi line chip with additional lines." />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Chip Array
            </Typography>
            <Box className="border-grey-200 inline-flex gap-2 rounded-lg border border-solid p-1.75">
              {chipData.map((data) => {
                let icon;

                if (data.label === "React") {
                  icon = <NiFaceSmile size="small" className="text-primary!" />;
                }

                return (
                  <Chip
                    key={data.key}
                    icon={icon}
                    label={data.label}
                    onDelete={data.label === "React" ? undefined : handleDelete(data)}
                  />
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
