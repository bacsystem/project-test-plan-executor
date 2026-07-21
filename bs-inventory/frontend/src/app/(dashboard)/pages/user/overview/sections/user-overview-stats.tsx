import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiFloppyDisk from "@/icons/nexture/ni-floppy-disk";
import NiLike from "@/icons/nexture/ni-like";
import NiScreen from "@/icons/nexture/ni-screen";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";
import NiUsers from "@/icons/nexture/ni-users";

export default function UserOverviewStats() {
  return (
    <Grid container size={12} spacing={2.5}>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-primary-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiScreen className="text-primary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Project Views
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                24,782
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleDown className="text-error" size={"medium"} />
                <Typography variant="body2" className="text-error">
                  8.2%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-secondary-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiFloppyDisk className="text-secondary" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Project Saves
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                1,547
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleUp className="text-success" size={"medium"} />
                <Typography variant="body2" className="text-success">
                  12.6%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-accent-1-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiLike className="text-accent-1" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Likes
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                11,477
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleUp className="text-success" size={"medium"} />
                <Typography variant="body2" className="text-success">
                  14.8%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ lg: 6, xs: 12 }}>
        <Card component="a" href="#" className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]">
          <Box className="bg-accent-2-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiUsers className="text-accent-2" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Followers
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                682
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleUp className="text-success" size={"medium"} />
                <Typography variant="body2" className="text-success">
                  12.4%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
