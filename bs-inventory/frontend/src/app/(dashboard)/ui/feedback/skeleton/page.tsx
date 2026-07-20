import SkeletonInferringOthers from "./examples/skeleton-inferring-others";
import SkeletonInferringTypography from "./examples/skeleton-inferring-typography";
import Link from "next/link";

import { Box, Breadcrumbs, Card, CardContent, CardMedia, Skeleton, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Skeleton
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/feedback">
            Feedback
          </Link>
          <Typography variant="body2">Skeleton</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Variants
            </Typography>
            <Box className="flex w-80 flex-col gap-1">
              <Skeleton variant="text" className="text-base" />

              <Skeleton variant="rounded" className="h-10 w-10 rounded-lg" />
              <Skeleton variant="rounded" className="h-10 w-10 rounded-md" />
              <Skeleton variant="rounded" className="h-10 w-10" />

              <Skeleton variant="rounded" className="h-16 rounded-lg" />
              <Skeleton variant="rounded" className="h-16 rounded-md" />
              <Skeleton variant="rounded" className="h-16" />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Animations
            </Typography>
            <Box className="flex w-80 flex-col gap-1">
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Pulsate
            </Typography>
            <Box className="flex flex-row gap-4">
              <Box className="flex w-80 flex-col">
                <Skeleton variant="rounded" className="h-52 rounded-md" />
                <Box className="flex flex-col py-2">
                  <Skeleton variant="text" className="text-xl" />
                  <Skeleton variant="text" className="w-1/2 text-base" />
                </Box>
              </Box>

              <Box className="flex w-80 flex-col">
                <CardMedia
                  component="img"
                  className="h-52 rounded-md"
                  image="/images/products/product-1.jpg"
                  alt="Flower Pot"
                />
                <Box className="flex flex-col py-2">
                  <Typography variant="h6" component="h6" className="-mb-1">
                    Wall Mounted Flower Pot
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary" component="span">
                    by ShadowArt
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Wave
            </Typography>
            <Box className="flex flex-row gap-4">
              <Box className="flex w-80 flex-col">
                <Skeleton animation="wave" variant="rounded" className="h-52 rounded-md" />
                <Box className="flex flex-col py-2">
                  <Skeleton animation="wave" variant="text" className="text-xl" />
                  <Skeleton animation="wave" variant="text" className="w-1/2 text-base" />
                </Box>
              </Box>

              <Box className="flex w-80 flex-col">
                <CardMedia
                  component="img"
                  className="h-52 rounded-md"
                  image="/images/products/product-1.jpg"
                  alt="Flower Pot"
                />
                <Box className="flex flex-col py-2">
                  <Typography variant="h6" component="h6" className="-mb-1">
                    Wall Mounted Flower Pot
                  </Typography>
                  <Typography variant="body1" className="text-text-secondary" component="span">
                    by ShadowArt
                  </Typography>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Inferring Dimensions
            </Typography>

            <Box className="flex flex-col gap-4">
              <SkeletonInferringTypography />
              <SkeletonInferringOthers />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Color
            </Typography>

            <Box className="flex flex-col gap-2">
              <Skeleton variant="rounded" className="bg-grey-50 h-10 w-10 rounded-md" />
              <Skeleton variant="rounded" className="bg-grey-100 h-10 w-10 rounded-md" />
              <Skeleton variant="rounded" className="bg-grey-200 h-10 w-10 rounded-md" />
              <Skeleton variant="rounded" className="bg-grey-300 h-10 w-10 rounded-md" />
              <Skeleton variant="rounded" className="bg-grey-400 h-10 w-10 rounded-md" />
              <Skeleton variant="rounded" className="bg-grey-500 h-10 w-10 rounded-md" />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
