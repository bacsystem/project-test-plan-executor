import Link from "next/link";

import { Box, Breadcrumbs, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Stack
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
          <Typography variant="body2">Stack</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Stack spacing={2}>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 1</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 2</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 3</Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Direction
            </Typography>
            <Stack direction="row" spacing={2}>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 1</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 2</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 3</Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Dividers
            </Typography>
            <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 1</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 2</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 3</Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Responsive Values
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2, md: 4 }}>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 1</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 2</Box>
              <Box className="border-grey-100 rounded-md border border-solid p-4">Item 3</Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
