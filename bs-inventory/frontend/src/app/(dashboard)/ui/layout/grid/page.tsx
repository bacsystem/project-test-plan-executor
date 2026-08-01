import Link from "next/link";

import { Box, Breadcrumbs, Card, CardContent, Typography } from "@mui/material";
import { Grid } from "@mui/material";

export default function Page() {
  return (
    <Grid container spacing={5}>
      <Grid size={12} className="mb-2">
        <Typography variant="h1" component="h1" className="mb-0">
          Grid
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
          <Typography variant="body2">Grid</Typography>
        </Breadcrumbs>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Basic
            </Typography>
            <Grid container spacing={2}>
              <Grid size={8}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=8</Box>
              </Grid>
              <Grid size={4}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=4</Box>
              </Grid>
              <Grid size={4}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=4</Box>
              </Grid>
              <Grid size={8}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=8</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Breakpoints
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6, md: 8 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">xs=6 md=8</Box>
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">xs=6 md=4</Box>
              </Grid>
              <Grid size={{ xs: 6, md: 4 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">xs=6 md=4</Box>
              </Grid>
              <Grid size={{ xs: 6, md: 8 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">xs=6 md=8</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Spacing
            </Typography>
            <Grid container spacing={0} className="mb-2">
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 0</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 0</Box>
              </Grid>
            </Grid>
            <Grid container spacing={1} className="mb-2">
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 1(4px)</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 1(4px)</Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} className="mb-2">
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 2(8px)</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 2(8px)</Box>
              </Grid>
            </Grid>
            <Grid container spacing={3} className="mb-2">
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 3(12px)</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 3(12px)</Box>
              </Grid>
            </Grid>
            <Grid container spacing={4} className="mb-0">
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 4(16px)</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">spacing= 4(16px)</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Row and Column Spacing
            </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">1</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">2</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">3</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">4</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Auto-layout
            </Typography>
            <Grid container spacing={3}>
              <Grid size="grow">
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=grow</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=6</Box>
              </Grid>
              <Grid size="grow">
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=grow</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Variable Width
            </Typography>
            <Grid container spacing={3}>
              <Grid size="auto">
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=auto</Box>
              </Grid>
              <Grid size={6}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=6</Box>
              </Grid>
              <Grid size="grow">
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=grow</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Variable Width
            </Typography>
            <Grid container spacing={2} columns={16}>
              <Grid size={8}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=8</Box>
              </Grid>
              <Grid size={8}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">size=8</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h6" className="card-title">
              Offset
            </Typography>
            <Grid container spacing={3} className="grow">
              <Grid size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">1</Box>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }} offset={{ md: "auto" }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">2</Box>
              </Grid>
              <Grid size={{ xs: 4, md: 2 }} offset={{ xs: 4, md: 0 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">3</Box>
              </Grid>
              <Grid size={{ xs: "grow", md: 6 }} offset={{ md: 2 }}>
                <Box className="border-grey-100 rounded-md border border-solid p-4">4</Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
