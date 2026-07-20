import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

import NumberSpinner from "@/components/base-ui/number-spinner";

export default function NumberFieldOutlinedSpinner() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Outlined Spinner
          </Typography>
          <Box component="form" className="mb-0 flex max-w-sm flex-col">
            <NumberSpinner label="Small" min={10} max={40} variant="outlined" size="small" centered />
            <NumberSpinner
              label="Readonly"
              min={10}
              max={40}
              variant="outlined"
              size="small"
              readOnly
              value={10}
              centered
            />
            <NumberSpinner
              label="Disabled"
              min={10}
              max={40}
              variant="outlined"
              size="small"
              disabled
              value={10}
              centered
            />
            <NumberSpinner label="Medium" min={10} max={40} variant="outlined" centered />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
