"use client";

import Link from "next/link";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiFolder from "@/icons/nexture/ni-folder";

export default function RecentFolders() {
  return (
    <>
      <Typography variant="h6" component="h6" className="mb-3">
        Recent Folders
      </Typography>
      <Grid container spacing={2.5}>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card
            href="/applications/drive/folder"
            className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
            component={Link}
          >
            <Box className="bg-primary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFolder className="text-primary" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Documents
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                14 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card
            href="/applications/drive/folder"
            className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
            component={Link}
          >
            <Box className="bg-secondary-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFolder className="text-secondary" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Tutorials
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                2 folders and 4 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card
            href="/applications/drive/folder"
            className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
            component={Link}
          >
            <Box className="bg-accent-1-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFolder className="text-accent-1" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Videos
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                64 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card
            href="/applications/drive/folder"
            className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
            component={Link}
          >
            <Box className="bg-accent-2-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFolder className="text-accent-2" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Images
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                147 files
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card
            href="/applications/drive/folder"
            className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
            component={Link}
          >
            <Box className="bg-accent-3-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFolder className="text-accent-3" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Reports
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                12 folders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ lg: 6, xs: 12 }}>
          <Card
            href="/applications/drive/folder"
            className="flex flex-row p-1 transition-transform hover:scale-[1.02]"
            component={Link}
          >
            <Box className="bg-accent-4-light/10 flex w-16 flex-none items-center justify-center rounded-2xl">
              <NiFolder className="text-accent-4" size={"large"} />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" className="leading-5 transition-colors">
                Projects
              </Typography>
              <Typography variant="body1" className="text-text-secondary line-clamp-1 leading-5">
                18 folders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
