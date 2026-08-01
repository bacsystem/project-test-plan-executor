import ImageListMasonry from "./examples/image-list-masonry";
import ImageListQuilted from "./examples/image-list-quilted";
import ImageListStandard from "./examples/image-list-standard";
import ImageListTitleBar from "./examples/image-list-title-bar";
import ImageListTitleBarStandard from "./examples/image-list-title-bar-standard";
import ImageListTitleBarStandardMasonry from "./examples/image-list-title-bar-standard-masonry";
import ImageListWoven from "./examples/image-list-woven";
import Link from "next/link";

import { Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Image List
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/layout">
            Layout
          </Link>
          <Typography variant="body2">Image List</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Basic
              </Typography>
              <ImageListStandard></ImageListStandard>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Quilted
              </Typography>
              <ImageListQuilted></ImageListQuilted>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Woven
              </Typography>
              <ImageListWoven></ImageListWoven>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Masonry
              </Typography>
              <ImageListMasonry></ImageListMasonry>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Title Bars
              </Typography>
              <ImageListTitleBar></ImageListTitleBar>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Title Bars Standard
              </Typography>
              <ImageListTitleBarStandard></ImageListTitleBarStandard>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h6" className="card-title">
                Title Bars Standard Masonry
              </Typography>
              <ImageListTitleBarStandardMasonry></ImageListTitleBarStandardMasonry>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
