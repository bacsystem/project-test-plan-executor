import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NumberSpinner from "@/components/base-ui/number-spinner";

export default function NumberFieldFilledSpinner() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Filled Spinner
          </Typography>
          <Box component="form" className="mb-0 flex max-w-sm flex-col">
            <NumberSpinner label="Small" min={10} max={40} size="small" variant="filled" centered />
            <NumberSpinner
              label="Readonly"
              min={10}
              max={40}
              value={10}
              size="small"
              variant="filled"
              readOnly
              centered
            />
            <NumberSpinner
              label="Disabled"
              min={10}
              max={40}
              value={10}
              size="small"
              variant="filled"
              disabled
              centered
            />
            <NumberSpinner label="Medium" min={10} max={40} variant="filled" centered />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
