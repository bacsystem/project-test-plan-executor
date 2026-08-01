import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import NiBag from "@/icons/nexture/ni-bag";
import NiCrown from "@/icons/nexture/ni-crown";
import NiHome from "@/icons/nexture/ni-home";
import NiKnobs from "@/icons/nexture/ni-knobs";
import NiStars from "@/icons/nexture/ni-stars";

export default function ButtonIconAndLabel() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Icon and Label
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button size="large" color="primary" variant="contained" startIcon={<NiHome size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="contained" endIcon={<NiHome size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="outlined" startIcon={<NiBag size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="outlined" endIcon={<NiBag size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="pastel" startIcon={<NiCrown size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="pastel" endIcon={<NiCrown size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="text" startIcon={<NiKnobs size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="text" endIcon={<NiKnobs size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="surface" startIcon={<NiStars size={"large"} />}>
              Large
            </Button>
            <Button size="large" color="primary" variant="surface" endIcon={<NiStars size={"large"} />}>
              Large
            </Button>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button size="medium" color="secondary" variant="contained" startIcon={<NiHome size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="contained" endIcon={<NiHome size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="outlined" startIcon={<NiBag size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="outlined" endIcon={<NiBag size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="pastel" startIcon={<NiCrown size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="pastel" endIcon={<NiCrown size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="text" startIcon={<NiKnobs size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="text" endIcon={<NiKnobs size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="surface" startIcon={<NiStars size={"medium"} />}>
              Medium
            </Button>
            <Button size="medium" color="secondary" variant="surface" endIcon={<NiStars size={"medium"} />}>
              Medium
            </Button>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button size="small" color="accent-1" variant="contained" startIcon={<NiHome size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="contained" endIcon={<NiHome size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="outlined" startIcon={<NiBag size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="outlined" endIcon={<NiBag size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="pastel" startIcon={<NiCrown size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="pastel" endIcon={<NiCrown size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="text" startIcon={<NiKnobs size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="text" endIcon={<NiKnobs size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="surface" startIcon={<NiStars size={"small"} />}>
              Small
            </Button>
            <Button size="small" color="accent-1" variant="surface" endIcon={<NiStars size={"small"} />}>
              Small
            </Button>
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button size="tiny" color="accent-2" variant="contained" startIcon={<NiHome size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="contained" endIcon={<NiHome size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="outlined" startIcon={<NiBag size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="outlined" endIcon={<NiBag size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="pastel" startIcon={<NiCrown size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="pastel" endIcon={<NiCrown size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="text" startIcon={<NiKnobs size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="text" endIcon={<NiKnobs size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="surface" startIcon={<NiStars size={"small"} />}>
              Tiny
            </Button>
            <Button size="tiny" color="accent-2" variant="surface" endIcon={<NiStars size={"small"} />}>
              Tiny
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
