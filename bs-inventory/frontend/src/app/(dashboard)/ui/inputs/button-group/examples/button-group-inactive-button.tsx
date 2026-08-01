import { Box, Button, ButtonGroup, Card, CardContent, Grid, Typography } from "@mui/material";

import NiArrowDown from "@/icons/nexture/ni-arrow-down";
import NiArrowUp from "@/icons/nexture/ni-arrow-up";

export default function ButtonGroupInactiveButton() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Inactive Button
          </Typography>
          <Box className="row mb-4 flex flex-wrap items-start gap-2">
            <ButtonGroup size="large" variant="pastel" color="text-primary">
              <Button className="icon-only px-3!" startIcon={<NiArrowUp size={"large"} />} />
              <Button className="pointer-events-none px-0">547</Button>
              <Button className="icon-only px-3!" startIcon={<NiArrowDown size={"large"} />} />
            </ButtonGroup>
            <ButtonGroup size="medium" variant="pastel" color="text-primary">
              <Button className="icon-only px-2.5!" startIcon={<NiArrowUp size={"medium"} />} />
              <Button className="pointer-events-none px-0">547</Button>
              <Button className="icon-only px-2.5!" startIcon={<NiArrowDown size={"medium"} />} />
            </ButtonGroup>
            <ButtonGroup size="small" variant="pastel" color="text-primary">
              <Button className="icon-only px-2!" startIcon={<NiArrowUp size={"small"} />} />
              <Button className="pointer-events-none px-0">547</Button>
              <Button className="icon-only px-2!" startIcon={<NiArrowDown size={"small"} />} />
            </ButtonGroup>
            <ButtonGroup size="tiny" variant="pastel" color="text-primary">
              <Button className="icon-only px-1.5!" startIcon={<NiArrowUp size={"tiny"} />} />
              <Button className="pointer-events-none px-0">547</Button>
              <Button className="icon-only px-1.5!" startIcon={<NiArrowDown size={"tiny"} />} />
            </ButtonGroup>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
