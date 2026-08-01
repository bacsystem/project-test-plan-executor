import { Box, Card, CardContent, Checkbox, Grid, Typography } from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmpty } from "@/icons/form/mui-checkbox";

export default function CheckboxBasic() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Basic
          </Typography>
          <Box className="flex flex-row items-start gap-4">
            <Checkbox size="small" checked icon={<CheckboxSmallEmpty />} checkedIcon={<CheckboxSmallChecked />} />
            <Checkbox size="small" icon={<CheckboxSmallEmpty />} checkedIcon={<CheckboxSmallChecked />} />
            <Checkbox
              size="small"
              checked
              disabled
              icon={<CheckboxSmallEmpty />}
              checkedIcon={<CheckboxSmallChecked />}
            />
            <Checkbox size="small" disabled icon={<CheckboxSmallEmpty />} checkedIcon={<CheckboxSmallChecked />} />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
