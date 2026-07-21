import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NumberField from "@/components/base-ui/number-field";

export default function NumberFieldFilled() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Filled
          </Typography>
          <Box component="form" className="mb-0 flex max-w-sm flex-col">
            <NumberField label="Small" min={10} max={40} size="small" variant="filled" />
            <NumberField label="Readonly" min={10} max={40} value={10} size="small" variant="filled" readOnly />
            <NumberField label="Disabled" min={10} max={40} value={10} size="small" variant="filled" disabled />
            <NumberField label="Medium" min={10} max={40} variant="filled" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
