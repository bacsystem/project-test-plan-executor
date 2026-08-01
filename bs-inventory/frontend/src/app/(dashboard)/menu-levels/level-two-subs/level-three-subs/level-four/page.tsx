import Link from "next/link";

import { Breadcrumbs, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function LevelFour() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Level Four
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
          <Link color="inherit" href="/menu-levels/level-two-subs/level-three-subs">
            Level Three Subs
          </Link>
          <Typography variant="body2">Level Four</Typography>
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
}
