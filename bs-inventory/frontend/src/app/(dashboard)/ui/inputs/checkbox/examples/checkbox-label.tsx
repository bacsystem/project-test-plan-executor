import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";

import { CheckboxSmallChecked, CheckboxSmallEmpty } from "@/icons/form/mui-checkbox";

export default function CheckboxLabel() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Label
          </Typography>

          <Box className="flex flex-col">
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    size="small"
                  />
                }
                label="Label"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                required
                control={<Checkbox icon={<CheckboxSmallEmpty />} checkedIcon={<CheckboxSmallChecked />} size="small" />}
                label="Required"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                disabled
                control={<Checkbox icon={<CheckboxSmallEmpty />} checkedIcon={<CheckboxSmallChecked />} size="small" />}
                label="Disabled"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                disabled
                control={
                  <Checkbox
                    defaultChecked
                    icon={<CheckboxSmallEmpty />}
                    checkedIcon={<CheckboxSmallChecked />}
                    size="small"
                  />
                }
                label="Disabled Checked"
              />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
