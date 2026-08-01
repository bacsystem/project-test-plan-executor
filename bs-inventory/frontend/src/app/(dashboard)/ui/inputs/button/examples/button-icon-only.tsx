import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material";

import NiBag from "@/icons/nexture/ni-bag";
import NiCrown from "@/icons/nexture/ni-crown";
import NiHome from "@/icons/nexture/ni-home";
import NiKnobs from "@/icons/nexture/ni-knobs";

export default function ButtonIconOnly() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Icon Only
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              className="icon-only"
              size="large"
              color="primary"
              variant="contained"
              startIcon={<NiHome size={"large"} />}
            />
            <Button
              className="icon-only"
              size="large"
              color="primary"
              variant="outlined"
              startIcon={<NiHome size={"large"} />}
            />
            <Button
              className="icon-only"
              size="large"
              color="primary"
              variant="pastel"
              startIcon={<NiHome size={"large"} />}
            />
            <Button
              className="icon-only"
              size="large"
              color="primary"
              variant="text"
              startIcon={<NiHome size={"large"} />}
            />
            <Button
              className="icon-only"
              size="large"
              color="primary"
              variant="surface"
              startIcon={<NiHome size={"large"} />}
            />
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              className="icon-only"
              size="medium"
              color="secondary"
              variant="contained"
              startIcon={<NiBag size={"medium"} />}
            />
            <Button
              className="icon-only"
              size="medium"
              color="secondary"
              variant="outlined"
              startIcon={<NiBag size={"medium"} />}
            />
            <Button
              className="icon-only"
              size="medium"
              color="secondary"
              variant="pastel"
              startIcon={<NiBag size={"medium"} />}
            />
            <Button
              className="icon-only"
              size="medium"
              color="secondary"
              variant="text"
              startIcon={<NiBag size={"medium"} />}
            />
            <Button
              className="icon-only"
              size="medium"
              color="secondary"
              variant="surface"
              startIcon={<NiBag size={"medium"} />}
            />
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              className="icon-only"
              size="small"
              color="accent-1"
              variant="contained"
              startIcon={<NiCrown size={"small"} />}
            />
            <Button
              className="icon-only"
              size="small"
              color="accent-1"
              variant="outlined"
              startIcon={<NiCrown size={"small"} />}
            />
            <Button
              className="icon-only"
              size="small"
              color="accent-1"
              variant="pastel"
              startIcon={<NiCrown size={"small"} />}
            />
            <Button
              className="icon-only"
              size="small"
              color="accent-1"
              variant="text"
              startIcon={<NiCrown size={"small"} />}
            />
            <Button
              className="icon-only"
              size="small"
              color="accent-1"
              variant="surface"
              startIcon={<NiCrown size={"small"} />}
            />
          </Box>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <Button
              className="icon-only"
              size="tiny"
              color="accent-2"
              variant="contained"
              startIcon={<NiKnobs size={"small"} />}
            />
            <Button
              className="icon-only"
              size="tiny"
              color="accent-2"
              variant="outlined"
              startIcon={<NiKnobs size={"small"} />}
            />
            <Button
              className="icon-only"
              size="tiny"
              color="accent-2"
              variant="pastel"
              startIcon={<NiKnobs size={"small"} />}
            />
            <Button
              className="icon-only"
              size="tiny"
              color="accent-2"
              variant="text"
              startIcon={<NiKnobs size={"small"} />}
            />
            <Button
              className="icon-only"
              size="tiny"
              color="accent-2"
              variant="surface"
              startIcon={<NiKnobs size={"small"} />}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
