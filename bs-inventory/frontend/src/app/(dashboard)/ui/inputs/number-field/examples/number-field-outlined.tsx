import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NumberField from "@/components/base-ui/number-field";

export default function NumberFieldOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Outlined
          </Typography>
          <Box component="form" className="mb-0 flex max-w-sm flex-col">
            <NumberField label="Small" min={10} max={40} variant="outlined" size="small" />
            <NumberField label="Readonly" min={10} max={40} variant="outlined" size="small" readOnly value={10} />
            <NumberField label="Disabled" min={10} max={40} variant="outlined" size="small" disabled value={10} />
            <NumberField label="Medium" min={10} max={40} variant="outlined" />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
