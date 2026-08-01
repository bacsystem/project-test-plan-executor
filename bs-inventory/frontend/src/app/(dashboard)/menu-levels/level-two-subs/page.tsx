import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function LevelTwoSubs() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Level Two Subs
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/menu-levels">
            Menu Levels
          </Link>
          <Typography variant="body2">Level Two Subs</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
}
