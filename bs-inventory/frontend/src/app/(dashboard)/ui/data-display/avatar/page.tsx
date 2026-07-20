"use client";

import Link from "next/link";

import { Avatar, AvatarGroup, Badge, Box, Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

import NiEllipsisHorizontal from "@/icons/nexture/ni-ellipsis-horizontal";
import NiPower from "@/icons/nexture/ni-power";
import NiUser from "@/icons/nexture/ni-user";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Avatar
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
          <Typography variant="body2">Avatar</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Image Avatars
            </Typography>
            <Box className="flex flex-row gap-2">
              <Avatar alt="avatar" src="/images/avatars/avatar-1.jpg" />
              <Avatar alt="avatar" src="/images/avatars/avatar-2.jpg" />
              <Avatar alt="avatar" src="/images/avatars/avatar-3.jpg" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Letter Avatars
            </Typography>
            <Box className="flex flex-row gap-2">
              <Avatar className="medium bg-primary">N</Avatar>
              <Avatar className="medium bg-secondary">OP</Avatar>
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
            <Box className="flex flex-row gap-2">
              <Avatar className="nano" alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
              <Avatar className="tiny" alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
              <Avatar className="small" alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
              <Avatar className="medium" alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
              <Avatar className="large" alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Icon Avatars
            </Typography>
            <Box className="flex flex-row gap-2">
              <Avatar className="nano bg-primary">
                <NiPower size={10} />
              </Avatar>
              <Avatar className="tiny bg-primary">
                <NiPower size="tiny" />
              </Avatar>
              <Avatar className="small bg-primary">
                <NiPower size="small" />
              </Avatar>
              <Avatar className="medium bg-primary">
                <NiPower size="medium" />
              </Avatar>
              <Avatar className="large bg-primary">
                <NiPower size="large" />
              </Avatar>
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
            <Box className="flex flex-row gap-2">
              <Avatar className="large" alt="avatar" src="/images/avatars/avatar-2.jpg" />
              <Avatar className="large" alt="avatar" src="/images/avatars/avatar-2.jpg" variant="rounded" />
              <Avatar className="large" alt="avatar" src="/images/avatars/avatar-2.jpg" variant="square" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Fallbacks
            </Typography>
            <Box className="flex flex-row gap-2">
              <Avatar className="bg-primary" alt="Remy Sharp" src="/broken-image.jpg">
                B
              </Avatar>
              <Avatar className="bg-primary" alt="Remy Sharp" src="/broken-image.jpg" />
              <Avatar src="/broken-image.jpg">
                <NiUser size="medium" oneTone />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Grouped
            </Typography>
            <Box className="flex flex-col gap-4">
              <AvatarGroup max={3} className="medium justify-end">
                <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                <Avatar alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" />
                <Avatar alt="Agnes Walker" src="/images/avatars/avatar-4.jpg" />
                <Avatar alt="Trevor Henderson" src="/images/avatars/avatar-5.jpg" />
              </AvatarGroup>
              <AvatarGroup total={24} className="medium justify-end">
                <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                <Avatar alt="Agnes Walker" src="/images/avatars/avatar-3.jpg" />
                <Avatar alt="Trevor Henderson" src="/images/avatars/avatar-4.jpg" />
              </AvatarGroup>
              <AvatarGroup
                className="medium justify-end"
                renderSurplus={(surplus) => <span>+{surplus.toString()[0]}k</span>}
                total={4251}
              >
                <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                <Avatar alt="Agnes Walker" src="/images/avatars/avatar-3.jpg" />
                <Avatar alt="Trevor Henderson" src="/images/avatars/avatar-4.jpg" />
              </AvatarGroup>
              <AvatarGroup spacing="medium" className="medium justify-end">
                <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                <Avatar alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" />
              </AvatarGroup>
              <AvatarGroup spacing="small" className="medium justify-end">
                <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                <Avatar alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" />
              </AvatarGroup>
              <AvatarGroup spacing={24} className="medium justify-end">
                <Avatar alt="Remy Sharp" src="/images/avatars/avatar-1.jpg" />
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
                <Avatar alt="Cindy Baker" src="/images/avatars/avatar-3.jpg" />
              </AvatarGroup>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Badge
            </Typography>
            <Box className="flex flex-row gap-2">
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box className="border-background-paper bg-success h-3 w-3 animate-ping rounded-full border-2 border-solid" />
                }
              >
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box className="border-background-paper bg-error h-3 w-3 animate-ping rounded-full border-2 border-solid" />
                }
              >
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Avatar
                    className="border-background-paper h-6 w-6 animate-bounce rounded-sm border-2! border-solid"
                    alt="Remy Sharp"
                    src="/images/avatars/avatar-1.jpg"
                  />
                }
              >
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
              </Badge>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <Box className="border-background-paper bg-grey-500 h-6 w-6 animate-bounce rounded-sm border-2! border-solid">
                    <NiEllipsisHorizontal className="text-text-contrast" />
                  </Box>
                }
              >
                <Avatar alt="Travis Howard" src="/images/avatars/avatar-2.jpg" />
              </Badge>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
