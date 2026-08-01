import MasonryBasic from "./examples/masonry-basic";
import MasonryImages from "./examples/masonry-images";
import MasonryResponsiveColumns from "./examples/masonry-responsive-columns";
import MasonrySequential from "./examples/masonry-sequential";
import MasonryServerSide from "./examples/masonry-server-side";
import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function MasonryPage() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Masonry
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/ui">
            UI Elements
          </Link>
          <Link color="inherit" href="/ui/lab">
            Lab
          </Link>
          <Typography variant="body2">Masonry</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12} className="mb-2">
        <Typography variant="h6" component="h6" className="card-title">
          Basic
        </Typography>
        <MasonryBasic />
      </Grid>

      <Grid size={12} className="mb-2">
        <Typography variant="h6" component="h6" className="card-title">
          Images
        </Typography>
        <MasonryImages />
      </Grid>

      <Grid size={12} className="mb-2">
        <Typography variant="h6" component="h6" className="card-title">
          Responsive Columns
        </Typography>
        <MasonryResponsiveColumns />
      </Grid>

      <Grid size={12} className="mb-2">
        <Typography variant="h6" component="h6" className="card-title">
          Sequential
        </Typography>
        <MasonrySequential />
      </Grid>

      <Grid size={12} className="mb-2">
        <Typography variant="h6" component="h6" className="card-title">
          SSR
        </Typography>
        <MasonryServerSide />
      </Grid>
    </Grid>
  );
}
