import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NumberSpinner from "@/components/base-ui/number-spinner";

export default function NumberFieldStandardSpinner() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Standard Spinner
          </Typography>
          <Box component="form" className="mb-0 flex max-w-sm flex-col">
            <NumberSpinner
              label="Small"
              min={10}
              max={40}
              size="small"
              variant="standard"
              formControlClassName="number-field"
              centered
            />
            <NumberSpinner
              readOnly
              label="ReadOnly"
              min={10}
              max={40}
              value={10}
              size="small"
              variant="standard"
              formControlClassName="number-field"
              centered
            />
            <NumberSpinner
              disabled
              label="Disabled"
              min={10}
              max={40}
              value={10}
              size="small"
              variant="standard"
              formControlClassName="number-field"
              centered
            />
            <NumberSpinner
              label="Medium"
              min={10}
              max={40}
              variant="standard"
              formControlClassName="number-field mb-0"
              centered
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
