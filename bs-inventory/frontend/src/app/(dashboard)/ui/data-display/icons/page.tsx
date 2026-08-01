"use client";

import Link from "next/link";

import { Box, Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiFolderCheck from "@/icons/nexture/ni-folder-check";
import NiHome from "@/icons/nexture/ni-home";
import NiLike from "@/icons/nexture/ni-like";
import NiLock from "@/icons/nexture/ni-lock";
import NiShieldCheck from "@/icons/nexture/ni-shield-check";
import NiUnlike from "@/icons/nexture/ni-unlike";
import NiUnlock from "@/icons/nexture/ni-unlock";
import NiVerified from "@/icons/nexture/ni-verified";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Icon
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
          <Typography variant="body2">Icon</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Box>
              <NiHome />
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
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Large
              </Typography>
              <Box className="flex flex-row gap-2">
                <NiFolderCheck size="large" />
                <NiVerified size="large" />
                <NiShieldCheck size="large" />
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Medium
              </Typography>
              <Box className="flex flex-row gap-2">
                <NiFolderCheck size="medium" />
                <NiVerified size="medium" />
                <NiShieldCheck size="medium" />
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Small
              </Typography>
              <Box className="flex flex-row gap-2">
                <NiFolderCheck size="small" />
                <NiVerified size="small" />
                <NiShieldCheck size="small" />
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Custom
              </Typography>
              <Box className="flex flex-row gap-2">
                <NiFolderCheck size={14} />
                <NiVerified size={14} />
                <NiShieldCheck size={14} />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Variants
            </Typography>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                Two Tone
              </Typography>
              <Box className="flex flex-row gap-2">
                <NiLike size="large" />
                <NiUnlike size="large" />
              </Box>
            </Box>
            <Box className="mb-4">
              <Typography variant="h6" component="h6" className="mb-2">
                One Tone
              </Typography>
              <Box className="flex flex-row gap-2">
                <NiLike size="large" oneTone />
                <NiUnlike size="large" oneTone />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Colors
            </Typography>
            <Box className="mb-4 flex flex-row flex-wrap items-start gap-2">
              <Box className="border-primary-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-primary" />
              </Box>
              <Box className="border-secondary-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-secondary" />
              </Box>
              <Box className="border-accent-1-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-accent-1" />
              </Box>
              <Box className="border-accent-2-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-accent-2" />
              </Box>
              <Box className="border-accent-3-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-accent-3" />
              </Box>
              <Box className="border-accent-4-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-accent-4" />
              </Box>
              <Box className="border-info-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-info" />
              </Box>
              <Box className="border-success-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-success" />
              </Box>
              <Box className="border-warning-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-warning" />
              </Box>
              <Box className="border-error-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-error" />
              </Box>
              <Box className="border-text-primary-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-text-primary" />
              </Box>
              <Box className="border-text-secondary-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-text-secondary" />
              </Box>
              <Box className="border-text-disabled-light flex flex-0 rounded-lg border border-solid p-2">
                <NiUnlock size="large" className="text-text-disabled" />
              </Box>
            </Box>
            <Box className="mb-4 flex flex-row flex-wrap gap-2">
              <Box className="bg-primary-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-primary" />
              </Box>
              <Box className="bg-secondary-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-secondary" />
              </Box>
              <Box className="bg-accent-1-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-accent-1" />
              </Box>
              <Box className="bg-accent-2-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-accent-2" />
              </Box>
              <Box className="bg-accent-3-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-accent-3" />
              </Box>
              <Box className="bg-accent-4-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-accent-4" />
              </Box>
              <Box className="bg-info-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-info" />
              </Box>
              <Box className="bg-success-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-success" />
              </Box>
              <Box className="bg-warning-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-warning" />
              </Box>
              <Box className="bg-error-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-error" />
              </Box>
              <Box className="bg-text-primary-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-text-primary" />
              </Box>
              <Box className="bg-text-secondary-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-text-secondary" />
              </Box>
              <Box className="bg-text-disabled-light/10 flex flex-0 rounded-lg border border-solid border-transparent p-2">
                <NiLock size="large" className="text-text-disabled" />
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
