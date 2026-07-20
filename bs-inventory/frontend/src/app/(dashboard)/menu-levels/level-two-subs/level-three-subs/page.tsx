import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function LevelThreeSubs() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Level Three Subs
        </Typography>
        <Breadcrumbs>
          <Link color="inherit" href="/dashboards/default">
            Home
          </Link>
          <Link color="inherit" href="/menu-levels">
            Menu Levels
          </Link>
          <Link color="inherit" href="/menu-levels/level-two-subs">
            Level Two Subs
          </Link>
          <Typography variant="body2">Level Three Subs</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
}
