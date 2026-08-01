import { Box, Card, CardContent, Checkbox, FormControl, FormControlLabel, Grid, Typography } from "@mui/material";

import {
  CheckboxMediumChecked,
  CheckboxMediumEmpty,
  CheckboxMediumEmptyOutlined,
  CheckboxSmallChecked,
  CheckboxSmallEmpty,
  CheckboxSmallEmptyOutlined,
} from "@/icons/form/mui-checkbox";

export default function CheckboxSizeAndVariants() {
  return (
    <Grid size={12}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h6" className="card-title">
            Size and Variants
          </Typography>

          <Box className="flex flex-col">
            <FormControl>
              <FormControlLabel
                control={<Checkbox size="small" icon={<CheckboxSmallEmpty />} checkedIcon={<CheckboxSmallChecked />} />}
                label="Small"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={
                  <Checkbox size="small" icon={<CheckboxSmallEmptyOutlined />} checkedIcon={<CheckboxSmallChecked />} />
                }
                label="Small Outlined"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={<Checkbox icon={<CheckboxMediumEmpty />} checkedIcon={<CheckboxMediumChecked />} />}
                label="Medium"
              />
            </FormControl>
            <FormControl>
              <FormControlLabel
                control={<Checkbox icon={<CheckboxMediumEmptyOutlined />} checkedIcon={<CheckboxMediumChecked />} />}
                label="Medium Outlined"
              />
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
