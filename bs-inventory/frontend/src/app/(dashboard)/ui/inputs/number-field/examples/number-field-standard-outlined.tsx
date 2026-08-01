import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NumberField from "@/components/base-ui/number-field";

export default function NumberFieldStandardOutlined() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standard Outlined
          </Typography>
          <Box component="form" className="mb-0 flex max-w-sm flex-col">
            <NumberField
              label="Small"
              min={10}
              max={40}
              size="small"
              variant="standard"
              formControlClassName="outlined number-field"
            />
            <NumberField
              readOnly
              label="ReadOnly"
              min={10}
              max={40}
              value={10}
              size="small"
              variant="standard"
              formControlClassName="outlined number-field"
            />
            <NumberField
              disabled
              label="Disabled"
              min={10}
              max={40}
              value={10}
              size="small"
              variant="standard"
              formControlClassName="outlined number-field"
            />
            <NumberField
              label="Medium"
              min={10}
              max={40}
              variant="standard"
              formControlClassName="outlined number-field mb-0"
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
