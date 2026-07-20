import { useRouter } from "next/navigation";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NiCheckSquare from "@/icons/nexture/ni-check-square";
import NiClock from "@/icons/nexture/ni-clock";
import NiExclamationSquare from "@/icons/nexture/ni-exclamation-square";
import NiTriangleDown from "@/icons/nexture/ni-triangle-down";
import NiTriangleUp from "@/icons/nexture/ni-triangle-up";

export default function SupportOverviewStats() {
  const router = useRouter();

  const handleClick = (event: any) => {
    event.preventDefault();
    router.push("/pages/support/issues");
  };

  return (
    <Grid container size={12} spacing={2.5}>
      <Grid size={{ lg: 4, xs: 12 }}>
        <Card
          component="a"
          href="/pages/support/issues"
          onClick={handleClick}
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-error-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiExclamationSquare className="text-error" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Open
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                34
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
      <Grid size={{ lg: 4, xs: 12 }}>
        <Card
          component="a"
          href="/pages/support/issues"
          onClick={handleClick}
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-warning-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiClock className="text-warning" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              In Progress
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                62
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
      <Grid size={{ lg: 4, xs: 12 }}>
        <Card
          component="a"
          href="/pages/support/issues"
          onClick={handleClick}
          className="flex flex-row items-center p-1 transition-transform hover:scale-[1.02]"
        >
          <Box className="bg-success-light/10 flex h-24 w-16 flex-none items-center justify-center rounded-2xl">
            <NiCheckSquare className="text-success" size={"large"} />
          </Box>
          <CardContent>
            <Typography variant="body1" className="text-text-secondary leading-5">
              Closed
            </Typography>
            <Box className="flex flex-row items-center gap-2">
              <Typography variant="h5" className="text-leading-5">
                426
              </Typography>
              <Box className="flex flex-row items-center">
                <NiTriangleUp className="text-success" size={"medium"} />
                <Typography variant="body2" className="text-success">
                  6.4%
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
